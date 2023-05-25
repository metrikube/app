import type { GetPlugins } from "../ports/user-side/GetPlugins.port";

export class GetPluginsUsecase implements GetPlugins {

    constructor() {

    }

    async execute(): Promise<{ id: string, name: string }[]> {
        return Promise.resolve([
            {
                id: "test-1",
                name: "AWS"
            },
            {
                id: "test-2",
                name: "Github"
            }
        ])
    }
}