import { NetworkStatus } from '@apollo/client'

import { useRightSideContainer } from './container'

const RightSide: React.FC = () => {
  const {
    state: { error, errorMsg, loading, location, networkStatus, successMsg },
    actions: { handleDelete, handleFieldChange, register }
  } = useRightSideContainer()

  return (
    <div className="md:w-2/3 h-full relative">
      <div className="p-3 h-20 flex justify-between items-center bg-green-100">
        <div>
          {!loading && (
            <span className="ml-3 font-bold text-lg">{location?.name}</span>
          )}
        </div>
        <div className="">
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
        {networkStatus === NetworkStatus.refetch && loading && (
          <p className="my-2">Refetching!</p>
        )}
        {loading && networkStatus !== NetworkStatus.refetch && (
          <p>Loading...</p>
        )}

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

        {!loading && (
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
        )}
      </form>
    </div>
  )
}
export default RightSide
