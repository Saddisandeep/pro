const request = require('supertest');
const app = require('../server');

describe('E2E Flow', () => {
  let studentToken, professorToken, appointmentId;

  it('should register and login users', async () => {
    await request(app).post('/api/auth/register').send({ username: 'studentA1', password: '123', role: 'student' });
    await request(app).post('/api/auth/register').send({ username: 'professorP1', password: '123', role: 'professor' });
    const sRes = await request(app).post('/api/auth/login').send({ username: 'studentA1', password: '123' });
    const pRes = await request(app).post('/api/auth/login').send({ username: 'professorP1', password: '123' });
    studentToken = sRes.body.token;
    professorToken = pRes.body.token;
  });

  it('professor adds availability', async () => {
    await request(app).post('/api/availability').set('Authorization', `Bearer ${professorToken}`)
      .send({ date: '2025-05-01', timeSlots: ['10:00', '11:00'] });
  });

  it('student books appointment', async () => {
    const res = await request(app).post('/api/appointments').set('Authorization', `Bearer ${studentToken}`)
      .send({ professorId: 'professor_id_here', date: '2025-05-01', time: '10:00' });
    appointmentId = res.body._id;
  });

  it('professor cancels appointment', async () => {
    await request(app).delete(`/api/appointments/${appointmentId}`).set('Authorization', `Bearer ${professorToken}`);
  });
});
