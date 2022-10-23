require('dotenv').config();
const User = require("../schemas/User");

const activate = async (req, res) => {
    const activationLink = req.params.activationLink;

    try {
        const user = await User.findOne({activationLink});

        if(user){
            user.activated = true;
            await user.save();
            res.redirect(process.env.API_URL);
        } else {
            res.status(400).json({message: "User not found"})
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = activate;