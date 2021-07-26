const changeEmail = (name, newEmail, link) => `
    Olá, <strong>${name ? name : ""}</strong><br />

    <p>Seu e-mail para fazer login no One App foi alterado para ${newEmail}.</p>

    ${
      link
        ? `<p>Se você não solicitou a alteração do seu e-mail de login, clique neste link para redefini-lo.<p/>
    
    <a href="${link}">${link}<a><br /><br />`
        : ""
    }

    <strong>Obrigado,<br />

    Equipe One App</strong>
`;

module.exports = changeEmail;
