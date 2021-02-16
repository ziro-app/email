const { fontTitle } = require('@ziro/theme');

const translateMonths = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
};

const formatDate = date => {
    const dia = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
    const mes = translateMonths[date.getMonth()];
    const ano = date.getFullYear();
    return `${dia} de ${mes} de ${ano}`;
};

const htmlEmail = (body, title, caption) => `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html lang="pt-BR">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="Content-Language" content="pt-br" />
        <title>Suporte Ziro App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style type="text/css">
            a[x-apple-data-detectors] {
                color: inherit !important;
            }
        </style>
    </head>

    <body style="margin: 0; padding: 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding: 20px 0 10px 0;">

                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
                        style="border-collapse: collapse; border: 1px solid #cccccc;">
                        <tr>
                            <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailHeader">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- THIS IS THE HEADER OF THE EMAIL -->
                                            <div style="margin-bottom: 20px"></div>
                                            <h2
                                                style="font-family: ${fontTitle}; color: #222; display: inline; text-transform: uppercase; background: linear-gradient(transparent 60%, rgba(255,228,0,0.75) 100%)">
                                                ZIRO</h2>
                                            <h3 style="color: #222; text-transform: uppercase; font-family: ${fontTitle}">${title}</h3>
                                            <p style="color: #222; font-family: ${fontTitle}">${formatDate(new Date())}</p>
                                            <div style="margin-bottom: 20px"></div>
                                            <!-- END HEADER -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="width: 100%">
                            <td align="center" valign="top">
                                <table style="width: 100%" cellpadding="2">
                                    <caption style="font-weight: bold; padding: 20px 0; margin: 0 0 20px; background: #222; color: #fff; text-transform: uppercase; font-family: ${fontTitle}"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>${caption}<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 20px 30px 30px 30px;">
                                ${body}
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#222" style="padding: 30px 30px;"></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>
`;

module.exports = htmlEmail;