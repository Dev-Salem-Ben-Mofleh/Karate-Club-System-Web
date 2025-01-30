import axios from "axios";
import { addPerson, getPersonByID, updatePersonByID } from "./apiPersons";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/Instructor",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllInstructors(PageNumber = 1, RowsPerPage = 10) {
  try {
    const [count, instructorResponse] = await Promise.all([
      CountInstructors(),
      api.get(`AllInstructors/${PageNumber}/${RowsPerPage}`),
    ]);

    const instructors = instructorResponse?.data || [];

    return { instructors, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No instructors found for the given parameters.");
        return { instructors: [], count: 0 };
      }
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching instructors:", error.message);
    }

    throw new Error("Failed to fetch instructors. Please try again later.");
  }
}
export async function CountInstructors() {
  try {
    const response = await api.get("Count/Instructors");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No Instructors found.");
        return 0;
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching Instructors:", error.message);
    }

    throw new Error("Failed to fetch Instructors. Please try again later.");
  }
}

export async function searchInstructors(Culomn, ValueSearch) {
  try {
    const response = await api.get(
      `GetAllInstructors/${Culomn}/${ValueSearch}`
    );

    if (response?.data?.length === 0) {
      console.warn("No instructors found for the given search parameters.");
      return [];
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No instructors found for the given search parameters.");
        return [];
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error searching instructors:", error.message);
    }

    throw new Error("Failed to search instructors. Please try again later.");
  }
}

export async function getInstructorByID(InstructorID) {
  try {
    const response = await api.get(`GetInstructor/${InstructorID}`);

    if (!response?.data) {
      throw new Error(`Instructor with ID ${InstructorID} not found.`);
    }

    const PersonData = await getPersonByID(response.data.personID);

    if (!PersonData) {
      throw new Error(
        `Person data for Instructor ID ${InstructorID} not found.`
      );
    }

    const { instructorID, qualification } = response.data;
    const {
      personID,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      imagePath: image,
    } = PersonData;
    const instructorDetails = {
      personID,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image,
      instructorID,
      qualification,
    };
    return instructorDetails;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`Instructor with ID ${InstructorID} not found.`);
        return null;
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching Instructor by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch Instructor with ID ${InstructorID}. Please try again later.`
    );
  }
}

export async function addInstructor(newInstructor, newPerson) {
  try {
    const personID = await addPerson(newPerson);
    if (!personID) {
      throw new Error("Failed to create a new person. No personID returned.");
    }
    newInstructor.personID = personID;
    const response = await api.post("AddInstructor", newInstructor);

    if (!response?.data?.instructorID) {
      throw new Error(
        "Failed to add a new instructor. No instructorID returned."
      );
    }

    return response?.data?.memberID;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error adding instructor:", error.message);
    }

    throw new Error(
      "An error occurred while adding a instructor. Please try again later."
    );
  }
}

export async function updateInstructorByID(
  updateInstructor,
  InstructorID,
  oldImageUrl,
  updatePerson
) {
  try {
    if (!updateInstructor || !updatePerson || !InstructorID || !oldImageUrl) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }

    await updatePersonByID(
      updatePerson,
      updateInstructor.personID,
      oldImageUrl
    );

    if (!updatePerson) {
      throw new Error("Failed to update person details.");
    }

    const response = await api.put(
      `UpdateInstructor/${InstructorID}`,
      updateInstructor
    );

    if (response?.status !== 200) {
      throw new Error("Failed to update instructor details.");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error updating instructor:", error.message);
    }

    throw new Error(
      "An error occurred while updating instructor details. Please try again later."
    );
  }
}

export async function deleteInstructorByID(InstructorID) {
  try {
    if (!InstructorID) {
      throw new Error("InstructorID is required to delete the instructor.");
    }

    const response = await api.delete(`DeleteinstInstructor/${InstructorID}`);

    if (response?.status !== 200) {
      throw new Error(
        "Failed to delete the instructor. Please try again later."
      );
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error deleting instructor:", error.message);
    }

    throw new Error(
      "This record cannot be deleted because it has a foreign key constraint linked to another table."
    );
  }
}
