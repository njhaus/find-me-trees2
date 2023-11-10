import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import BrowseRedirect from "../pages/tree/BrowseRedirect";

import Tree from "../pages/tree/Tree";

const TreeRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={< BrowseRedirect />} />
        <Route path=":tree" element={<Tree />} />
      </Routes>
    </>
  );
}

export default TreeRoutes
