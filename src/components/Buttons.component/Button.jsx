import "./Button.styles.css";
export const ButtonComponent = (props) => {
  const { btnType } = props;

  switch (btnType) {
    case "navButton":
      return <NavButton {...props} />;
    case "notesButton":
      return <NotesButton {...props} />;
    case "notesCtrlBtn":
      return <NotesCtrlButton {...props} />;
      case "notesEditBtn":
      return <NotesEditButton {...props} />;
  }
};

export const NavButton = (props) => {
  const { actvBtn, btnClickFuncObj, btnId, btnDisplayText } = props;
  // console.log(btnClickFuncObj,"Called In Btn")
  const btnStyles =
    actvBtn === btnId
      ? "nav-button-styles custom-nav-button-styles"
      : "nav-button-styles";

  return (
    <button onClick={() => btnClickFuncObj[btnId](btnId)} className={btnStyles}>
      {btnDisplayText}
    </button>
  );
};

export const NotesButton = (props) => {
  const { actvBtn, btnClickFuncObj, btnId, btnDisplayText } = props;

  const stylesBtn =
    actvBtn === btnId
      ? "notes-button-styles custom-notes-btn-styles"
      : "notes-button-styles";

  return (
    <button onClick={() => btnClickFuncObj[btnId](btnId)} className={stylesBtn}>
      {btnDisplayText}
    </button>
  );
};

export const NotesCtrlButton = (props) => {
  // console.log(props);
  const { btnDisplayText, maskBtn,btnClickFuncObj,btnId,actvBtn } = props;
  
   const stylesBtn =
    actvBtn === btnId
      ? "notes-button-styles custom-notes-btn-styles"
      : "notes-button-styles";
  
  
  return (
    <button  onClick={() => btnClickFuncObj[btnId](btnId)} className={stylesBtn}>
      {btnDisplayText}
    </button>
  );
};


export const NotesEditButton = (props) => {
  // console.log(props);
  const { btnDisplayText, maskBtn,btnClickFuncObj,btnId,actvBtn } = props;
  
   const stylesBtn =
    actvBtn === btnId
      ? "notes-button-styles custom-notes-btn-styles"
      : "notes-button-styles";
  
  
  return (
    <button  onClick={btnClickFuncObj[btnId]} className={stylesBtn}>
      {btnDisplayText}
    </button>
  );
};
