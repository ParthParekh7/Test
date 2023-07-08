import React from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_LOCATIONS = gql`
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

const LeftSide: React.FC = () => {
  const [, /*refresh*/ setRefresh] = React.useState(0)

  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
    variables: {
      tenant: '940e8edf-edd9-401d-a21a-10f866fbdb3f'
    }
  })

  const handleRefresh = () => {
    refetch()
    setRefresh((prev) => prev + 1)
  }

  const handleAdd = () => {}

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <div
        className={
          'md:w-1/3 h-full border-2 border-gray-200 dark:border-gray-700 relative p-3'
        }
      >
        <div className="flex justify-between items-center justify-items-center">
          <button
            type="button"
            onClick={handleRefresh}
            className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
          <div className="">Location</div>
          <button
            type="button"
            onClick={handleAdd}
            className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>

        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {data.locationList.resources.map((location: any) => (
          <div
            key={location.id}
            className="max-w-sm rounded overflow-hidden shadow-lg p-2"
          >
            <div className="flex justify-between">
              <div className="px-2 py-4">
                <div className="font-bold text-xl ">{location.name}</div>
                <div className="">{location.address}</div>
              </div>

              <div className="pt-4 pb-2 rounded">
                <span className="text-black bg-orange-400 p-1 rounded">
                  {location.status}
                </span>
              </div>
            </div>

            {/* Render other fields of the Location type as needed */}
          </div>
        ))}
      </div>
    </>
  )
}

export default LeftSide
