const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const resendEmail = require('../models/resendEmail')

const transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_PASS
	}
}));

const htmlParser = (html) => {
	return html.replace(/\<script(.*?)\>(.*?)\<\/script\>/, '');
}

const request = async ({ to, subject, text, html, confirmEmail }) => {
	let mailOptions = {
		to,
		text,
		sender: process.env.USER_EMAIL,
		replyTo: 'vitor@ziromoda.com.br'
	};
	if (confirmEmail) {
		if (confirmEmail.link) {
			mailOptions['from'] = 'verify-email@ziro.app';
			mailOptions['subject'] = 'Verifique seu e-mail';
			mailOptions['html'] = resendEmail(confirmEmail.name, confirmEmail.link);
		} else return {
			statusCode: 400,
			body: JSON.stringify({ error: { msg: 'É necessário enviar link de confirmação.' } }, null, 4)
		}
	} else {
		mailOptions['subject'] = subject;
		mailOptions['text'] = text;
		mailOptions['html'] = htmlParser(html);
	}
	try {
		const result = await transporter.sendMail(mailOptions);
		const response = { accepted: result.accepted, rejected: result.rejected, messageId: result.messageId };
		return {
			statusCode: 200,
			body: JSON.stringify(response, null, 4)
		}
	} catch (error) {
		console.log('Erro: ', error)
		return {
			statusCode: 500,
			body: JSON.stringify({ error: { msg: 'Erro na API de e-mail, tente novamente.' } }, null, 4)
		}
	}
}

module.exports = request