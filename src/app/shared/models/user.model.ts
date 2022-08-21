export interface RegisterParams {
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface ResetInitParams {
    email: string;
}

export interface ResetParams {
    token: string;
    password: string;
    passwordRepeat: string;
}