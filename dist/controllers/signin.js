'use strict';

var handleSignin = function handleSignin(db, bcrypt) {
    return function (req, res) {
        var _req$body = req.body,
            email = _req$body.email,
            password = _req$body.password;

        if (!email || !password) return res.status(400).json('Incorrect form submission...');

        return db.select('email', 'hash').from('login').where('email', '=', email).then(function (data) {
            var isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users').where('email', '=', email).then(function (user) {
                    res.json(user[0]);
                }).catch(function (err) {
                    res.status(400).json('Unable to get user...');
                });
            }

            return res.json('Login failed....');
        }).catch(function (err) {
            console.log(err);
            res.json('Login failed....');
        });
    };
};

module.exports = {
    handleSignin: handleSignin
};