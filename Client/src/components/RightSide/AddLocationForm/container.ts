import { ApolloError, NetworkStatus, useMutation } from '@apollo/client'
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form'
import * as Yup from 'yup'
import { CREATE_LOCATION } from '../../../GraphQL/mutation'
import { useEffect, useState } from 'react'
import {
  CreateLocationVariables,
  LocationCreateResponse,
  LocationWriteInput
} from '../../../types/locationCreate/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { tenant } from '../../../App'

export type AddLocationFormContainer = {
  state: {
    loading: boolean
    successMsg: string
    errorMsg: string
    errors: FieldErrors<LocationWriteInput>
  }
  actions: {
    handleAdd: (
      e?: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>
    register: UseFormRegister<LocationWriteInput>
  }
}

export const useAddLocationFormContainer = (): AddLocationFormContainer => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')
  const initialValues: LocationWriteInput = {
    name: '',
    address: '',
    alias: '',
    description: '',
    npi: '',
    taxId: '',
    type: '',
    tenant: tenant
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    address: Yup.string().required('Address is required.'),
    tenant: Yup.string().required('Tenant is required.'),
    alias: Yup.string(),
    description: Yup.string(),
    npi: Yup.string(),
    taxId: Yup.string(),
    type: Yup.string()
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<LocationWriteInput>({
    resolver: yupResolver(validationSchema as any),
    defaultValues: initialValues
  })

  const [createLocation, { loading }] = useMutation<
    LocationCreateResponse,
    CreateLocationVariables
  >(CREATE_LOCATION)

  const handleAdd = handleSubmit(async (formData: LocationWriteInput) => {
    try {
      const { data } = await createLocation({
        variables: {
          requestBody: formData,
          tenant: tenant
        }
      })

      const resourceID = data?.locationCreate?.resourceID
      console.log(`Resource ID: ${resourceID}`)
      setSuccessMsg('Location created successfully!')
      setTimeout(() => {
        setSuccessMsg('')
      }, 2000)

      //Reset the form values
      reset(initialValues)
    } catch (error) {
      console.error(error)
      setErrorMsg('Failed to create the location.')
    }
  })

  return {
    state: {
      loading,
      errorMsg,
      successMsg,
      errors
    },
    actions: {
      handleAdd,
      register
    }
  }
}
