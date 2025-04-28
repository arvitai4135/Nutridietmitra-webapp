import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/authService';

import signup from '/assets/AdminImages/signup.jpg';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setApiError(null);

      // Check for admin credentials
      if (data.email === 'guptakishna45@gmail.com' && data.password === 'krishna4135') {
        setApiError('This email and password are associated with an existing admin account. Please log in instead.');
        return;
      }

      const { token, refresh_token, user } = await registerUser(data);
      console.log('Signup successful, calling login with token:', token, 'user:', user, 'refresh_token:', refresh_token);
      login(token, user, refresh_token, true);
      console.log('Redirecting to / after signup');
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error);
      setApiError(error.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen bg-[#F9F9F9] font-sans flex flex-col overflow-hidden">
      <main className="flex flex-1">
        {/* Left Column - Creative Design */}
        <div className="hidden md:block md:w-1/2 relative bg-[#F9F9F9] overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#27AE60]/10 to-[#C0399F]/10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#27AE60]/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C0399F]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-2/3 left-1/4 w-48 h-48 bg-[#27AE60]/15 rounded-full"></div>
          </div>

          {/* Content Container - Using flex with even spacing */}
          <div className="relative h-full flex flex-col justify-between py-8 px-8 z-10">
            {/* Top Section with Logo */}
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
                <img src="/logo.png" alt="NutriDiet Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-[#333333] mb-4">NutriDiet</h1>

            {/* Middle Section with Illustration and Tagline */}
            <div className="flex-grow flex flex-col items-center justify-center">
              {/* Illustration with relative width */}
              <div className="w-full max-w-xs relative mb-6">
                <img 
                  src={signup}
                  alt="Healthy Lifestyle" 
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
                
                {/* Floating Elements - Positioned precisely */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#27AE60] rounded-full flex items-center justify-center shadow-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-[#C0399F] rounded-full flex items-center justify-center shadow-lg text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Tagline - Centered */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-[#333333] mb-2">Begin Your Wellness Journey</h2>
                <p className="text-sm text-[#333333]/70 max-w-xs mx-auto">Create a personalized experience to achieve your nutrition and health goals.</p>
              </div>
            </div>
            
            {/* Features Section - Aligned left with consistent spacing */}
            <div className="w-full max-w-xs mx-auto space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#27AE60]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#333333]">Custom Meal Plans</h3>
                  <p className="text-xs text-[#333333]/70">Designed for your preferences</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#C0399F]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#C0399F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#333333]">Goal Tracking</h3>
                  <p className="text-xs text-[#333333]/70">Monitor your progress</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#27AE60]/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#27AE60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#333333]">Expert Support</h3>
                  <p className="text-xs text-[#333333]/70">Guidance from specialists</p>
                </div>
              </div>
            </div>
            
            {/* Copyright at bottom */}
            <div className="text-center text-xs text-[#333333]/50">
              <p>© 2025 NutriDiet. All rights reserved.</p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-white shadow-xl overflow-auto">
          <div className="w-full max-w-md">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#333333]">Create account</h2>
                <p className="mt-1 text-sm text-[#333333]/70">Start your nutrition journey today</p>
              </div>
              {/* Small Logo */}
              <div className="w-15 h-15 bg-gradient-to-br from-[#27AE60]/60 to-[#C0399F]/60 rounded-lg flex items-center justify-center shadow-md">
                <img src="logo.png" alt="NutriDiet Logo" className="w-10 h-10 object-contain" />
              </div>
            </div>
            
            {apiError && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p>{apiError}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-[#333333] mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-[#333333]/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="name"
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    placeholder="John Doe"
                    type="text"
                    className="w-full py-2 pl-10 pr-4 border border-[#27AE60]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0399F] focus:border-transparent transition shadow-sm text-sm"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-[#333333] mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-[#333333]/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="your@email.com"
                    type="email"
                    className="w-full py-2 pl-10 pr-4 border border-[#27AE60]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0399F] focus:border-transparent transition shadow-sm text-sm"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-[#333333] mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-[#333333]/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' }
                    })}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    className="w-full py-2 pl-10 pr-10 border border-[#27AE60]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0399F] focus:border-transparent transition shadow-sm text-sm"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#333333]"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-[#333333] mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-[#333333]/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                    placeholder="1234567890"
                    type="tel"
                    className="w-full py-2 pl-10 pr-4 border border-[#27AE60]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0399F] focus:border-transparent transition shadow-sm text-sm"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  {...register('terms', { 
                    required: 'You must accept the terms and conditions'
                  })}
                  className="w-3 h-3 text-[#27AE60] focus:ring-[#27AE60] rounded border-[#27AE60]"
                />
                <label htmlFor="terms" className="ml-2 text-xs text-[#333333]/80">
                  I agree to the{' '}
                  <a href="/terms" className="text-[#27AE60] hover:underline transition">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-[#27AE60]/60 to-[#C0399F]/60 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#27AE60] transition shadow-md flex justify-center items-center text-sm"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="text-center mt-4">
              <p className="text-xs text-[#333333]/80">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-[#27AE60] hover:underline transition">
                  Sign in now
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;