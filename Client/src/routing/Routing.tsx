import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Theme = React.lazy(() => import('../pages/Theme'))
const RightSide = React.lazy(() => import('../components/RightSide/RightSide'))
const Loading = React.lazy(() => import('../components/Loader/Loading'))

export const Routing: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route path="/" element={<Theme />}>
            <Route path=":id" element={<RightSide />}></Route>
          </Route>
        </Routes>
      </Router>
    </React.Suspense>
  )
}
