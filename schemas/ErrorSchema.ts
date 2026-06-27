export const ErrorSchema: any = {
  type: "object",
  anyOf: [
    {
      properties: {
        success: { type: "boolean", const: false },
        message: { type: "string" },
        data: { type: "null", nullable: true },
        errors: {
          type: "array",
          items: { type: "string" }
        }
      },
      required: ["success", "message", "data", "errors"],
      additionalProperties: false
    },
    {
      properties: {
        type: { type: "string" },
        title: { type: "string" },
        status: { type: "integer" },
        traceId: { type: "string" },
        errors: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: { type: "string" }
          }
        }
      },
      required: ["errors"],
      additionalProperties: true
    }
  ]
};
