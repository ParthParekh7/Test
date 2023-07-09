import { ApolloError, NetworkStatus, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { tenant } from '../../App'
import { GET_LOCATIONS } from '../../GraphQL/queries'
import {
  GetLocationsData,
  GetLocationsVariables
} from '../../types/locationGet/types'

export type LeftSideContainer = {
  state: {
    pathname: string
    loading: boolean
    search: string
    locations: GetLocationsData['locationList']['resources']
    data: any
    networkStatus: NetworkStatus
    error: ApolloError | undefined
  }
  actions: {
    handleRefresh: () => void
    setSearch: (value: React.SetStateAction<string>) => void
    handleNavigate: (location: string) => void
  }
}

export const useLeftSideContainer = (): LeftSideContainer => {
  const navigate = useNavigate()
  const [, /*refresh*/ setRefresh] = useState(0)
  const [search, setSearch] = useState('')

  const { pathname } = useLocation()

  const [getLocation, { loading, error, data, refetch, networkStatus }] =
    useLazyQuery<GetLocationsData, GetLocationsVariables>(GET_LOCATIONS, {
      notifyOnNetworkStatusChange: true
    })
  const [locations, setLocations] = useState<
    GetLocationsData['locationList']['resources']
  >([])

  useEffect(() => {
    ;(async () => {
      try {
        await getLocation({
          variables: {
            tenant: tenant,
            search: search
          }
        })
      } catch (error) {
        console.log('Error getting locations :', error)
      }
    })()
  }, [search])

  useEffect(() => {
    if (data) {
      setLocations(data.locationList.resources)
    }
  }, [data])

  const handleRefresh = () => {
    refetch({ tenant: tenant, search: '' })
    setRefresh((prev) => prev + 1)
  }

  const handleNavigate = (location: string) => {
    navigate(location)
  }

  return {
    state: {
      data,
      loading,
      locations,
      networkStatus,
      pathname,
      error,
      search
    },
    actions: {
      handleRefresh,
      setSearch,
      handleNavigate
    }
  }
}
