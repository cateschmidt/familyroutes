// Living Females jest unit tests
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
    // Test the POST route for lFemales
    it('should post a new living female into the lFemales collection', async () => {
            const lFemalesCollection = db.collection('lFemales');

            const mockLfemale = {
                id: "003",
                firstName: "Katherine",
                lastName: "Pryde",
                birthYear: "1996",
                birthLocation: "Deerfield, IL"
            };

            await lFemalesCollection.insertOne(mockLfemale)

            const postedLfemale = await lFemalesCollection.findOne({
                id: '003'
            });

            expect(postedLfemale).toEqual(mockLfemale)
        });

        // Test the GET route for lFemales
        it('should retrieve the living female from the lfemales collection', async () => {
            const lFemalesCollection = db.collection('lfemales');

            const retrievedLfemale = await lFemalesCollection.findOne({
              id: '003',
            });

             expect(retrievedLfemale).toBeDefined();
        });


        //Test the PUT route for lFemales



        // Test the DELETE route for lFemales (delete the mock data)
        it('should delete the living female from the lFemales collection', async () => {
            const lFemalesCollection = db.collection('lFemales');
            await lFemalesCollection.deleteOne({
                id: '003'
            })
            const deletedLFemale = await lFemalesCollection.findOne({
                id: '003'
            });
            expect(deletedLFemale).toEqual(null)
        });
});