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
import useLogout from "../../hooks/useLogout";
import { useLocation } from "react-router-dom";
import NavDialog from "./NavDialog";

export interface iNav {
  auth: iUserData;
  onLogout: () => void;
  redirect?: boolean
}

export function Nav() {

  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const redirectData = location.state;

  console.log(redirectData);

  const logout = useLogout();

  return (
    //   BROWSER Navbar
    <>
      <RouteTest />
      {/* Dialog message -- for logged out,  */}
      <NavDialog
        message={redirectData?.message ? redirectData.message : ''}
      />
      {/* DESKTOP HEADER */}
      <DesktopNav
        auth={auth}
        onLogout={logout}
        redirect={redirectData?.redirect ? true : false}
      />
      {/* MOBILE HEADER */}
      <MobileNav auth={auth} onLogout={logout} />
    </>
  );
}

export default Nav;

// LINK to instructions: (Done with desktop version) https://www.raravind.com/blog/web-development/responsive-navigation-bar-using-chakraui
