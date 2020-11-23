const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const hello = require('../models/hello')

const transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.HOST_EMAIL,
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
}));

const htmlParser = (html) => {
    return html.replace(/\<script(.*?)\>(.*?)\<\/script\>/g, '');
}

const sendEmail = async (email, subject, text, html, name) => {
    const corpoEmail = hello(name);

    const mailOptions = {
        to: email,
        subject,
        text,
        html: corpoEmail,
        replyTo: process.env.USER_EMAIL
    };
    return await transporter.sendMail(mailOptions);
}

const multipleRequest = async ({ to, subject, text, html, destinatarios }) => {
    if (to.length !== destinatarios.length) return { statusCode: 400, body: JSON.stringify('Número de destinatários diferente do número de e-mails', null, 4) }
    const promises = to.map(async (email, index) => await sendEmail(email, subject, text, html, destinatarios[index]));
    try {
        const result = await Promise.all(promises);
        const accepted = [];
        const rejected = [];
        result.map(res => {
            accepted.push(...res['accepted']);
            rejected.push(...res['rejected']);
        });
        console.log(result);
        return {
            statusCode: 200,
            body: JSON.stringify({ accepted, rejected }, null, 4)
        }
    } catch (error) {
        console.log('Unexpected error: ', error)
        return {
            statusCode: 500,
            body: JSON.stringify('Internal error. Check logs', null, 4)
        }
    }
}

module.exports = multipleRequest