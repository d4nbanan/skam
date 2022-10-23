require('dotenv').config();
const User = require("../schemas/User");
const Transaction = require("../schemas/Transaction");

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({'createdAt': -1});

        res.status(200).json(transactions);
        
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = getTransactions;