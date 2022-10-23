require('dotenv').config();
const isEmailValid = require("../controllers/isEmailValid");
const User = require("../schemas/User");
// const Subscription = require("../schemas/SubscriptionSchema");
const isPasswordValid = require("../controllers/isPasswordValid");
const uuid = require("uuid");
const {sendConfirmation} = require("../controllers/sendConfirmation");
const {generateToken} = require("../controllers/generateTokens");

const registration = async (req, res) => {
    try {

        const email = req.body.email.trim();
        const password = req.body.password.trim();
        const fullName = req.body.fullName.trim();
        const number = req.body.number.trim();

        if (isEmailValid(email)) {
            const candidate = await User.findOne({email: email})
            if (candidate) {
                res.status(409).json({
                    message: "already reg"
                });
            } else {
                if (isPasswordValid(password)) {
                    const activationLink = uuid.v4();

                    //create user and sending confirmation link to user's email
                    const user = await User.create({email: email, password: password, activationLink: activationLink, fullName: fullName, number: number});
                    sendConfirmation(email, process.env.API_URL + 'api/activate/' + activationLink);

                    //generate tokens
                    const token = await generateToken({email: user.email, id: user._id, activated: user.activated});

                    // await saveToken(user._id, tokens.refreshToken, {maxAge: 2592000000, httpOnly: true}); //30 days Добавить флаг secure (https)

                    // res.cookie('refreshToken', tokens.refreshToken);
                    // res.status(200).json({...tokens, email: user.email, id: user._id, activated: user.activated});

                    res.status(200).json({token: token, email: user.email, id: user._id, activated: user.activated});

                } else {
                    res.status(400).json({
                        message: "invalid Password"
                    });
                }
            }
        } else {
            res.status(400).json({
                message: "invalid Email"
            });
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = registration;