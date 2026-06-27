export type JobActivityModel = {
    jobId: string,
    jobActivityType: number,
    description: string,
}

export class JobActivityModelBuilder {
    private jobActivityModel: JobActivityModel = {
        jobId: "Default Title",
        jobActivityType: 1,
        description: "Default Description",
    };

    withJobId(jobId: string): this {
        this.jobActivityModel.jobId = jobId;
        return this;
    }

    withJobActivityType(jobActivityType: number): this {
        this.jobActivityModel.jobActivityType = jobActivityType;
        return this;
    }

    withDescription(description: string): this {
        this.jobActivityModel.description = description;
        return this;
    }

    build(): JobActivityModel {
        return { ...this.jobActivityModel };
    }
}