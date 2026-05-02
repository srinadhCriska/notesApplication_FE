import { ButtonComponent } from "../components/Buttons.component/Button";

export const ButtonsGroup = (props) => {
 
  return (
    <>
      {props.btnsData.map((eachNavButton, index) => {
        return (
          <ButtonComponent
            key={index}
            btnId={eachNavButton.id}
            btnType={eachNavButton.type}
            btnDisplayText={eachNavButton.btnText}
            btnClickFuncObj={props.clickFuncs}
            maskBtn={props.disableBtn}
            actvBtn={props.isActvBtn}
          />
        );
      })}
    </>
  );
};
