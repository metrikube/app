export const providerCategoriesMock = [
    {
        label: "Cloud",
        value: "cloud"
    },
    {
        label: "Database",
        value: "database"
    },
    {
        label: "Versioning",
        value: "versioning"
    }
]

export const AWSProviderMock = {
    id: "15bb7006-9018-495c-bff6-ce36476e1030",
    name: "Amazon web services",
    type: "aws",
    category: "cloud",
    description: "Cloud provider",
    credential: {
        type: "apiKey",
        value: {
            apiKey: ""
        }
    },
    credentialId: "",
    metrics: [],
}

export const githubProviderMock = {
    id: "f5e90849-9c70-433d-9d66-dac20be2c4e7",
    name: "Github",
    type: "github",
    category: "versioning",
    description: "Versioning",
    credential: {
        type: "userPassword",
        value: {
            username: "",
            password: ""
        }
    },
    credentialId: "",
    metrics: [],
}

export const providersMock = [
    { ...AWSProviderMock },
    { ...githubProviderMock }
]
