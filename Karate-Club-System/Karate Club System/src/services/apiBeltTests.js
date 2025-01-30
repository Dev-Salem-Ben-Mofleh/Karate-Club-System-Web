import axios from "axios";
import { addPayment } from "./apiPayments";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/BeltTest/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllTests(PageNumber = 1, RowsPerPage = 10) {
  try {
    const [count, testsResponse] = await Promise.all([
      CountBeltTests(),
      api.get(`AllBeltTests/${PageNumber}/${RowsPerPage}`),
    ]);

    const tests = testsResponse?.data || [];

    return { tests, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltTests found for the given parameters.");
        return { tests: [], count: 0 };
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching beltTests:", error.message);
    }

    throw new Error("Failed to fetch beltTests. Please try again later.");
  }
}

export async function getAllTestByMemberID(MemberID, PageNumber, RowsPerPage) {
  try {
    const [count, beltTestsResponse] = await Promise.all([
      Count(MemberID),
      api.get(`AllBeltTestsBy/${MemberID}/${PageNumber}/${RowsPerPage}`),
    ]);

    const tests = beltTestsResponse?.data || [];
    return { tests, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltTests found.");
        return { tests: [], count: 0 };
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching beltTests:", error.message);
    }

    throw new Error("Failed to fetch beltTests. Please try again later.");
  }
}

export async function CountBeltTests() {
  try {
    const response = await api.get(`CountBeltTests`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltTests found.");
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
      console.error("Error fetching beltTests:", error.message);
    }

    throw new Error("Failed to fetch beltTests. Please try again later.");
  }
}

export async function Count(MemberID) {
  try {
    const response = await api.get(`CountBeltTestsForMember/${MemberID}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`No beltTests found for member ID: ${MemberID}`);
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
      console.error("Error fetching beltTests count:", error.message);
    }

    throw new Error("Failed to fetch beltTests count. Please try again later.");
  }
}

export async function searchBeltTests(Culomn, ValueSearch) {
  try {
    const response = await api.get(`SearchBeltTests/${Culomn}/${ValueSearch}`);

    if (response?.data?.length === 0) {
      console.warn("No beltTests found for the given search parameters.");
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No beltTests found for the given search parameters.");
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
      console.error("Error searching beltTests:", error.message);
    }

    throw new Error("Failed to search beltTests. Please try again later.");
  }
}

export async function getCountBeltTestsAfterDate(toDate) {
  try {
    const response = await api.get(`GetBeltTestAfterDate/${toDate}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No tests found.");
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
      console.error("Error fetching tests:", error.message);
    }

    throw new Error("Failed to fetch tests. Please try again later.");
  }
}

export async function getBeltTestByID(TestID) {
  try {
    const response = await api.get(`GetBeltTest/${TestID}`);

    if (!response?.data) {
      throw new Error(`BeltTest with ID ${TestID} not found.`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`beltTests with ID ${TestID} not found.`);
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
      console.error("Error fetching beltTests by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch beltTests with ID ${TestID}. Please try again later.`
    );
  }
}

export async function addBeltTest(newBeltTest, payment) {
  try {
    newBeltTest.paymentID = await addPayment(payment);
    const response = await api.post("AddBeltTest", newBeltTest);

    if (!response?.data?.testID) {
      throw new Error("Failed to add a new beltTest. No testID returned.");
    }

    return response?.data?.testID;
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
      console.error("Error adding beltTest:", error.message);
    }

    throw new Error(
      "An error occurred while adding a beltTest. Please try again later."
    );
  }
}

export async function updateBeltTestByID(updateBeltTest) {
  try {
    if (!updateBeltTest) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }

    const response = await api.put(
      `UpdateBeltTest/${updateBeltTest.testID}`,
      updateBeltTest
    );

    if (response?.status !== 200) {
      throw new Error("Failed to update beltTest details.");
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
      console.error("Error updating beltTest:", error.message);
    }

    throw new Error(
      "An error occurred while updating beltTest details. Please try again later."
    );
  }
}

export async function deleteBeltTestByID(TestID) {
  try {
    if (!TestID) {
      throw new Error("TestID is required to delete the member.");
    }

    const response = await api.delete(`DeleteBeltTest/${TestID}`);
    if (response?.status !== 200) {
      throw new Error("Failed to delete the beltTest. Please try again later.");
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
      console.error("Error deleting beltTest:", error.message);
    }

    throw new Error(
      "This record cannot be deleted because it has a foreign key constraint linked to another table."
    );
  }
}
