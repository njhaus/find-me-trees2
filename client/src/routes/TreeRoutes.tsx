import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import Tree from "../pages/tree/Tree";

const TreeRoutes = () => {
  return (
    <>
      <Routes>
        <Route path=":id" element={<Tree/>} />
      </Routes>
    </>
  );
}

export default TreeRoutes
