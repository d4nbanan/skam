require('dotenv').config();
const User = require("../schemas/User");
// const Token = require('../schemas/TokenSchema');
const isEmailValid = require("../controllers/isEmailValid");
const bcrypt = require("bcrypt");
const {generateToken} = require("../controllers/generateTokens");

const logout = async (req, res) => {
    try {
        // const {refreshToken} = req.cookies;
        // console.log(refreshToken)
        const token = Token.deleteOne({refreshToken});

        // res.clearCookie('refreshToken');
        res.status(200).send("ok");
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = logout;