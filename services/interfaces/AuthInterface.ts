export interface AuthInterface {
    GetLogin(loginBody: LoginBody) : Promise<LoginResponse>;
}

export type LoginBody = {
    email: string;
    password: string
}

export type LoginResponse = {
  success: boolean;
  message: string;
  data: string | null;
  errors: string[];
};