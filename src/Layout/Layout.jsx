import { Outlet } from "react-router-dom";
import { NavbarComponent } from "../components/Navbar.component/Navbar";

export const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
};
