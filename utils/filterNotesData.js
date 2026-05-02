import { format } from "date-fns";

export const filterNotesDataFunc = (
  notesDataList,
  activeBtnId,
  isCalenderClicked,
  calenderDate,
) => {
  // Comparing Dates Function
  const compareDatesFunc = (d1, d2) => {
    let currentDate = new Date(d1);
    let dBDate = new Date(d2);

    let res =
      currentDate.getFullYear() === dBDate.getFullYear() &&
      currentDate.getMonth() === dBDate.getMonth() &&
      currentDate.getDate() === dBDate.getDate();
    return res;
  };

  // All list function
  const allNotesFunc = () => {
    return notesDataList;
  };

  // Today list function

  const todayNotesFunc = () => {
    let todayDate = new Date();
    let filteredList = notesDataList.filter((eachNote) => {
      //   let eachNoteDate = formatDateFunc(eachNote.created_at);
      if (compareDatesFunc(todayDate, eachNote.created_at)) {
        return eachNote;
      }
    });
    return filteredList;
  };

  // Yesterday list function

  const yesterdayNotesFunc = () => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    let filteredList = notesDataList.filter((eachNote) => {
      if (compareDatesFunc(todayDate, eachNote.created_at)) {
        return eachNote;
      }
    });
    return filteredList;
  };

  // Calling calender based filtering func

  const calenderFilterFunc = () => {
    let filteredList = notesDataList.filter((eachNote) => {
      if (compareDatesFunc(calenderDate, eachNote.created_at)) {
        return eachNote;
      }
    });
    return filteredList;
  };

  // Calling Static Buttons  based filtering function

  const staticBtnFunc = () => {
    switch (activeBtnId) {
      case "all":
        return allNotesFunc();
        break;
      case "today":
        console.log("Called Today");
        return todayNotesFunc();
        break;
      case "yesterday":
        return yesterdayNotesFunc();
        break;
    }
  };

  // Calling the appropriate func

  const fetchNotesListFunc = () => {
    return isCalenderClicked ? calenderFilterFunc() : staticBtnFunc();
  };

  // Getting filteredData

  let filterNotesList = fetchNotesListFunc();

  return filterNotesList;
};
