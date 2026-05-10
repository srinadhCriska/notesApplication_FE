import { useState } from "react";
import { ButtonsGroup } from "../../buttonsLayout/buttons.Layout";
import { notesButtonsData } from "../../metadata/buttons.metadata";

import "./NotesDisplayButton.styles.css";

export const NotesDisBtnComponent = ({
  actvBtnFunc,
  clndrBtnFunc,
  calnderInput,
}) => {
  const [activeBtn, setActiveBtn] = useState("all");

  const onClickCntrlBtn = (val) => {
    setActiveBtn(val);
    actvBtnFunc(val);
    clndrBtnFunc(false);
  };

  const getCalenderDate = (e) => {
    const calenderDate = e.target.value;
    // console.log(calenderDate,"In Notes Dis");
    calnderInput(calenderDate);
  };

  // console.log("Calender Status in Display Comp", showCalender);

  const onClickCalender = () => {
    setActiveBtn("calender");
    actvBtnFunc("calender");
    clndrBtnFunc((prev) => !prev);
  };
  const calenderStyles = activeBtn==="calender"
    ? "calender-button-styles custom-calender-btn-styles"
    : "calender-button-styles";


  const btnFuncsObj = {
    all: onClickCntrlBtn,
    today: onClickCntrlBtn,
    yesterday: onClickCntrlBtn,
  };

 

  return (
    <div className="notes-display-controller-box">
      <div className="notes-controller-btns-box">
        <ButtonsGroup
          btnsData={notesButtonsData}
          isActvBtn={activeBtn}
          clickFuncs={btnFuncsObj}
        />
      </div>
      <button className={calenderStyles} onClick={onClickCalender}>
        Calender
      </button>
      {activeBtn==="calender" && (
        <input
          onChange={getCalenderDate}
          className="calender-input"
          type="date"
        />
      )}
    </div>
  );
};
