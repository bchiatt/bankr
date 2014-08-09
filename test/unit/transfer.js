/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var dbConnect = require('../../app/lib/mongodb');
var Mongo     = require('mongodb');
var Transfer  = require('../../app/models/transfer');
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
    it('should create a new Transfer object', function(){
      var o = {fromAccountId: '53d01ddf4fbbd6de0b530015', toAccountId:'53d01ddf4fbbd6de0b530014', amount:'110.25'};
      var t = new Transfer(o);
      expect(t).to.be.instanceof(Transfer);
      expect(t.toAccountId).to.be.instanceof(Mongo.ObjectID);
      expect(t.fromAccountId).to.be.instanceof(Mongo.ObjectID);
      expect(t.amount).to.equal(110.25);
    });
  });

  describe('.create', function(){
    it('should save a new Transfer object', function(done){
      Transfer.create({'_id':'53d01ddf4fbbd6de0b530037', 'toAccountId':'53d01ddf4fbbd6de0b530014', 'fromAccountId':'53d01ddf4fbbd6de0b530015', 'amount':25.75}, function(err, transfer){
        expect(transfer._id).to.be.instanceof(Mongo.ObjectID);
        expect(transfer).to.be.instanceof(Transfer);
        expect(transfer.toAccountId).to.be.instanceof(Mongo.ObjectID);
        expect(transfer.fromAccountId).to.be.instanceof(Mongo.ObjectID);
        expect(transfer.amount).to.equal(25.75);
        done();
      });
    });
  });

  describe('.findByAccountId', function(){
    it('should find all transactions from Kelly\'s account', function(done){
      Transfer.findByAccountId('53d01ddf4fbbd6de0b530016', function(err, transfers){
        expect(transfers.length).to.equal(3);
        expect(transfers[2].amount).to.equal(95);
        done();
      });
    });
  });
});
