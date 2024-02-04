import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Landing from './pages/landing/Landing'
import Browse from './pages/browse/Browse'
import TreeRoutes from './routes/TreeRoutes'
import UserRoutes from './routes/UserRoutes'
import AboutRoutes from './routes/AboutRoutes'
import Error from './pages/error/Error'

import MainLayout from './layouts/MainLayout'

import AuthProvider from './context/AuthProvider'
import RequireAuth from './components/login_auth/RequireAuth'

function App() {
  const location = useLocation();

  return (
    <>
      {/* Possibly put Nav in a layout for everything except home -- see react router vid 21:00 ish, see 22:30 for using the layout <Outlet>*/}
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                <Navigate
                  to="/"
                  state={{ from: location, redirect: true }}
                  replace
                />
              }
            />
            <Route path="/browse" element={<Browse />} />
            <Route path="/tree/*" element={<TreeRoutes />} />
            {/* <Route element={<RequireAuth />}> */}
              <Route path="/user/*" element={<UserRoutes />} />
            {/* </Route> */}
            <Route path="/about" element={<AboutRoutes />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App
