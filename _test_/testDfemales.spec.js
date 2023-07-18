// Deceased Females jest unit tests
const request = require('supertest');
const app = require('../server');

const testDfemales = require('../takeTheWheel/dFemales');

jest.mock('../takeTheWheel/dFemales', () => ({
  getAll: jest.fn(),
  getSingle: jest.fn(),
  post: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe('dFemales API', () => {
  // Test the GETALL route for dFemales
  it('should get all deceased female into the dFemales collection', async () => {
    const mockDfemales = [
      {
        firstName: "Jessica",
        lastName: "Jones",
        birthYear: "1927",
        birthLocation: "Lethbridge, Canada",
        deathYear: "update 1965",
        deathLocation: "Vancouver, Canada",
        children: "Yes",
      },
      // more deceased females
    ];

    const { getAll } = require('../takeTheWheel/dFemales');
    getAll.mockResolvedValue(mockDfemales);

    const response = await request(app).get('/dFemales');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(mockDfemales);
  });

  // Test the GETSINGLE route for dFemales
  it('should get one deceased female from the dfemales collection', async () => {
    const mockDfemale = {
      _id: '648dd1ad472c91115ef9324b',
      firstName: "Jessica",
      lastName: "Jones",
      birthYear: "1927",
      birthLocation: "Lethbridge, Canada",
      deathYear: "update 1965",
      deathLocation: "Vancouver, Canada",
      children: "Yes",
    };

    const { getSingle } = require('../takeTheWheel/dFemales');
    getSingle.mockResolvedValue(mockDfemale);

    const response = await request(app).get('/dFemales/648dd1ad472c91115ef9324b');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDfemale);
  });

  // Test the POST route for dFemales
  it('should post a deceased female to the dfemales collection', async () => {
    const mockResponse = {
      message: 'Female ancestor added to the collection',
    };

    const { pushingUpDaisies } = require('../takeTheWheel/dFemales');
    pushingUpDaisies.mockResolvedValue(mockResponse);

    const response = await request(app).post('/dFemales').send({
      _id: '648dd1ad472c91115ef9324b',
      firstName: "Jessica",
      lastName: "Jones",
      birthYear: "1927",
      birthLocation: "Lethbridge, Canada",
      deathYear: "1965",
      deathLocation: "Vancouver, Canada",
      children: "Yes",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the PUT route for dFemales
  it('should update a deceased female in the dfemales collection', async () => {
    const mockResponse = {
      message: 'dFemale updated successfully',
    };

    const { puttingDaisies } = require('../takeTheWheel/dFemales');
    puttingDaisies.mockResolvedValue(mockResponse);

    const response = await request(app).put('/dFemales/648dd1ad472c91115ef9324b').send({
      _id: '648dd1ad472c91115ef9324b',
      firstName: "Jessica",
      lastName: "Jones",
      birthYear: "1927",
      birthLocation: "Lethbridge, Canada",
      deathYear: "update 1965",
      deathLocation: "Vancouver, Canada",
      children: "Yes",
    });

    expect(response.status).toBe(204);
    expect(response.body).toEqual(mockResponse);
  });

  // Test the DELETE route for dFemales
  it('should delete a deceased female in the dfemales collection', async () => {
    const mockResponse = {
      message: 'dFemale deleted successfully',
    };

    const { delete: pullDaisies } = require('../takeTheWheel/dFemales');
    pullDaisies.mockResolvedValue(mockResponse);

    const response = await request(app).delete('/dFemales/648dd1ad472c91115ef9324b');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});


