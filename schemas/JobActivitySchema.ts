import { JSONSchemaType } from "ajv";

export type CreateJobActivityResponse = {
  id: string;
  jobId: string;
  jobActivityType: number;
  description: string;
  created: string;
};

export const JobActivitySchema: JSONSchemaType<CreateJobActivityResponse> = {
  type: "object",
  properties: {
    id: { type: "string" },
    jobId: { type: "string" },
    jobActivityType: { type: "integer" },
    description: { type: "string" },
    created: { type: "string" }
  },
  required: ["id", "jobId", "jobActivityType", "description", "created"],
  additionalProperties: false
};
