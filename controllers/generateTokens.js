require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: "30d"});

    return accessToken;
}

// const saveToken = async (userId, refreshToken) => {
//     const tokenData = await tokenModel.findOne({user: userId});
//     if(tokenData){
//         tokenData.refreshToken = refreshToken;
//         return tokenData.save();
//     }

//     const newToken = await tokenModel.create({refreshToken: refreshToken, user: userId});
//     return newToken;
// }

module.exports = {generateToken};