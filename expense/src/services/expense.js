import axios from "axios";
import conf from "../../config";

export const getExpenses = async (userId, token) => {
  console.log("userId", userId, "token", token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `${conf.baseUrl}/api/expenses/${userId}`,
    config
  );

  return response;
};

export const addExpense = async (userId, token, body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${conf.baseUrl}/api/expenses/${userId}`,
    body,
    config
  );
  return response;
};

export const deleteExpense = async (userId, token, expenseId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${conf.baseUrl}/api/expenses/${expenseId}/${userId}`,
    config
  );
  return response;
};
