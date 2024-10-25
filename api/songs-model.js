const db = require('../db-config'); 

// Get all songs
function getAll() {
  return db('songs');
}

// Get a single song by ID
function getById(id) {
  return db('songs').where({ id }).first();
}

// Add a new song
function add(song) {
  return db('songs')
    .insert(song)
    .then(([id]) => getById(id)); // Return the newly created song
}

// Update a song by ID
function update(id, changes) {
  return db('songs')
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? getById(id) : null)); // Return the updated song
}

// Delete a song by ID
function remove(id) {
  return db('songs')
    .where({ id })
    .del();
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
