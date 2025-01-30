import axios from "axios";
import { addPayment } from "./apiPayments";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/SubscriptionPeriod/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllSubscriptionPeriods(
  PageNumber = 1,
  RowsPerPage = 10,
  filter = ""
) {
  try {
    const [count, periodsResponse] = await Promise.all([
      CountSubscriptionPeriods(filter),
      api.get(`AllSubscriptionPeriods/${PageNumber}/${RowsPerPage}/${filter}`),
    ]);

    const periods = periodsResponse?.data || [];

    return { periods, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No SubscriptionPeriods found for the given parameters.");
        return { periods: [], count: 0 };
      }
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching SubscriptionPeriods:", error.message);
    }

    throw new Error(
      "Failed to fetch SubscriptionPeriods. Please try again later."
    );
  }
}

export async function getPeriodMemberByID(MemberID, PageNumber, RowsPerPage) {
  try {
    const [count, periodsResponse] = await Promise.all([
      Count(MemberID),
      api.get(
        `AllSubscriptionPeriodsBy/${MemberID}/${PageNumber}/${RowsPerPage}`
      ),
    ]);

    const period = periodsResponse?.data || [];

    return { period, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No period found.");
        return { period: [], count: 0 };
      }

      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching period:", error.message);
    }

    throw new Error("Failed to fetch period. Please try again later.");
  }
}

export async function CountSubscriptionPeriods(filter) {
  try {
    const response = await api.get(`Count/SubscriptionPeriods/${filter}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No periods found.");
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
      console.error("Error fetching periods:", error.message);
    }

    throw new Error("Failed to fetch periods. Please try again later.");
  }
}

export async function Count(MemberID) {
  try {
    const response = await api.get(
      `CountSubscriptionPeriodsForMember/${MemberID}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`No periods found for Member ID: ${MemberID}`);
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

export async function getSubscriptionPeriodsByID(PeriodID) {
  try {
    const response = await api.get(`GetSubscriptionPeriod/${PeriodID}`);

    if (!response?.data) {
      throw new Error(`Period with ID ${PeriodID} not found.`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`Period with ID ${PeriodID} not found.`);
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
      console.error("Error fetching Period by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch Period with ID ${PeriodID}. Please try again later.`
    );
  }
}

export async function searchSubscriptionPeriods(Culomn, ValueSearch) {
  try {
    const response = await api.get(
      `AllSubscriptionPeriods/${Culomn}/${ValueSearch}`
    );

    if (response?.data?.length === 0) {
      console.warn("No period found for the given search parameters.");
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No period found for the given search parameters.");
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
      console.error("Error searching period:", error.message);
    }

    throw new Error("Failed to search period. Please try again later.");
  }
}

export async function CheckMemberHasPeriod(MemberID) {
  if (!MemberID) {
    throw new Error("memberID is required to check the member.");
  }
  try {
    const response = await api.get(`CheckMemberHasPeriod/${MemberID}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      console.warn(`member not found.`);
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
      console.error("Error fetch member:", error.message);
    }

    throw new Error(
      "An error occurred while fetch the member. Please try again later."
    );
  }
}

export async function CheckSubscriptionsIsNotPaid(MemberID) {
  try {
    if (!MemberID) {
      throw new Error("memberID is required to check the member.");
    }

    const response = await api.get(`CheckSubscriptionsIsNotPaid/${MemberID}`);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      console.warn(`member not found.`);
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
      console.error("Error fetch member:", error.message);
    }

    throw new Error(
      "An error occurred while fetch the member. Please try again later."
    );
  }
}

export async function addSubscriptionPeriod(newPeriod, payment) {
  try {
    if (newPeriod.paid) {
      newPeriod.paymentID = await addPayment(payment);
    }

    const response = await api.post("AddSubscriptionPeriod", newPeriod);

    if (!response?.data?.periodID) {
      throw new Error("Failed to add a new period. No periodID returned.");
    }
    return response.data.periodID;
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
      console.error("Error adding period:", error.message);
    }

    throw new Error(
      "An error occurred while adding a period. Please try again later."
    );
  }
}

export async function updateSubscriptionPeriodsByID(updatePeriod, payment) {
  try {
    if (!updatePeriod || !payment) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }

    if (updatePeriod.paid && updatePeriod.paymentID === null) {
      updatePeriod.paymentID = await addPayment(payment);
    }

    const response = await api.put(
      `UpdateSubscriptionPeriod/${updatePeriod.periodID}`,
      updatePeriod
    );

    if (response?.status !== 200) {
      throw new Error("Failed to update period details.");
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
      console.error("Error updating period:", error.message);
    }

    throw new Error(
      "An error occurred while updating period details. Please try again later."
    );
  }
}

export async function deleteSubscriptionPeriodsByID(PeriodID) {
  try {
    if (!PeriodID) {
      throw new Error("PeriodID is required to delete the Period.");
    }

    const response = await api.delete(`DeleteSubscriptionPeriod/${PeriodID}`);

    if (response?.status !== 200) {
      throw new Error("Failed to delete the Period. Please try again later.");
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
      console.error("Error deleting Period:", error.message);
    }

    throw new Error(
      "An error occurred while deleting the Period. Please try again later."
    );
  }
}

export async function getSubscriptionPeriodsAfterDate(toDate) {
  try {
    const response = await api.get(`GetSubscriptionPeriodsAfterDate/${toDate}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No period found.");
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
      console.error("Error fetching period:", error.message);
    }

    throw new Error("Failed to fetch period. Please try again later.");
  }
}

export async function getActiveSubscriptionPeriodAfterDate(toDate) {
  try {
    const response = await api.get(
      `GetSubscriptionPeriodsAfterDateAndActive/${toDate}`
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No period found.");
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
      console.error("Error fetching period:", error.message);
    }

    throw new Error("Failed to fetch period. Please try again later.");
  }
}
