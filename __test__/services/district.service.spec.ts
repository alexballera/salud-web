import { rest } from 'msw';
import { getDistrict } from '../../src/services/address.service';
import { setupServer } from 'msw/node';

const mockDistrictsResult = {
  catalogo: [
    {
      codigo: '123',
      nombre: 'Amazonas'
    }
  ]
};

const server = setupServer(
  rest.get(
    `https://nbej1dm79d.execute-api.us-east-1.amazonaws.com/dev/sac-general/districts-api`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          result: mockDistrictsResult
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('District service', () => {
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

    const districts = (await getDistrict('')).data.result.catalogo;
    districts.map((district, i) => expect(district).toEqual(mockDistrictsResult.catalogo[i]));
  });

  it('should calls axios and throw an error', () => {
    process.env.apiUrl = API_URL;

    server.use(
      rest.get(`${API_URL}sac-general/districts-api`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    expect(getDistrict('')).rejects.toThrow('Request failed with status code 404');
  });
});
