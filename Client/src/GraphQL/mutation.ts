import { gql } from '@apollo/client'

// LOCATION_PATCH mutation
export const LOCATION_PATCH = gql`
  mutation LocationPatch(
    $id: String!
    $requestBody: LocationPatchInput!
    $tenant: String!
  ) {
    locationPatch(id: $id, requestBody: $requestBody, tenant: $tenant) {
      resourceID
    }
  }
`

export const CREATE_LOCATION = gql`
  mutation CreateLocation($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      resourceID
    }
  }
`

export const LOCATION_REMOVE_MUTATION = gql`
  mutation LocationRemove($locationRemoveId: String!, $tenant: String!) {
    locationRemove(id: $locationRemoveId, tenant: $tenant) {
      resourceID
    }
  }
`
