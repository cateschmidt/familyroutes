/*const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)


describe('dFemales Endpoints', () => {
    it('should get all dFemales with status 200', async () => { 
        const res = await request(server).get('/dFemales');
        expect(res.status).toBe(200);
    });
});
/*


/*describe('dFemales Endpoints', () => {
    it('should get all dFemales with status 200', async () => {
      const res = await request(app).get('/dFemales');
      expect(res.status).toBe(200);
    });
  
    it('should get a single dFemale with status 200', async () => {
      const res = await request(app).get('/dFemales/648dd1ad472c91115ef9324b'); 
      expect(res.status).toBe(200);
    });
  
    it('should return status 404 if dFemale ID is not found', async () => {
      const res = await request(app).get('/dFemales/4444'); 
      expect(res.status).toBe(404);
    });

});*/


// Write a jest unit test for the dFemales endpoint that tests the following: getAll and getSingle

//imports needed for testing
const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server)

//test for getAll
describe('dFemales Endpoints', () => {
    it('should get all dFemales with status 200', async () => { 
        const res = await request(server).get('/dFemales');
        expect(res.status).toBe(200);
    });
}
);

//test for getSingle
describe('dFemales Endpoints', () => {
    it('should get a single dFemale with status 200', async () => {
      const res = await request(server).get('/dFemales/648dd1ad472c91115ef9324b'); 
      expect(res.status).toBe(200);
    });
}
);

//test for getSingle
describe('dFemales Endpoints', () => {
    it('should return status 404 if dFemale ID is not found', async () => {
      const res = await request(server).get('/dFemales/4444'); 
      expect(res.status).toBe(404);
    });
}
);
/*
//test for post
describe('dFemales Endpoints', () => {
    it('should post a dFemale with status 201', async () => {
      const res = await request(server).post('/dFemales'); 
      expect(res.status).toBe(201);
    });
}
);

//test for delete
describe('dFemales Endpoints', () => {
    it('should delete a dFemale with status 200', async () => {
      const res = await request(server).delete('/dFemales/648dd1ad472c91115ef9324b'); 
      expect(res.status).toBe(200);
    });
}
);

//test for put
describe('dFemales Endpoints', () => {
    it('should put a dFemale with status 200', async () => {
      const res = await request(server).put('/dFemales/648dd1ad472c91115ef9324b'); 
      expect(res.status).toBe(200);
    });
}
);

//test for put
describe('dFemales Endpoints', () => {
    it('should return status 404 if dFemale ID is not found', async () => {
      const res = await request(server).put('/dFemales/4444'); 
      expect(res.status).toBe(404);
    });
}
);

//test for post
describe('dFemales Endpoints', () => {
    it('should return status 400 if dFemale is not found', async () => {
      const res = await request(server).post('/dFemales'); 
      expect(res.status).toBe(400);
    });
}
);

//test for put
describe('dFemales Endpoints', () => {
    it('should return status 400 if dFemale ID is not found', async () => {
      const res = await request(server).put('/dFemales/4444'); 
      expect(res.status).toBe(400);
    });
}
);

//test for put
describe('dFemales Endpoints', () => {
    it('should return status 400 if dFemale ID is not found', async () => {
      const res = await request(server).put('/dFemales/648dd1ad472c91115ef9324b'); 
      expect(res.status).toBe(400);
    });
}
);
*/
 
// why do you keep repeating the same test over and over again?
// I was trying to test for different scenarios, but I guess I did it wrong. I will fix it.

