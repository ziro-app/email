const { primaryColor, fontTitle } = require('@ziro/theme');

// Based in: https://webdesign.tutsplus.com/articles/build-an-html-email-template-from-scratch--webdesign-12770

const htmlEmail = body => `
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
                            <td align="center" bgcolor="${primaryColor}" style="padding: 40px 0 30px 0;">
                                <img src="https://res.cloudinary.com/ziro/image/upload/v1583861558/favicon.png" alt="Ziro Modas©" width="220" height="220" style="display: block;" />
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" style="padding: 20px 30px 30px 30px;">
                                ${body}
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="${primaryColor}" style="padding: 30px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                    style="border-collapse: collapse;">
                                    <tr>
                                        <td style="color: #ffffff; font-family: ${fontTitle}; font-size: 15px;">
                                            <p style="margin: 0;">&reg; Ziro Modas, 2020<br /></p>
                                        </td>
                                        <td align="right">
                                            <table border="0" cellpadding="0" cellspacing="0"
                                                style="border-collapse: collapse;">
                                                <tr>
                                                    <td>
                                                        <a href="https://www.instagram.com/ziromoda/?hl=en">
                                                            <img src="https://cdn4.iconfinder.com/data/icons/social-icons-6/40/instagram-512.png"
                                                                alt="Instagram" width="38" height="38"
                                                                style="display: block;" border="0" />
                                                        </a>
                                                    </td>
                                                    <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>

                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

    </html>
`;

module.exports = htmlEmail;