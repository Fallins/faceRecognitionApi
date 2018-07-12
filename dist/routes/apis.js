'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _register = require('../controllers/register');

var _register2 = _interopRequireDefault(_register);

var _signin = require('../controllers/signin');

var _signin2 = _interopRequireDefault(_signin);

var _profile = require('../controllers/profile');

var _profile2 = _interopRequireDefault(_profile);

var _image = require('../controllers/image');

var _image2 = _interopRequireDefault(_image);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// router.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
router.post('/signin', _signin2.default.handleSignin(_db2.default, _bcryptNodejs2.default));

router.post('/register', function (req, res) {
  _register2.default.handleRegister(req, res, _db2.default, _bcryptNodejs2.default);
});

router.get('/profile/:id', function (req, res) {
  _profile2.default.getProfile(req, res, _db2.default);
});

router.put('/image', function (req, res) {
  _image2.default.increseEntries(req, res, _db2.default);
});

router.post('/imageUrl', _image2.default.handleApiCall);

exports.default = router;