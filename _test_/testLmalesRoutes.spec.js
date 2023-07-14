// Living Males jest unit tests
// Used Brother Birch's Jest unit tests as a template: https://github.com/byui-cse/cse341-code-student/blob/L12-class-complete/__tests__/mongo.spec.js

const request = require('supertest');
const app = require('../server');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
const { setupDatabase, teardownDatabase, getDb } = require('./test-setup');

describe('lMales API', () => {
  let db;

  beforeAll(async () => {
    await setupDatabase();
    db = getDb();
  });

  afterAll(async () => {
    await teardownDatabase();
  });

    // Test the POST route for lMales
    it('should post a new deceased male into the lMales collection', async () => {
            const lMalesCollection = db.collection('lMales');

            const mockLmale = {
                id: "004",
                firstName: "Amadeus",
                lastName: "Cho",
                birthYear: "2000",
                birthLocation: "Tucson, Arizona"
            };

            await lMalesCollection.insertOne(mockLmale)

            const postedLmale = await lMalesCollection.findOne({
                id: '004'
            });

            expect(postedLmale).toEqual(mockLmale)
        });

        // Test the GET route for lMales
        it('should retrieve the living male from the lMales collection', async () => {
            const lMalesCollection = db.collection('lMales');

            const retrievedLmale = await lMalesCollection.findOne({
              id: '004',
            });

             expect(retrievedLmale).toBeDefined();
        });


        //Test the PUT route for lMales



        // Test the DELETE route for lMales (delete the mock data)
        it('should delete the living male from the lMales collection', async () => {
            const lMalesCollection = db.collection('lMales');
            await lMalesCollection.deleteOne({
                id: '004'
            })
            const deletedLMale = await lMalesCollection.findOne({
                id: '004'
            });
            expect(deletedLMale).toEqual(null)
        });
});