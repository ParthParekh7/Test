export interface LocationPatchInput {
  id: string
  address: string
  alias: string
  description: string
  name: string
  npi: string
  taxId: string

  type: string
}

export interface LocationTelecomInput {
  system: string
  value: string
}

export interface LocationPatchVariables {
  id: string | undefined
  requestBody: Partial<LocationPatchInput>
  tenant: string
}

export interface LocationPatchResponse {
  locationPatch: {
    resourceID: string
  }
}
