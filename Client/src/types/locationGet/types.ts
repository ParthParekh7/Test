export interface GetLocationsData {
  locationList: {
    pages: number
    resources: {
      id: string
      address: string
      name: string
      status: string
      updatedAt: string
    }[]
  }
}

export interface GetLocationsVariables {
  address?: string
  alias?: string
  description?: string
  id?: string[]
  limit?: number
  managingOrganization?: string
  name?: string
  npi?: string
  order?: Order13
  orderBy?: OrderBy12
  page?: number
  partOf?: string
  search?: string
  status?: string
  tag?: string
  taxId?: string
  tenant: string
  type?: string
}

enum Order13 {
  asc,
  desc
}
enum OrderBy12 {
  created,
  updated
}
