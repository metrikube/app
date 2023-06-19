export interface GetPlugins {
    execute: () => Promise<{ id: string, name: string }[]>
}