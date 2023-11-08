import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";


export interface LinkProps {
  text: string;
  to: JSX.Element;
  key: number;
}

export function Nav() {
  return (
    //   BROWSER Navbar
    <>
      {/* DESKTOP HEADER */}
      <DesktopNav/>
      {/* MOBILE HEADER */}
      <MobileNav/>
    </>
  );
}

export default Nav;

// LINK to instructions: (Done with desktop version) https://www.raravind.com/blog/web-development/responsive-navigation-bar-using-chakraui
