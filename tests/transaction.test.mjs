// // tests/transaction.test.js
// import request from 'supertest';
// import app from '../app';

// describe('Transaction Endpoints', () => {
//   let token;

//   beforeAll(async () => {
//     const res = await request(app)
//       .post('/api/auth/login')
//       .send({ username: 'testuser', password: 'testpassword' });
//     token = res.body.token;
//   });

//   it('should send money', async () => {
//     const res = await request(app)
//       .post('/api/transactions/send')
//       .set('Authorization', `Bearer ${token}`)
//       .send({ amount: 100, recipientAccountNumber: '1234567890' });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('status', 'success');
//   });

//   it('should get transactions', async () => {
//     const res = await request(app)
//       .get('/api/transactions')
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toBeInstanceOf(Array);
//   });
// });


import request from 'supertest';
import app from '../app.js';
import db from '../config/db.js';

describe('Transaction Endpoints', () => {
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

  it('should send money', async () => {
    const res = await request(app)
      .post('/api/transactions/send')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 100,
        recipientAccountNumber: '0690000031',
        recipientAccountName: 'Pastor Bright',
        bankCode: '044',
        bankName: 'Access bank',
        narration: 'Transfer',
        reference: '9967998'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
  });

  it('should get transactions', async () => {
    const res = await request(app)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should deposit money', async () => {
    const res = await request(app)
      .post('/api/transactions/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 1000,
        reference: '9967998'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
  });
});
