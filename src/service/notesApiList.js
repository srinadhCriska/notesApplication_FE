import axios from "axios";
import toast from "react-hot-toast";

export const createNewNotesApiFunc = async (notesData) => {
  try {
    const apiResponse = await axios.post(
      "http://localhost:3003/addNewNotes",
      notesData,
    );
    return apiResponse
    // console.log(apiResponse);
  } catch (err) {
    console.log("Error while making post api call in service", err);
    throw err;
  }
};

export const getNotesListApiFunc = async () => {
  try {
    const dbResponse = await axios.get("http://localhost:3003/");
    //  console.log(dbResponse.data.notesData)
    return dbResponse.data.notesData;
    
  } catch (e) {
    console.log("Error occured whil making get api call in service", e);
    throw e;
  }
};

export const updateNotesListApiFunc = async (notesData) => {
  try {
    const dbResponse = await axios.patch(
      "http://localhost:3003/updateNotes",
      notesData,
    );
    return dbResponse
    //  console.log(dbResponse.data.notesData)
    return dbResponse.data.notesData;
  } catch (e) {
    console.log("Error occured whil making patch api call in service", e);
    throw e;
  }
};

export const deletedNotesListApiFunc = async (notesData) => {
  console.log(notesData.id, "Del Id received from the frontEnd");

  try {
    const dbResponse=await axios.delete(`http://localhost:3003/delNotes/${notesData.id}`);
    //  console.log(dbResponse.data.notesData)
    return dbResponse
  } catch (e) {
    console.log("Error occured whil making delete api call in service", e);
    throw e;
  }
};
