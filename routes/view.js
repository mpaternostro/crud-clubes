const express = require('express');

const { GOOGLEMAPS_KEY: googleMapsKey } = process.env;

const helpers = require('../helpers/routes');

const router = express.Router();

router.get(/\/\d+/, (req, res) => {
  const clubs = helpers.getClubs();

  const club = clubs.find(({ id }) => req.path.includes(id.toString()));
  res.render('view', {
    pageTitle: club.name,
    optionalStylesheet: '<link rel="stylesheet" href="/club.css"><link rel="stylesheet" href="/view.css">',
    club,
    googleMapsKey,
    lastUpdated: new Date(club.lastUpdated),
  });
});

module.exports = router;
