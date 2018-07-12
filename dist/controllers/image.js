'use strict';

var Clarifai = require('clarifai');
var app = new Clarifai.App({
    apiKey: 'aceecbb72eaf453faeb5d4112e960d8c'
});

var handleApiCall = function handleApiCall(req, res) {
    return app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(function (data) {
        return res.json(data);
    }).catch(function (err) {
        res.status(400).json('An error occured when fetch API');
        console.log(err);
    });
};

var increseEntries = function increseEntries(req, res, db) {
    var id = req.body.id;

    db('users').where('id', '=', id).increment('entries', 1).returning('entries').then(function (entries) {
        res.json(entries[0]);
    }).catch(function (err) {
        res.status(400).json('Unable to get entries...');
        console.log(err);
    });
};

module.exports = {
    increseEntries: increseEntries,
    handleApiCall: handleApiCall
};