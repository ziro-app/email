const { fontTitle } = require("@ziro/theme");

const body = (retailer, supplier, value, status) => {
  const body = `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="color: #222; font-family: ${fontTitle};">
                <h1 style="font-size: 24px; margin: 0;">${
                  retailer ? `Olá, ${retailer}!` : "Olá!"
                }</h1>
            </td>
        </tr>
        <tr>
            <td>
                <div style="color: #222; font-family: ${fontTitle}; font-size: 14px; line-height: 24px; padding: 5px;" >
                Seu pagamento ${
                  supplier ? `na <strong>${supplier}</strong>` : ""
                } ${
    value ? `no valor de <strong>${value}</strong> ` : ""
  }foi finalizado com status: ${
    status === "Aprovado"
      ? `<strong style="color: #4BCA81;">${status}</strong>`
      : `<strong style="color: #EB5757;">${status}</strong>`
  }. Para mais informações basta consultar os detalhes no app
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div style="color: #222; font-family: ${fontTitle}; font-size: 14px; line-height: 24px; padding: 5px;" >
                Abraços, <br />
                Equipe VestiPago
                </div>
            </td>
        </tr>
    </table>`;
  return {
    body,
    title: "Seu pagamento acaba de atualizar o status",
    caption: "Notificação de atualização",
  };
};

module.exports = body;
