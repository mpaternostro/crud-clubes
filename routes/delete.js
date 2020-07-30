const express = require('express');
const fs = require('fs');

const helpers = require('../helpers/routes');

const router = express.Router();

router.get(/\/\d+/, (req, res) => {
  const clubs = helpers.getClubs();

  const club = clubs.find(({ id }) => req.path.includes(id.toString()));
  res.render('delete', {
    pageTitle: 'Premier League Editor',
    optionalStylesheet: '<link rel="stylesheet" href="/home.css"><link rel="stylesheet" href="/delete.css">',
    club,
    clubs,
  });
});

router.post(/\/\d+/, (req, res) => {
  const clubs = helpers.getClubs();

  const club = clubs.find(({ id }) => req.path.includes(id.toString()));
  const newClubs = clubs.filter((newClub) => newClub !== club);
  fs.writeFile('data/equipos.db.json', JSON.stringify(newClubs), (err) => {
    if (err) throw err;
  });

  res.redirect('/');
});

module.exports = router;
