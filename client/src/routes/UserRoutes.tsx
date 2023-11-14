import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import BrowseRedirect from "../pages/tree/BrowseRedirect";

import User from "../pages/user/User";

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<BrowseRedirect />} />
      <Route path=":user" element={<User />} />
    </Routes>
  );
};

export default UserRoutes;
