import React, { useEffect, useState } from 'react'
import { useMutation, NetworkStatus, useLazyQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import {
  CreateLocationVariables,
  LocationCreateResponse
} from '../../types/locationCreate/types'
import { tenant } from '../../App'
import { Location } from '../../types/locationRead/types'
import { GET_LOCATIONS } from '../../GraphQL/queries'
import { CREATE_LOCATION } from '../../GraphQL/mutation'

const LeftSide: React.FC = () => {
  const [, /*refresh*/ setRefresh] = React.useState(0)
  const [search, setSearch] = React.useState('')
  const navigate = useNavigate()

  const [getLocation, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery(GET_LOCATIONS, { notifyOnNetworkStatusChange: true })
  const [locations, setLocations] = useState<Location[]>([])
  const [
    createLocation,
    { error: errorCreate, data: createData, loading: loadingCreate }
  ] = useMutation<LocationCreateResponse, CreateLocationVariables>(
    CREATE_LOCATION
  )

  useEffect(() => {
    ;(async () => {
      await getLocation({
        variables: {
          tenant: tenant,
          search: search
        }
      })
    })()
  }, [search])

  useEffect(() => {
    if (data) {
      setLocations(data.locationList.resources)
    }
  }, [data])

  const handleCreateLocation = async () => {
    await createLocation({
      variables: {
        requestBody: {
          // Provide the necessary properties for creating a location
          name: 'New Location',
          tenant: tenant
          // Other properties as required
        },
        tenant: tenant
      }
    })
  }

  const handleRefresh = () => {
    refetch({ tenant: tenant, search: '' })
    setRefresh((prev) => prev + 1)
  }

  const handleNavigate = (location: Location) => {
    navigate(location.id, { state: location.name })
  }

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
            onClick={handleCreateLocation}
            className="my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </form>

        {networkStatus === NetworkStatus.refetch && loading && (
          <p className="my-2">Refetching!</p>
        )}
        {loading && networkStatus !== NetworkStatus.refetch && (
          <p>Loading...</p>
        )}
        {!loading && locations.length === 0 && (
          <p className="my-2">No data found</p>
        )}

        {locations.length > 0 &&
          locations.map((location: any) => (
            <div
              key={location.id}
              className="max-w-sm rounded overflow-hidden shadow-lg p-2 cursor-pointer"
              onClick={() => handleNavigate(location)}
            >
              {data.locationList.resources.length === 0 && <p>No data found</p>}

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
