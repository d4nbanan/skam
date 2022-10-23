require('dotenv').config();
const User = require("../schemas/User");
const Transaction = require("../schemas/Transaction");

const confirmTransaction = async (req, res) => {
    try {
        const code = req.body.code;
        const transaction = await Transaction.findOne({code: code});
        const user = await User.findById(transaction.user);

        if(!transaction.done){
            user.wallet = transaction.type === "deposit" ? user.wallet+transaction.amount : user.wallet-transaction.amount;
            transaction.done = true;
            
            await transaction.save();
            await user.save();
        }

        res.status(200).json(transaction);
        
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "ERROR"});
    }
}

module.exports = confirmTransaction;