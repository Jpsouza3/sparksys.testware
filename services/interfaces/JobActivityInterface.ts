import { JobActivityModel } from "../../models/JobActivityModel";

export interface JobActivityInterface {
    GetJob(jobActicityId: string) : Promise<JobActivityResponse>;

    PostJob(jobActivityModel: JobActivityModel) : Promise<JobActivityResponse>;

    PutJob(jobActivityModel: JobActivityModel, jobActicityId: string) : Promise<JobActivityResponse>;

    Delete(jobActicityId: string) : Promise<JobActivityResponse>
}

export type JobActivityResponse = {
  success: boolean;
  message: string;
  data: CreateResponse | PostResponse | null;
  errors: string[];
};

export type CreateResponse = {
    id: string,
    jobId: string,
    jobActivityType: number,
    description: string,
    created: Date
};

export type PostResponse = {
    id: string,
    title: string,
    clientName: string,
    description: string,
    machineModel: string,
    address: string,
    created: Date,
    updated: Date,
    userId: string,
    companyId: string
}