exports.seed = function(knex) {

  return knex('songs').truncate()
    .then(function () {
      return knex('songs').insert([
        { title: 'Song 1', artist: 'Artist 1', duration: 240 },
        { title: 'Song 2', artist: 'Artist 2', duration: 180 },
        { title: 'Song 3', artist: 'Artist 3', duration: 210 },
      ]);
    });
};
