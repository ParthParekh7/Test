import { ApolloError, gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
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
import { LOCATION_PATCH } from '../../GraphQL/mutation'
import { LOCATION_READ_QUERY } from '../../GraphQL/queries'

const RightSide: React.FC = () => {
  const { id } = useParams()
  const { state } = useLocation()

  const { register, setValue, watch } = useForm<LocationPatchInput>()
  const [location, setLocation] = useState<Location | null>(null)

  const [patchLocation] = useMutation<
    LocationPatchResponse,
    LocationPatchVariables
  >(LOCATION_PATCH)
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false)

  const { data, loading, error } = useQuery<
    LocationReadData,
    LocationReadVariables
  >(LOCATION_READ_QUERY, {
    variables: {
      locationReadId: id ?? '',
      tenant: tenant
    }
  })

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
                ...location,
                [field]: value,
                tenant
              },
              tenant
            }
          })

          setShowSuccessAlert(true)
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }
  }

  const handleDelete = () => {}

  useEffect(() => {
    if (data) {
      setLocation(null)
    }
  }, [data])

  return useMemo(() => {
    return (
      <div className="md:w-2/3 h-full relative">
        <div className="p-3 h-20 flex justify-between items-center bg-green-100">
          <div>{state}</div>
          <button
            type="button"
            onClick={handleDelete}
            className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
        <form className="w-full p-3">
          {showSuccessAlert && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Location patched successfully!
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
  }, [id, showSuccessAlert])
}
export default RightSide
