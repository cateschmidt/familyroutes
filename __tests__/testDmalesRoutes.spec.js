// Deceased Males jest unit tests
// Used Brother Birch's Jest unit tests as a template: https://github.com/byui-cse/cse341-code-student/blob/L12-class-complete/__tests__/mongo.spec.js

const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

// Connect and disconnect from the MongoDB database
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

    // Test the POST route for dMales
    it('should post a new deceased male into the dMales collection', async () => {
            const dMalesCollection = db.collection('dMales');

            const mockDmale = {
                id: "002",
                firstName: "Yondu",
                lastName: "Udonta",
                birthYear: "2990",
                birthLocation: "Centauri IV, Earth-691",
                deathYear: "3177",
                deathLocation: "Centauri IV, Earth-691"
            };

            await dMalesCollection.insertOne(mockDmale)

            const postedDmale = await dMalesCollection.findOne({
                id: '002'
            });

            expect(postedDmale).toEqual(mockDmale)
        },

        // Test the GET route for dMales


        //Test the PUT route for dMales



        // Test the DELETE route for dMales (delete the mock data)
        it('should delete the deceased male from the dMales collection', async () => {
            const dMalesCollection = db.collection('dMales');
            await dMalesCollection.deleteOne({
                id: '002'
            })
            const deletedDMale = await dMalesCollection.findOne({
                id: '002'
            });
            expect(deletedDMale).toEqual(null)
        }))
})