const changeEmail = (name, newEmail, link) => `
    Olá, <strong>${name ? name : ''}</strong><br />

    <p>Seu e-mail para fazer login no app da One foi alterado para ${newEmail}.</p>

    ${link ? `<p>Se você não solicitou a alteração do seu e-mail de login, clique neste link para redefini-lo.<p/>
    
    <a href="${link}">${link}<a><br /><br />` : ''}

    <strong>Obrigado,<br />

    Equipe do app One</strong>
`;

module.exports = changeEmail;