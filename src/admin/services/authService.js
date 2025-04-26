import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://backend.nutridietmitra.com/api';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 1000,
    });

    console.log('Login API response:', response.data);
    console.log('Login API response.data.data:', response.data.data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    const data = response.data.data;
    const { access_token, refresh_token, email_id,  } = data;

    if (!access_token || !email_id) {
      throw new Error('Missing token or user data in response');
    }

    // let user = { email: email_id, name: email_id === '' ? '' : 'User' };
    let user = { email: email_id  };

    return {
      token: refresh_token,
      refresh_token,
      user,
    };
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
      request: error.request,
    });
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || status === 404) {
        throw new Error(data.message || 'No account found with this email or incorrect password.');
      } else if (status === 422) {
        const errorDetails = data.detail?.map((err) => err.msg).join(', ') || 'Invalid input data.';
        throw new Error(errorDetails);
      } else {
        throw new Error(data.detail || `Server error (${status}). Please try again.`);
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('An unexpected error occurred: ' + error.message);
    }
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/create`, {
      full_name: userData.name,
      email: userData.email,
      phone_number: userData.phone,
      password: userData.password,
      profile_path: "profile_pictures/default.png",
      status: "active",
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    console.log('Register API response:', response.data);

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }

    // Assume the response is a token (string)
    const token = response.data;

    // Temporary user object (fetch real user data if /api/users/me exists)
    const user = { email: userData.email, name: userData.name };

    return {
      token,
      user,
    };
  } catch (error) {
    console.error('Register error details:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
      request: error.request,
    });
    throw error.response?.data?.message || error.message || 'Signup failed. Please try again.';
  }
};

export const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/info`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    if (response.data.success) {
      console.log('Fetched user info:', response.data);
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch user info');
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// Axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);