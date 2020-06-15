const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const hello = require('../models/hello')

const transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_PASS
	}
}));

const sendEmail = async (email, title, name, isBcc) => {
	const corpoEmail = hello(name);

	const mailOptions = {
		to: isBcc ? [] : email,
		bcc: isBcc ? email : [],
		subject: title,
		html: corpoEmail,
		replyTo: process.env.USER_EMAIL
	};
	try {
		const result = await transporter.sendMail(mailOptions);
		console.log(result)
		return true;
	} catch (error) {
		console.log(error)
		return false;
	}
}

const request = async ({ to, bcc, subject, html, customEmail, destinatarios }) => {
	if (customEmail) {
		const receipts = [...to, ...bcc]
		if (receipts.length !== destinatarios.length) return { statusCode: 400, body: JSON.stringify('Número de destinatários diferente do número de e-mails', null, 4) }
		const accepted = []
		const rejected = []
		const len = receipts.length
		for (let index = 0; index < len; index++) {
			let res = await sendEmail(receipts[index], subject, destinatarios[index], bcc.includes(receipts[index]));
			if (res) accepted.push(receipts[index]);
			else rejected.push(receipts[index]);

		}
		const response = { accepted, rejected };
		return {
			statusCode: 200,
			body: JSON.stringify(response, null, 4)
		}
	} else {

		const mailOptions = {
			to: to,
			bcc: bcc,
			subject: subject,
			html: html,
			replyTo: process.env.USER_EMAIL
		};
		try {
			const result = await transporter.sendMail(mailOptions);
			const response = { accepted: result.accepted, rejected: result.rejected, messageId: result.messageId };
			console.log(result)
			return {
				statusCode: 200,
				body: JSON.stringify(response, null, 4)
			}
		} catch (error) {
			console.log('Unexpected error: ', error)
			return {
				statusCode: 500,
				body: JSON.stringify('Internal error. Check logs', null, 4)
			}
		}
	}
}

module.exports = request