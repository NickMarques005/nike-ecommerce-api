import * as Brevo from '@getbrevo/brevo';
import { SendEmailParams } from '../../types/mail/mailTypes';

/** 
 * 
*/

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {

    const apiKey = process.env.BREVO_API_KEY!;

    console.log("Brevo Api Key: ", apiKey);

    const apiInstance = new Brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(0, apiKey);
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: "Clone Nike", email: process.env.BREVO_SMTP_USER! };
    sendSmtpEmail.to = [{ email: to }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("E-mail enviado com sucesso:", data.body.messageId || data);
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        throw new Error("Falha no envio do e-mail.");
    }
};