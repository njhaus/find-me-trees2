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
import { iUserData } from "../../data/user_data/userData";
import { initialUserData } from "../../data/user_data/userData";
import { useLocation } from "react-router-dom";

export interface iNav {
  auth: iUserData;
  onLogout: (slug: string, body: {}) => void;
  redirect?: boolean
}

export function Nav() {

  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const redirectData = location.state;

  const handleLogout = async (slug: string, body: {}) => {
    const loggedInUser = await apiPost(slug, body);
    console.log(loggedInUser)
    setAuth(initialUserData);
  };

  return (
    //   BROWSER Navbar
    <>
      <RouteTest />
      {/* DESKTOP HEADER */}
      <DesktopNav
        auth={auth}
        onLogout={handleLogout}
        redirect={redirectData?.redirect ? true : false}
      />
      {/* MOBILE HEADER */}
      <MobileNav
        auth={auth}
        onLogout={handleLogout}
      />
    </>
  );
}

export default Nav;

// LINK to instructions: (Done with desktop version) https://www.raravind.com/blog/web-development/responsive-navigation-bar-using-chakraui
