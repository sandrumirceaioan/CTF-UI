export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    role: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

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
    remember?: boolean;
}

export interface ResetInitParams {
    email: string;
}

export interface ResetParams {
    token: string;
    password: string;
    passwordRepeat: string;
}

export interface LoginResponse {
    user: User,
    tokens: {
        access_token: string;
        refresh_token: string;
    }
}