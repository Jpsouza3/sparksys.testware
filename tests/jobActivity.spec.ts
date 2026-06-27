import { test, expect } from "./baseTest";
import { JobService } from "../services/JobService";
import { JobActivityService } from "../services/JobActivityService";
import { JobModel, JobModelBuilder } from "../models/JobModel";
import { JobActivityModel, JobActivityModelBuilder } from "../models/JobActivityModel";
import { ContractValidator } from "../core/ContractValidator";
import { JobActivitySchema } from "../schemas/JobActivitySchema";
import { ErrorSchema } from "../schemas/ErrorSchema";

test("Success POST JobActivity", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);
  const jobActivityService = new JobActivityService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("Test Client")
    .withDescription("Automation Test Execution")
    .build();

  const createJobResponse = await jobService.PostJob(job);
  expect(createJobResponse.success).toBeTruthy();
  if (!createJobResponse.data) {
    throw new Error("Job creation failed");
  }

  const jobActivity: JobActivityModel = new JobActivityModelBuilder()
    .withJobId(createJobResponse.data.id)
    .withJobActivityType(1)
    .withDescription("Automation Activity Execution")
    .build();

  const createResponse = await jobActivityService.PostJob(jobActivity);

  ContractValidator.validate(JobActivitySchema, createResponse.data);

  expect(createResponse.success).toBeTruthy();
  expect(createResponse.data).not.toBeNull();

  if (!createResponse.data) {
    throw new Error("Create response data is null");
  }

  const getResponse = await jobActivityService.GetJob(createResponse.data.id);

  if (!getResponse.data) {
    throw new Error("Create response data is null");
  }
  ContractValidator.validate(JobActivitySchema, getResponse.data);

  expect(getResponse.success).toBeTruthy();
  expect(getResponse.data.id).toBe(createResponse.data.id);
});

test("Assert POST JobActivity Description Field Length (Too Short)", async ({ apiClient }) => {
  const jobActivityService = new JobActivityService(apiClient);

  const jobActivity: JobActivityModel = new JobActivityModelBuilder()
    .withJobId("00000000-0000-0000-0000-000000000000")
    .withJobActivityType(1)
    .withDescription("a")
    .build();

  const response = await jobActivityService.PostJob(jobActivity);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
  expect(response.errors).toContain("Descrição deve ter entre 3 a 500 caracteres");
});

test("Assert POST JobActivity Description Field Length (Too Long)", async ({ apiClient }) => {
  const jobActivityService = new JobActivityService(apiClient);

  const jobActivity: JobActivityModel = new JobActivityModelBuilder()
    .withJobId("00000000-0000-0000-0000-000000000000")
    .withJobActivityType(1)
    .withDescription("a".repeat(501))
    .build();

  const response = await jobActivityService.PostJob(jobActivity);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
  expect(response.errors).toContain("Descrição deve ter entre 3 a 500 caracteres");
});

test("Assert POST JobActivity Payload Schema", async ({ apiClient }) => {
  const jobActivityService = new JobActivityService(apiClient);

  const jobActivity: JobActivityModel = {} as any;

  const response = await jobActivityService.PostJob(jobActivity);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
});

test("Assert POST JobActivity Invalid JobId Format", async ({ apiClient }) => {
  const jobActivityService = new JobActivityService(apiClient);

  const jobActivity: JobActivityModel = new JobActivityModelBuilder()
    .withJobId("invalid-guid")
    .withJobActivityType(1)
    .withDescription("Valid Description")
    .build();

  const response = await jobActivityService.PostJob(jobActivity);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
});

test("Assert DELETE JobActivity Data Integrity", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);
  const jobActivityService = new JobActivityService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("Test Client")
    .withDescription("Automation Test Execution")
    .build();

  const createJobResponse = await jobService.PostJob(job);
  expect(createJobResponse.success).toBeTruthy();
  if (!createJobResponse.data) {
    throw new Error("Job creation failed");
  }

  const jobActivity: JobActivityModel = new JobActivityModelBuilder()
    .withJobId(createJobResponse.data.id)
    .withJobActivityType(1)
    .withDescription("Automation Activity Execution")
    .build();

  const createResponse = await jobActivityService.PostJob(jobActivity);

  ContractValidator.validate(JobActivitySchema, createResponse.data);

  expect(createResponse.success).toBeTruthy();

  if (!createResponse.data) {
    throw new Error("Create response data is null");
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const deleteResponse = await jobActivityService.Delete(createResponse.data.id);

  expect(deleteResponse.success).toBeTruthy();

  const getResponse = await jobActivityService.GetJob(createResponse.data.id);

  ContractValidator.validate(ErrorSchema, getResponse);

  expect(getResponse.success).toBeFalsy();
});