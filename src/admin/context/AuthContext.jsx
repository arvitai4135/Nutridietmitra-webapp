import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refresh_token') || null);
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    const storedRefreshToken = sessionStorage.getItem('refresh_token');

    console.log('Restoring session:', { storedToken, storedUser, storedRefreshToken });
    setToken(storedToken);
    try {
      setUserState(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      setUserState(null);
    }
    setRefreshToken(storedRefreshToken);
  }, []);

  // Custom setUser function to update user state and sessionStorage
  const setUser = (newUser) => {
    setUserState(newUser);
    if (newUser) {
      sessionStorage.setItem('user', JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem('user');
    }
  };

  const login = (newToken, newUser, newRefreshToken, isSignup = false) => {
    setToken(newToken);
    setUserState(newUser);
    setRefreshToken(newRefreshToken);
    setJustSignedUp(isSignup);
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('refresh_token', newRefreshToken);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    console.log('Login - Token stored in sessionStorage:', newToken, 'User:', newUser, 'Refresh Token:', newRefreshToken, 'Is Signup:', isSignup);
  };

  const logout = () => {
    setToken(null);
    setUserState(null);
    setRefreshToken(null);
    setJustSignedUp(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('refresh_token');
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, setUser, isLoggedIn: !!token, justSignedUp, setJustSignedUp }}>
      {children}
    </AuthContext.Provider>
  );
};