'use strict';

var Mongo = require('mongodb');

function Transaction(o){
  this.type = o.type;
  this.accountId = Mongo.ObjectID(o.accountId);
  this.amount = parseFloat(o.amount);
}

Object.defineProperty(Transaction, 'collection', {
    get: function(){return global.mongodb.collection('transactions');}
});

Transaction.create = function(o, cb){
  var t = new Transaction(o);
  Transaction.collection.save(t, cb);
};

Transaction.all = function(cb){
  Transaction.collection.find().toArray(cb);
};

Transaction.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Transaction.collection.findOne({_id:_id}, cb);
};

module.exports = Transaction;
