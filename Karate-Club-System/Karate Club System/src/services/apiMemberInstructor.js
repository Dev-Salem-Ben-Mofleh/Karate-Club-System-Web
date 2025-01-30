import axios from "axios";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/MemberInstructor/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllMemberInstructors(
  PageNumber = 1,
  RowsPerPage = 10
) {
  try {
    const [count, memberInstructorsResponse] = await Promise.all([
      CountMemberInstructors(),
      api.get(`AllMemberInstructors/${PageNumber}/${RowsPerPage}`),
    ]);

    const memberInstructors = memberInstructorsResponse?.data || [];

    return { memberInstructors, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No memberInstructors found for the given parameters.");
        return { memberInstructors: [], count: 0 };
      }
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching memberInstructors:", error.message);
    }

    throw new Error(
      "Failed to fetch memberInstructors. Please try again later."
    );
  }
}

export async function CountMemberInstructors() {
  try {
    const response = await api.get("Count/MemberInstructor");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`No MemberInstructor found`);
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
      console.error("Error fetching MemberInstructor count:", error.message);
    }

    throw new Error(
      "Failed to fetch MemberInstructor count. Please try again later."
    );
  }
}
export async function searchMemberInstructors(Culomn, ValueSearch) {
  try {
    const response = await api.get(
      `SearchMemberInstructors/${Culomn}/${ValueSearch}`
    );

    if (response?.data?.length === 0) {
      console.warn(
        "No MemberInstructors found for the given search parameters."
      );
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(
          "No MemberInstructors found for the given search parameters."
        );
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
      console.error("Error searching MemberInstructors:", error.message);
    }

    throw new Error(
      "Failed to search MemberInstructors. Please try again later."
    );
  }
}
export async function getMemberInstructorByID(memberInstructorID) {
  try {
    const response = await api.get(`GetMemberInstructor/${memberInstructorID}`);

    if (!response?.data) {
      throw new Error(
        `memberInstructor with ID ${memberInstructorID} not found.`
      );
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(
          `memberInstructor with ID ${memberInstructorID} not found.`
        );
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
      console.error("Error fetching memberInstructor by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch memberInstructor with ID ${memberInstructorID}. Please try again later.`
    );
  }
}

export async function addMemberInstructor(newMemberInstructor) {
  try {
    const response = await api.post("AddMemberInstructor", newMemberInstructor);

    if (!response?.data?.memberInstructorID) {
      throw new Error(
        "Failed to add a new MemberInstructor. No memberInstructorID returned."
      );
    }

    return response.data.memberInstructorID;
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
      console.error("Error adding MemberInstructor:", error.message);
    }

    throw new Error(
      "An error occurred while adding a MemberInstructor. Please try again later."
    );
  }
}

export async function updateMemberInstructorByID(updateMemberInstructor) {
  try {
    if (!updateMemberInstructor) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }

    const response = await api.put(
      `UpdateMemberInstructor/${updateMemberInstructor.memberInstructorID}`,
      updateMemberInstructor
    );

    if (response?.status !== 200) {
      throw new Error("Failed to update memberInstructor details.");
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
      console.error("Error updating memberInstructor:", error.message);
    }

    throw new Error(
      "An error occurred while updating memberInstructor details. Please try again later."
    );
  }
}

export async function deleteMemberInstructorByID(memberInstructorID) {
  try {
    if (!memberInstructorID) {
      throw new Error(
        "memberInstructorID is required to delete the memberInstructor."
      );
    }

    const response = await api.delete(
      `DeleteMemberInstructor/${memberInstructorID}`
    );

    if (response?.status !== 200) {
      throw new Error(
        "Failed to delete the memberInstructor. Please try again later."
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
      console.error("Error deleting memberInstructor:", error.message);
    }

    throw new Error(
      "An error occurred while deleting the memberInstructor. Please try again later."
    );
  }
}

export async function CheckMemberHasSameInstructor(MemberID, InstructorID) {
  try {
    if (!MemberID || !InstructorID) {
      throw new Error(
        "memberID and InstructorID is required to check the memberInstructor."
      );
    }

    const response = await api.get(
      `CheckMemberHasSameInstructor/${MemberID}/${InstructorID}`
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      console.warn(`member Or Instructor not found.`);
      return false;
    }

    if (error.response) {
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetch memberInstructor:", error.message);
    }

    throw new Error(
      "An error occurred while fetch the memberInstructor. Please try again later."
    );
  }
}
