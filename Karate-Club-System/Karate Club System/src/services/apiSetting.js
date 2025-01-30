import axios from "axios";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/Setting/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getPeriodDay() {
  try {
    const response = await api.get("PeriodDay");

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`no period days .`);
        return 30;
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching period day by ID:", error.message);
    }

    throw new Error(`Failed to fetch period day. Please try again later.`);
  }
}
