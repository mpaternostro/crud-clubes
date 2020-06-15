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

  // TODAVIA FALTA:
  // 1) IMPLEMENTAR PARA PODER AGREGAR UN EQUIPO
  // 2) IMPLEMENTAR PARA PODER AGREGAR/CAMBIAR UN ESCUDITO AL EQUIPO (falta acomodar)
  // 3) MOSTRAR UN LISTADO GENERAL CON TODA LA DATA (PUEDE SER UN BOTON EN EL NAVIGATOR QUE DIGA "TEAM LIST")
  // 4) HACER RETOQUES ESTILO, DARLE USO A LOS COLORES DEL OBJETO DEL EQUIPO Y FONDOS SEGUN ESOS COLORES
  // 5) VER LO DE POSTMAN
});

module.exports = router;
