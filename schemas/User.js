const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    activated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
    fullName: {type: String, required: false, trim: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, select: false},
    number: {type: String, required: false, select: false},
    role: {type: String, default: "user", enum: ['user', 'admin', 'moderator']},

    transactions: [{type: Schema.Types.ObjectId, ref: 'Transaction'}],
    wallet: {type: Number, default: 0}

    // orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    // basket: [{product: {type: Schema.Types.ObjectId, ref: 'Product'}, amount: {type: Number, default: 1}}]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;