import { JSONSchemaType } from "ajv";
import { JobModel } from "../models/JobModel";

export const JobSchema: JSONSchemaType<CreateJobResponse> = {
  type: "object",
  properties: {
    id: { type: "string" },
    clientName: { type: "string" },
    description: { type: "string" },
    title: { type: "string" },
    machineModel: { type: "string" },
    address: { type: "string" },
    created: { type: "string"},
    updated: { type: "string"},
    userId: {type : "string"},
    companyId: {type: "string"}
  },
  required: [
    "id",
    "clientName",
    "description",
    "title",
    "machineModel",
    "address",
    "created",
    "updated",
    "userId",
    "companyId"
  ],
  additionalProperties: false
};


export type CreateJobResponse = {
    id: string;
    title: string;
    userId: string;
    companyId: string;
    clientName: string;
    description: string;
    machineModel: string;
    address: string;
    created: string;
    updated: string;
}