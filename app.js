require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const path = require("path");
const authMiddleware = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin');

const jwt = require('jsonwebtoken');

const User = require("./schemas/User");

const registration = require('./routes/registration');
const login = require('./routes/login');
const deposit = require('./routes/deposit');
const withdraw = require('./routes/withdraw');
const confirmTransaction = require('./routes/confirmTransaction');
const getTransactions = require('./routes/getTransactions');
const getAllTransactions = require('./routes/getAllTransactions');
const activate = require('./routes/activate');

app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "*"
}));

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");

        
        app.post('/api/registration', registration);
        app.get('/api/activate/:activationLink', activate);

        app.post('/api/login', (req, res, next) => {console.log(req.cookies); next()}, login);
        // app.post('/api/logout', logout);


        app.post('/api/deposit', authMiddleware, deposit);
        app.post('/api/withdraw', authMiddleware, withdraw);
        app.get('/api/getTransactions', authMiddleware, getTransactions);

        app.get('/api/getUser', authMiddleware, async (req, res) => {
            try {
                const user = await User.findOne({_id: req.user._id}).select('+number');
                res.status(200).json(user);
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        });

        app.post('/api/changeUser', authMiddleware, async (req, res) => {
            try {
                const number = req.body.number;
                const fullName = req.body.fullName;

                const user = req.user;
                user.number = number;
                req.fullName = fullName;
                await user.save();

                res.status(200).json(user);
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        });


        app.post('/api/confirmTransaction', authMiddleware, isAdmin, confirmTransaction);
        app.get('/api/getAllTransactions', authMiddleware, getAllTransactions);



        app.get('/account', async (req, res) => {
            try {
                res.sendFile('account.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        });
        app.get('/deposit', async (req, res) => {
            try {
                res.sendFile('deposit.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        });
        app.get('/withdraw', async (req, res) => {
            try {
                res.sendFile('withdraw.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        });

        app.get('/trade', async (req, res) => {
            try {
                res.sendFile('personal-playground.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(404);
            }
        });

        app.get('/login', async (req, res) => {
            try {
                res.sendFile('enter.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(400);
            }
        });

        app.get('/registration', async (req, res) => {
            try {
                res.sendFile('registration.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(404);
            }
        });

        app.get('/', async (req, res) => {
            try {
                res.sendFile('crypto-pro.html', {root: path.join('./front')});
            } catch (err) {
                console.log(err);
                res.sendStatus(404);
            }
        });
        app.get('/*', async (req, res) => {
            try {
                const filename = req.path;
                res.sendFile(filename, {root: path.join('./front')});
            } catch (e) {
                res.status(404).send("file not found");
            }
        });

        



        app.listen(process.env.PORT || 80, () => console.log("server started"));

    } catch (err) {
        console.log(err);
    }
}

start();