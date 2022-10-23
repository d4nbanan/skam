require('dotenv').config();
const User = require("../schemas/User");
const isEmailValid = require("../controllers/isEmailValid");
const isPasswordValid = require("../controllers/isPasswordValid");
// const bcrypt = require("bcrypt");
const {generateToken} = require("../controllers/generateTokens");

const login = async (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        if (isEmailValid(email) && isPasswordValid(password)) {
            const candidate = await User.findOne({email: email}).select("+password");
            if (candidate) {
                if(candidate.activated){

                    const isPassEquals = password === candidate.password;
                    if(isPassEquals){

                        const token = await generateToken({email: candidate.email, id: candidate._id, activated: candidate.activated, role: candidate.role});

                        // await saveToken(candidate._id, tokens.refreshToken);

                        // res.cookie('refreshToken', tokens.refreshToken, {maxAge: 2592000000, httpOnly: true}); //30 days Добавить флаг secure (https)
                        res.status(200).json({
                            token: token,
                            email: candidate.email, 
                            id: candidate._id, 
                            activated: candidate.activated, 
                            firstName: candidate.firstName, 
                            lastName: candidate.lastName, 
                            patronymic: candidate.patronymic,
                            expires: new Date().getTime() + 2592000000,
                            role: candidate.role
                        });
                    } else {
                        res.status(400).json({
                            message: "Invalid email or password"
                        });
                    }

                } else {
                    res.status(400).json({nonActivated: true});
                }

            } else {
                res.status(400).json({
                    message: "Invalid email or password"
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid email or password"
            });
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = login;