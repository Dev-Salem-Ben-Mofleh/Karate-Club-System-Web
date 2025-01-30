import axios from "axios";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/BeltRanks/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllBeltRanks(PageNumber = 1, RowsPerPage = 10) {
  try {
    const count = await CountBeltRanks();
    const response = await api.get(`AllBeltRanks/${PageNumber}/${RowsPerPage}`);
    const beltRanks = response.data;
    return { beltRanks, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltRanks found for the given parameters.");
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
      console.error("Error fetching beltRanks:", error.message);
    }

    throw new Error("Failed to fetch beltRanks. Please try again later.");
  }
}

export async function getAllBeltRanksforShowMembers(
  PageNumber = 1,
  RowsPerPage = 17
) {
  try {
    const response = await api.get(`AllBeltRanks/${PageNumber}/${RowsPerPage}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltRanks found for the given parameters.");
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
      console.error("Error fetching beltRanks:", error.message);
    }

    throw new Error("Failed to fetch beltRanks. Please try again later.");
  }
}

export async function CountBeltRanks() {
  try {
    const response = await api.get(`CountBeltRanks`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltRanks found.");
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
      console.error("Error fetching beltRanks:", error.message);
    }

    throw new Error("Failed to fetch beltRanks. Please try again later.");
  }
}

export async function searchBeltRanks(Culomn, ValueSearch) {
  try {
    const response = await api.get(`SearchBeltRanks/${Culomn}/${ValueSearch}`);

    if (response?.data?.length === 0) {
      console.warn("No BeltRanks found for the given search parameters.");
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No BeltRanks found for the given search parameters.");
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
      console.error("Error searching BeltRanks:", error.message);
    }

    throw new Error("Failed to search BeltRanks. Please try again later.");
  }
}
export async function getBeltRankByID(RankID) {
  try {
    const response = await api.get(`GetBeltRank/${RankID}`);
    if (!response?.data) {
      throw new Error(`BeltRank with ID ${RankID} not found.`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`BeltRank with ID ${RankID} not found.`);
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
      console.error("Error fetching BeltRank by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch BeltRank with ID ${RankID}. Please try again later.`
    );
  }
}

export async function addBeltRank(newBeltRank) {
  try {
    const response = await api.post("AddBeltRank", newBeltRank);

    if (!response?.data?.rankID) {
      throw new Error("Failed to add a new beltRank. No memberID returned.");
    }

    return response.data.rankID;
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
      console.error("Error adding beltRank:", error.message);
    }

    throw new Error(
      "An error occurred while adding a beltRank. Please try again later."
    );
  }
}

export async function updateBeltRankByID(updateBeltRank) {
  try {
    const response = await api.put(
      `UpdateBeltRank/${updateBeltRank.rankID}`,
      updateBeltRank
    );

    if (response?.status !== 200) {
      throw new Error("Failed to update beltRank details.");
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
      console.error("Error updating beltRank:", error.message);
    }

    throw new Error(
      "An error occurred while updating beltRank details. Please try again later."
    );
  }
}

export async function deleteBeltRankByID(RankID) {
  try {
    const response = await api.delete(`DeleteBeltRank/${RankID}`);
    if (response?.status !== 200) {
      throw new Error("Failed to delete the beltRank. Please try again later.");
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
      console.error("Error deleting beltRank:", error.message);
    }

    throw new Error(
      "An error occurred while deleting the beltRank. Please try again later."
    );
  }
}
