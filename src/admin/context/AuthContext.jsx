import { createContext, useState, useEffect } from 'react';

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
    }
  }, []);

  const login = (newToken, newUser, newRefreshToken, isSignup = false) => {
    setToken(newToken);
    setUser(newUser);
    setRefreshToken(newRefreshToken);
    setJustSignedUp(isSignup);
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('refresh_token', newRefreshToken);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    console.log('Login - Token stored in sessionStorage:', newToken, 'User:', newUser, 'Refresh Token:', newRefreshToken, 'Is Signup:', isSignup);
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