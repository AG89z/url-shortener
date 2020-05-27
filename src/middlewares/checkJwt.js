const config = require('../config')

const jwt = require('express-jwt');

module.exports = jwt({secret: config.JWT_SECRET})