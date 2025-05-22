
import api from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User, UpdateProfileRequest } from '@/types/api.types';

export const AuthService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Armazenar o token no localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Armazenar o token no localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/auth/me');
      return response.data.user;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
  
  updateProfile: async (userData: UpdateProfileRequest): Promise<User> => {
    try {
      const response = await api.put('/auth/profile', userData);
      
      // Atualiza os dados do usuário no localStorage
      if (response.data.user) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data.user;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },
  
  uploadAvatar: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/uploads/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.data.imageUrl;
    } catch (error) {
      console.error('Avatar upload error:', error);
      throw error;
    }
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};
