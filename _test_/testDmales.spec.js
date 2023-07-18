// Deceased Females jest unit tests

const request = require('supertest');
const app = require('../server');

const testDmales = require('../takeTheWheel/dMales');

jest.mock('../takeTheWheel/dMales', () => ({
  getAll: jest.fn(),
  getSingle: jest.fn(),
  post: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('dMales API', () => {
  // Test the GETALL route for dMales
  it('should get all deceased male into the dMales collection', async () => {
    const mockDmales = [
      {
        firstName: "Yondu",
        lastName: "Udonta",
        birthYear: "2990",
        birthLocation: "Centauri IV, Earth-691",
        deathYear: "3177",
        deathLocation: "Centauri IV, Earth-691"
      },
      // more deceased males
    ];

    const { getAll } = require('../takeTheWheel/dMales');
    getAll.mockResolvedValue(mockDmales);

    const response = await request(app).get('/dMales');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(mockDmales);
  });

  // Test the GETSINGLE route for dMales
  it('should get one deceased male from the dMales collection', async () => {
    const mockDmale = {
      // _id:
      firstName: "Yondu",
      lastName: "Udonta",
      birthYear: "2990",
      birthLocation: "Centauri IV, Earth-691",
      deathYear: "3177",
      deathLocation: "Centauri IV, Earth-691"
    };

    const { getSingle } = require('../takeTheWheel/dMales');
    getSingle.mockResolvedValue(mockDmale);

    const response = await request(app).get('/dMales/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDmale);
  });

  // Test the POST route for dMales
  it('should post a deceased male to the dMales collection', async () => {
    const mockResponse = {
      message: 'Male ancestor added to the collection',
    };

    const { valhalla } = require('../takeTheWheel/dMales');
    valhalla.mockResolvedValue(mockResponse);

    const response = await request(app).post('/dMales').send({
      // _id: '',
      firstName: "Yondu",
      lastName: "Udonta",
      birthYear: "2990",
      birthLocation: "Centauri IV, Earth-691",
      deathYear: "3177",
      deathLocation: "Centauri IV, Earth-691"
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the PUT route for dMales
  it('should update a deceased male in the dMales collection', async () => {
    const mockResponse = {
      message: 'dMale updated successfully',
    };

    const { putValhalla } = require('../takeTheWheel/dMales');
    putValhalla.mockResolvedValue(mockResponse);

    const response = await request(app).put('/dMales').send({
      // _id: '',
      firstName: "Yondu",
      lastName: "Udonta",
      birthYear: "2990",
      birthLocation: "Centauri IV, Earth-691",
      deathYear: "3177",
      deathLocation: "Centauri IV, Earth-691"
    });

    expect(response.status).toBe(204);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the DELETE route for dMales
  it('should delete a deceased male in the dMales collection', async () => {
    const mockResponse = {
      message: 'dMale deleted successfully',
    };

    const { delete: removeValhalla } = require('../takeTheWheel/dMales');
    removeValhalla.mockResolvedValue(mockResponse);

    const response = await request(app).delete('/dMales');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
