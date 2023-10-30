import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import BrowseRoutes from './routes/BrowseRoutes'
import TreeRoutes from './routes/TreeRoutes'
import UserRoutes from './routes/UserRoutes'
import AboutRoutes from './routes/AboutRoutes'
import LoginRoutes from './routes/LoginRoutes'
import Error from './pages/error/Error'
import Nav from './components/nav/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseRoutes />} />
        <Route path="/tree/:title" element={<TreeRoutes />} />
        <Route path="/user/:id" element={<UserRoutes />} />
        <Route path="/about" element={<AboutRoutes />} />
        <Route path="/login" element={<LoginRoutes />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App
