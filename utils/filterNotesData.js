import { format } from "date-fns";

export const filterNotesDataFunc = (
      notesList,
      activeDisplayBtn,
      calenderDate,
      searchText,
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
    return notesList;
  };

  // Today list function

  const todayNotesFunc = () => {
    let todayDate = new Date();
    let filteredList = notesList.filter((eachNote) => {
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
    let filteredList = notesList.filter((eachNote) => {
      if (compareDatesFunc(todayDate, eachNote.created_at)) {
        return eachNote;
      }
    });
    return filteredList;
  };

  // Calling calender based filtering func

  const calenderFilterFunc = () => {
    let filteredList = notesList.filter((eachNote) => {
      if (compareDatesFunc(calenderDate, eachNote.created_at)) {
        return eachNote;
      }
    });
    return filteredList;
  };

  //Filter the notesList based on the search text

  const searchFilterFunc = () => {
    let filteredList = notesList.filter((eachNote) => {
      if (eachNote.title.toLowerCase() === searchText.toLowerCase()) {
        return eachNote;
      }
    });

    return filteredList;
  };

  // Calling appropriate filtering function

  const fetchNotesListFunc = () => {
    switch (activeDisplayBtn) {
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
      case "calender":
        return calenderFilterFunc();
        break;
      case "searchbar":
        return searchFilterFunc()
        break;
    }
  };

  // Getting filteredData

  let filterNotesList = fetchNotesListFunc();

  return filterNotesList;
};
