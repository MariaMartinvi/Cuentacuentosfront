import axios from 'axios';

// Determinar la URL correcta basada en el entorno
const isProduction = window.location.hostname !== 'localhost';
const API_URL = isProduction 
  ? 'https://backmielda.onrender.com'
  : 'http://localhost:5001';

// Cache para getCurrentUser
let userCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5000 // 5 segundos
};

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de red
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - Unable to connect to the server');
      throw new Error('Unable to connect to the server. Please check if the backend server is running.');
    }
    return Promise.reject(error);
  }
);

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
    console.log('Making login request to:', `${API_URL}/api/auth/login`);
    const response = await axiosInstance.post('/api/auth/login', {
      email,
      password
    });
    
    console.log('Login response:', response.data);
    
    if (!response.data || !response.data.token || !response.data.user) {
      throw new Error('Invalid response format from server');
    }

    const { token, user } = response.data;
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Limpiar caché al hacer login
    userCache = {
      data: user,
      timestamp: Date.now()
    };
    
    // Verificar que se guardaron correctamente
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    console.log('Token saved in localStorage:', savedToken ? 'Yes' : 'No');
    console.log('User saved in localStorage:', savedUser ? 'Yes' : 'No');
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  const user = getCurrentUser();
  console.log('Logging out user:', user?.email);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Limpiar caché al hacer logout
  userCache = {
    data: null,
    timestamp: null
  };
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Checking token in getCurrentUser:', token ? 'Token exists' : 'No token found');
    
    if (!token) {
      userCache = { data: null, timestamp: null };
      return null;
    }

    // Verificar si hay datos en caché y si son válidos
    const now = Date.now();
    if (userCache.data && userCache.timestamp && (now - userCache.timestamp < userCache.CACHE_DURATION)) {
      console.log('Returning cached user data');
      return userCache.data;
    }

    console.log('Making request to /api/auth/me with token');
    const response = await axiosInstance.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Response from /api/auth/me:', response.data);
    
    // Actualizar caché
    userCache = {
      data: response.data,
      timestamp: now
    };
    
    return response.data;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    // En caso de error, limpiar caché
    userCache = { data: null, timestamp: null };
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