export type UserResponseType = {
    name:string;
    email:string;
    token:string;
}

export type SignInInput = Omit<UserResponseType,'token'>

export type SignUpInput = SignInInput & {
    password:string;
}