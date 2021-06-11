import { rest } from 'msw';
import { getCanton } from '../../src/services/address.service';
import { setupServer } from 'msw/node';

const mockCantonsResult = {
  segundoNivel: [
    {
      codigo: '123',
      nombre: 'Amazonas'
    }
  ]
};

const server = setupServer(
  rest.get(
    `https://nbej1dm79d.execute-api.us-east-1.amazonaws.com/dev/sac-general/cantons-api`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: mockCantonsResult
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Cantons service', () => {
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

    const cantones = (await getCanton('')).data.result.segundoNivel;
    cantones.map((canton, i) => expect(canton).toEqual(mockCantonsResult.segundoNivel[i]));
  });

  it('should calls axios and throw an error', () => {
    process.env.apiUrl = API_URL;

    server.use(
      rest.get(`${API_URL}sac-general/cantons-api`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect(getCanton('')).rejects.toThrow('Request failed with status code 404');
  });
});
