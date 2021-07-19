const resendEmail = (name, link) => `
    Olá, <strong>${name ? name : ''}</strong><br />

    <p>Clique neste link para verificar seu endereço de e-mail.</p><br />

    <a href="${link}">${link}<a><br />

    <p>Se você não solicitou a verificação deste endereço, ignore este e-mail.<p/><br />

    <strong>Obrigado,<br />

    Equipe do app One</strong>
`;

module.exports = resendEmail;