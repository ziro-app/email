const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const changeEmailBody = require("../models/changeEmail");
const resendEmail = require("../models/resendEmail");
const inviteCollaborator = require("../models/inviteCollaborator");
const disputedBody = require("../models/disputed");
const main = require("../models/main");
const statusUpdateBody = require("../models/statusUpdate");

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.HOST_EMAIL,
    port: 587,
    secure: false,
    tls: { rejectUnauthorized: true, minVersion: "TLSv1.2" },
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
    pool: true,
  })
);

const htmlParser = (html) => {
  return html.replace(/\<script(.*?)\>(.*?)\<\/script\>/g, "");
};

const request = async ({
  to,
  subject,
  text,
  html,
  confirmEmail,
  inviteColaborator,
  disputed,
  changeEmail,
  statusUpdate,
}) => {
  let mailOptions = {
    to,
    text,
    from: process.env.SENDER_EMAIL,
    sender: process.env.SENDER_EMAIL,
    replyTo: process.env.SENDER_EMAIL,
  };
  try {
    if (confirmEmail) {
      if (confirmEmail.link) {
        mailOptions["subject"] = "Verifique seu e-mail";
        mailOptions["html"] = resendEmail(confirmEmail.name, confirmEmail.link);
      } else throw { msg: "Link de confirmação é obrigatório", status: 400 };
    } else if (inviteColaborator) {
      if (inviteColaborator.link) {
        mailOptions["subject"] = "Convite para se tornar um colaborador";
        mailOptions["html"] = inviteCollaborator(
          inviteColaborator.name,
          inviteColaborator.supplier,
          inviteColaborator.link
        );
      } else throw { msg: "Link de cadastro é obrigatório", status: 400 };
    } else if (disputed) {
      if (disputed.transaction) {
        const { body, title, caption } = disputedBody(disputed.transaction);
        mailOptions["subject"] = "Notificação de disputa ⚠️";
        mailOptions["html"] = main(body, title, caption);
      } else throw { msg: "Transação é obrigatória", status: 400 };
    } else if (changeEmail) {
      if (changeEmail.newEmail) {
        const { name, newEmail } = changeEmail;
        mailOptions["subject"] = "Seu e-mail para login foi alterado";
        mailOptions["html"] = changeEmailBody(name, newEmail);
      } else throw { msg: "Novo email é obrigatório", status: 400 };
    } else if (statusUpdate) {
      if (!statusUpdate?.status)
        throw { msg: "Status da transação é obrigatório", status: 400 };
      const { retailer, supplier, value, status } = statusUpdate;
      mailOptions["subject"] = "Atualização de status";
      const { body, caption, title } = statusUpdateBody(
        retailer,
        supplier,
        value,
        status
      );
      mailOptions["html"] = main(body, title, caption);
    } else {
      let parsedHtml = html;
      mailOptions["subject"] = subject;
      mailOptions["text"] = text;
      while (parsedHtml.includes("script")) {
        parsedHtml = htmlParser(parsedHtml);
      }
      mailOptions["html"] = parsedHtml;
    }
    const result = await transporter.sendMail(mailOptions);
    const response = {
      accepted: result.accepted,
      rejected: result.rejected,
      messageId: result.messageId,
    };
    return {
      statusCode: 200,
      body: JSON.stringify(response, null, 4),
    };
  } catch (error) {
    console.log("Erro: ", error);
    return {
      statusCode: error.status || 500,
      body: JSON.stringify(
        {
          error: {
            msg: error.msg || "Erro na API de e-mail, tente novamente.",
          },
        },
        null,
        4
      ),
    };
  }
};

module.exports = request;
