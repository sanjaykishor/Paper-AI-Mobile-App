// This file contains the functions to interact with the API
const API_BASE_URL = 'https://paper-ai-backend.onrender.com/api';

export const loginUser = async (rollNo, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rollNo, password }),
  });
  console.log(response);
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const fetchEvaluationResults = async (rollNo, token) => {
  const response = await fetch(`${API_BASE_URL}/results/${rollNo}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch evaluation results');
  return response.json();
};

export const saveResult = async (formData, token) => {
  const response = await fetch(`${API_BASE_URL}/save`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to save result');
  return response.json();
};