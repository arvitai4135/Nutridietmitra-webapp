import { useState, useEffect, useContext } from 'react';
import { Search, ChevronLeft, Calendar, Edit2, XCircle, Eye, Clock } from 'lucide-react';
import api from '../services/api'; // Adjust path to api.js
import { AuthContext } from '../context/AuthContext';

export default function AppointmentBooking() {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editFormData, setEditFormData] = useState({
    status: '',
    medical_issue: '',
    message: '',
  });

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const response = await api.get('/appointments/appointments');
        console.log('API Response:', response.data);
        const mappedAppointments = Array.isArray(response.data.data)
          ? response.data.data.map((item) => ({
              id: item.id || `#APPT${Math.floor(1000 + Math.random() * 9000)}`,
              name: item.name || 'Unknown',
              email: item.email || '',
              mobile: item.mobile_number || '',
              medicalIssue: item.medical_issue || '',
              dateTime: item.dates_time || '',
              duration: item.duration || '30 mins',
              status: item.status === 'active' ? 'Active' : 'Inactive',
              description: item.message || '',
            }))
          : [];
        setAppointments(mappedAppointments);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        const errorMessage =
          err.response?.status === 404
            ? 'No appointments found'
            : err.response?.status === 500
            ? 'Server error: Unable to fetch appointments. Please try again later.'
            : 'Failed to fetch appointments';
        setError(errorMessage);
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  // Update appointment via PUT API
  const updateAppointment = async (appointmentId, updatedData) => {
    try {
      const response = await api.put(`/appointments/update/${appointmentId}`, updatedData);
      return response.data;
    } catch (err) {
      console.error('Error updating appointment:', err);
      throw err.response?.status === 404
        ? new Error('Appointment not found')
        : err.response?.status === 422
        ? new Error('Validation error: Please check the provided data')
        : new Error('Failed to update appointment');
    }
  };

  // Handle status toggle with confirmation
  const handleToggleStatus = (appointment) => {
    setSelectedAppointment(appointment);
    setIsToggleModalOpen(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedAppointment) return;

    const newStatus = selectedAppointment.status === 'Active' ? 'inactive' : 'active';
    try {
      await updateAppointment(selectedAppointment.id, {
        status: newStatus,
        medical_issue: selectedAppointment.medicalIssue,
        message: selectedAppointment.description,
      });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, status: newStatus === 'active' ? 'Active' : 'Inactive' }
            : appointment
        )
      );
      setIsToggleModalOpen(false);
      setSelectedAppointment(null);
    } catch (err) {
      setError(err.message);
      setIsToggleModalOpen(false);
    }
  };

  // Handle edit button click
  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setEditFormData({
      status: appointment.status === 'Active' ? 'active' : 'inactive',
      medical_issue: appointment.medicalIssue,
      message: appointment.description,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit form changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    try {
      await updateAppointment(selectedAppointment.id, {
        status: editFormData.status,
        medical_issue: editFormData.medical_issue,
        message: editFormData.message,
      });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? {
                ...appointment,
                status: editFormData.status === 'active' ? 'Active' : 'Inactive',
                medicalIssue: editFormData.medical_issue,
                description: editFormData.message,
              }
            : appointment
        )
      );
      setIsEditModalOpen(false);
      setSelectedAppointment(null);
      setEditFormData({ status: '', medical_issue: '', message: '' });
    } catch (err) {
      setError(err.message);
      setIsEditModalOpen(false);
    }
  };

  // Apply filters to appointments
  const filteredAppointments = Array.isArray(appointments)
    ? appointments.filter((appointment) => {
        const matchesSearch =
          (appointment.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (appointment.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (appointment.mobile || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (appointment.medicalIssue || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (appointment.dateTime || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (appointment.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      })
    : [];

  // Get status badge style
  const getStatusBadgeStyle = (status) => {
    return status === 'Active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  };

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
      <p className="text-gray-500">Loading appointments...</p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <XCircle size={64} className="text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Error</h3>
      <p className="text-gray-500 text-center max-w-md">{error}</p>
      {error.includes('Authentication failed') && (
        <a href="/login" className="mt-4 text-blue-700 hover:underline">Go to Login</a>
      )}
    </div>
  );

  // Toggle Confirmation Modal
  const ToggleConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Confirm Status Change</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to {selectedAppointment?.status === 'Active' ? 'deactivate' : 'activate'} the appointment for{' '}
          {selectedAppointment?.name}?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsToggleModalOpen(false)}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmToggleStatus}
            className="px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  // Edit Modal
  const EditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Edit Appointment</h3>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={editFormData.status}
              onChange={handleEditFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Medical Issue</label>
            <input
              type="text"
              name="medical_issue"
              value={editFormData.medical_issue}
              onChange={handleEditFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={editFormData.message}
              onChange={handleEditFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 w-full max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button className="text-blue-700 hover:text-blue-600 flex items-center text-sm">
              <ChevronLeft size={16} className="mr-1" /> Dashboard
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Appointments Management</h1>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="relative lg:col-span-2">
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            disabled={isLoading}
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Appointments Count */}
      {!isLoading && !error && (
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">Showing {filteredAppointments.length} appointments</div>
        </div>
      )}

      {/* Render based on state */}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : filteredAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Calendar size={64} className="text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Found</h3>
          <p className="text-gray-500 text-center max-w-md">No appointments match your current filters.</p>
        </div>
      ) : (
        <>
          {/* Appointments Table - Desktop View */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medical Issue</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{appointment.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.mobile}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.medicalIssue}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.dateTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.duration}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(appointment.status)}`}>{appointment.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm flex space-x-2">
                      <button className="text-blue-700 hover:text-blue-600" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-blue-600"
                        title="Edit"
                        onClick={() => handleEditAppointment(appointment)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        title={appointment.status === 'Active' ? 'Deactivate' : 'Activate'}
                        onClick={() => handleToggleStatus(appointment)}
                      >
                        <XCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Appointments Cards - Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{appointment.name}</h3>
                    <p className="text-xs text-gray-500">{appointment.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(appointment.status)}`}>{appointment.status}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-sm">
                    <Calendar size={14} className="mr-2 mt-1 text-blue-500" />
                    <div>
                      <p className="text-gray-800">{appointment.dateTime}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" /> {appointment.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800">
                    <span className="text-gray-500">Email:</span> {appointment.email}
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="text-gray-500">Mobile:</span> {appointment.mobile}
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="text-gray-500">Medical Issue:</span> {appointment.medicalIssue}
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="text-gray-500">Description:</span> {appointment.description}
                  </p>
                </div>

                <div className="flex justify-end space-x-2 border-t pt-3">
                  <button className="p-1 text-blue-700 hover:text-blue-600" title="View Details">
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-blue-600"
                    title="Edit"
                    onClick={() => handleEditAppointment(appointment)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-red-500"
                    title={appointment.status === 'Active' ? 'Deactivate' : 'Activate'}
                    onClick={() => handleToggleStatus(appointment)}
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Showing 1-{filteredAppointments.length} of {filteredAppointments.length} appointments
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-500 bg-white disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600">1</button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-500 bg-white disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Render Modals */}
      {isToggleModalOpen && <ToggleConfirmationModal />}
      {isEditModalOpen && <EditModal />}
    </div>
  );
}