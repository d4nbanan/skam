require('dotenv').config();
const User = require("../schemas/User");
const Transaction = require("../schemas/Transaction");
const isEmailValid = require("../controllers/isEmailValid");
const isPasswordValid = require("../controllers/isPasswordValid");
// const bcrypt = require("bcrypt");
const {generateToken} = require("../controllers/generateTokens");
const uuid = require("uuid");

const withdraw = async (req, res) => {
    try {
        const amount = Number(req.body.amount);
        const method = req.body.method;
        const address = req.body.address;

        const user = await User.findById(req.user.id);

        if(user.wallet < amount){
            res.status(400).json({message: "Недостаточно средств"});
            return;
        }

        const code = uuid.v4();
        const newTransaction = new Transaction({code, user: user._id, type: "withdraw", amount, method, address});
        await newTransaction.save();

        user.transactions.push(newTransaction);
        await user.save();

        res.status(200).json(newTransaction);

        
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = withdraw;