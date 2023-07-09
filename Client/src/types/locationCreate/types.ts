export interface LocationWriteInput {
  address: string
  alias: string
  description: string
  name: string
  npi: string
  taxId: string
  tenant: string
  type: string
}

export interface LocationTelecomInput {
  system: string
  value: string
}

export interface LocationCreateResponse {
  locationCreate: {
    resourceID: string
  }
}

export interface CreateLocationVariables {
  requestBody: LocationWriteInput
  tenant: string
}
