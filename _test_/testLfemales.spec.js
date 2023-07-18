// Living Females jest unit tests


const request = require('supertest');
const app = require('../server');

const testLfemales = require('../takeTheWheel/lFemales');

jest.mock('../takeTheWheel/lFemales', () => ({
  getAll: jest.fn(),
  getSingle: jest.fn(),
  post: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('lFemales API', () => {
  // Test the GETALL route for lFemales
  it('should get all living female into the lFemales collection', async () => {
    const mockLfemales = [
      {
        id: "003",
        firstName: "Katherine",
        lastName: "Pryde",
        birthYear: "1996",
        birthLocation: "Deerfield, IL"
      },
      // more living females
    ];

    const { getAll } = require('../takeTheWheel/lFemales');
    getAll.mockResolvedValue(mockLfemales);

    const response = await request(app).get('/lFemales');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(mockLfemales);
  });

  // Test the GETSINGLE route for lFemales
  it('should get one living female from the lFemales collection', async () => {
    const mockLfemale = {
      id: "003",
      firstName: "Katherine",
      lastName: "Pryde",
      birthYear: "1996",
      birthLocation: "Deerfield, IL"
    };

    const { getSingle } = require('../takeTheWheel/lFemales');
    getSingle.mockResolvedValue(mockLfemale);

    const response = await request(app).get('/lFemales');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockLfemale);
  });

  // Test the POST route for lFemales
  it('should post a living female to the lFemales collection', async () => {
    const mockResponse = {
      message: 'Female document added to the collection',
    };

    const { fataleAttraction } = require('../takeTheWheel/lFemales');
    fataleAttraction.mockResolvedValue(mockResponse);

    const response = await request(app).post('/lFemales').send({
      id: "003",
      firstName: "Katherine",
      lastName: "Pryde",
      birthYear: "1996",
      birthLocation: "Deerfield, IL"
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the PUT route for lFemales
  it('should update a living female in the lfemales collection', async () => {
    const mockResponse = {
      message: 'lFemale updated successfully',
    };

    const { putFemmeFatale } = require('../takeTheWheel/lFemales');
    putFemmeFatale.mockResolvedValue(mockResponse);

    const response = await request(app).put('/lFemales').send({
      id: "003",
      firstName: "Katherine",
      lastName: "Pryde",
      birthYear: "1996",
      birthLocation: "Deerfield, IL"
    });

    expect(response.status).toBe(204);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the DELETE route for lFemales
  it('should delete a living female in the lFemales collection', async () => {
    const mockResponse = {
      message: 'lFemale deleted successfully',
    };

    const { delete: deleteFA } = require('../takeTheWheel/lFemales');
    deleteFA.mockResolvedValue(mockResponse);

    const response = await request(app).delete('/lFemales');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
