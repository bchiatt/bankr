'use strict';

exports.init = function(req, res){
    res.render('transactions/init');
};

exports.create = function(req, res){
    res.redirect('/accounts/:id');
};
