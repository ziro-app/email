const { fontTitle } = require('@ziro/theme');

const mountInfo = ({ seller, onBehalfOfBrand, buyerRazao, cardBrand, cardFirstFour,
    cardLastFour, installments, insurance, charge, datePaid }) => `
    <ul>
        <li>Seguro: ${insurance ? 'Sim' : 'Não'}</li>
        <li>Valor da transação: ${charge}</li>
        <li>Data de pagamento: ${datePaid}</li>
        <li>Estabelecimento: ${seller === 'Ziro' || seller === 'One' ? `One - ${onBehalfOfBrand}` : seller}</li>
        <li>Cliente: ${buyerRazao}</li>
        <li>Bandeira: ${cardBrand}</li>
        <li>Cartão: ${cardFirstFour}...${cardLastFour}</li>
        <li>Nº parcelas: ${installments}</li>
    </ul>
    `;

const outSideMsg = outsideBase => outsideBase ? `
<tr>
<td style="color: #222; font-family: ${fontTitle}; font-size: 16px; line-height: 24px; padding: 20px 0 0 0;">
    <p><strong>** A transação em questão não se encontra na base de dados. Entrar em contato com os Devs.</strong></p>
</td>
</tr>
    ` : '';

const disputedBody = transaction => {
    const { transactionZoopId, initDate, fnDate, outsideBase } = transaction;
    const body = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="color: #222; font-family: ${fontTitle};">
                <h1 style="font-size: 24px; margin: 0;">Atenção!! ⚠️</h1>
            </td>
        </tr>
        <tr>
            <td style="color: #222; font-family: ${fontTitle}; font-size: 16px; line-height: 24px; padding: 20px 0 0 0;">
                <p>A transação de ID <strong>${transactionZoopId}</strong> iniciou o processo de disputa em <strong>${initDate}</strong>. Temos até <strong>${fnDate}</strong> para contactar o cliente e reverter o processo.</p>
            </td>
        </tr>
        <tr>
            <td>
                <div style="color: #222; font-family: ${fontTitle}; font-size: 14px; line-height: 24px; padding: 5px;" >
                    ${mountInfo(transaction)}
                </div>
            </td>
        </tr>
        ${outSideMsg(outsideBase)}
    </table>`;
    return { body, title: 'Disputa aberta', caption: 'Notificação de abertura' };
};

const succeededBody = transaction => {
    const { transactionZoopId } = transaction;
    const body = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="color: #222; font-family: ${fontTitle};">
                <h1 style="font-size: 24px; margin: 0;">Atenção!! ⚠️</h1>
            </td>
        </tr>
        <tr>
            <td style="color: #222; font-family: ${fontTitle}; font-size: 16px; line-height: 24px; padding: 20px 0 0 0;">
                <p>O processo de disputa da transação com ID <strong>${transactionZoopId}</strong> foi encerrado. O Estabelecimento Comercial (EC) foi dado como vencedor.</p>
            </td>
        </tr>
        <tr>
            <td>
                <div style="color: #222; font-family: ${fontTitle}; font-size: 14px; line-height: 24px; padding: 5px;" >
                    ${mountInfo(transaction)}
                </div>
            </td>
        </tr>
    </table>`;
    return { body, title: 'Disputa encerrada', caption: 'Notificação de sucesso' };
};

const chargedBackBody = transaction => {
    const { transactionZoopId } = transaction;
    const body = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="color: #222; font-family: ${fontTitle};">
                <h1 style="font-size: 24px; margin: 0;">Atenção!! ⚠️</h1>
            </td>
        </tr>
        <tr>
            <td style="color: #222; font-family: ${fontTitle}; font-size: 16px; line-height: 24px; padding: 20px 0 0 0;">
                <p>O processo de disputa da transação com ID <strong>${transactionZoopId}</strong> foi encerrado. O cliente/portador do cartão foi dado como vencedor e o valor da transação será estornado.</p>
            </td>
        </tr>
        <tr>
            <td>
                <div style="color: #222; font-family: ${fontTitle}; font-size: 14px; line-height: 24px; padding: 5px;" >
                    ${mountInfo(transaction)}
                </div>
            </td>
        </tr>
    </table>`;
    return { body, title: 'Disputa encerrada', caption: 'Notificação de estorno' };
};

const disputed = transaction => {
    const { disputed, succeeded, charged_back } = transaction;
    if (disputed) return disputedBody(transaction);
    else if (succeeded) return succeededBody(transaction);
    else if (charged_back) return chargedBackBody(transaction);
    else throw { status: 400, msg: 'JSON inválido' };
};

module.exports = disputed;