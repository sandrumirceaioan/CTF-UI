import { FormControl } from "@angular/forms";

export interface LoginForm {
    email: FormControl<string | null>;
    password?: FormControl<string | null>;
    remember?: FormControl<boolean | null>;
}

export interface ResetInitForm {
    email: FormControl<string | null>;
}

export interface ResetForm {
    token?: FormControl<string | null>;
    password: FormControl<string | null>;
    passwordRepeat: FormControl<string | null>;
}

export interface RegisterForm {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    birthDate: FormControl<string | null>;
    gender: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    passwordRepeat: FormControl<string | null>;
}

export interface CategoryForm {
    url: FormControl<string | null>;
    name: FormControl<string | null>;
    summary: FormControl<string | null>;
    description: FormControl<string | null>;
    thumbnail?: FormControl<File | null>;
    banner?: FormControl<string | null>;
    parent?: FormControl<string | null>;
    parentName?: FormControl<string | null>;
    status?: FormControl<boolean | null>;
}