'use strict';

var Mongo = require('mongodb');

function Transfer(o){
  this.ToAccountId = Mongo.ObjectID(o.accountId);
  this.FromAccountId = Mongo.ObjectID(o.accountId);
  this.amount = parseFloat(o.amount);
}

Object.defineProperty(Transfer, 'collection', {
    get: function(){return global.mongodb.collection('transfers');}
});

Transfer.create = function(o, cb){
  var t = new Transaction(o);
  Transaction.collection.save(t, cb);
};

Transfer.findByAccountId = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Transaction.collection.find({accountId:_id}).toArray(cb);
};

module.exports = Transfer;
