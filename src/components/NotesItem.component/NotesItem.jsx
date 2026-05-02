import "./NotesItem.styles.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";


import { MdDeleteOutline } from "react-icons/md";

import { useState, useEffect, use } from "react";
import { deletedNotesListApiFunc } from "../../service/notesApiList";
export const NotesItemComponent = ({ eachNotesDetails, delBtnFunc }) => {
  const [showDropDown, setDropDown] = useState(false);
  const [isNotesClicked, setNotesClicked] = useState(false);

  const navigate = useNavigate();
  const { id, title, created_at, description } = eachNotesDetails;
  const displayNotes = description.slice(0, 45);

  const formattedDate = format(new Date(created_at), "dd-MM-yyyy");

  //   let listItemStyles="each-notes-items";

  const onClickMenuBar = () => {
    setDropDown(!showDropDown);
  };

  // useEffect=(()=>{
  //     const callApiFunc=async()=>{
  //        try{
  //          await
  //        }
  //        catch(err){

  //        }
  //     }
  //     callApiFunc()
  // },[])

  const onClickDeleteOption = async () => {
    console.log("Del function Called in FrontEnd Del Button");
    deletedNotesListApiFunc(eachNotesDetails);
    delBtnFunc((prev) => prev + 1);
    setDropDown(false)
  };

  const onClickEditOption = () => {
    navigate(`/eachNotes`, { state: eachNotesDetails });
    setDropDown(false)
  };

  const onClickNotesItem = () => {
    setNotesClicked(true);
    setDropDown(false)
  };

  // let firstTestCardBg = isNotesClicked?"each-notes-items active":"each-notes-items";
  let finalTestCardBg = showDropDown
    ? "each-notes-items add-border"
    : "each-notes-items";
  return (
    <li className={finalTestCardBg} onDoubleClick={onClickNotesItem}>
      <div className="title-btn-box">
        <p className="each-note-title">{title}</p>
        <div className="drop-down-box">
          <button onClick={onClickMenuBar} className="edit-del-btn">
            <BsThreeDots className="options-icon" />
          </button>
          {showDropDown && (
            <ul className="drop-down-menu">
              <li onClick={onClickEditOption} className="menu-option">
                <MdEdit /> View
              </li>
              <li onClick={onClickDeleteOption} className="menu-option">
                <MdDeleteOutline /> Delete
              </li>
            </ul>
          )}
        </div>
      </div>
      <p className="each-note-content">{formattedDate}</p>
      <p className="each-note-content">{displayNotes}....</p>
    </li>
  );
};
