import axios from "axios";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/Persons/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllPersons() {
  try {
    const response = await api.get("AllPerosns");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No persons found for the given parameters.");
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
      console.error("Error fetching persons:", error.message);
    }

    throw new Error("Failed to fetch persons. Please try again later.");
  }
}

export async function getPersonByID(PersonID) {
  try {
    const response = await api.get(`GetPersonBy/${PersonID}`);

    if (!response?.data) {
      throw new Error(`Person with ID ${PersonID} not found.`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`Person with ID ${PersonID} not found.`);
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
      console.error("Error fetching Person by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch person with ID ${PersonID}. Please try again later.`
    );
  }
}
export async function addPerson(newPerson) {
  try {
    if (newPerson.imagePath !== "") {
      const imageUrl = await uploadImage(newPerson.imagePath);
      newPerson.imagePath = imageUrl === "No Image" ? "" : imageUrl;
    } else newPerson.imagePath = "";

    const response = await api.post("AddPerson", newPerson);

    if (!response?.data?.personID) {
      throw new Error("Failed to add a new Person. No PersonID returned.");
    }

    return response.data.personID;
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
      console.error("Error adding Person:", error.message);
    }

    throw new Error(
      "An error occurred while adding a Person. Please try again later."
    );
  }
}

export async function updatePersonByID(updatePerson, PersonId, oldImageUrl) {
  try {
    if (!updatePerson || !PersonId || !oldImageUrl) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }
    //handleImages
    if (updatePerson.imagePath !== oldImageUrl) {
      if (updatePerson.imagePath !== "" && oldImageUrl !== "no_image") {
        const imageUrl = await updateImage(oldImageUrl, updatePerson.imagePath);
        updatePerson.imagePath = imageUrl === "No Image" ? "" : imageUrl;
      } else if (updatePerson.imagePath !== "" && oldImageUrl === "no_image") {
        const imageUrl = await uploadImage(updatePerson.imagePath);
        updatePerson.imagePath = imageUrl === "No Image" ? "" : imageUrl;
      }
      if (updatePerson.imagePath === "" && oldImageUrl !== "no_image") {
        DeleteImage(oldImageUrl);
        updatePerson.imagePath = "";
      }
    }

    const response = await api.put(`UpdatePerson/${PersonId}`, updatePerson);

    if (response?.status !== 200) {
      throw new Error("Failed to update person details.");
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
      console.error("Error updating perosn:", error.message);
    }

    throw new Error(
      "An error occurred while updating perosn details. Please try again later."
    );
  }
}

export async function deletePersonByID(PersonId) {
  try {
    if (!PersonId) {
      throw new Error("PersonId is required to delete the Person.");
    }
    const response = await api.delete(`DeletePerson/${PersonId}`);

    if (response?.status !== 200) {
      throw new Error("Failed to delete the person. Please try again later.");
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
      console.error("Error deleting person:", error.message);
    }

    throw new Error(
      "An error occurred while deleting the person. Please try again later."
    );
  }
}

export async function uploadImage(imageFile) {
  try {
    const formData = new FormData();
    formData.append("ImageFile", imageFile);
    const response = await api.post("UploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error Upload Image:", error);
    throw error;
  }
}

export async function updateImage(oldImageUrl, imageFile) {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await api.put(
      `UpdateImage?oldImageUrl=${encodeURIComponent(oldImageUrl)}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error update Image:", error);
    throw error;
  }
}

export async function DeleteImage(ImageUrl) {
  try {
    const response = await api.delete(
      `DeleteImage?ImageUrl=${encodeURIComponent(ImageUrl)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error delete Image:", error);
    throw error;
  }
}
