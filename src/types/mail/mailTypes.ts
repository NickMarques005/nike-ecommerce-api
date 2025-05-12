export interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export interface MailBaseParams {
    mailContent: string;
}

export interface MailResetPasswordParams {
    name: string;
    token: string;
}

export interface MailVerifyAccountParams {
    otp: string;
    redirectUrl: string;
}

export interface MailWelcomeUserParams {
    name: string;
}

export interface MailPasswordUpdatedParams {
    name: string;
}