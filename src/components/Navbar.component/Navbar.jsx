import "./Navbar.styles.css";
import { useEffect, useState } from "react";
import navLogo from "../../assets/navLogo1.png";
import { navButtonsData } from "../../metadata/buttons.metadata";
import { ButtonsGroup } from "../../buttonsLayout/buttons.Layout";
import { useNavigate, useLocation } from "react-router-dom";
export const NavbarComponent = () => {
  // const [activeBtn, setActiveBtn] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const onClickHomeBtn = () => {
    navigate("/");
  };
  const onClickNotes = () => {
    navigate(-1);
  };

  const btnFuncsObj = {
    home: onClickHomeBtn,
    notes: onClickNotes,
  };

  let activeBtn = path === "/" ? "home" : "notes";
  return (
    <nav>
      <img src={navLogo} onClick={onClickHomeBtn} alt="navbar-log" className="nav-logo" />
      <div className="nav-items">
        <ButtonsGroup
          btnsData={navButtonsData}
          isActvBtn={activeBtn}
          clickFuncs={btnFuncsObj}
        />
      </div>
    </nav>
  );
};
