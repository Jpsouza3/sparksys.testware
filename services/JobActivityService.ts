import { config } from "../core/config/EnvironmentManager";
import { HttpClient } from "../core/HttpClient";
import { JobActivityModel } from "../models/JobActivityModel";
import { JobActivityInterface, JobActivityResponse } from "./interfaces/JobActivityInterface";

export class JobActivityService implements JobActivityInterface {
  constructor(private httpClient: HttpClient) {}

  GetJob(jobActicityId: string): Promise<JobActivityResponse> {
    return this.httpClient.get(
      `${config.baseUrl}/api/JobActivity/${jobActicityId}`
    );
  }

  PostJob(jobActivityModel: JobActivityModel): Promise<JobActivityResponse> {
    return this.httpClient.post(
      `${config.baseUrl}/api/JobActivity`,
      jobActivityModel
    );
  }

  PutJob(
    jobActivityModel: JobActivityModel,
    jobActicityId: string
  ): Promise<JobActivityResponse> {
    return this.httpClient.put(
      `${config.baseUrl}/api/JobActivity/${jobActicityId}`,
      jobActivityModel
    );
  }

  Delete(jobActicityId: string): Promise<JobActivityResponse> {
    return this.httpClient.delete(
      `${config.baseUrl}/api/JobActivity/${jobActicityId}`
    );
  }
}
