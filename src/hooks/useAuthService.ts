import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/auth.service';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { LoginRequest, RegisterRequest } from '@/types/api.types';

export const useAuthService = () => {
  const { login: contextLogin, logout: contextLogout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const credentials: LoginRequest = { email, password };
      const response = await AuthService.login(credentials);
      
      if (response.success) {
        // Ajustado para usar apenas os dois parâmetros que o AuthContext aceita
        contextLogin({email, password});
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        return true;
      } else {
        toast({
          title: "Erro ao fazer login",
          description: "Verifique suas credenciais e tente novamente",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar fazer login",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData: RegisterRequest = { name, email, password };
      const response = await AuthService.register(userData);
      
      if (response.success) {
        // Ajustado para usar apenas os dois parâmetros que o AuthContext aceita
        contextLogin({email, password});
        toast({
          title: "Registro realizado com sucesso",
          description: "Bem-vindo ao MartialWorld!",
        });
        return true;
      } else {
        toast({
          title: "Erro ao registrar",
          description: "Não foi possível criar sua conta",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar registrar",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    contextLogout();
  };

  return {
    login,
    register,
    logout,
    isLoading,
  };
};
