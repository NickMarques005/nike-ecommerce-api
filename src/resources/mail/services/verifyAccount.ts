import { mailTemplates } from "../../../utils/mail/mailTemplates/templates";
import { sendEmail } from "../../../utils/mail/sendMail";

interface VerifyAccountMailServiceParams {
    email: string;
    otp: string;
    redirectUrl: string;
}

export const verifyAccountMailService = async ({
    email,
    otp,
    redirectUrl
}: VerifyAccountMailServiceParams) => {
    const { subject, html } = mailTemplates.verifyAccount({
        otp,
        redirectUrl,
    });

    await sendEmail({
        to: email,
        subject,
        html,
    });
};