import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Landing from './pages/landing/Landing'
import Browse from './pages/browse/Browse'
import TreeRoutes from './routes/TreeRoutes'
import UserRoutes from './routes/UserRoutes'
import AboutRoutes from './routes/AboutRoutes'
import Error from './pages/error/Error'

import MainLayout from './layouts/MainLayout'

function App() {

  return (
    <>
      {/* Possibly put Nav in a layout for everything except home -- see react router vid 21:00 ish, see 22:30 for using the layout <Outlet>*/}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/tree/*" element={<TreeRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/about" element={<AboutRoutes />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
