import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getProvinces } from '../../src/services/address.service';

const mockProvincesResult = {
  primerNivel: [
    {
      codigo: '123',
      nombre: 'Amazonas'
    }
  ]
};

const server = setupServer(
  rest.get(
    `https://nbej1dm79d.execute-api.us-east-1.amazonaws.com/dev/sac-general/provinces-api`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: mockProvincesResult
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Provinces service', () => {
  const API_URL = 'https://nbej1dm79d.execute-api.us-east-1.amazonaws.com/dev/';
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('Should calls axios and return provinces', async () => {
    process.env.apiUrl = API_URL;

    const provinces = (await getProvinces()).data.result.primerNivel;
    provinces.map((province, i) => expect(province).toEqual(mockProvincesResult.primerNivel[i]));
  });

  it('should calls axios and throw an error', () => {
    process.env.apiUrl = API_URL;

    server.use(
      rest.get(`${API_URL}sac-general/provinces-api`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect(getProvinces()).rejects.toThrow('Request failed with status code 404');
  });
});
