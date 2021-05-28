const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config();
// coneccion a db
const { dbConnection } = require('./database/config');
dbConnection();

//definicion de rutas
const products = require('./routes/products');
const auth = require('./routes/auth');
const purchase = require('./routes/purchase');
const contact = require('./routes/contact');

//middlewares
const { securedUser } = require('./middlewares/actions/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//use de routes
app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/api/purchase', securedUser, purchase);
app.use('/contact', contact);

console.log('server ok');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //next(createError(404));
  res.sendStatus(404);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err); //queda acentado en el server mediante el logg
  res.sendStatus(500);
});

module.exports = app;
