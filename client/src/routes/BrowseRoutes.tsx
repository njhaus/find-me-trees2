import { Route, Routes } from "react-router-dom";

import Browse from "../pages/browse/Browse";

const BrowseRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Browse />} />
      </Routes>
    </>
  );
}

export default BrowseRoutes
