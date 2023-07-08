export interface Location {
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

export interface LocationReadData {
  locationRead: {
    id: string
    resource: Location
  }
}

export interface LocationReadVariables {
  locationReadId: string
  tenant: string
}
