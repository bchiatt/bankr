/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var dbConnect = require('../../app/lib/mongodb');
var Mongo     = require('mongodb');
var Transaction = require('../../app/models/transaction');
var cp        = require('child_process');
var db        = 'bankr-test';

describe('Transaction', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      //console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Transaction object', function(){
      var o = {type:'deposit', accountId:'53d01ddf4fbbd6de0b530014', amount:'52.75'};
      var t = new Transaction(o);
      expect(t).to.be.instanceof(Transaction);
      expect(t.type).to.equal('deposit');
      expect(t.accountId).to.be.instanceof(Mongo.ObjectID);
      expect(t.amount).to.equal(52.75);
    });
  });

  describe('.create', function(){
    it('should save a new Transaction object', function(done){
      Transaction.create({'_id':'53d01ddf4fbbd6de0b530037', 'accountId':'53d01ddf4fbbd6de0b530014', 'type':'deposit', 'amount':25.75}, function(err, transaction){
        expect(transaction._id).to.be.instanceof(Mongo.ObjectID);
        expect(transaction).to.be.instanceof(Transaction);
        expect(transaction.accountId).to.be.instanceof(Mongo.ObjectID);
        expect(transaction.type).to.equal('deposit');
        expect(transaction.amount).to.equal(25.75);
        done();
      });
    });
  });

  describe('.findByAccountId', function(){
    it('should find all transactions from Kelly\'s account', function(done){
      Transaction.findByAccountId('53d01ddf4fbbd6de0b530016', function(err, transactions){
        expect(transactions.length).to.equal(5);
        expect(transactions[3].type).to.equal('withdraw');
        expect(transactions[4].amount).to.equal(625);
        done();
      });
    });
  });
});
