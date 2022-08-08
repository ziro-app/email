const changeEmail = (name, newEmail) => `
    Olá, <strong>${name ? name : ""}</strong><br />

    <p>Seu e-mail para fazer login no VestiPago foi alterado para ${newEmail}.</p>

    <strong>Obrigado,<br />

    Equipe VestiPago</strong>
`;

module.exports = changeEmail;
