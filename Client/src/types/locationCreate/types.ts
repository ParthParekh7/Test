export interface LocationWriteInput {
  address?: string
  alias?: string
  description?: string
  id?: string
  managingOrganization?: string
  name: string
  npi?: string
  partOf?: string
  status?: string
  tag?: string
  taxId?: string
  telecom?: LocationTelecomInput[]
  tenant: string
  type?: string
  updatedAt?: number
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
