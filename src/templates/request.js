const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const resendEmail = require('../models/resendEmail')
const inviteCollaborator = require('../models/inviteCollaborator')
const disputedBody = require('../models/disputed')
const main = require('../models/main')

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

const request = async ({ to, subject, text, html, confirmEmail, inviteColaborator, disputed }) => {
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
		else if (disputed) {
			if (disputed.transaction) {
				const body = disputedBody(disputed.transaction);
				mailOptions['from'] = process.env.USER_EMAIL;
				mailOptions['subject'] = 'Notificação de disputa ⚠️';
				mailOptions['html'] = main(body);
			} else throw { msg: 'Transação é obrigatória', status: 400 };
		}
		else {
			let parsedHtml = html;
			mailOptions['subject'] = subject;
			mailOptions['text'] = text;
			while (parsedHtml.includes('script')) {
				parsedHtml = htmlParser(parsedHtml);
			}
			mailOptions['html'] = parsedHtml;
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