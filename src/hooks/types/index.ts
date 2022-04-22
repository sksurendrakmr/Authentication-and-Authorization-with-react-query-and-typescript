export type User = {
    name:string;
    email:string;
    token?:string;
}

export type SignInInput = Omit<User,'token'>

export type SignUpInput = SignInInput & {
    password:string;
}