export type LoginBody = {
    email: string;
    password: string
}


export class LoginBodyBuilder {
    loginBody: LoginBody = {email: "default", password: "default"}

    WithEmail(email: string){this.loginBody.email = email}
    WithPassword(password: string){this.loginBody.password = password}

    build(){return this.loginBody}
}

