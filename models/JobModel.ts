export type JobModel = {
    title: string,
    clientName: string,
    description: string,
    machineModel: string,
    address: string
}

export class JobModelBuilder {
    private jobModel: JobModel = {title: "Jane Doe", clientName: "Jane Doe", description: "Lorem Ipsum", machineModel: "Daikin 3000", address: "912 Lourie Park, Salvatoremouth, UT 15326-1064"}

    WithTitle(
            title: string
        )
    {
        this.jobModel.title = title
    }
    WithClientName(clientName: string){this.jobModel.clientName = clientName}
    WithDescription(description: string){this.jobModel.description = description}
    WithMachineModel(machineModel: string){this.jobModel.machineModel = machineModel}
    WithAddress(address: string){this.jobModel.address = address}
    build() {return this.jobModel}

}