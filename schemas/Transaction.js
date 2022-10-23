const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    type: {type: String, required: true, enum: ["deposit", "withdraw"]},
    amount: {type: Number, required: true},
    done: {type: Boolean, default: false},
    code: {type: String, required: true},
    method: {type: String, required: true},
    description: {type: String},
    address: {type: String}
}, {timestamps: true});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;