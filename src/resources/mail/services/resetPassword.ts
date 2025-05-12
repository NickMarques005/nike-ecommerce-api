
import { mailTemplates } from "../../../utils/mail/mailTemplates/templates";
import { sendEmail } from "../../../utils/mail/sendMail";

interface ResetPasswordMailServiceParams {
    name: string;
    email: string;
    token: string;
}

export const resetPasswordMailService = async ({ name, email, token }: ResetPasswordMailServiceParams) => {
    const { subject, html } = mailTemplates.resetPassword({ name, token });
    await sendEmail({ to: email, subject, html });
};
