import "./NotesItem.styles.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

import { BsThreeDots } from "react-icons/bs";
import toast from "react-hot-toast";

import { MdDeleteOutline } from "react-icons/md";

import { useState, useEffect } from "react";
import { deletedNotesListApiFunc } from "../../service/notesApiList";
export const NotesItemComponent = ({
  eachNotesDetails,
  delBtnFunc,
  activeBtn,
}) => {
  const [showDropDown, setDropDown] = useState(false);
  const [isBlurred, setBlurStatus] = useState(false);

  const navigate = useNavigate();
  const { id, title, created_at, description } = eachNotesDetails;
  const displayNotes = description.slice(0, 45);

  const formattedDate = format(new Date(created_at), "dd-MM-yyyy");

  const onClickMenuBar = () => {
    setDropDown(!showDropDown);
  };

  const onClickDeleteOption = async () => {
    console.log("Del function Called in FrontEnd Del Button");
    deletedNotesListApiFunc(eachNotesDetails);
    delBtnFunc((prev) => prev + 1);
    setDropDown(false);
    toast.success("Successfully deleted the notes")
  };

  const onClickViewOption = () => {
    navigate("/eachNotes", { state: eachNotesDetails });
    setDropDown(false);
  };



  // console.log((showDropDown,"Drop DOwn"));

  return (
    <div className="each-notes-items">
      <div className="title-btn-box">
        <p className="each-note-title">{title}</p>
        <div className="drop-down-box">
          <button className="edit-del-btn" onClick={onClickMenuBar}>
            <BsThreeDots className="options-icon" />
          </button>
          {showDropDown && (
            <ul className="drop-down-menu">
              <li onClick={onClickViewOption} className="menu-option">
                <FaRegEye /> View
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
    </div>
  );
};
