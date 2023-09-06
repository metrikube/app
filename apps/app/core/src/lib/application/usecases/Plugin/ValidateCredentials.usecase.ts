import { PluginAdapter, ValidateCredentialsRequest } from "@metrikube/core";

export class ValidateCredentialsUsecase {
    constructor(private readonly pluginAdapter: PluginAdapter) { }

    async execute(payload: ValidateCredentialsRequest): Promise<void> {
        return this.pluginAdapter.validateCredentials(payload);
    }
}
