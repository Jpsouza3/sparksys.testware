import { JobModel } from "../../models/JobModel";

export interface JobInterface {
    GetJob(jobId: string) : Promise<JobResponse>;

    PostJob(jobModel: JobModel) : Promise<JobResponse>;

    PutJob(jobModel: JobModel, jobId: string) : Promise<JobResponse>;

    Delete(jobId: string) : Promise<JobResponse>
}

export type JobResponse = {
  success: boolean;
  message: string;
  data: CreateResponse | PostResponse | null;
  errors: string[];
};

export type CreateResponse = {
  id: string;
  title: string;
  clientName: string;
  description: string;
  machineModel: string;
  address: string;
  created: string;
  updated: string;
  userId: string;
  companyId: string;
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