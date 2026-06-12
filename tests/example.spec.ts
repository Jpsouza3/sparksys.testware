import { test, expect } from "./baseTest";
import { AuthService } from "../services/AuthService";
import { JobService } from "../services/JobService";

test("deve realizar login e usar o cliente autenticado", async ({ apiClient }) => {
  const authService = new AuthService(apiClient);
  const jobService = new JobService(apiClient);

  var response = await jobService.GetJob("b2a57058-1674-47d0-9a70-9cd3925296fe");

  console.log(response);
});