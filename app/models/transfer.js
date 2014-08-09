'use strict';

var Mongo = require('mongodb');

function Transfer(o){
  this.toAccountId = Mongo.ObjectID(o.toAccountId);
  this.fromAccountId = Mongo.ObjectID(o.fromAccountId);
  this.amount = o.amount * 1;
}

Object.defineProperty(Transfer, 'collection', {
    get: function(){return global.mongodb.collection('transfers');}
});

Transfer.create = function(o, cb){
  var t = new Transfer(o);
  Transfer.collection.save(t, cb);
};

Transfer.findByAccountId = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Transfer.collection.find({$or:[{toAccountId:_id}, {fromAccountId:_id}]}).toArray(cb);
};

module.exports = Transfer;
