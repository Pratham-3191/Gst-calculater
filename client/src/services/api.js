import axios from 'axios';

/**
 * Axios instance pre-configured with the API base URL.
 * The URL is read from the VITE_API_URL env variable at build time.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Save a calculation to the database.
 * @param {object} data - Calculation payload
 * @returns {Promise<object>} Created calculation
 */
export const saveCalculation = async (data) => {
  const response = await api.post('/calculations', data);
  return response.data;
};

/**
 * Fetch recent calculations from the database.
 * @param {number} [limit=20] - Number of results to fetch
 * @returns {Promise<Array>} Array of calculation objects
 */
export const getCalculations = async (limit = 20) => {
  const response = await api.get('/calculations', { params: { limit } });
  return response.data.data;
};

/**
 * Check API health status.
 * @returns {Promise<object>} Health status
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
