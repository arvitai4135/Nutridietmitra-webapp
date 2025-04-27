import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://backend.nutridietmitra.com/api";

export const loginUser = async (credentials) => {
  try {
    // Step 1: Call the login endpoint
    const response = await axios.post(`${API_URL}/users/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    console.log("Login API response:", response.data);
    console.log("Login API response.data.data:", response.data.data);

    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }

    const data = response.data.data;
    const { access_token, refresh_token, email_id } = data;

    if (!access_token || !refresh_token || !email_id) {
      throw new Error("Missing token or user data in response");
    }

    // Step 2: Fetch user info to get the role
    const userInfoResponse = await axios.get(`${API_URL}/users/info`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      timeout: 10000,
    });

    if (!userInfoResponse.data.success) {
      throw new Error(userInfoResponse.data.message || "Failed to fetch user info");
    }

    const userInfo = userInfoResponse.data.data;
    const user = {
      email: email_id,
      full_name: userInfo.full_name || "", // Optional: Include if available
      role: userInfo.role || "user", // Default to 'user' if role is missing
    };

    return {
      token: access_token,
      refresh_token,
      user,
    };
  } catch (error) {
    console.error("Login error details:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
      request: error.request,
    });
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401 || status === 404) {
        throw new Error(data.message || "No account found with this email or incorrect password.");
      } else if (status === 422) {
        const errorDetails = data.detail?.map((err) => err.msg).join(", ") || "Invalid input data.";
        throw new Error(errorDetails);
      } else {
        throw new Error(data.detail || `Server error (${status}). Please try again.`);
      }
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An unexpected error occurred: " + error.message);
    }
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/create`,
      {
        full_name: userData.name,
        email: userData.email,
        phone_number: userData.phone,
        password: userData.password,
        profile_path: "profile_pictures/default.png",
        status: "active",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("Register API response:", response.data);

    if (response.status !== 201) {
      throw new Error("Registration failed");
    }

    const token = response.data;

    const user = { email: userData.email, name: userData.name };

    return {
      token,
      user,
    };
  } catch (error) {
    console.error("Register error details:", {
      message: error.message,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
      request: error.request,
    });
    throw error.response?.data?.message || error.message || "Signup failed. Please try again.";
  }
};

// Axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("refresh_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);