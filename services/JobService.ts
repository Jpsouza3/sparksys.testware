import { config } from "../core/config/EnvironmentManager";
import { HttpClient } from "../core/HttpClient";
import { JobModel } from "../models/JobModel";
import { JobInterface, JobResponse } from "./interfaces/JobInterface";

export class JobService implements JobInterface {
  constructor(private httpClient: HttpClient) {}



    GetJob(jobId: string): Promise<JobResponse> {
        return this.httpClient.get(
            `${config.baseUrl}/api/Job/${jobId}`
        )
    }

    PostJob(jobModel: JobModel): Promise<JobResponse> {
        return this.httpClient.post(
            `${config.baseUrl}/api/Job`,
            jobModel
        )
    }

    PutJob(jobModel: JobModel, jobId: string): Promise<JobResponse> {
        return this.httpClient.put(
            `${config.baseUrl}/api/Job/${jobId}`,
            jobModel
        )
    }
    
    Delete(jobId: string): Promise<JobResponse> {
        return this.httpClient.delete(
            `${config.baseUrl}/api/Job/${jobId}`
        )
    }
    
}