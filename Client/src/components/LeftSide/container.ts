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
    currentPage: number
    limit: number
    totalPages: number
  }
  actions: {
    handleRefresh: () => void
    setSearch: (value: React.SetStateAction<string>) => void
    handleNavigate: (location: string) => void
    handlePageChange: (page: number) => void
    setLimit: (limit: number) => void
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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)

  useEffect(() => {
    ;(async () => {
      try {
        await getLocation({
          variables: {
            tenant: tenant,
            search: search,
            page: currentPage,
            limit: limit
          }
        })
      } catch (error) {
        console.error('Error getting locations:', error)
      }
    })()
  }, [search, currentPage, limit])

  useEffect(() => {
    if (data) {
      console.log('Data :>', data)

      setLocations(data.locationList.resources)
      setTotalPages(data.locationList.pages)
    }
  }, [data])

  const handleRefresh = () => {
    refetch({ tenant: tenant, search: '' })
    setRefresh((prev) => prev + 1)
  }

  const handleNavigate = (location: string) => {
    navigate(location)
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return {
    state: {
      data,
      loading,
      locations,
      networkStatus,
      pathname,
      error,
      search,
      currentPage,
      limit,
      totalPages
    },
    actions: {
      handleRefresh,
      setSearch,
      handleNavigate,
      setLimit,
      handlePageChange
    }
  }
}
