// src/components/Dashboard.jsx
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BlogEditor from '../components/tiptapEditor/TiptapEditor'; // Import the BlogEditor component

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [healthMetrics, setHealthMetrics] = useState({
    caloriesConsumed: 1500,
    calorieGoal: 2000,
    waterIntake: 6,
    steps: 18751,
    sleep: '8.7',
    macros: { carbs: 50, protein: 30, fat: 20 },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Dekomori',
    email: user?.email || '',
    weight: user?.weight || '',
    height: user?.height || '',
  });

  // For the blog editor
  const [blogContent, setBlogContent] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Updated user data:', formData);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleBlogSave = (blogData) => {
    console.log('Blog saved:', blogData);
    // Handle blog saving logic
  };

  useEffect(() => {
    console.log('Dashboard - User from AuthContext:', user); // Debug
    const fetchHealthData = async () => {
      try {
        console.log('Health data fetched');
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };
    fetchHealthData();
  }, [user]);

  const sidebarItems = [
    { name: 'Dashboard', path: '', icon: '📊' },
    { name: 'Booking', path: 'booking', icon: '📅' },
    { name: 'Plans', path: 'plans', icon: '🛒' },
    { name: 'Blog', path: '/editor', icon: '📝' },
    { name: 'Consultancy', path: 'consultency', icon: '👩‍⚕️' },
    // { name: 'About', path: 'about', icon: 'ℹ️' },
    { name: 'Contact', path: 'contact', icon: '📞' },
  ];

  // Check if we're on the main dashboard route
  const isMainDashboard = location.pathname === '/dashboard' || location.pathname === '/dashboard/';
  
  // Check if we're on the editor route
  const isEditorRoute = location.pathname === '/dashboard/editor';

  // Render blog editor content if on the editor route
  const renderContent = () => {
    if (isEditorRoute) {
      return <BlogEditor initialContent={blogContent} onSave={handleBlogSave} />;
    } else if (!isMainDashboard) {
      return <Outlet />;
    }
    
    // Otherwise, return nothing as the main dashboard content will be shown
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-[#FCF0F8]">
      {/* Mobile Menu Button */}
      <div className="md:hidden bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] p-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white flex items-center">
          <img src="/logo.png" alt="NutriDietMitra" className="h-8 mr-1" />
          NutriDiet
        </Link>
        <button
          className="text-white p-1 bg-white bg-opacity-20 rounded-lg w-8 h-8 flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-72 bg-gradient-to-b from-[#9E0B7F] to-[#D93BB1] text-white flex-shrink-0 transition-all duration-300 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-32 translate-y-32"></div>

        <div className="hidden md:block p-6 relative z-10">
          <Link to="/" className="text-xl font-bold flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-2">
              <img src="/logo.png" alt="NutriDietMitra" className="w-12 h-12 object-contain" />
            </div>
            <span className="text-white tracking-wider mt-2">NutriDiet</span>
          </Link>
        </div>

        <nav className="space-y-1 px-4 py-6 relative z-10">
          <p className="text-xs uppercase text-white text-opacity-70 ml-3 mb-3 font-semibold tracking-wider">Main Menu</p>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === `/dashboard${item.path ? `/${item.path}` : ''}`;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center text-base px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-[#9E0B7F] font-medium shadow-md'
                    : 'text-white hover:bg-[#ADD01C] hover:text-[#333333]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 mr-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-gray-50 text-[#9E0B7F]' : 'bg-white/20 text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="mt-6 pt-4 border-t border-white border-opacity-20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center text-base text-white hover:bg-[#ADD01C] hover:text-[#333333] transition py-3 px-3 rounded-xl"
            >
              <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-white/20">
                <span className="text-xl">🚪</span>
              </div>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#FCF0F8] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#D93BB1]/5 to-[#ADD01C]/5"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#D93BB1]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ADD01C]/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-[#D93BB1]/10 rounded-full"></div>
        </div>

        <div className="p-4 md:p-6 relative z-10">
          {/* Header with user info should be shown on all pages except editor */}
          {!isEditorRoute && (
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">
                  Hello, {user?.name || 'Dekomori'}!
                </h1>
                <p className="text-[#718096] mt-1">Email: {user?.email || 'Not logged in'}</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="focus:outline-none">
                <div className="w-12 h-12 bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] rounded-full flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-shadow">
                  {user?.name?.charAt(0) || 'D'}
                </div>
              </button>
            </div>
          )}

          {/* In case we're on editor route, add a simpler header */}
          {isEditorRoute && (
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">Blog Editor</h1>
              <button onClick={() => setIsModalOpen(true)} className="focus:outline-none">
                <div className="w-10 h-10 bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] rounded-full flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-shadow">
                  {user?.name?.charAt(0) || 'D'}
                </div>
              </button>
            </div>
          )}

          {/* Dashboard content - only shown when on main dashboard route */}
          {isMainDashboard && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#D93BB1]">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Today's Overview</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#D93BB1]/10 p-4 rounded-xl">
                      <div className="flex items-center">
                        <span className="text-3xl text-[#D93BB1]">🔥</span>
                        <div className="ml-3">
                          <p className="text-sm text-[#718096]">Calories</p>
                          <p className="text-xl font-bold text-[#333333]">
                            {healthMetrics.caloriesConsumed} / {healthMetrics.calorieGoal}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 bg-white rounded-full h-2.5">
                        <div
                          className="bg-[#D93BB1] h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${(healthMetrics.caloriesConsumed / healthMetrics.calorieGoal) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-[#ADD01C]/10 p-4 rounded-xl">
                      <div className="flex items-center">
                        <span className="text-3xl text-[#8CA417]">💧</span>
                        <div className="ml-3">
                          <p className="text-sm text-[#718096]">Water</p>
                          <p className="text-xl font-bold text-[#333333]">{healthMetrics.waterIntake} glasses</p>
                        </div>
                      </div>
                      <div className="mt-2 bg-white rounded-full h-2.5">
                        <div
                          className="bg-[#ADD01C] h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${(healthMetrics.waterIntake / 8) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#ADD01C]">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Macronutrients</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-[#718096]">Carbs</p>
                        <p className="text-sm font-medium text-[#333333]">{healthMetrics.macros.carbs}%</p>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#D93BB1] h-2.5 rounded-full"
                          style={{ width: `${healthMetrics.macros.carbs}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-[#718096]">Protein</p>
                        <p className="text-sm font-medium text-[#333333]">{healthMetrics.macros.protein}%</p>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#ADD01C] h-2.5 rounded-full"
                          style={{ width: `${healthMetrics.macros.protein}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-[#718096]">Fat</p>
                        <p className="text-sm font-medium text-[#333333]">{healthMetrics.macros.fat}%</p>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#9E0B7F] h-2.5 rounded-full"
                          style={{ width: `${healthMetrics.macros.fat}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#9E0B7F]">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Today's Meals</h2>
                  <p className="text-[#718096] mb-4">No meals logged yet.</p>
                  <Link
                    to="/log-meal"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] text-white rounded-lg hover:opacity-90 transition-colors shadow-md"
                  >
                    <span className="mr-2">🍽️</span>
                    Log a Meal
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#8CA417]">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Activity</h2>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-[#333333]">Steps</h3>
                      <span className="text-sm bg-[#8CA417]/10 text-[#8CA417] px-2 py-1 rounded-md font-medium">
                        187% of Goal
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-[#333333]">{healthMetrics.steps.toLocaleString()}</p>
                    <p className="text-sm text-[#718096] mt-1">Daily Goal: 10,000</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#ADD01C] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((healthMetrics.steps / 10000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#9E0B7F]">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Sleep Schedule</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#333333]">23:15</p>
                      <p className="text-sm text-[#718096]">Bedtime in 6h 25m</p>
                      <p className="text-sm mt-2 text-[#718096]">Sleep Goal: {healthMetrics.sleep} hours</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D93BB1]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ADD01C]"></div>
                    </label>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-5 transition-shadow duration-300 hover:shadow-lg border-l-4 border-[#D93BB1]">
                  <h2 className="text-2xl font-bold text-[#333333] mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/log-meal"
                      className="bg-[#9E0B7F] text-white p-3 rounded-xl flex items-center justify-center hover:bg-[#D93BB1] transition-colors shadow-md"
                    >
                      <span className="text-xl mr-2">🍽️</span> Log Meal
                    </Link>
                    <Link
                      to="booking"
                      className="bg-[#ADD01C] text-[#333333] p-3 rounded-xl flex items-center justify-center hover:bg-[#8CA417] hover:text-white transition-colors shadow-md"
                    >
                      <span className="text-xl mr-2">📅</span> Book Appointment
                    </Link>
                    <Link
                      to="ecommerce"
                      className="bg-[#D93BB1] text-white p-3 rounded-xl flex items-center justify-center hover:bg-[#9E0B7F] transition-colors shadow-md"
                    >
                      <span className="text-xl mr-2">🛒</span> View Plans
                    </Link>
                    <Link
                      to="blog"
                      className="bg-[#8CA417] text-white p-3 rounded-xl flex items-center justify-center hover:bg-[#ADD01C] transition-colors shadow-md"
                    >
                      <span className="text-xl mr-2">📝</span> Read Blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Outlet for nested routes or blog editor - will show content for other pages */}
          {renderContent()}

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="bg-white rounded-xl p-6 w-96 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-[#333333] mb-4">User Profile</h2>
                {!isEditing ? (
                  <div className="space-y-3">
                    <div className="bg-[#FCF0F8] p-3 rounded-lg">
                      <p className="text-sm text-[#718096]">Name</p>
                      <p className="text-lg font-medium text-[#333333]">{formData.name}</p>
                    </div>
                    <div className="bg-[#FCF0F8] p-3 rounded-lg">
                      <p className="text-sm text-[#718096]">Email</p>
                      <p className="text-lg font-medium text-[#333333]">{formData.email || 'N/A'}</p>
                    </div>
                    <div className="bg-[#FCF0F8] p-3 rounded-lg">
                      <p className="text-sm text-[#718096]">Weight</p>
                      <p className="text-lg font-medium text-[#333333]">{formData.weight || 'N/A'} kg</p>
                    </div>
                    <div className="bg-[#FCF0F8] p-3 rounded-lg">
                      <p className="text-sm text-[#718096]">Height</p>
                      <p className="text-lg font-medium text-[#333333]">{formData.height || 'N/A'} cm</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 w-full bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] text-white py-2 px-4 rounded-lg hover:opacity-90 shadow-md transition-opacity"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#718096] mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#718096] mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#718096] mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#718096] mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full border border-[#ADD01C]/30 rounded-lg p-2 focus:ring-2 focus:ring-[#D93BB1] focus:border-transparent shadow-sm"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 text-[#333333] px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#9E0B7F] to-[#D93BB1] text-white px-4 py-2 rounded-lg hover:opacity-90 shadow-md transition-opacity"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;