const fs = require('fs');

const cloneDeep = require('lodash.clonedeep');

const Club = require('../entities/Club');

const getClubs = () => {
  const clubsBuffer = fs.readFileSync('data/equipos.db.json');
  return JSON.parse(clubsBuffer);
};

const editClub = (body, file, club) => {
  const editedClub = (({
    id, country, name, 'short-name': shortName, tla, address, phone, website,
    email, 'foundation-date': founded, clubColors, venue,
  } = body, { crestUrl } = club) => new Club(id, country, name, shortName, tla, address,
    phone, website, email, founded, clubColors, venue, crestUrl))();

  if (file) editedClub.crestUrl = `/uploads/${file.filename}`;

  return editedClub;
};

const newClub = (body, file) => {
  const clubs = getClubs();
  const editedBody = cloneDeep(body);
  editedBody.id = Number(clubs[clubs.length - 1].id) + 1;
  editedBody.crestUrl = file ? `/uploads/${file.filename}` : 'https://svgsilh.com/svg/42451.svg';

  const club = (({
    id, country, name, 'short-name': shortName, tla, address, phone, website,
    email, 'foundation-date': founded, clubColors, venue, crestUrl,
  } = editedBody) => new Club(id, country, name, shortName, tla, address, phone,
    website, email, founded, clubColors, venue, crestUrl))();

  return club;
};

exports.getClubs = getClubs;
exports.editClub = editClub;
exports.newClub = newClub;
