'use strict';

exports.init = function(req, res){
    res.render('accounts/init');
};

exports.create = function(req, res){
    res.redirect('/accounts');
};

exports.index = function(req, res){
    res.render('accounts/index');
};

exports.show = function(req, res){
    res.render('accounts/show');
};
