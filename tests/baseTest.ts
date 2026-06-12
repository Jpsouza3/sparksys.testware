import { test as base } from "@playwright/test";
import { PlaywrightHttpClient } from "../core/PlaywrightHttpClient";
import { AuthService } from "../services/AuthService";

type MyFixtures = {
  apiClient: PlaywrightHttpClient;
};

export const test = base.extend<MyFixtures>({
  apiClient: async ({ request }, use) => {
    const httpClient = new PlaywrightHttpClient(request);
    const authService = new AuthService(httpClient);

    const response = await authService.GetLogin({
      email: "joao@example.com",
      password: "@Teste1",
    });

    if (response.success && response.data) {
      httpClient.setToken(response.data);
    } else {
      throw new Error(`Failed to login: ${response.message || "Unknown error"}`);
    }

    await use(httpClient);
  },
});

export { expect } from "@playwright/test";
