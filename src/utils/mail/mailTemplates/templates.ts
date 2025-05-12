import {
    MailBaseParams,
    MailResetPasswordParams,
    MailVerifyAccountParams,
    MailWelcomeUserParams,
    MailPasswordUpdatedParams
} from "../../../types/mail/mailTypes";

const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0];
};

const BLACK = "#000000";
const WHITE = "#ffffff";

const getEmailBaseHTML = ({ mailContent }: MailBaseParams) => `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${WHITE}; padding: 40px 0;">
        <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:${WHITE}; border:1px solid ${BLACK}; border-radius:8px; overflow:hidden;">
            <tr>
                <td align="center" style="background-color:${BLACK}; padding: 30px;">
                <img src="${process.env.SMTP_EMAIL_IMAGE}" alt="Nike Icon" width="60" height="60" style="display:block;" />
                </td>
            </tr>
            <tr>
                <td style="padding: 30px; color: ${BLACK}; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
                ${mailContent}
                </td>
            </tr>
            <tr>
                <td align="center" style="background-color:${BLACK}; padding: 20px; font-size: 12px; color: ${WHITE}; font-family: Arial, sans-serif;">
                &copy; ${new Date().getFullYear()} Clone Nike. Todos os direitos reservados.
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    `;

    const getCTAButton = (url: string, text: string) => `
    <div style="text-align: center; margin: 30px 0;">
        <a href="${url}" target="_blank" style="
        padding: 14px 28px;
        background-color: ${BLACK};
        color: ${WHITE};
        text-decoration: none;
        font-weight: bold;
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
        ">
        ${text}
        </a>
    </div>
    `;

export const mailTemplates = {
    resetPassword: ({ name, token }: MailResetPasswordParams) => {
        const resetLink = `${process.env.CLIENT_URL}/recuperar-senha?token=${token}`;
        return {
            subject: "Redefinir sua senha - Clone Nike",
            html: getEmailBaseHTML({
                mailContent: `
            <h2 style="color:${BLACK};">Olá, ${getFirstName(name)}!</h2>
            <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para continuar:</p>
            ${getCTAButton(resetLink, "Redefinir Senha")}
            <p style="font-size: 0.9em; color: #666;">Se você não solicitou isso, ignore este e-mail.</p>
            `
            })
        };
    },

    verifyAccount: ({ otp, redirectUrl }: MailVerifyAccountParams) => ({
        subject: "Código de verificação - Clone Nike",
        html: getEmailBaseHTML({
            mailContent: `
            <div style="margin-bottom: 24px;">
                <h2 style="color:${BLACK}; margin-bottom: 10px;">Seu código de perfil de membro da Nike</h2>
                <p style="margin: 0;">Seu código de verificação é:</p>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 28px; font-weight: bold; letter-spacing: 2px; padding: 12px 24px; border: 1px dashed ${BLACK}; display: inline-block;">
                ${otp}
                </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
            
            <div style="margin-bottom: 24px;">
                <p style="margin-bottom: 12px;">Para confirmar sua identidade, clique no botão abaixo e insira o código:</p>
                ${getCTAButton(redirectUrl, "Inserir Código OTP")}
            </div>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />

            <p style="font-size: 0.9em; color: #666; margin-top: 20px;">
                Se você não iniciou esse processo, ignore este e-mail.
            </p>
        `
        })
    }),

    welcomeUser: ({ name }: MailWelcomeUserParams) => ({
        subject: "Conta verificada com sucesso - Clone Nike",
        html: getEmailBaseHTML({
            mailContent: `
            <h2 style="color:${BLACK};">Olá, ${getFirstName(name)}!</h2>
            <p>Sua conta foi verificada com sucesso. Aproveite sua experiência com o Clone Nike.</p>
        `
        })
    }),

    passwordUpdated: ({ name }: MailPasswordUpdatedParams) => ({
        subject: "Senha atualizada - Clone Nike",
        html: getEmailBaseHTML({
            mailContent: `
            <h2 style="color:${BLACK};">Olá, ${getFirstName(name)}!</h2>
            <p>Sua senha foi alterada com sucesso.</p>
            <p>Se você não realizou essa alteração, entre em contato imediatamente conosco.</p>
        `
        })
    })
};