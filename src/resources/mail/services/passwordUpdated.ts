
import { mailTemplates } from "../../../utils/mail/mailTemplates/templates";
import { sendEmail } from "../../../utils/mail/sendMail";

interface PasswordUpdatedMailServiceParams {
    name: string;
    email: string;
}

export const passwordUpdatedMailService = async ({ name, email }: PasswordUpdatedMailServiceParams) => {
    const { subject, html } = mailTemplates.passwordUpdated({ name });
    await sendEmail({ to: email, subject, html });
};
