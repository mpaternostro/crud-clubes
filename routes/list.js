const express = require('express');

const helpers = require('../helpers/routes');

const router = express.Router();

router.get('/', (req, res) => {
  const clubs = helpers.getClubs();
  res.render('list', {
    clubs,
    optionalStylesheet: '<link rel="stylesheet" href="/list.css">',
  });
});

module.exports = router;
