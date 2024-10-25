const request = require('supertest');
const server = require('../server');
const db = require('../db-config');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });
  
  afterAll(async () => {
    await db.destroy();
  });
  
  describe('Songs API', () => {
    it('GET /songs - should return a list of songs', async () => {
      const res = await request(server).get('/songs');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    it('GET /songs/:id - should return a specific song by ID', async () => {
      const res = await request(server).get('/songs/1');
      if (res.status === 200) {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('artist');
      } else {
        expect(res.status).toBe(404);
      }
    });

  it('POST /songs - should create a new song', async () => {
    const newSong = { title: 'Test Song', artist: 'Test Artist', duration: 200 };
    const res = await request(server).post('/songs').send(newSong);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newSong.title);
  });

  it('PUT /songs/:id - should update a song by ID', async () => {
    const changes = { title: 'Updated Title' };
    const res = await request(server).put('/songs/1').send(changes);
    if (res.status === 200) {
      expect(res.body.title).toBe(changes.title);
    } else {
      expect(res.status).toBe(404); // If the ID does not exist
    }
  });

  it('DELETE /songs/:id - should delete a song by ID', async () => {
    const res = await request(server).delete('/songs/1');
    if (res.status === 204) {
      expect(res.status).toBe(204);
    } else {
      expect(res.status).toBe(404); 
    }
  });
});
