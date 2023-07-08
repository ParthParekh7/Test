export interface LocationPatchInput {
  id: string
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

export interface LocationPatchVariables {
  id: string | undefined
  requestBody: LocationPatchInput
  tenant: string
}

export interface LocationPatchResponse {
  locationPatch: {
    resourceID: string
  }
}
