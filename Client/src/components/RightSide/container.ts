import {
  ApolloError,
  NetworkStatus,
  useLazyQuery,
  useMutation
} from '@apollo/client'
import { useEffect, useState } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { tenant } from '../../App'
import {
  LOCATION_PATCH,
  LOCATION_REMOVE_MUTATION
} from '../../GraphQL/mutation'
import { GET_LOCATIONS, LOCATION_READ_QUERY } from '../../GraphQL/queries'
import {
  LocationRemoveData,
  LocationRemoveVariables
} from '../../types/locationDelete/types'
import {
  LocationPatchInput,
  LocationPatchResponse,
  LocationPatchVariables
} from '../../types/locationPatch/types'
import {
  Location,
  LocationReadData,
  LocationReadVariables
} from '../../types/locationRead/types'

export type RightSideContainer = {
  state: {
    loading: boolean
    location: Location | null
    successMsg: string
    errorMsg: string
    networkStatus: NetworkStatus
    error: ApolloError | undefined
  }
  actions: {
    handleDelete: () => Promise<void>
    handleFieldChange: (
      field: keyof LocationPatchInput,
      value: string
    ) => Promise<void>
    register: UseFormRegister<LocationPatchInput>
  }
}

export const useRightSideContainer = (): RightSideContainer => {
  const { id } = useParams()
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')
  const initialValues: Location = {
    id: '',
    name: '',
    address: '',
    description: '',
    alias: '',
    npi: '',
    taxId: '',
    type: ''
  }

  const { register, setValue } = useForm<LocationPatchInput>({
    defaultValues: initialValues
  })
  const [location, setLocation] = useState<Location | null>(null)

  const [patchLocation] = useMutation<
    LocationPatchResponse,
    LocationPatchVariables
  >(LOCATION_PATCH)

  const [getLocationById, { data, loading, error, networkStatus }] =
    useLazyQuery<LocationReadData, LocationReadVariables>(LOCATION_READ_QUERY, {
      notifyOnNetworkStatusChange: true
    })

  const [locationRemoveMutation] = useMutation<
    LocationRemoveData,
    LocationRemoveVariables
  >(LOCATION_REMOVE_MUTATION)

  useEffect(() => {
    try {
      setErrorMsg('')
      if (id) {
        ;(async () => {
          const data = await getLocationById({
            variables: {
              locationReadId: id,
              tenant: tenant
            }
          })
          if (!data.data) {
            setErrorMsg(`Location data not found for id : ${id}`)
          }
        })()
      }
    } catch (error) {
      console.log('Get by location id error :', error)
    }
  }, [id])

  const handleFieldChange = async (
    field: keyof LocationPatchInput,
    value: string
  ) => {
    if (location) {
      const fieldValue = location[field]

      if (fieldValue !== value) {
        try {
          await patchLocation({
            variables: {
              id,
              requestBody: {
                [field]: value
              },
              tenant
            }
          })

          if (id) {
            const data = await getLocationById({
              variables: {
                locationReadId: id,
                tenant: tenant
              }
            })
            if (!data.data) {
              setErrorMsg(`Location data not found for id : ${id}`)
            }
            setSuccessMsg('Location data updated successfully!')
            setTimeout(() => {
              setSuccessMsg('')
            }, 2000)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }
  }

  const handleDelete = async () => {
    try {
      if (id) {
        const data = await locationRemoveMutation({
          variables: {
            locationRemoveId: id,
            tenant: tenant
          }
        })
        if (data.data?.locationRemove.resourceID === id) {
          setSuccessMsg('Location data deleted successfully!')
          if (id) {
            const data = await getLocationById({
              variables: {
                locationReadId: id,
                tenant: tenant
              }
            })

            if (!data.data) {
              setErrorMsg(`Location data not found for id : ${id}`)
            }
          }
          setTimeout(() => {
            setSuccessMsg('')
          }, 2000)
        }
      }
    } catch (error) {
      console.log('Delete error :>', error)
    }
  }

  useEffect(() => {
    if (data) {
      if (data && data.locationRead && data.locationRead.resource) {
        setLocation(data.locationRead.resource)

        setValue('name', data.locationRead.resource.name)
        setValue('address', data.locationRead.resource.address)
        setValue('description', data.locationRead.resource.description)
        setValue('alias', data.locationRead.resource.alias)
        setValue('taxId', data.locationRead.resource.taxId)
        setValue('type', data.locationRead.resource.type)
        setValue('npi', data.locationRead.resource.npi)
      }
    }
  }, [data])

  return {
    state: {
      loading,
      errorMsg,
      location,
      successMsg,
      error,
      networkStatus
    },
    actions: {
      handleDelete,
      handleFieldChange,
      register
    }
  }
}
