
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '@/services/auth.service';
import { User, UpdateProfileRequest } from '@/types/api.types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileRequest, avatarFile?: File | null) => Promise<void>;
  updateUserAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verify if the user is authenticated when loading the page
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await AuthService.login(credentials);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await AuthService.register(userData);
      setUser(response.user);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const updateUserAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = async (data: UpdateProfileRequest, avatarFile?: File | null) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      // If there's an avatar file, upload it first
      if (avatarFile) {
        const avatarUrl = await AuthService.uploadAvatar(avatarFile);
        data.avatar = avatarUrl;
      }

      const updatedUser = await AuthService.updateProfile(data);
      
      // Update the user state with the new data
      setUser(prevUser => {
        if (prevUser) {
          return {
            ...prevUser,
            ...updatedUser,
          };
        }
        return null;
      });

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Falha ao atualizar perfil',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        updateUserAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
