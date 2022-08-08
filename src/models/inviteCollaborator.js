const inviteCollaborator = (name, supplier, link) => `
    Olá, <strong>${name ? name : ""}</strong><br />

    <p>Você foi autorizado a acessar nosso app como Vendedor${
      supplier ? ` na empresa <strong>${supplier}</strong>` : ""
    }. Clique neste link para prosseguir com seu cadastro.</p><br />

    <a href="${link}">${link}<a><br /><br />

    Obrigado,<br />

    Equipe VestiPago
`;

module.exports = inviteCollaborator;
