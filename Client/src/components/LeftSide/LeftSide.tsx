import { NetworkStatus } from '@apollo/client'
import moment from 'moment'
import { GetLocationsData } from '../../types/locationGet/types'
import { useLeftSideContainer } from './container'

const LeftSide: React.FC = () => {
  const {
    state: {
      data,
      loading,
      error,
      locations,
      networkStatus,
      search,
      pathname,
      currentPage,
      limit,
      totalPages
    },
    actions: {
      handleNavigate,
      handleRefresh,
      setSearch,
      handlePageChange,
      setLimit
    }
  } = useLeftSideContainer()

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
          <div className="">
            {pathname === '/add-new-location' ? null : (
              <button
                type="button"
                onClick={() => handleNavigate('/add-new-location')}
                className="my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            )}
          </div>
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
              className="w-full rounded overflow-hidden shadow-lg p-2 cursor-pointer"
              onClick={() => handleNavigate(`/${location.id}`)}
            >
              {data && data.locationList.resources.length === 0 && (
                <p>No data found</p>
              )}

              <div className="flex justify-between">
                <div className="px-2 py-4">
                  <div className="font-bold text-xl ">{location.name}</div>
                  <div className="">{location.address}</div>
                </div>

                <div className="pt-4 pb-2 rounded">
                  <span className="text-black bg-orange-400 p-1 rounded">
                    {location.status}
                  </span>
                  <div>{moment(location.updated).fromNow()}</div>
                </div>
              </div>
            </div>
          ))}
        {locations.length > 0 && totalPages > 0 && (
          <div className="flex justify-between my-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                currentPage === 1 ? '' : ' hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            <select
              value={limit}
              onChange={(e) => {
                handlePageChange(1)
                setLimit(Number(e.target.value))
              }}
              className="mr-2 bg-white border border-gray-300 rounded px-2 py-1 w-1/2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
                currentPage === totalPages ? '' : ' hover:bg-blue-700 '
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default LeftSide
