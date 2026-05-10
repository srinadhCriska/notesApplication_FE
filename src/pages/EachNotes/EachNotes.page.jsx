import { useLocation, useNavigate } from "react-router-dom";
import "./EachNotes.styles.css";
import { useEffect, useState } from "react";
import { ButtonsGroup } from "../../buttonsLayout/buttons.Layout";
import { notesEditButtons } from "../../metadata/buttons.metadata";
import { updateNotesListApiFunc } from "../../service/notesApiList";
import { format } from "date-fns";
import toast from "react-hot-toast";

export const EachNotesComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, created_at, title, description, edited_time } = location.state;

  const [notesTitle, setNotesTitle] = useState(title);
  const [notesContent, setNotesContent] = useState(description);
  const [isBtnsDisable, setBtnsDisplay] = useState(true);
  const [activeBtn, setActiveBtn] = useState(null);
  const [dateClicked, setDateClicked] = useState(false);

  const onChangeInputFunc = (e) => {
    setBtnsDisplay(false);
    let title = e.target.value;
    console.log(title);
    setNotesTitle(title);
  };

  const onChangeNotesContentFunc = (e) => {
    setBtnsDisplay(false);
    let contentData = e.target.value;
    console.log(contentData);

    setNotesContent(contentData);
  };

  // const generateDataObj = () => {
  //   let notesData = {
  //     id,
  //     description: notesContent,
  //     title: notesTitle,
  //   };
  //   return notesData;
  // };

  const onClickEditBtn = async () => {
    let callApi = notesTitle.length > 0 && notesContent.length > 0;
    let notesData = {
      id,
      description: notesContent,
      title: notesTitle,
    };
    try {
      {
        callApi && (await updateNotesListApiFunc(notesData));
        setActiveBtn("edit");
        toast.success("Successfully edited the notes");
      }
    } catch (err) {
      console.log("Error in the EachNotes in pages");
      toast.error("Failed to update the notes");
      throw err;
    }
    // {
    //   callApi && stateUpdateFunc((prev) => prev + 1);
    // }
    // setNotesTitle("");
    // setNotesContent("");
  };

  const formatDateFunc = (dateVal) => {
    return format(dateVal, "dd-MM-yyyy 'at' HH'hrs':mm'min'");
  };

  const clearUpFunc = () => {
    setNotesTitle("");
    setNotesContent("");
    setActiveBtn(null);
  };

  const onClickBackBtn = () => {
    setActiveBtn("cancel");
    clearUpFunc();
    navigate("/");
  };

  const btnFuncsObj = {
    edit: onClickEditBtn,
    back: onClickBackBtn,
  };

  let displayDateContent = !dateClicked
    ? `Created Time: ${formatDateFunc(new Date(created_at))}`
    : edited_time !== null
      ? `Edited Time: ${formatDateFunc(new Date(edited_time))}`
      : "Edited Time: Not yet edited";

  return (
    <div className="each-notes-bg-container">
      <div className="each-notes-box">
        <div className="edit-titles-box">
          <h1 className="notes-title">Edit Note</h1>
          {
            <p
              className="date"
              onClick={() => {
                setDateClicked(!dateClicked);
              }}
            >
              {displayDateContent}
            </p>
          }
        </div>
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
            btnsData={notesEditButtons}
            clickFuncs={btnFuncsObj}
          />
        </div>
      </div>
    </div>
  );
};
