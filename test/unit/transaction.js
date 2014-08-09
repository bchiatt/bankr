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
      console.log(stdout, stderr);
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
});
