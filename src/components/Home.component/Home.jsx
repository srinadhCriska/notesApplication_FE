import { NotesInputComponent } from "../Notes.component/Notes";
import { NotesListComponent } from "../NotesList.component/NotesList";
import { NotesDisBtnComponent } from "../NotesDisplayButton.component/NotesDisplayButton";
import "./Home.styles.css";
import { useState, useEffect } from "react";
import { getNotesListApiFunc } from "../../service/notesApiList";

import { filterNotesDataFunc } from "../../../utils/filterNotesData";


export const HomeComponent = () => {
  const [notesList, setNotesList] = useState([]);
  const [isNotesUpdated, setNotesUpdate] = useState(0);
  const [activeDisplayBtn, updateActvBtn] = useState("all");
  const [isCalenderClicked, updateCalenderStatus] = useState(false);
  const [calenderDate, setCalenderDate] = useState(new Date());

  useEffect(() => {
    const apiCallFunc = async () => {
      try {
        const notesRes = await getNotesListApiFunc();
        //   console.log(notesRes, "In Home Component");
        setNotesList(notesRes);
        console.log(notesRes,"List in APP");
        

      } catch (err) {
        console.log("Error while calling API in Home Component");
        throw err;
      }
    };
    apiCallFunc();
  }, [isNotesUpdated]);

  const filteredNotesDataList = filterNotesDataFunc(
    notesList,
    activeDisplayBtn,
    isCalenderClicked,
    calenderDate,
  );
  return (
    <div className="home-bg-container">
      <NotesDisBtnComponent
        calnderInput={setCalenderDate}
        clndrBtnFunc={updateCalenderStatus}
        actvBtnFunc={updateActvBtn}
      />
      <div className="notes-display-box">
        <NotesListComponent
          stateUpdateFunc={setNotesUpdate}
          activeBtn={activeDisplayBtn}
          notesListData={filteredNotesDataList}
          showCalender={isCalenderClicked}
          calnderInput={calenderDate}
        />
        <NotesInputComponent stateUpdateFunc={setNotesUpdate} />
      </div>
    </div>
  );
};
