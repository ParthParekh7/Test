import { useAddLocationFormContainer } from './container'

const AddLocationForm: React.FC = () => {
  const {
    state: { errorMsg, loading, successMsg, errors },
    actions: { handleAdd, register }
  } = useAddLocationFormContainer()
  return (
    <div className="md:w-2/3 h-full relative">
      <div className="p-3 h-20 flex justify-between items-center bg-green-100">
        <div>
          <span className="ml-3 font-bold text-lg">Create New location</span>
        </div>
        <div className="">
          <button
            type="button"
            onClick={handleAdd}
            className="ml-3 my-2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>
      <form className="w-full p-3">
        {loading && <p>Loading...</p>}

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
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register('address')}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4 ${
                  errors.address ? 'border-red-500' : ''
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="tenant"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Tenant
              </label>
              <input
                type="text"
                id="tenant"
                disabled={true}
                {...register('tenant')}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4 ${
                  errors.tenant ? 'border-red-500' : ''
                }`}
              />
              {errors.tenant && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.tenant.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="alias"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Alias
              </label>
              <input
                type="text"
                id="alias"
                {...register('alias')}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                {...register('description')}
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
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="type"
                className="text-gray-700 text-sm font-bold mb-2 w-1/4"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                {...register('type')}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/4`}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AddLocationForm
