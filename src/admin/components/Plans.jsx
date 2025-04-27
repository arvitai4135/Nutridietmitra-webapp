import { useState, useEffect, useContext, useRef } from 'react';
import { Search, ChevronLeft, Bell, CheckCircle } from 'lucide-react';
import api from '../services/api'; // Adjust path to api.js
import { AuthContext } from '../context/AuthContext'; // Adjust path to AuthContext

export default function DietPlansManagement() {
  const { token } = useContext(AuthContext);
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifiedPlans, setNotifiedPlans] = useState(new Set());
  const itemsPerPage = 5;
  const intervalRef = useRef(null);
  const lastNotifiedRef = useRef(new Set());

  // Utility function to convert plan type (e.g., 'one_month' to '1 month')
  const formatPlanType = (planType) => {
    if (!planType || typeof planType !== 'string') return 'Unknown';

    // Map number words to digits
    const numberMap = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
      ten: '10',
      eleven: '11',
      twelve: '12',
    };

    // Split the plan type (e.g., 'one_month' or 'three_months')
    const parts = planType.toLowerCase().split('_');
    if (parts.length !== 2 || !['month', 'months'].includes(parts[1])) {
      return planType; // Return original if format is unexpected
    }

    const numberWord = parts[0];
    const number = numberMap[numberWord] || numberWord;

    // Use 'month' for 1, 'months' for others
    const suffix = number === '1' ? 'month' : 'months';

    return `${number} ${suffix}`;
  };

  // Fetch payment history from API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setIsLoading(true);
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const response = await api.get('/payments/history');
        console.log('Payment History API Response:', response.data);

        const mappedPlans = Array.isArray(response.data.data)
          ? response.data.data.map((item) => ({
              id: String(item.payment_id),
              name: item.name || 'Unknown',
              email: item.email || '',
              phone: item.phone_number || '',
              address: item.address || '',
              play_type: item.play_type || 'Unknown',
              price: parseFloat(item.price) || 0,
              start_date: new Date(item.start_date).toISOString().split('T')[0],
              end_date: new Date(item.end_date).toISOString().split('T')[0],
              user_id: String(item.user_id || item.payment_id),
            }))
          : [];
        setPlans(mappedPlans);
        setError(null);
      } catch (err) {
        console.error('Error fetching payment history:', err);
        const errorMessage =
          err.response?.status === 404
            ? 'Payment history not found'
            : err.response?.status === 401
            ? 'Authentication failed. Please log in and try again.'
            : err.response?.status === 500
            ? 'Server error: Unable to fetch payment history.'
            : 'Failed to fetch payment history';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [token]);

  // Check if a plan is about to expire (within 3 days)
  const isExpiringSoon = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const timeDiff = end - currentDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff <= 3 && daysDiff >= 0;
  };

  // Simulate sending a notification
  const sendNotification = async (subscription) => {
    try {
      const message = `Subscription for ${subscription.full_name || 'Unknown'} (ID: ${subscription.user_id}) is expiring on ${subscription.subscription_end}.`;
      console.log('Sending notification:', message);
      alert(message); // Replace with actual notification system in production
    } catch (err) {
      console.error('Error sending notification:', err);
      throw new Error('Failed to send notification');
    }
  };

  // Retry logic for API calls
  const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await api.get(url, options);
      } catch (err) {
        if (err.response?.status === 500 && i < retries - 1) {
          console.warn(`Retry ${i + 1}/${retries} for ${url} after 500 error`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        throw err;
      }
    }
  };

  // Automatically trigger notifications for expiring subscriptions
  useEffect(() => {
    let executionCount = 0;

    const checkExpiringPlans = async () => {
      executionCount += 1;
      console.log(`checkExpiringPlans execution #${executionCount}`);

      const expiringPlans = plans.filter((plan) => isExpiringSoon(plan.end_date) && !notifiedPlans.has(plan.user_id));
      console.log('Local expiring plans:', expiringPlans);

      try {
        if (!token) throw new Error('Authentication required. Please log in.');

        const response = await fetchWithRetry('/payments/get-expiring-subscriptions', {});
        console.log('Expiring Subscriptions Response:', JSON.stringify(response.data, null, 2));

        const expiringSubscriptions = Array.isArray(response.data.data) ? response.data.data : [];
        if (expiringSubscriptions.length === 0) {
          console.log('No subscriptions are expiring soon.');
          return;
        }

        const subscriptionsToNotify = expiringSubscriptions.filter(
          (sub) => isExpiringSoon(sub.subscription_end) && !notifiedPlans.has(String(sub.user_id))
        );
        console.log('Subscriptions to notify:', subscriptionsToNotify);

        const newSubscriptions = subscriptionsToNotify.filter(
          (sub) => !lastNotifiedRef.current.has(String(sub.user_id))
        );

        if (newSubscriptions.length > 0) {
          const alertMessage = newSubscriptions
            .map((sub) => `Subscription for ${sub.full_name || 'Unknown'} (ID: ${sub.user_id}) expires on ${sub.subscription_end}.`)
            .join('\n');
          alert(`Expiring Subscriptions:\n${alertMessage}`);
        }

        for (const subscription of subscriptionsToNotify) {
          await sendNotification(subscription);
          lastNotifiedRef.current.add(String(subscription.user_id));
        }

        setNotifiedPlans((prev) => {
          const updated = new Set(prev);
          subscriptionsToNotify.forEach((sub) => updated.add(String(sub.user_id)));
          console.log('Updated notifiedPlans:', Array.from(updated));
          return updated;
        });

        if (subscriptionsToNotify.length > 0) {
          console.log(`Notifications sent for ${subscriptionsToNotify.length} subscription(s)!`);
        }
      } catch (err) {
        console.error('Error processing expiring subscriptions:', err);
        const errorMessage =
          err.response?.status === 404
            ? 'No expiring subscriptions found'
            : err.response?.status === 401
            ? 'Authentication failed. Please log in and try again.'
            : err.response?.status === 500
            ? 'Server error: Unable to fetch expiring subscriptions. Retries exhausted.'
            : 'Failed to process expiring subscriptions';
        setError(errorMessage);
      }
    };

    checkExpiringPlans();
    intervalRef.current = setInterval(checkExpiringPlans, 300000);

    return () => {
      console.log('Cleaning up interval');
      clearInterval(intervalRef.current);
    };
  }, [plans, token]);

  // Manual Notify Expiry action
  const handleNotifyExpiry = async (planId, planName) => {
    try {
      setIsLoading(true);
      if (!token) throw new Error('Authentication required. Please log in.');

      const response = await fetchWithRetry('/payments/get-expiring-subscriptions', {});
      console.log('Expiring Subscriptions Response:', JSON.stringify(response.data, null, 2));

      const expiringSubscriptions = Array.isArray(response.data.data) ? response.data.data : [];
      if (expiringSubscriptions.length === 0) {
        alert('No subscriptions are expiring soon.');
        return;
      }

      const subscriptionsToNotify = expiringSubscriptions.filter(
        (sub) => isExpiringSoon(sub.subscription_end) && !notifiedPlans.has(String(sub.user_id))
      );

      if (subscriptionsToNotify.length > 0) {
        const alertMessage = subscriptionsToNotify
          .map((sub) => `Subscription for ${sub.full_name || 'Unknown'} (ID: ${sub.user_id}) expires on ${sub.subscription_end}.`)
          .join('\n');
        alert(`Sending notifications for:\n${alertMessage}`);
      }

      for (const subscription of subscriptionsToNotify) {
        await sendNotification(subscription);
        lastNotifiedRef.current.add(String(sub.user_id));
      }

      setNotifiedPlans((prev) => {
        const updated = new Set(prev);
        subscriptionsToNotify.forEach((sub) => updated.add(String(sub.user_id)));
        const plan = plans.find((p) => p.id === planId);
        if (plan) updated.add(String(plan.user_id));
        console.log('Updated notifiedPlans (manual):', Array.from(updated));
        return updated;
      });

      alert(`Notifications sent for ${subscriptionsToNotify.length} subscription(s)!`);
    } catch (err) {
      console.error('Error notifying expiry:', err);
      const errorMessage =
        err.response?.status === 404
          ? 'No expiring subscriptions found'
          : err.response?.status === 401
            ? 'Authentication failed. Please log in and try again.'
          : err.response?.status === 500
            ? 'Server error: Unable to fetch expiring subscriptions. Retries exhausted.'
            : 'Failed to send notifications';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPlans = plans.filter((plan) =>
    plan.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatPlanType(plan.play_type)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.price?.toString().includes(searchTerm) ||
    plan.start_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.end_date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  // Loading state component
  const LoadingState = () => (
    <div className="flex items-center justify-center py-8 sm:py-16">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-700"></div>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4">
      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Error</h1>
      <p className="text-gray-500 text-sm sm:text-base text-center max-w-md">{error}</p>
      {error.includes('Authentication failed') && (
        <a href="/login" className="mt-4 text-blue-700 hover:underline text-sm sm:text-base">Go to Login</a>
      )}
    </div>
  );

  // No data state component
  const NoDataState = () => (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4">
      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Payment History</h3>
      <p className="text-gray-500 text-sm sm:text-base text-center max-w-md">No payment history found.</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 p-4 sm:p-6">
        {/* Header and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Payment History Management</h1>
              <a
                href="/dashboard"
                className="flex items-center mt-2 text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
              >
                <ChevronLeft size={16} className="mr-1" />
                Dashboard
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search payment history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              disabled={isLoading}
              aria-label="Search payment history"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Desktop: Table View, Mobile: Card View */}
        <div className="bg-white rounded-lg shadow mb-6">
          {/* Table for Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      <LoadingState />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      <ErrorState />
                    </td>
                  </tr>
                ) : currentPlans.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      <NoDataState />
                    </td>
                  </tr>
                ) : (
                  currentPlans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-900">{plan.id}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{plan.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{plan.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{plan.phone}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{plan.address}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{formatPlanType(plan.play_type)}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">₹{plan.price.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{plan.start_date}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{plan.end_date}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {isExpiringSoon(plan.end_date) ? (
                          <span className="flex items-center text-yellow-600">
                            <Bell size={16} className="mr-1" />
                            Expiring Soon
                          </span>
                        ) : notifiedPlans.has(plan.user_id) ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle size={16} className="mr-1" />
                            Notified
                          </span>
                        ) : (
                          'Active'
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        <button
                          className={`p-2 rounded-full ${
                            isExpiringSoon(plan.end_date) && !notifiedPlans.has(plan.user_id)
                              ? 'text-red-500 hover:bg-red-100'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                          title="Notify Expiry"
                          onClick={() => handleNotifyExpiry(plan.id, plan.name)}
                          disabled={notifiedPlans.has(plan.user_id)}
                          aria-label={`Notify expiry for plan ${plan.id}`}
                        >
                          <Bell size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Card View for Mobile */}
          <div className="block sm:hidden">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : currentPlans.length === 0 ? (
              <NoDataState />
            ) : (
              currentPlans.map((plan) => (
                <div key={plan.id} className="bg-white rounded-lg shadow mb-4 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{plan.name}</h3>
                      <p className="text-xs text-gray-500">ID: {plan.id}</p>
                    </div>
                    <button
                      className={`p-2 rounded-full ${
                        isExpiringSoon(plan.end_date) && !notifiedPlans.has(plan.user_id)
                          ? 'text-red-500 hover:bg-red-100'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                      title="Notify Expiry"
                      onClick={() => handleNotifyExpiry(plan.id, plan.name)}
                      disabled={notifiedPlans.has(plan.user_id)}
                      aria-label={`Notify expiry for plan ${plan.id}`}
                    >
                      <Bell size={20} />
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Email:</span> {plan.email || 'N/A'}</p>
                    <p><span className="font-medium">Phone:</span> {plan.phone || 'N/A'}</p>
                    <p><span className="font-medium">Address:</span> {plan.address || 'N/A'}</p>
                    <p><span className="font-medium">Plan Type:</span> {formatPlanType(plan.play_type)}</p>
                    <p><span className="font-medium">Price:</span> ₹{plan.price.toLocaleString()}</p>
                    <p><span className="font-medium">Start Date:</span> {plan.start_date}</p>
                    <p><span className="font-medium">End Date:</span> {plan.end_date}</p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      {isExpiringSoon(plan.end_date) ? (
                        <span className="inline-flex items-center text-yellow-600">
                          <Bell size={14} className="mr-1" />
                          Expiring Soon
                        </span>
                      ) : notifiedPlans.has(plan.user_id) ? (
                        <span className="inline-flex items-center text-green-600">
                          <CheckCircle size={14} className="mr-1" />
                          Notified
                        </span>
                      ) : (
                        'Active'
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && !isLoading && !error && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            {/* Desktop Pagination */}
            <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredPlans.length ? filteredPlans.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredPlans.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>

            {/* Mobile Pagination */}
            <div className="flex sm:hidden justify-between w-full items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}