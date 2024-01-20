import { Route, Routes } from "react-router-dom";

import About from "../pages/about/About";

const AboutRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<About />} />
      </Routes>
    </>
  );
};

export default AboutRoutes;
