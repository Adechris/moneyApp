// // tests/auth.test.js
// import request from 'supertest';
// import app from '../app';

// describe('Auth Endpoints', () => {
//   it('should signup a new user', async () => {
//     const res = await request(app)
//       .post('/api/auth/signup')
//       .send({ username: 'testuser', password: 'testpassword' });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty('id');
//   });

//   it('should login a user', async () => {
//     const res = await request(app)
//       .post('/api/auth/login')
//       .send({ username: 'testuser', password: 'testpassword' });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty('token');
//   });
// });


import request from 'supertest';
import app from '../app.js';
import db from '../config/db.js';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login a user', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({ username: 'testuser', password: 'testpassword' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
