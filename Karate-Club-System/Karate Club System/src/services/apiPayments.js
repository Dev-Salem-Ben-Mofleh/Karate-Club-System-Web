import axios from "axios";

const api = axios.create({
  baseURL: "https://karateapi.runasp.net/api/KarateAPI/Payments/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAllPayments(PageNumber = 1, RowsPerPage = 10) {
  try {
    const [count, paymentsResponse] = await Promise.all([
      CountPayments(),
      api.get(`AllPayments/${PageNumber}/${RowsPerPage}`),
    ]);

    const payments = paymentsResponse?.data || [];

    return { payments, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No payments found for the given parameters.");
        return { payments: [], count: 0 };
      }
      console.error(
        `Server error: ${error.response.status} - ${
          error.response.data?.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error("Error fetching payments:", error.message);
    }

    throw new Error("Failed to fetch payments. Please try again later.");
  }
}

export async function getPaymentsByMemberID(MemberID, PageNumber, RowsPerPage) {
  try {
    const [count, paymentsResponse] = await Promise.all([
      Count(MemberID),
      api.get(`AllPaymnetsBy/${MemberID}/${PageNumber}/${RowsPerPage}`),
    ]);

    const payments = paymentsResponse?.data || [];

    return { payments, count };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No payments found.");
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
      console.error("Error fetching payments:", error.message);
    }

    throw new Error("Failed to fetch payments. Please try again later.");
  }
}

export async function CountPayments() {
  try {
    const response = await api.get(`Count/Payments`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No payments found.");
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
      console.error("Error fetching payment:", error.message);
    }

    throw new Error("Failed to fetch payment. Please try again later.");
  }
}

export async function Count(MemberID) {
  try {
    const response = await api.get(`CountPayments/${MemberID}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`No payment found for Member ID: ${MemberID}`);
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
      console.error("Error fetching payment count:", error.message);
    }

    throw new Error("Failed to fetch payment count. Please try again later.");
  }
}

export async function searchPayments(Culomn, ValueSearch) {
  try {
    const response = await api.get(`SearchPayments/${Culomn}/${ValueSearch}`);

    if (response?.data?.length === 0) {
      console.warn("No payments found for the given search parameters.");
      return [];
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn("No payments found for the given search parameters.");
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
      console.error("Error searching payments:", error.message);
    }

    throw new Error("Failed to search payments. Please try again later.");
  }
}

export async function getPaymentByID(PaymentID) {
  try {
    const response = await api.get(`GetPayment/${PaymentID}`);

    if (!response?.data) {
      throw new Error(`Payment with ID ${PaymentID} not found.`);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`payment with ID ${PaymentID} not found.`);
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
      console.error("Error fetching payment by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch payment with ID ${PaymentID}. Please try again later.`
    );
  }
}

export async function GetPaymentPayForWhat(PaymentID, choose) {
  try {
    const response = await api.get(
      `GetPaymentPayForWhat/${PaymentID}/${choose}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.warn(`payment with ID ${PaymentID} not found.`);
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
      console.error("Error fetching payment by ID:", error.message);
    }

    throw new Error(
      `Failed to fetch payment with ID ${PaymentID}. Please try again later.`
    );
  }
}

export async function addPayment(newPayment) {
  try {
    const response = await api.post("AddPayment", newPayment);

    if (!response?.data?.paymentID) {
      throw new Error("Failed to add a new payment. No paymentID returned.");
    }
    return response.data.paymentID;
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
      console.error("Error adding payment:", error.message);
    }

    throw new Error(
      "An error occurred while adding a payment. Please try again later."
    );
  }
}

export async function updatePaymentByID(updatePayment) {
  try {
    if (!updatePayment) {
      throw new Error(
        "Invalid input data. Ensure all required fields are provided."
      );
    }

    const response = await api.put(
      `UpdatePayment/${updatePayment.paymentID}`,
      updatePayment
    );

    if (response?.status !== 200) {
      throw new Error("Failed to update payment details.");
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
      console.error("Error updating payment:", error.message);
    }

    throw new Error(
      "An error occurred while updating payment details. Please try again later."
    );
  }
}

export async function deletePaymentByID(PaymentID) {
  try {
    if (!PaymentID) {
      throw new Error("PaymentID is required to delete the payment.");
    }

    const response = await api.delete(`DeletePayment/${PaymentID}`);

    if (response?.status !== 200) {
      throw new Error("Failed to delete the payment. Please try again later.");
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
      console.error("Error deleting payment:", error.message);
    }

    throw new Error(
      "An error occurred while deleting the payment. Please try again later."
    );
  }
}
