import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const RightSide: React.FC = () => {
  const { id } = useParams()

  return useMemo(() => {
    return <div className="md:w-2/3 h-full relative"></div>
  }, [])
}
export default RightSide
