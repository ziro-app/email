const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporter = nodemailer.createTransport(smtpTransport({
	service: 'gmail',
	auth: {
		user: process.env.USER_EMAIL,
		pass: process.env.USER_PASS
	}
}));

const request = async ({ to, subject, text, html }) => {
	const mailOptions = {
		to,
		subject,
		text,
		html,
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

module.exports = request