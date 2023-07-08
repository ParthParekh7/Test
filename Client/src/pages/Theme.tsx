import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSide from '../components/LeftSide/LeftSide'

const Theme: React.FC = () => {
  return (
    <div className="md:flex md:p-3 bg-white dark:text-white font-serif dark:bg-slate-800">
      <LeftSide />
      <Outlet />
    </div>
  )
}
export default Theme
