import "./Navbar.styles.css";
import { useState } from "react";
import navLogo from "../../assets/navLogo1.png";
import { navButtonsData } from "../../metadata/buttons.metadata";
import { ButtonsGroup } from "../../buttonsLayout/buttons.Layout";
import { useNavigate, useLocation } from "react-router-dom";
export const NavbarComponent = () => {
  const [activeBtn, setActiveBtn] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  
  const onClickHomeBtn = () => {
    navigate("/");
  };
  // const onClickNotes=(val)=>{
  //   setActiveBtn(val)
  //   // navigate("/eachNotes")
  // }

  const btnFuncsObj = {
    home: onClickHomeBtn,
  };
  
  
  return (
    <nav>
      <img src={navLogo} alt="navbar-log" className="nav-logo" />
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
