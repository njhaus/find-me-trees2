import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import RouteTest from "./RouteTest";


export interface LinkProps {
  text: string;
  to: JSX.Element;
  key: number;
}

import useAuth from "../../hooks/useAuth";
import { apiPost } from "../../services/api_client";
import { iUserData } from "../../context/AuthProvider";

export interface iNav {
  auth: iUserData;
  onLogout: (slug: string, body: {}) => void;
}

export function Nav() {

  const { auth, setAuth } = useAuth();


  const handleLogout = async (slug: string, body: {}) => {
    const loggedInUser = await apiPost(slug, body);
    console.log(loggedInUser)
    setAuth({});
  };

  return (
    //   BROWSER Navbar
    <>
      <RouteTest />
      {/* DESKTOP HEADER */}
      <DesktopNav auth={auth} onLogout={handleLogout} />
      {/* MOBILE HEADER */}
      <MobileNav auth={auth} onLogout={handleLogout} />
      
    </>
  );
}

export default Nav;

// LINK to instructions: (Done with desktop version) https://www.raravind.com/blog/web-development/responsive-navigation-bar-using-chakraui
