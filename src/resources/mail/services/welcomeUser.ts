
import { mailTemplates } from "../../../utils/mail/mailTemplates/templates";
import { sendEmail } from "../../../utils/mail/sendMail";

interface WelcomeUserMailServiceParams {
    name: string;
    email: string;
}

export const welcomeUserMailService = async ({ name, email }: WelcomeUserMailServiceParams) => {
    const { subject, html } = mailTemplates.welcomeUser({ name });
    await sendEmail({ to: email, subject, html });
};
