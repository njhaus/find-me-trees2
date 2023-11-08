import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import TreeLayout from "../layouts/TreeLayout";
import Placeholder from "../pages/placeholder/Placeholder";

const TreeRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<TreeLayout />}>
          <Route index element={<Placeholder />} />
          <Route path="tree/:title" element={<Placeholder />} />
        </Route>
      </Routes>
    </>
  );
}

export default TreeRoutes
