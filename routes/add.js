const express = require('express');
const fs = require('fs');

const multer = require('multer');

const helpers = require('../helpers/routes');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', (req, res) => {
  res.render('edit', {
    pageTitle: 'New Club',
    optionalStylesheet: '<link rel="stylesheet" href="/club.css"><link rel="stylesheet" href="/edit.css">',
  });
});

router.post('/', upload.single('crest-url'), (req, res) => {
  const clubs = helpers.getClubs();
  const club = helpers.newClub(req.body, req.file);
  clubs.push(club);

  fs.writeFile('data/equipos.db.json', JSON.stringify(clubs), (err) => {
    if (err) throw err;
  });
  res.redirect('/');
});

module.exports = router;
