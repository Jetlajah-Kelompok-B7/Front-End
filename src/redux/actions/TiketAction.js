import axios from "axios";

export const GetTiket = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("/api/ticket?page=1&page_size=10");
    if (response.status === 200) {
      console.log("first", response?.data.data);
    }
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
