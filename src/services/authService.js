import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const register = async (email, password) => {
  try {
    console.log('Registering user:', email);
    console.log('API URL:', API_URL);
    const response = await axiosInstance.post('/api/auth/register', {
      email,
      password
    });
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${API_URL}/api/auth/register`,
      error: error
    });
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error.response?.data?.details) {
      throw new Error(`${error.response.data.error}: ${error.response.data.details}`);
    } else if (!error.response) {
      throw new Error('Network error - Unable to connect to the server. Please check if the backend server is running.');
    } else {
      throw new Error(error.message || 'Registration failed');
    }
  }
};

export const login = async (email, password) => {
  try {
    console.log('Logging in user:', email);
    console.log('API URL:', API_URL);
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password
    });
    
    console.log('Login response:', response.data);
    
    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('Invalid response format from server');
    }

    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    console.log('Login successful for user:', user.email);
    return response.data;
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${API_URL}/api/auth/login`,
      email: email,
      error: error
    });
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error.response?.data?.details) {
      throw new Error(`${error.response.data.error}: ${error.response.data.details}`);
    } else if (!error.response) {
      throw new Error('Network error - Unable to connect to the server. Please check if the backend server is running.');
    } else {
      throw new Error(error.message || 'Login failed');
    }
  }
};

export const logout = () => {
  const user = getCurrentUser();
  console.log('Logging out user:', user?.email);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getAuthHeader = () => {
  try {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth header:', error);
    return {};
  }
};

// Función para refrescar el token
export const refreshToken = async () => {
  try {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('No user found');
    }

    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      email: user.email
    });

    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify({
        ...user,
        token: response.data.token
      }));
      return response.data.token;
    }
    throw new Error('No token received');
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout(); // Clear user data if refresh fails
    throw error;
  }
}; 