// AuthService.ts
import { config } from "../core/config/EnvironmentManager";
import { HttpClient } from "../core/HttpClient";
import { AuthInterface, LoginBody, LoginResponse } from "./interfaces/AuthInterface";

export class AuthService implements AuthInterface{
  constructor(private httpClient: HttpClient) {}

  async GetLogin(loginBody: LoginBody): Promise<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${config.baseUrl}/api/Auth/login`,
      loginBody
    );
  }
}