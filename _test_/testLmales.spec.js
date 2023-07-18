// Living Males jest unit tests

const request = require('supertest');
const app = require('../server');

const testLmales = require('../takeTheWheel/lMales');

jest.mock('../takeTheWheel/lMales', () => ({
  getAll: jest.fn(),
  getSingle: jest.fn(),
  post: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('lMales API', () => {
  // Test the GETALL route for dMales
  it('should get all living male into the lMales collection', async () => {
    const mockLmales = [
      {
        id: "004",
        firstName: "Amadeus",
        lastName: "Cho",
        birthYear: "2000",
        birthLocation: "Tucson, Arizona"
      },
      // more living males
    ];

    const { getAll } = require('../takeTheWheel/lMales');
    getAll.mockResolvedValue(mockLmales);

    const response = await request(app).get('/lMales');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(mockLmales);
  });

  // Test the GETSINGLE route for lMales
  it('should get one living male from the lMales collection', async () => {
    const mockLmale = {
      id: "004",
      firstName: "Amadeus",
      lastName: "Cho",
      birthYear: "2000",
      birthLocation: "Tucson, Arizona"
    };

    const { getSingle } = require('../takeTheWheel/lMales');
    getSingle.mockResolvedValue(mockLmale);

    const response = await request(app).get('/lMales/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockLmale);
  });

  // Test the POST route for lMales
  it('should post a living male to the lMales collection', async () => {
    const mockResponse = {
      message: 'Male document added to the collection',
    };

    const { snipsAndSnails } = require('../takeTheWheel/lMales');
    snipsAndSnails.mockResolvedValue(mockResponse);

    const response = await request(app).post('/lMales').send({
      id: "004",
      firstName: "Amadeus",
      lastName: "Cho",
      birthYear: "2000",
      birthLocation: "Tucson, Arizona"
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the PUT route for lMales
  it('should update a living male in the lMales collection', async () => {
    const mockResponse = {
      message: 'lMale updated successfully',
    };

    const { putSnipsAndSnails } = require('../takeTheWheel/lMales');
    putSnipsAndSnails.mockResolvedValue(mockResponse);

    const response = await request(app).put('/lMales').send({
      id: "004",
      firstName: "Amadeus",
      lastName: "Cho",
      birthYear: "2000",
      birthLocation: "Tucson, Arizona"
    });

    expect(response.status).toBe(204);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the DELETE route for lMales
  it('should delete a living male in the lMales collection', async () => {
    const mockResponse = {
      message: 'lMale deleted successfully',
    };

    const { delete: deleteSnipsAndSnails } = require('../takeTheWheel/lMales');
    deleteSnipsAndSnails.mockResolvedValue(mockResponse);

    const response = await request(app).delete('/lMales');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
