// Deceased Females jest unit tests
// Used Brother Birch's Jest unit tests as a template: https://github.com/byui-cse/cse341-code-student/blob/L12-class-complete/__tests__/mongo.spec.js

const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();


describe('post', () => {
    let connection;
    let db;
    //Connect to the MongoDB database
    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('familyRoutes')
    });
    afterAll(async () => {
        //Disconnect from the MongoDB database once all tests are complete
        await connection.close()
    })

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
        },
        // delete the mock data
        it('should delete the deceased female from the dFemales collection', async () => {
            const dFemalesCollection = db.collection('dFemales');
            await dFemalesCollection.deleteOne({
                id: '001'
            })
            const deletedDFemale = await dFemalesCollection.findOne({
                id: '001'
            });
            expect(deletedDFemale).toEqual(null)
        }))
})