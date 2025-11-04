import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const fakeUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      },
      paymentMethod: {
        last4: '4242',
        brand: 'Visa'
      }
    };
    
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    return fakeUser;
  };

  const signup = (name, email, password) => {
    const fakeUser = {
      id: Date.now(),
      email,
      name,
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001'
      },
      paymentMethod: {
        last4: '4242',
        brand: 'Visa'
      }
    };
    
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    return fakeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
