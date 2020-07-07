const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const resendEmail = require('../models/resendEmail')
const inviteCollaborator = require('../models/inviteCollaborator')

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
	return html.replace(/\<script(.*?)\>(.*?)\<\/script\>/, '');
}

const request = async ({ to, subject, text, html, confirmEmail, inviteColaborator }) => {
	let mailOptions = {
		to,
		text,
		sender: process.env.USER_EMAIL,
		replyTo: 'vitor@ziromoda.com.br'
	};
	try {
		if (confirmEmail) {
			if (confirmEmail.link) {
				mailOptions['from'] = process.env.USER_EMAIL;
				mailOptions['subject'] = 'Verifique seu e-mail';
				mailOptions['html'] = resendEmail(confirmEmail.name, confirmEmail.link);
			} else throw { msg: 'Link de confirmação é obrigatório', status: 400 };
		}
		else if (inviteColaborator) {
			if (inviteColaborator.link) {
				mailOptions['from'] = 'acesso.colaboradores@ziro.app';
				mailOptions['subject'] = 'Convite para se tornar um colaborador';
				mailOptions['html'] = inviteCollaborator(inviteColaborator.name, inviteColaborator.supplier, inviteColaborator.link);
			} else throw { msg: 'Link de cadastro é obrigatório', status: 400 };
		}
		else {
			mailOptions['subject'] = subject;
			mailOptions['text'] = text;
			mailOptions['html'] = htmlParser(html);
		}
		const result = await transporter.sendMail(mailOptions);
		const response = { accepted: result.accepted, rejected: result.rejected, messageId: result.messageId };
		return {
			statusCode: 200,
			body: JSON.stringify(response, null, 4)
		}
	} catch (error) {
		console.log('Erro: ', error);
		return {
			statusCode: error.status || 500,
			body: JSON.stringify({ error: { msg: error.msg || 'Erro na API de e-mail, tente novamente.' } }, null, 4)
		}
	}
}

module.exports = request