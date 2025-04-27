import React, { useState } from 'react';
import { Search, ChevronLeft } from 'lucide-react';

export default function DietPlansManagement() {
  const [users, setUsers] = useState([
    { id: "#USER001", fullName: "John Doe", email: "john.doe@example.com", phone: "+91 9876543210", address: "123 MG Road, Mumbai", status: "Active" },
    { id: "#USER002", fullName: "Jane Smith", email: "jane.smith@example.com", phone: "+91 8765432109", address: "456 Park Street, Delhi", status: "Active" },
    { id: "#USER003", fullName: "Amit Sharma", email: "amit.sharma@example.com", phone: "+91 7654321098", address: "789 Koramangala, Bangalore", status: "Active" },
    { id: "#USER004", fullName: "Priya Patel", email: "priya.patel@example.com", phone: "+91 6543210987", address: "321 Anna Nagar, Chennai", status: "Inactive" },
    { id: "#USER005", fullName: "Rahul Verma", email: "rahul.verma@example.com", phone: "+91 5432109876", address: "654 Banjara Hills, Hyderabad", status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-nutricare-bg-light">
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-nutricare-text-dark">User Management</h1>
              <div className="flex items-center mt-2 text-nutricare-text-gray">
                <button className="flex items-center hover:text-nutricare-primary-light transition-colors">
                  <ChevronLeft size={18} />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light"
            />
            <Search size={18} className="absolute left-3 top-3 text-nutricare-text-gray" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Address</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-nutricare-text-dark">{user.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{user.phone}</td>
                    <td className="px-6 py-4 text-sm text-nutricare-text-dark">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-nutricare-text-gray">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium">
                      {indexOfLastItem > filteredUsers.length ? filteredUsers.length : indexOfLastItem}
                    </span>{" "}
                    of <span className="font-medium">{filteredUsers.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1 ? 'text-gray-300' : 'text-nutricare-text-gray hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-nutricare-primary-light border-nutricare-primary-dark text-white'
                            : 'bg-white border-gray-300 text-nutricare-text-gray hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages ? 'text-gray-300' : 'text-nutricare-text-gray hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
              <div className="flex sm:hidden justify-between w-full">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    currentPage === 1 ? 'text-gray-300' : 'text-nutricare-primary-dark hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm text-nutricare-text-gray">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    currentPage === totalPages ? 'text-gray-300' : 'text-nutricare-primary-dark hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}