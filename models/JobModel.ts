export type JobModel = {
    title: string,
    clientName: string,
    description: string,
    machineModel: string,
    address: string
}

export class JobModelBuilder {
    private jobModel: JobModel = {
        title: "Default Title",
        clientName: "Default Client",
        description: "Default Description",
        machineModel: "Default Machine",
        address: "Default Address"
    };

    withTitle(title: string): this {
        this.jobModel.title = title;
        return this;
    }

    withClientName(clientName: string): this {
        this.jobModel.clientName = clientName;
        return this;
    }

    withDescription(description: string): this {
        this.jobModel.description = description;
        return this;
    }

    withMachineModel(machineModel: string): this {
        this.jobModel.machineModel = machineModel;
        return this;
    }

    withAddress(address: string): this {
        this.jobModel.address = address;
        return this;
    }

    build(): JobModel {
        return { ...this.jobModel };
    }
}