'use strict';

var getProfile = function getProfile(req, res, db) {
    var id = req.params.id;


    db.select('*').from('users').where({ id: id }).then(function (user) {
        if (user.length == 0) return res.json('User not found...');
        return res.json(user[0]);
    }).catch(function (err) {
        return console.log('An error occured when getting user', err);
    });
};

module.exports = {
    getProfile: getProfile
};