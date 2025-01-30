import axios from "axios";
import { addPerson, getPersonByID, updatePersonByID } from "./apiPersons";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/Users/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllUsers(
  PageNumber = 1,
  RowsPerPage = 10,
  filter = ""
) {
  try {
    const [count, usersResponse] = await Promise.all([
      CountUsers(filter),
      api.get(`AllUsers/${PageNumber}/${RowsPerPage}/${filter}`),
    ]);

    const users = usersResponse?.data || [];

    return { users, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No users found for the given parameters.");
        return { users: [], count: 0 };
      }
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching users:", error.message);
    }

    throw new Error("Failed to fetch users. Please try again later.");
  }
}

export async function CountUsers(filter) {
  try {
    const response = await api.get(`Count/Users/${filter}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No users found.");
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
      console.error("Error fetching users:", error.message);
    }

    throw new Error("Failed to fetch users. Please try again later.");
  }
}

export async function searchUsers(Culomn, ValueSearch) {
  try {
    const response = await api.get(`AllUsers/${Culomn}/${ValueSearch}`);

    if (response?.data?.length === 0) {
      console.warn("No users found for the given search parameters.");
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No users found for the given search parameters.");
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
      console.error("Error searching users:", error.message);
    }

    throw new Error("Failed to search users. Please try again later.");
  }
}

export async function getUserByID(UserID) {
  try {
    const response = await api.get(`GetUser/${UserID}`);

    if (!response?.data) {
      throw new Error(`User with ID ${UserID} not found.`);
    }

    const PersonData = await getPersonByID(response.data.personID);

    if (!PersonData) {
      throw new Error(`Person data for User ID ${UserID} not found.`);
    }

    const { userID, userName, password, permission, isActive } = response.data;
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
    const userDetails = {
      personID,
      name,
      address,
      phone,
      dateOfBirth,
      gender,
      email,
      image,
      userID,
      userName,
      password,
      permission,
      isActive,
    };
    return userDetails;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`User with ID ${UserID} not found.`);
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
      console.error("Error fetching User by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch user with ID ${UserID}. Please try again later.`
    );
  }
}

export async function addUser(newUser, newPerson) {
  try {
    const personID = await addPerson(newPerson);

    if (!personID) {
      throw new Error("Failed to create a new person. No personID returned.");
    }

    newUser.personID = personID;
    const response = await api.post("AddUser", newUser);

    if (!response.data.userID) {
      throw new Error("Failed to add a new user. No userID returned.");
    }

    return response.data.userID;
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
      console.error("Error adding user:", error.message);
    }

    throw new Error(
      "An error occurred while adding a user. Please try again later."
    );
  }
}

export async function updateUserByID(
  updateUser,
  UserID,
  oldImageUrl,
  updatePerson
) {
  if (!updateUser || !updatePerson || !UserID || !oldImageUrl) {
    throw new Error(
      "Invalid input data. Ensure all required fields are provided."
    );
  }
  try {
    const updatedPerson = await updatePersonByID(
      updatePerson,
      updateUser.personID,
      oldImageUrl
    );

    if (!updatedPerson) {
      throw new Error("Failed to update person details.");
    }

    const response = await api.put(`UpdateUser/${UserID}`, updateUser);

    if (response?.status !== 200) {
      throw new Error("Failed to update user details.");
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
      console.error("Error updating user:", error.message);
    }

    throw new Error(
      "An error occurred while updating user details. Please try again later."
    );
  }
}

export async function deleteUserByID(UserID) {
  try {
    if (!UserID) {
      throw new Error("UserID is required to delete the User.");
    }

    const response = await api.delete(`DeleteUser/${UserID}`);

    if (response?.status !== 200) {
      throw new Error("Failed to delete the user. Please try again later.");
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
      console.error("Error deleting user:", error.message);
    }

    throw new Error(
      "An error occurred while deleting the user. Please try again later."
    );
  }
}

export async function CheckUsername(userName) {
  try {
    if (!userName) {
      throw new Error("UserName  is required to check the User.");
    }

    const response = await api.get(`existsUserBy/${userName}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Server error: ${error.response.status} - ${
        error.response.data?.message || error.message
      }`
    );
    if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching User:", error.message);
    }

    throw new Error(`Failed to fetch user. Please try again later.`);
  }
}

export async function getUserByUserNameAndPassword(UserName, Password) {
  try {
    if (!UserName || !Password) {
      throw new Error("UserName and Password is required to check the User.");
    }

    const response = await api.get(`GetUser/${UserName}/${Password}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`user not found.`);
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching User:", error.message);
    }

    throw new Error(`Failed to fetch user. Please try again later.`);
  }
}

export async function Logout() {
  const logout = "###";
  try {
    const response = await api.get(`existsUserBy/${logout}`);
    return !response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return true;
    } else {
      console.error("Error exists User:", error);
      throw error;
    }
  }
}
