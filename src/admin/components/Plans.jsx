import React, { useState } from 'react';
import { Search, ChevronLeft, LogOut, Plus } from 'lucide-react';

export default function DietPlansManagement() {
  const [plans, setPlans] = useState([
    { id: "#PLAN001", name: "30-Day Weight Loss", category: "Weight Loss", price: "₹2999/month", duration: "30 Days", subscribers: 150, status: "Active" },
    { id: "#PLAN002", name: "Muscle Gain Pro", category: "Muscle Gain", price: "₹3999/month", duration: "90 Days", subscribers: 120, status: "Active" },
    { id: "#PLAN003", name: "Vegan Vitality", category: "Vegan", price: "₹2499/month", duration: "Ongoing", subscribers: 85, status: "Active" },
    { id: "#PLAN004", name: "Keto Kickstart", category: "Weight Loss", price: "₹1999/month", duration: "45 Days", subscribers: 95, status: "Draft" },
    { id: "#PLAN005", name: "Beginner's Health", category: "General", price: "Free", duration: "14 Days", subscribers: 210, status: "Active" },
    { id: "#PLAN006", name: "Mediterranean Health", category: "Health", price: "₹1599/month", duration: "60 Days", subscribers: 76, status: "Inactive" },
    { id: "#PLAN007", name: "Weight Loss Essential", category: "Weight Loss", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN008", name: "Muscle Gain Advanced", category: "Weight Gain", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN009", name: "PCOS Management", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN010", name: "Pregnancy Wellness", category: "Pregnancy", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN011", name: "Diabetes Control", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN012", name: "Thyroid Support", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN013", name: "Kids Nutrition Plan", category: "Nutrition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN014", name: "Immunity Boost Diet", category: "Health", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN015", name: "Athlete's Nutrition", category: "Sports Nutrition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN016", name: "Arthritis Relief Diet", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN017", name: "Anti-Inflammatory", category: "Health", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN018", name: "Heart Health Diet", category: "Health", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN019", name: "Post Menopause Diet", category: "Women's Health", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN020", name: "Skin Glow Diet", category: "Beauty", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN021", name: "Detox Cleanse", category: "Health", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN022", name: "Celiac Diet", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN023", name: "Fatty Liver Diet", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN024", name: "Acid Reflux Diet", category: "Health Condition", price: "₹4000/month", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN025", name: "1 Month Subscription", category: "Subscription", price: "₹4000", duration: "1 Month", subscribers: 0, status: "Active" },
    { id: "#PLAN026", name: "2 Month Subscription", category: "Subscription", price: "₹7000", duration: "2 Months", subscribers: 0, status: "Active" },
    { id: "#PLAN027", name: "3 Month Subscription", category: "Subscription", price: "₹9000", duration: "3 Months", subscribers: 0, status: "Active" },
    { id: "#PLAN028", name: "6 Month Subscription", category: "Subscription", price: "₹18000", duration: "6 Months", subscribers: 0, status: "Active" },
    { id: "#PLAN029", name: "Single Meal", category: "Food Delivery", price: "₹200", duration: "Per Meal", subscribers: 0, status: "Active" },
    { id: "#PLAN030", name: "Weekly Meal Plan", category: "Food Delivery", price: "₹1400", duration: "1 Week", subscribers: 0, status: "Active" },
    { id: "#PLAN031", name: "Monthly Meal Plan", category: "Food Delivery", price: "₹4800", duration: "1 Month", subscribers: 0, status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPlans = plans.filter(plan => {
    const matchesSearch =
      plan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filters.category === 'All' || plan.category === filters.category;

    let matchesPriceRange = true;
    if (filters.priceRange === 'Free') {
      matchesPriceRange = plan.price === 'Free';
    } else if (filters.priceRange === '₹0-₹50') {
      const price = parseFloat(plan.price.replace(/[₹\/month]/g, ''));
      matchesPriceRange = plan.price !== 'Free' && price < 50;
    } else if (filters.priceRange === '₹50+') {
      const price = parseFloat(plan.price.replace(/[₹]/g, ''));
      matchesPriceRange = price >= 50;
    }

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-nutricare-bg-light">
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-nutricare-text-dark">Diet Plans Management</h1>
              <div className="flex items-center mt-2 text-nutricare-text-gray">
                <button className="flex items-center hover:text-nutricare-primary-light transition-colors">
                  <ChevronLeft size={18} />
                  <span>Dashboard</span>
                </button>
                <span className="mx-3">|</span>
                <button className="flex items-center hover:text-nutricare-primary-light transition-colors">
                  <LogOut size={18} className="mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <button className="flex items-center justify-center bg-gradient-to-r from-nutricare-primary-dark to-nutricare-primary-light text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Plus size={18} className="mr-2" />
              <span>Add New Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light"
              />
              <Search size={18} className="absolute left-3 top-3 text-nutricare-text-gray" />
            </div>

            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light"
              >
                <option value="All">All Categories</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Vegan">Vegan</option>
                <option value="Health">Health</option>
                <option value="General">General</option>
                <option value="Health Condition">Health Condition</option>
                <option value="Pregnancy">Pregnancy</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Sports Nutrition">Sports Nutrition</option>
                <option value="Women's Health">Women's Health</option>
                <option value="Beauty">Beauty</option>
                <option value="Subscription">Subscription</option>
                <option value="Food Delivery">Food Delivery</option>
              </select>
            </div>
            <div className="relative">
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-nutricare-primary-light"
              >
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="₹0-₹50">₹0-₹50</option>
                <option value="₹50+">₹50+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Plan ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Plan Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-nutricare-text-gray uppercase tracking-wider">Subscribers</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{plan.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-nutricare-text-dark">{plan.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{plan.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{plan.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{plan.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-nutricare-text-dark">{plan.subscribers}</td>
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
                      {indexOfLastItem > filteredPlans.length ? filteredPlans.length : indexOfLastItem}
                    </span>{" "}
                    of <span className="font-medium">{filteredPlans.length}</span> results
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