import axios from "axios";
import { addPerson, getPersonByID, updatePersonByID } from "./apiPersons";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/Members/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllMembersPerPage(
  pageNumber = 1,
  rowsPerPage = 10,
  filter = ""
) {
  try {
    const [count, membersResponse] = await Promise.all([
      CountMembers(filter),
      api.get(`AllMembers/${pageNumber}/${rowsPerPage}/${filter}`),
    ]);

    const members = membersResponse?.data || [];

    return { members, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No members found for the given parameters.");
        return { members: [], count: 0 };
      }
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching members:", error.message);
    }

    throw new Error("Failed to fetch members. Please try again later.");
  }
}

export async function getAllMembersTrainedByInstructorID(
  InstructorID,
  PageNumber,
  RowsPerPage
) {
  try {
    const [count, membersResponse] = await Promise.all([
      Count(InstructorID),
      api.get(
        `GetAllMembersTrainedBy/${InstructorID}/${PageNumber}/${RowsPerPage}`
      ),
    ]);

    const members = membersResponse?.data || [];

    return { members, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No members found.");
        return { members: [], count: 0 };
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching members:", error.message);
    }

    throw new Error("Failed to fetch members. Please try again later.");
  }
}

export async function CountMembers(filter) {
  try {
    const response = await api.get(`CountMembers/${filter}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No members found.");
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
      console.error("Error fetching members:", error.message);
    }

    throw new Error("Failed to fetch members. Please try again later.");
  }
}

export async function Count(InstructorID) {
  try {
    const response = await api.get(`Count/Members/${InstructorID}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`No members found for Instructor ID: ${InstructorID}`);
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
      console.error("Error fetching member count:", error.message);
    }

    throw new Error("Failed to fetch member count. Please try again later.");
  }
}
export async function searchMembers(column, valueSearch) {
  try {
    const response = await api.get(`AllMembers/${column}/${valueSearch}`);

    if (response?.data?.length === 0) {
      console.warn("No members found for the given search parameters.");
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No members found for the given search parameters.");
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
      console.error("Error searching members:", error.message);
    }

    throw new Error("Failed to search members. Please try again later.");
  }
}

export async function getMemberByID(MemberID) {
  try {
    const response = await api.get(`GetMember/${MemberID}`);

    if (!response?.data) {
      throw new Error(`Member with ID ${MemberID} not found.`);
    }

    const PersonData = await getPersonByID(response.data.personID);

    if (!PersonData) {
      throw new Error(`Person data for Member ID ${MemberID} not found.`);
    }

    const {
      memberID,
      emergencyContactInfo: emeragencyContact,
      lastBeltRankID: lastBeltRank,
      isActive,
    } = response.data;

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

    const memberDetails = {
      personID,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image,
      memberID,
      emeragencyContact,
      lastBeltRank,
      isActive,
    };

    return memberDetails;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`Member with ID ${MemberID} not found.`);
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
      console.error("Error fetching member by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch member with ID ${MemberID}. Please try again later.`
    );
  }
}

export async function addMember(newMember, newPerson) {
  try {
    const personID = await addPerson(newPerson);
    if (!personID) {
      throw new Error("Failed to create a new person. No personID returned.");
    }
    newMember.personID = personID;

    const response = await api.post("AddMember", newMember);

    if (!response?.data?.memberID) {
      throw new Error("Failed to add a new member. No memberID returned.");
    }

    return response.data.memberID;
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
      console.error("Error adding Member:", error.message);
    }

    throw new Error(
      "An error occurred while adding a member. Please try again later."
    );
  }
}

export async function updateMemberByID(
  updateMember,
  MemberID,
  oldImageUrl,
  updatePerson
) {
  try {
    if (!updateMember || !updatePerson || !MemberID || !oldImageUrl) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }
    const updatedPerson = await updatePersonByID(
      updatePerson,
      updateMember.personID,
      oldImageUrl
    );
    if (!updatedPerson) {
      throw new Error("Failed to update person details.");
    }

    const response = await api.put(`UpdateMember/${MemberID}`, updateMember);

    if (response?.status !== 200) {
      throw new Error("Failed to update member details.");
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
      console.error("Error updating member:", error.message);
    }

    throw new Error(
      "An error occurred while updating member details. Please try again later."
    );
  }
}

export async function deleteMemberByID(MemberID) {
  try {
    if (!MemberID) {
      throw new Error("MemberID is required to delete the member.");
    }
    const response = await api.delete(`DeleteMember/${MemberID}`);

    if (response?.status !== 200) {
      throw new Error("Failed to delete the member. Please try again later.");
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
      console.error("Error deleting member:", error.message);
    }

    throw new Error(
      "This record cannot be deleted because it has a foreign key constraint linked to another table."
    );
  }
}
