import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { tenant } from '../../App'
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
import {
  LOCATION_PATCH,
  LOCATION_REMOVE_MUTATION
} from '../../GraphQL/mutation'
import { LOCATION_READ_QUERY } from '../../GraphQL/queries'
import {
  LocationRemoveData,
  LocationRemoveVariables
} from '../../types/locationDelete/types'

const RightSide: React.FC = () => {
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
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false)

  const [getLocationById, { data, loading, error }] = useLazyQuery<
    LocationReadData,
    LocationReadVariables
  >(LOCATION_READ_QUERY, { fetchPolicy: 'no-cache' })
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
            }, 3000)
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
          setTimeout(() => {
            setSuccessMsg('')
          }, 3000)
        }
      }
    } catch (error) {
      console.log('Delete error :>', error)
    }
  }

  //69ffa818-e8ca-4673-9f9a-5899d1e7a1d6
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

  const handleRefresh = async () => {
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
  }

  return useMemo(() => {
    return (
      <div className="md:w-2/3 h-full relative">
        <div className="p-3 h-20 flex justify-between items-center bg-green-100">
          <div>
            <span className="ml-3 font-bold text-lg">{location?.name}</span>
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleRefresh}
              className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="ml-3 my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
        <form className="w-full p-3">
          {!!successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMsg}
            </div>
          )}

          {!!errorMsg && (
            <div className="bg-red-300 border border-red-400 text-black px-4 py-3 rounded mb-4">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                onBlur={(e) => handleFieldChange('name', e.target.value)}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className=" text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register('address')}
                onBlur={(e) => handleFieldChange('address', e.target.value)}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="alias"
                className=" text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Alias
              </label>
              <input
                type="text"
                id="alias"
                {...register('alias')}
                onBlur={(e) => handleFieldChange('alias', e.target.value)}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className=" text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                {...register('description')}
                onBlur={(e) => handleFieldChange('description', e.target.value)}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="npi"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                NPI
              </label>
              <input
                type="text"
                id="npi"
                {...register('npi')}
                onBlur={(e) => handleFieldChange('npi', e.target.value)}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="taxId"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Tax ID
              </label>
              <input
                type="text"
                id="taxId"
                {...register('taxId')}
                onBlur={(e) => handleFieldChange('taxId', e.target.value)}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>
          </div>
        </form>
      </div>
    )
  }, [
    id,
    location?.name,
    successMsg,
    errorMsg,
    handleFieldChange,
    handleDelete,
    handleRefresh
  ])
}
export default RightSide
