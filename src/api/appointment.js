import axios from 'axios';

// Create Appointment (POST /api/appointments/create)
export const createAppointment = async (appointmentData) => {
  const payload = {
    name: appointmentData.name,
    email: appointmentData.email,
    mobile_number: appointmentData.mobile_number,
    medical_issue: appointmentData.medicalIssues,
    message: appointmentData.dietConcern || null,
    status: 'active',
  };

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/appointments/create`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data; // Expected: "Appointment created"
};

// Get Active Appointment (GET /api/appointments/active)
export const getActiveAppointment = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/appointments/active`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data; // Expected: appointment data or string
};

// Delete Appointment (DELETE /api/appointments/delete/{appointment_id})
export const deleteAppointment = async (appointmentId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_BASE_URL}/appointments/delete/${appointmentId}`
  );
  return response.data; // Expected: "Appointment deleted"
};

// Update Appointment (PUT /api/appointments/update/{appointment_id})
export const updateAppointment = async (appointmentId, updateData) => {
  const payload = {
    status: updateData.status || 'active',
    medical_issue: updateData.medicalIssues,
    message: updateData.message || null,
  };

  const response = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/appointments/update/${appointmentId}`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data; // Expected: "Appointment updated"
};