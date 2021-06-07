/* eslint-disable camelcase */
import axios from 'axios';

const refreshToken = async ({ refreshToken }) =>
  axios
    .request({
      method: 'post',
      url: `/o/token/`,
      baseURL: process.env.REACT_APP_API_URL,
      data: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&client_secret=${process.env.REACT_APP_AUTH_CLIENT_SECRET}`
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));

// https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f
const axiosClient = axios.create({
  baseURL: process.env.apiUrl
});

axiosClient.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const access_token = window.localStorage.getItem('access_token');
      const token_type = window.localStorage.getItem('token_type');
      const token = `${token_type} ${access_token}`;

      if (access_token && access_token !== '') {
        config.headers.Authorization = token;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    }
  },
  error => {
    Promise.reject(error);
  }
);

const shouldIntercept = error => {
  try {
    return error.response.status === 401;
  } catch (e) {
    return false;
  }
};

const setTokenData = ({ access_token, expires_in, refresh_token, token_type }) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('expires_in', expires_in);
    window.localStorage.setItem('refresh_token', refresh_token);
    window.localStorage.setItem('update_at', `${Date.now()}`);

    const token = `${token_type} ${access_token}`;
    axiosClient.defaults.headers.common.Authorization = token;
  }
};

const handleTokenRefresh = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('refresh_token');

    return new Promise((resolve, reject) => {
      refreshToken({ refreshToken: token })
        .then(response => {
          const { access_token, expires_in, refresh_token, token_type } = response.data;
          setTokenData({ access_token, expires_in, refresh_token, token_type });
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

const attachTokenToRequest = (request, token) => {
  request.headers.Authorization = token;
};

const configInterceptors = () => {
  let isRefreshing = false;
  let failedQueue = [];

  const options = {
    attachTokenToRequest,
    handleTokenRefresh,
    setTokenData,
    shouldIntercept
  };

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  const interceptor = error => {
    if (!options.shouldIntercept(error)) {
      return Promise.reject(error);
    }

    if (error.config._retry || error.config._queued) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest._queued = true;
          options.attachTokenToRequest(originalRequest, token);
          return axiosClient.request(originalRequest);
        })
        .catch(() => {
          return Promise.reject(error); // Ignore refresh token request's "err" and return actual "error" for the original request
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      options.handleTokenRefresh
        .call(options.handleTokenRefresh)
        .then(tokenData => {
          options.setTokenData(tokenData);

          const token = `${tokenData.token_type} ${tokenData.access_token}`;
          options.attachTokenToRequest(originalRequest, token);
          processQueue(null, token);
          resolve(axiosClient.request(originalRequest));
        })
        .catch(err => {
          processQueue(err, null);
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  };

  axiosClient.interceptors.response.use(undefined, interceptor);

  return axiosClient;
};

export default configInterceptors();
