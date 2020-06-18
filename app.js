const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();

const app = express();

const homeRouter = require('./routes/home');
const addRouter = require('./routes/add');
const deleteRouter = require('./routes/delete');
const editRouter = require('./routes/edit');
const viewRouter = require('./routes/view');
const listRouter = require('./routes/list');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/', homeRouter);

app.use('/add', addRouter);

app.use('/delete', deleteRouter);

app.use('/club', editRouter);

app.use('/club', viewRouter);

app.use('/list', listRouter);

app.use((req, res) => {
  res.render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
