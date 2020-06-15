const express = require('express');
const fs = require('fs');

const multer = require('multer');

const helpers = require('../helpers/routes');

// ESTA BIEN QUE LOS UPLOADS ESTEN EN PUBLIC ?
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

router.use(express.urlencoded({ extended: false }));

router.get(/\/\d+\/edit/, (req, res) => {
  const clubs = helpers.getClubs();

  const club = clubs.find(({ id }) => req.path.includes(id.toString()));
  res.render('edit', {
    pageTitle: club.name,
    optionalStylesheet: '<link rel="stylesheet" href="/club.css">',
    club,
    lastUpdated: new Date(club.lastUpdated),
  });
});

router.post(/\/\d+\/edit/, upload.single('crest-url'), (req, res) => {
  const { id } = req.body;
  const clubs = helpers.getClubs();
  const clubIndex = clubs.findIndex(({ id: clubId }) => clubId.toString() === id);
  const editedClub = helpers.editClub(req.body, req.file, clubs[clubIndex]);
  clubs[clubIndex] = editedClub;

  fs.writeFile('data/equipos.db.json', JSON.stringify(clubs), (err) => {
    if (err) throw err;
  });
  res.redirect('/');
});

module.exports = router;