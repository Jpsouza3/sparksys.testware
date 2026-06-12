// AuthService.ts
import { HttpClient } from "../core/HttpClient";
import { AuthInterface, LoginBody, LoginResponse } from "./interfaces/AuthInterface";

export class AuthService implements AuthInterface{
  constructor(private httpClient: HttpClient) {}

  async GetLogin(loginBody: LoginBody): Promise<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      "http://localhost:5035/api/Auth/login",
      loginBody
    );
  }
}