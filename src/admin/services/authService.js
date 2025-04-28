// src/services/authService.js
import api from './api'; // Adjust path to api.js


//login user
// This function handles user login by sending a POST request to the server with the user's credentials.
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    console.log('Login API response:', response.data);
    console.log('Login API response.data.data:', response.data.data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    const data = response.data.data;
    const { access_token, refresh_token, email_id } = data;

    if (!access_token || !refresh_token || !email_id) {
      throw new Error('Missing token or user data in response');
    }

    const userInfoResponse = await api.get('/users/info', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userInfoResponse.data.success) {
      throw new Error(userInfoResponse.data.message || 'Failed to fetch user info');
    }

    const userInfo = userInfoResponse.data.data;
    const user = {
      email: email_id,
      full_name: userInfo.full_name || '',
      role: userInfo.role || 'user',
    };

    return {
      token: access_token,
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


// Register user
// This function handles user registration by sending a POST request to the server with the user's data.
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/create', {
      full_name: userData.name,
      email: userData.email,
      phone_number: userData.phone,
      password: userData.password,
      profile_path: 'profile_pictures/default.png',
      status: 'active',
    });

    console.log('Register API response:', response.data);

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }

    const { access_token, refresh_token } = response.data.data || response.data;
    const token = access_token;

    const user = { email: userData.email, name: userData.name };

    return {
      token,
      refresh_token,
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

//Forgot password
// This function handles the forgot password process by sending a POST request to the server with the user's email.
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error('Forgot password error:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) throw new Error('No account found with this email');
      if (status === 422) {
        const errorDetails = data.detail?.map((err) => err.msg).join(', ') || 'Invalid email format';
        throw new Error(errorDetails);
      }
      if (status === 429) throw new Error('Too many requests. Please try again later.');
      throw new Error(data || 'Server error. Please try again.');
    }
    throw new Error(error.request ? 'Network error. Please check your internet connection.' : 'An unexpected error occurred: ' + error.message);
  }
};
// Reset password 
// This function handles the reset password process by sending a POST request to the server with the new password and token.
export const resetPassword = async ({ token, newPassword }) => {
  try {
    const response = await api.post(`/users/reset-password?token=${encodeURIComponent(token)}`, {
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) throw new Error('Invalid or expired reset token');
      if (status === 422) {
        const errorDetails = data.detail?.map((err) => err.msg).join(', ') || 'Invalid password format';
        throw new Error(errorDetails);
      }
      if (status === 429) throw new Error('Too many requests. Please try again later.');
      throw new Error(data || 'Server error. Please try again.');
    }
    throw new Error(error.request ? 'Network error. Please check your internet connection.' : 'An unexpected error occurred: ' + error.message);
  }
};

// Change password
// This function handles the change password process by sending a POST request to the server with the old and new passwords.
export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const response = await api.post('/users/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Change password error:', {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    if (error.response) {
      const { status, data } = error.response;
      if (status === 404) throw new Error('User not found');
      if (status === 422) {
        const errorDetails = data.detail?.map((err) => err.msg).join(', ') || 'Invalid input data';
        throw new Error(errorDetails);
      }
      if (status === 401) throw new Error('Invalid current password');
      if (status === 429) throw new Error('Too many requests. Please try again later.');
      throw new Error(data || 'Server error. Please try again.');
    }
    throw new Error(error.request ? 'Network error. Please check your internet connection.' : 'An unexpected error occurred: ' + error.message);
  }
};