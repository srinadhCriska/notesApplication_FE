import {useState } from "react";
import { ButtonsGroup } from "../../buttonsLayout/buttons.Layout";
import { notesControlButtons } from "../../metadata/buttons.metadata";
import { v4 as uuidv4 } from "uuid";
// import { format } from "date-fns";
import { LuCircleFadingPlus } from "react-icons/lu";
import toast from "react-hot-toast";
import "./Notes.styles.css";
import { createNewNotesApiFunc } from "../../service/notesApiList";
ButtonsGroup;

export const NotesInputComponent = ({ stateUpdateFunc }) => {
  const [createNotesBtn, setCreateNotes] = useState(false);
  const [isCancelBtnClicked, setCancelBtn] = useState(false);
  const [notesTitle, setNotesTitle] = useState("");
  const [notesContent, setNotesContent] = useState("");
  const [isBtnsDisable, setBtnsDisplay] = useState(true);
  const [activeBtn, setActiveBtn] = useState(null);

  //   const [makeApiCall,setApiCallStatus]=useState(false);

  const onChangeInputFunc = (e) => {
    setBtnsDisplay(false);
    let title = e.target.value;
    setNotesTitle(title);
  };

  const onChangeNotesContentFunc = (e) => {
    setBtnsDisplay(false);
    let contentData = e.target.value;
    setNotesContent(contentData);
  };

  // const generateDataObj = () => {
  //   const id = uuidv4();
  //   let notesData = {
  //     id,
  //     title: notesTitle,
  //     description: notesContent,
  //   };
  //   return notesData;
  // };

  const onClickSaveBtn = async () => {
    let callApi = notesTitle.length > 0 && notesContent.length > 0;

    let newNotesData = {
      id:uuidv4(),
      title: notesTitle,
      description: notesContent,
    };
    console.log("Save Clicked");

    try {
      {
        callApi && setActiveBtn("save");
        const dbResponse =
          (await callApi) && createNewNotesApiFunc(newNotesData);
        console.log(dbResponse);
        stateUpdateFunc((prev) => prev + 1);
        callApi && toast.success("Successfully created new notes");
      }
    } catch (err) {
      console.log("Error while creating new notes");
      toast.error("Failed to create new notes");
    }
    setNotesTitle("");
    setNotesContent("");
  };

  const clearUpFunc = () => {
    setNotesTitle("");
    setNotesContent("");
    setActiveBtn(null);
  };

  const onClickCancelBtn = () => {
    setActiveBtn("cancel");
    clearUpFunc();
    setCreateNotes(false);
  };

  const btnFuncsObj = {
    save: onClickSaveBtn,
    cancel: onClickCancelBtn,
  };

  const onClickCreateBtn = () => {
    setCreateNotes(true);
  };

  //   console.log(btnFuncsObj)
  return createNotesBtn ? (
    <div className="create-notes-box">
      <h1 className="notes-title">New Note</h1>
      <input
        onChange={onChangeInputFunc}
        value={notesTitle}
        className="title-box"
        type="text"
        placeholder="Title"
        required
      />
      <textarea
        onChange={onChangeNotesContentFunc}
        value={notesContent}
        placeholder="Start typing your notes....."
        required
      ></textarea>
      <div className="notes-btns-box">
        <ButtonsGroup
          disableBtn={isBtnsDisable}
          isActvBtn={activeBtn}
          btnsData={notesControlButtons}
          clickFuncs={btnFuncsObj}
        />
      </div>
    </div>
  ) : (
    <div className="create-notes-box">
      <div className="create-items-box">
        <LuCircleFadingPlus className="Logo" onClick={onClickCreateBtn} />
        <p className="create-text">New Note</p>
      </div>
    </div>
  );
};
