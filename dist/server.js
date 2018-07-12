'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _apis = require('./routes/apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.use('/api', _apis2.default);

var PORT = process.env.PORT || 3485;
app.listen(PORT, function () {
    console.log('Server has started on port ' + PORT);
});