import { createContext, useState, useEffect } from 'react';
import {fetchUserInfo} from '../services/authService'; // Adjust the import path as necessary

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refresh_token') || null);
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    const storedRefreshToken = sessionStorage.getItem('refresh_token');

    if (storedToken && storedUser && !user) {
      console.log('Restoring session:', { storedToken, storedUser, storedRefreshToken });
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setRefreshToken(storedRefreshToken);
      // Fetch user ID if not present
      if (JSON.parse(storedUser)?.id === undefined) {
        fetchUserInfo(storedToken);
      }
    }
  }, []);

  // const fetchUserInfo = async (authToken) => {
  //   try {
  //     const response = await fetch('/api/user/profile', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${authToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       const updatedUser = { ...user, id: data.id, email: data.email || user?.email };
  //       setUser(updatedUser);
  //       sessionStorage.setItem('user', JSON.stringify(updatedUser));
  //       console.log('Fetched user profile with ID:', updatedUser);
  //     } else {
  //       console.error('Failed to fetch user profile:', data);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching user profile:', err);
  //   }
  // };

  const login = (newToken, newUser, newRefreshToken, isSignup = false) => {
    setToken(newToken);
    setUser(newUser);
    setRefreshToken(newRefreshToken);
    setJustSignedUp(isSignup);
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    if (newRefreshToken) {
      sessionStorage.setItem('refresh_token', newRefreshToken);
    }
    console.log('Login - Token stored in sessionStorage:', newToken, 'User:', newUser, 'Refresh Token:', newRefreshToken, 'Is Signup:', isSignup);
    // Fetch user ID if not present
    if (!newUser.id) {
      fetchUserInfo(newToken);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRefreshToken(null);
    setJustSignedUp(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('refresh_token');
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, isLoggedIn: !!token, justSignedUp, setJustSignedUp }}>
      {children}
    </AuthContext.Provider>
  );
};