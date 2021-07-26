const changeEmail = (name, newEmail) => `
    Olá, <strong>${name ? name : ""}</strong><br />

    <p>Seu e-mail para fazer login no One App foi alterado para ${newEmail}.</p>

    <strong>Obrigado,<br />

    Equipe One App</strong>
`;

module.exports = changeEmail;
