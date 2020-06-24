const inviteCollaborator = (name, supplier, link) => `
    Olá, <strong>${name ? name : ''}</strong><br />

    <p>${supplier ? `A empresa <strong>${supplier}</strong>` : 'Uma empresa'} está lhe convidando para fazer parte de seus Colaboradores ! Clique neste link para prosseguir com seu cadastro.</p><br />

    <a href="${link}">${link}<a><br /><br />

    <strong>Obrigado,<br />

    Equipe do app Ziro</strong>
`;

module.exports = inviteCollaborator;