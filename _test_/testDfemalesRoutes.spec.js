// Deceased Females jest unit tests
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
    // Test the POST route for dFemales
    it('should post a new deceased female into the dFemales collection', async () => {
            const dFemalesCollection = db.collection('dFemales');

            const mockDfemale = {
                id: "001",
                firstName: "Gamora",
                lastName: "Zehoberei",
                birthYear: "1990",
                birthLocation: "Zen-Whoberi, Sector 2813",
                deathYear: "2018",
                deathLocation: "Vormir, Sector 2813",
                children: "No",
            };

            await dFemalesCollection.insertOne(mockDfemale)

            const postedDfemale = await dFemalesCollection.findOne({
                id: '001'
            });

            expect(postedDfemale).toEqual(mockDfemale)
        });

        // Test the GET route for dFemales
        it('should retrieve the deceased female from the dfemales collection', async () => {
            const dfemalesCollection = db.collection('dfemales');
        
            const retrievedDfemale = await dfemalesCollection.findOne({
              id: '003',
            });
        
            expect(retrievedDfemale).toBeDefined();
          });
        


        //Test the PUT route for dFemales



        // Test the DELETE route for dFemales (delete the mock data)
        it('should delete the deceased female from the dFemales collection', async () => {
            const dFemalesCollection = db.collection('dFemales');
            await dFemalesCollection.deleteOne({
                id: '001'
            })
            const deletedDFemale = await dFemalesCollection.findOne({
                id: '001'
            });
            expect(deletedDFemale).toEqual(null)
        });
});
