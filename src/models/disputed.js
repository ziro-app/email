const { fontTitle } = require('@ziro/theme');

const disputed = transaction => {
    const {
        seller,
        onBehalfOfBrand,
        buyerRazao,
        cardBrand,
        cardFirstFour,
        cardLastFour,
        transactionZoopId,
        installments,
        insurance,
        charge,
        datePaid,
        initDate,
        fnDate
    } = transaction;
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
                    <ul>
                        <li>Seguro: ${insurance ? 'Sim' : 'Não'}</li>
                        <li>Valor da transação: ${charge}</li>
                        <li>Data de pagamento: ${datePaid}</li>
                        <li>Estabelecimento: ${seller === 'Ziro' ? `Ziro - ${onBehalfOfBrand}` : seller}</li>
                        <li>Cliente: ${buyerRazao}</li>
                        <li>Bandeira: ${cardBrand}</li>
                        <li>Cartão: ${cardFirstFour}...${cardLastFour}</li>
                        <li>Nº parcelas: ${installments}</li>
                    </ul>
                </div>
            </td>
        </tr>
    </table>
    `;
    return body;
};

module.exports = disputed;