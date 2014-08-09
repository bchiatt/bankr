'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override');
var home = require('../controllers/home');
var accounts = require('../controllers/accounts');
var transactions = require('../controllers/transactions');
var transfers = require('../controllers/transfers');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/faq', home.faq);
  app.get('/contact', home.contact);

  app.get('/accounts/new', accounts.init);
  app.get('/accounts/:id/transaction', transactions.init);
  app.post('/accounts/:id/transaction', transactions.create);
  app.get('/accounts/:id/transfer', transfers.init);
  app.post('/accounts/:id/transfer', transfers.create);
  app.get('/accounts/:id', accounts.show);
  app.post('/accounts', accounts.create);
  app.get('/accounts', accounts.index);

  console.log('Pipeline Configured');
};

