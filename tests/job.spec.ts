import { test, expect } from "./baseTest";
import { JobService } from "../services/JobService";
import { JobModel, JobModelBuilder } from "../models/JobModel";
import { ContractValidator } from "../core/ContractValidator";
import { JobSchema } from "../schemas/JobSchema";
import { ErrorSchema } from "../schemas/ErrorSchema";

test("Success POST Job", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("Test Client")
    .withDescription("Automation Test Execution")
    .build();

  const createResponse = await jobService.PostJob(job);

  ContractValidator.validate(JobSchema, createResponse.data);

  expect(createResponse.success).toBeTruthy();
  expect(createResponse.data).not.toBeNull();

  if (!createResponse.data) {
    throw new Error("Create response data is null");
  }

  const getResponse = await jobService.GetJob(createResponse.data.id);

  if (!getResponse.data) {
    throw new Error("Create response data is null");
  }
  ContractValidator.validate(JobSchema, getResponse.data);

  expect(getResponse.success).toBeTruthy();
  expect(getResponse.data.id).toBe(createResponse.data.id);
});

test("Assert POST Job Address Field Length", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("Test Client")
    .withDescription("Automation Test Execution")
    .withAddress("a")
    .build();

  const response = await jobService.PostJob(job);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
  expect(response.errors).toContain("Endereço deve ter entre 3  e 50 caracteres");
});

test("Assert POST Job Payload Schema", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);

  const job: JobModel = {
    test: "test field"
  } as any;

  const response = await jobService.PostJob(job);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
});

test("Assert POST Job ClientName Field Length", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("a")
    .withDescription("Automation Test Execution")
    .build();

  const response = await jobService.PostJob(job);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
  expect(response.errors).toContain("Nome do cliente deve ter entre 3 e 50 caracteres");
});

test("Assert POST Job Description Field Length", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("Test Client")
    .withDescription("a")
    .build();

  const response = await jobService.PostJob(job);

  ContractValidator.validate(ErrorSchema, response);

  expect(response.success).toBeFalsy();
  expect(response.errors).toContain("Descrição dever ter entre 3 a 500 caracteres");
});

test("Assert DELETE Job Data Integrity", async ({ apiClient }) => {
  const jobService = new JobService(apiClient);

  const job: JobModel = new JobModelBuilder()
    .withClientName("Test Client")
    .withDescription("Automation Test Execution")
    .build();

  const createResponse = await jobService.PostJob(job);

  ContractValidator.validate(JobSchema, createResponse.data);

  expect(createResponse.success).toBeTruthy();

  if (!createResponse.data) {
    throw new Error("Create response data is null");
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const deleteResponse = await jobService.Delete(createResponse.data.id);

  expect(deleteResponse.success).toBeTruthy();

  const getResponse = await jobService.GetJob(createResponse.data.id);

  ContractValidator.validate(ErrorSchema, getResponse);

  expect(getResponse.success).toBeFalsy();
});