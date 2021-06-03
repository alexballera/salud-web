export const StandardOk = {
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {}
};

export const LoginEmptyResultResponse = {
  ...StandardOk,
  data: { result: {} }
};
