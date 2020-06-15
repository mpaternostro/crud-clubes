const express = require('express');

const helpers = require('../helpers/routes');

const router = express.Router();

router.get('/', (req, res) => {
  const clubs = helpers.getClubs();

  res.render('home', {
    pageTitle: 'Premier League Editor',
    optionalStylesheet: '<link rel="stylesheet" href="/home.css">',
    clubs,
  });
});

module.exports = router;
