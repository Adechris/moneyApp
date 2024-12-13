// // tests/bank.test.js
// import request from 'supertest';
// import app from '../app';

// describe('Bank Endpoints', () => {
//   let token;

//   beforeAll(async () => {
//     const res = await request(app)
//       .post('/api/auth/login')
//       .send({ username: 'testuser', password: 'testpassword' });
//     token = res.body.token;
//   });

//   it('should generate a bank account', async () => {
//     const res = await request(app)
//       .post('/api/bank/generate')
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('account_number');
//   });

//   it('should get bank account details', async () => {
//     const res = await request(app)
//       .get('/api/bank')
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('account_number');
//   });
// });


import request from 'supertest';
import app from '../app.js';
import db from '../config/db.js';

describe('Bank Endpoints', () => {
  let token;

  beforeAll(async () => {
    await db.migrate.latest();
    await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    token = res.body.token;
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  it('should generate a bank account', async () => {
    const res = await request(app)
      .post('/api/bank/generate')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('account_number');
  });

  it('should get bank account details', async () => {
    const res = await request(app)
      .get('/api/bank')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('account_number');
  });
});

