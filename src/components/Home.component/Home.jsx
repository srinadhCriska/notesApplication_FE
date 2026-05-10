import { NotesInputComponent } from "../Notes.component/Notes";
import { NotesListComponent } from "../NotesList.component/NotesList";
import { NotesDisBtnComponent } from "../NotesDisplayButton.component/NotesDisplayButton";
import "./Home.styles.css";
import { useState, useEffect } from "react";
import { getNotesListApiFunc } from "../../service/notesApiList";

import { filterNotesDataFunc } from "../../../utils/filterNotesData";

export const HomeComponent = () => {
  const [notesList, setNotesList] = useState([]);
  const [isNotesUpdated, setNotesUpdate] = useState(false);
  const [activeDisplayBtn, updateActvBtn] = useState("all");
  const [isCalenderClicked, updateCalenderStatus] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isSearchClicked, setSearchClick] = useState(0);
  const [calenderDate, setCalenderDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);
  // const [isFilterInvoked,setFilteredInvokeStat]=useState(0);

  useEffect(() => {
    console.log("Use Effect called when new data is created");
    const apiCallFunc = async () => {
      try {
        const notesRes = await getNotesListApiFunc();
        //   console.log(notesRes, "In Home Component");
        setNotesList(notesRes);
        activeDisplayBtn==="all"&&setFilteredData(notesRes)
        // console.log(notesRes, "List in APP");
      } catch (err) {
        console.log("Error while calling API in Home Component");
        throw err;
      }
    };
    apiCallFunc();
  }, [isNotesUpdated]);

  useEffect(() => {
    console.log("Use Effect Called when filtered");
    const filteredNotesDataList = filterNotesDataFunc(
      notesList,
      activeDisplayBtn,
      calenderDate,
      searchText,
    );
    
    activeDisplayBtn==="all"?setFilteredData(notesList):setFilteredData(filteredNotesDataList);
  }, [activeDisplayBtn,calenderDate,isSearchClicked]);


  // console.log(filteredData);
  
  return (
    <div className="home-bg-container">
      <NotesDisBtnComponent
        calnderInput={setCalenderDate}
        clndrBtnFunc={updateCalenderStatus}
        actvBtnFunc={updateActvBtn}
        />
      <div className="notes-display-box">
        <NotesListComponent
         searchTextInpFunc={setSearchText}
          stateUpdateFunc={setNotesUpdate}
          activeBtn={activeDisplayBtn}
          notesListData={filteredData}
          actvBtnFunc={updateActvBtn}
          calnderInput={calenderDate}
          showSearchBar={setSearchClick}
        />
        <NotesInputComponent stateUpdateFunc={setNotesUpdate} />
      </div>
    </div>
  );
};
