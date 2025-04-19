// src/services/appointmentService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createAppointment = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/appointments/create`, data);
    console.error(response);
    // The API response is expected to be an AdminAppointmentResponse object
    // with a 'data' property containing the created appointment object.
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error; // Re-throw the error for the component to handle
  }
};

export { createAppointment };