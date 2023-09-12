import type { PluginResult } from "@metrikube/common";
import type { PluginAdapter, ValidateCredentialsRequest } from "@metrikube/core";

export class ValidateCredentialsUsecase {
    constructor(private readonly pluginAdapter: PluginAdapter) { }

    async execute(payload: ValidateCredentialsRequest): Promise<PluginResult<T>> {
        return this.pluginAdapter.validateCredentials(payload);
    }
}
