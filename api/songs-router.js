const express = require('express');
const Songs = require('./songs-model');

const router = express.Router();

// GET all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Songs.getAll();
    res.status(200).json(songs);
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: 'Failed to retrieve songs' });
  }
});

// GET song by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const song = await Songs.getById(id);
    if (song) {
      res.status(200).json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (err) {
    console.error("Error fetching song by ID:", err);
    res.status(500).json({ message: 'Failed to retrieve song' });
  }
});

// POST a new song
router.post('/', async (req, res) => {
  const newSong = req.body;
  try {
    const createdSong = await Songs.add(newSong);
    res.status(201).json(createdSong);
  } catch (err) {
    console.error("Error creating song:", err);
    res.status(500).json({ message: 'Failed to create song' });
  }
});

// PUT (Update) a song by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updatedSong = await Songs.update(id, changes);
    if (updatedSong) {
      res.status(200).json(updatedSong);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (err) {
    console.error("Error updating song:", err);
    res.status(500).json({ message: 'Failed to update song' });
  }
});

// DELETE a song by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await Songs.remove(id);
    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (err) {
    console.error("Error deleting song:", err);
    res.status(500).json({ message: 'Failed to delete song' });
  }
});

module.exports = router;
