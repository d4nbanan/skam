const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({

    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    },
    tls: {
        ciphers :'SSLv3'
    }

    // service: "Outlook365",
    // host: "smtp.office365.com",
    // port: "587",
    // tls: {
    //     ciphers: "SSLv3",
    //     rejectUnauthorized: false,
    // },
    // auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD
    // },

    // service: "Outlook365",




    // host: "smtp.beget.com",
    // port: "25",
    // tls: {
    //     ciphers: "SSLv3",
    //     rejectUnauthorized: false,
    // },
    // auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD
    // }
    
})

const sendOrder = (to, order) => {
    const options = {
        from: process.env.SMTP_USER,
        to: to,
        subject: 'Оформление заказа на web-студии OOJ',
        // text: "Спасибо за регистрацию! Ваша ссылка для активации аккаунта: " + link,
        // text: '',
        html: `
            <div>
                <h1>Спасибо за ваш заказ в нашей веб-студии</h1>
                <h3>Для завершения регистрации перейдите по ссылке</h3>
                ${order.title}
            </div>
        `
    }

    transporter.sendMail(options, function (err, info) {});
}

const sendPost = (to, link, title) => {
    const options = {
        from: process.env.SMTP_USER,
        to: to,
        subject: 'Новая публикация web-студии OOJ',
        text: '',
        html: `
            <div>
                <h1>В нашем блоге новая интересная публикация</h1>
                <h3>${title}</h3> <br>
                <a href="${link}">${link}</a>
            </div>
        `
    }

    transporter.sendMail(options, function (err, info) {
        if(err) {
            console.log(err)
            return;
        }

        console.log(info.response);
    });
}

const sendConfirmation = (to, link) => {
    const options = {
        from: process.env.SMTP_USER,
        to: to,
        subject: `Активация аккаунта на ${process.env.API_URL}`,
        text: '',
        html: `
            <div>
                <h1>Спасибо за регистрацию!</h1>
                <h3>Для завершения регистрации перейдите по ссылке</h3>
                <a href="${link}">${link}</a>
            </div>
        `
    }

    transporter.sendMail(options, function (err, info) {
        if(err) {
            console.log(err)
            return;
        }

        console.log(info.response);
    });
}



module.exports = {sendConfirmation, sendPost};