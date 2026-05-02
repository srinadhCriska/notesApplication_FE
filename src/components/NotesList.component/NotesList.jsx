// import { getNotesListApiFunc } from "../../service/notesApiList"
import { deletedNotesListApiFunc } from "../../service/notesApiList";
import { NotesItemComponent } from "../NotesItem.component/NotesItem";
import "./NotesList.css";
deletedNotesListApiFunc;
import { format } from "date-fns";

export const NotesListComponent = ({
  notesListData,
  activeBtn,
  calnderInput,
  showCalender,
  stateUpdateFunc,
}) => {
  // console.log("Notes List Called",notesListData)
  //   console.log(showCalender, calnderInput);

  let frstTestText = activeBtn[0].toUpperCase() + activeBtn.slice(1);
  let finalTestText = showCalender
    ? `${format(calnderInput, "dd-MM-yyyy")}`
    : frstTestText;
  return (
    <div className="notes-list-box">
      <h1 className="notes-list-header">{finalTestText} Notes</h1>
      <ul className="notes-list-items-box">
        {notesListData &&
          notesListData.map((eachNotes, index) => {
            return (
              <NotesItemComponent
                key={index}
                delBtnFunc={stateUpdateFunc}
                eachNotesDetails={eachNotes}
              />
            );
          })}
        {notesListData.length === 0 && <p>Notes not available</p>}
      </ul>
    </div>
  );
};
