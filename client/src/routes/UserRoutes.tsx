import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import User from "../pages/user/User";

const UserRoutes = () => {
  return (
    <Routes>
      <Route index element={<User />} />
    </Routes>
  );
};

export default UserRoutes;
