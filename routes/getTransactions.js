require('dotenv').config();
const User = require("../schemas/User");
const Transaction = require("../schemas/Transaction");

const getTransactions = async (req, res) => {
    try {


        const user = await User.findById(req.user._id).populate({path: 'transactions', options: { sort: { 'createdAt': -1 } } });


        res.status(200).json(user.transactions);
        
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = getTransactions;