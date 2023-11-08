import { Route, Routes } from "react-router-dom";

import Browse from "../pages/browse/Browse";
import MainLayout from "../layouts/MainLayout";

const BrowseRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Browse />} />
        <Route path="browse/:tree" element={<Browse />} />
      </Routes>
    </>
  );
}

export default BrowseRoutes
