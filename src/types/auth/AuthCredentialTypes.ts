export interface SignUpCredentials {
    name: string;
    email: string;
    password: string;
    otp_code: string;
    birth: string;
    cpf?: string;
}

export interface CheckUserBeforeSignInCredentials {
    email: string;
    otp_code: string;
}

export interface SSOCredentials {
    email: string;
    name: string;
    avatar: string;
    uid: string;
}