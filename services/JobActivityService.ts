import { HttpClient } from "../core/HttpClient";
import { JobActivityModel } from "../models/JobActivityModel";
import { JobActivityInterface, JobActivityResponse } from "./interfaces/JobActivityInterface";

export class JobActivityService implements JobActivityInterface {
  constructor(private httpClient: HttpClient) {}

  GetJob(jobActicityId: string): Promise<JobActivityResponse> {
    return this.httpClient.get(
      `http://localhost:5035/api/JobActivity/${jobActicityId}`
    );
  }

  PostJob(jobActivityModel: JobActivityModel): Promise<JobActivityResponse> {
    return this.httpClient.post(
      `http://localhost:5035/api/JobActivity`,
      jobActivityModel
    );
  }

  PutJob(
    jobActivityModel: JobActivityModel,
    jobActicityId: string
  ): Promise<JobActivityResponse> {
    return this.httpClient.put(
      `http://localhost:5035/api/JobActivity/${jobActicityId}`,
      jobActivityModel
    );
  }

  Delete(jobActicityId: string): Promise<JobActivityResponse> {
    return this.httpClient.delete(
      `http://localhost:5035/api/JobActivity/${jobActicityId}`
    );
  }
}
