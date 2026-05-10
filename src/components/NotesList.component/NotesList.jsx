// import { getNotesListApiFunc } from "../../service/notesApiList"
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import {
  deletedNotesListApiFunc,
  getNotesListApiFunc,
} from "../../service/notesApiList";
import { NotesItemComponent } from "../NotesItem.component/NotesItem";
import "./NotesList.css";

deletedNotesListApiFunc;
import { format } from "date-fns";

export const NotesListComponent = ({
  notesListData,
  activeBtn,
  stateUpdateFunc,
  searchTextInpFunc,
  actvBtnFunc
  ,calnderInput,
  showSearchBar
}) => {
  const [searchText, setSearchText] = useState("");
  const [displayText,setDisplayText]=useState("All");
  
    const onClickSearchBar = (e) => {
    let text = e.target.value;
    searchTextInpFunc(text);
    setSearchText(text);
  };

  const startSearchFunc = () => {
    actvBtnFunc("searchbar");
    setSearchText("");
    showSearchBar((prev)=>prev+1)
  };

  
  useEffect(()=>{
     if(activeBtn==="searchbar"){
          setDisplayText("Search")
     }
     else if(activeBtn==="calender"){
          setDisplayText(format((calnderInput),"dd-MM-yyyy"))
     }
     else{
        setDisplayText(activeBtn.slice(0,1).toUpperCase()+activeBtn.slice(1))
     }
  },[activeBtn,calnderInput])
  
  return (
    <div className="notes-list-box">
       <div className="header-box">
         <h1 className={`notes-list-header ${activeBtn==="searchbar"&&"focus-color"}`}>{displayText} {`${activeBtn==="searchbar"?"Results":"Notes"}`}</h1>
       <div className="search-bar">
          <input
            value={searchText}
            onChange={onClickSearchBar}
            type="search"
            placeholder="Search"
            className="search-field"
          />
          <FaSearch className="search-icon" onClick={startSearchFunc} />
        </div>
       </div>
      <ul className="notes-list-items-box">
        {notesListData &&
          notesListData.map((eachNotes, index) => {
            return (
              <NotesItemComponent
                key={index}
                itemId={index}
                delBtnFunc={stateUpdateFunc}
                eachNotesDetails={eachNotes}
                activeBtn={activeBtn}
              />
            );
          })}
        {notesListData.length === 0 && <p>Notes not available</p>}
      </ul>
    </div>
  );
};
