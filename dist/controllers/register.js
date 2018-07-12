'use strict';

var handleRegister = function handleRegister(req, res, db, bcrypt) {
    var _req$body = req.body,
        email = _req$body.email,
        name = _req$body.name,
        password = _req$body.password;

    var hash = bcrypt.hashSync(password);

    if (!email || !name || !password) return res.status(400).json('Incorrect form submission...');

    // using transaction to make ture every opertion is working. otherwise it will all failed
    db.transaction(function (trx) {
        trx.insert({
            hash: hash, email: email
        }).into('login').returning('email').then(function (loginEmail) {
            return trx('users').returning('*').insert({
                name: name, email: email,
                joined: new Date()
            }).then(function (user) {
                return res.json(user);
            }).catch(function (err) {
                console.log(err);
                res.status(400).json('Unable to register...');
            });
        }).then(trx.commit).catch(function (err) {
            console.log(err);
            res.status(400).json('Unable to register...');
            trx.rollback(err);
        });
    });
};

module.exports = {
    handleRegister: handleRegister
};