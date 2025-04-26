import { useState } from 'react';
import { Search, ChevronLeft, LogOut, Plus, Calendar, Edit2, XCircle, Eye, Clock, X } from 'lucide-react';

export default function AppointmentBooking() {
  const [appointments, setAppointments] = useState([
    {
      id: "#APPT1234",
      clientName: "John Doe",
      dietitian: "Dr. Sarah Smith",
      dateTime: "Apr 10, 2025, 10:00 AM",
      duration: "30 mins",
      // type: "Virtual",
      // status: "Confirmed"
    },
    {
      id: "#APPT1235",
      clientName: "Jane Smith",
      dietitian: "Dr. Michael Brown",
      dateTime: "Apr 11, 2025, 2:30 PM",
      duration: "45 mins",
      // type: "In-person",
      // status: "Pending"
    },
    {
      id: "#APPT1236",
      clientName: "Robert Johnson",
      dietitian: "Dr. Lisa Wong",
      dateTime: "Apr 12, 2025, 9:15 AM",
      duration: "60 mins",
      // type: "Phone",
      // status: "Cancelled"
    }
  ]);
  
  // For demo purposes - toggle to empty state
  const [showEmptyState, setShowEmptyState] = useState(false);
  
  // Form modal state
  const [showFormModal, setShowFormModal] = useState(false);
  
  // New appointment form data
  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    dietitian: '',
    date: '',
    time: '',
    duration: '30 mins',
    // type: 'Virtual',
    // status: 'Pending'
  });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  // const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [dietitianFilter, setDietitianFilter] = useState('All');
  
  // Apply filters to appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.dietitian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.dateTime.toLowerCase().includes(searchTerm.toLowerCase());
    
    // const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter;
    const matchesDietitian = dietitianFilter === 'All' || appointment.dietitian === dietitianFilter;
    
    // return matchesSearch && matchesStatus && matchesDietitian;
    return matchesSearch && matchesDietitian;
  });
  
  // Get status badge style based on status
  /*
  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'bg-green-500 text-white';
      case 'Pending':
        return 'bg-yellow-400 text-gray-800';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };
  */
  
  // Handle input changes for new appointment form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Submit new appointment
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format date and time
    const formattedDateTime = formatDateTime(newAppointment.date, newAppointment.time);
    
    // Generate a random ID
    const newId = `#APPT${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create new appointment object
    const appointmentData = {
      id: newId,
      clientName: newAppointment.clientName,
      dietitian: newAppointment.dietitian,
      dateTime: formattedDateTime,
      duration: newAppointment.duration,
      // type: newAppointment.type,
      // status: newAppointment.status
    };
    
    // Add to appointments array
    setAppointments(prev => [...prev, appointmentData]);
    
    // Reset form and close modal
    setNewAppointment({
      clientName: '',
      dietitian: '',
      date: '',
      time: '',
      duration: '30 mins',
      // type: 'Virtual',
      // status: 'Pending'
    });
    setShowFormModal(false);
    
    // Make sure empty state is hidden if it was shown
    if (showEmptyState) {
      setShowEmptyState(false);
    }
  };
  
  // Format date and time for display
  const formatDateTime = (date, time) => {
    if (!date || !time) return '';
    
    const dateObj = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    
    // Convert time to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${month} ${day}, ${year}, ${hour12}:${minutes} ${ampm}`;
  };
  
  // Toggle new appointment modal
  const handleNewAppointmentClick = () => {
    if (showEmptyState) {
      setShowEmptyState(false);
    }
    setShowFormModal(true);
  };
  
  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Calendar size={64} className="text-blue-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Scheduled</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        There are currently no appointments in the system. Create a new appointment to get started.
      </p>
      <button 
        className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center transition-colors"
        onClick={handleNewAppointmentClick}
      >
        <Plus size={18} className="mr-2" />
        Schedule New Appointment
      </button>
    </div>
  );
  
  // Form Modal Component
  const AppointmentFormModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Schedule New Appointment</h2>
          <button 
            onClick={() => setShowFormModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
              <input
                type="text"
                name="clientName"
                value={newAppointment.clientName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dietitian *</label>
              <select
                name="dietitian"
                value={newAppointment.dietitian}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                required
              >
                <option value="">Select Dietitian</option>
                <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
                <option value="Dr. Michael Brown">Dr. Michael Brown</option>
                <option value="Dr. Lisa Wong">Dr. Lisa Wong</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={newAppointment.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                name="duration"
                value={newAppointment.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="15 mins">15 mins</option>
                <option value="30 mins">30 mins</option>
                <option value="45 mins">45 mins</option>
                <option value="60 mins">60 mins</option>
                <option value="90 mins">90 mins</option>
              </select>
            </div>
            
            {/* Commented out type selector
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={newAppointment.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Virtual">Virtual</option>
                <option value="In-person">In-person</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
            */}
            
            {/* Commented out status selector
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={newAppointment.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            */}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowFormModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
            >
              Schedule Appointment
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
        <button className="bg-white text-gray-700 border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center hover:bg-gray-50">
          <LogOut size={14} className="mr-1" /> Logout
        </button>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative lg:col-span-2">
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Commented out status filter
        <div>
          <select 
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        */}
        
        <div>
          <select 
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="Custom">Custom Range</option>
          </select>
        </div>
        
        <div>
          <select 
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            value={dietitianFilter}
            onChange={(e) => setDietitianFilter(e.target.value)}
          >
            <option value="All">All Dietitians</option>
            <option value="Dr. Sarah Smith">Dr. Sarah Smith</option>
            <option value="Dr. Michael Brown">Dr. Michael Brown</option>
            <option value="Dr. Lisa Wong">Dr. Lisa Wong</option>
          </select>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          {!showEmptyState && `Showing ${filteredAppointments.length} appointments`}
        </div>
        <button 
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center transition-colors"
          onClick={handleNewAppointmentClick}
        >
          <Plus size={18} className="mr-2" />
          New Appointment
        </button>
      </div>
      
      {/* Toggle between Empty State and Appointments Table */}
      {showEmptyState ? (
        <EmptyState />
      ) : (
        <>
          {/* Appointments Table - Desktop View */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dietitian</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  {/* Commented out columns
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{appointment.clientName}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.dietitian}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.dateTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.duration}</td>
                    {/* Commented out cells
                    <td className="px-4 py-3 text-sm text-gray-800">{appointment.type}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm flex space-x-2">
                      <button className="text-blue-700 hover:text-blue-600" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-blue-600" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-gray-500 hover:text-red-500" title="Cancel">
                        <XCircle size={16} />
                      </button>
                    </td>
                    */}
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
                    <h3 className="font-medium text-gray-800">{appointment.clientName}</h3>
                    <p className="text-xs text-gray-500">{appointment.id}</p>
                  </div>
                  {/* Commented out status badge
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeStyle(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  */}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-sm">
                    <Calendar size={14} className="mr-2 mt-1 text-blue-500" />
                    <div>
                      <p className="text-gray-800">{appointment.dateTime}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" /> {appointment.duration}
                        {/* Commented out type • {appointment.type} */}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-800">
                    <span className="text-gray-500">Dietitian:</span> {appointment.dietitian}
                  </p>
                </div>
                
                {/* Commented out action buttons
                <div className="flex justify-end space-x-2 border-t pt-3">
                  <button className="p-1 text-blue-700 hover:text-blue-600" title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-blue-600" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-500" title="Cancel">
                    <XCircle size={16} />
                  </button>
                </div>
                */}
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
              <button className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-gray-500 bg-white disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Form Modal */}
      {showFormModal && <AppointmentFormModal />}
    </div>
  );
}