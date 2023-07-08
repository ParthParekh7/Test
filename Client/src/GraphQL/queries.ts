import { gql } from '@apollo/client'

export const LOCATION_READ_QUERY = gql`
  query LocationRead($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      id
      resource {
        address
        alias
        description
        id
        managingOrganization
        name
        npi
        partOf
        status
        tag
        taxId
        tenant
        type
        updatedAt
      }
    }
  }
`

export const GET_LOCATIONS = gql`
  query GetLocations(
    $address: String
    $alias: String
    $description: String
    $id: [String]
    $limit: Int
    $managingOrganization: String
    $name: String
    $npi: String
    $order: Order13
    $orderBy: OrderBy12
    $page: Int
    $partOf: String
    $search: String
    $status: String
    $tag: String
    $taxId: String
    $tenant: String!
    $type: String
  ) {
    locationList(
      address: $address
      alias: $alias
      description: $description
      id: $id
      limit: $limit
      managingOrganization: $managingOrganization
      name: $name
      npi: $npi
      order: $order
      orderBy: $orderBy
      page: $page
      partOf: $partOf
      search: $search
      status: $status
      tag: $tag
      taxId: $taxId
      tenant: $tenant
      type: $type
    ) {
      pages
      resources {
        id
        address
        name
        status
        updatedAt
      }
    }
  }
`
