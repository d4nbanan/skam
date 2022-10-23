const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS);
        return userData;
    } catch (err) {
        return null;
    }
}

const validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH);
        return userData;
    } catch (err) {
        return null;
    }
}

module.exports = {validateAccessToken, validateRefreshToken};