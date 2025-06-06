
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../public/logos/whiteLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      await login({
        email: formData.email,
        password: formData.password
      });
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao Brawl Tech",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Erro no login:", "Credenciais inválidas");
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/backgroundlr.jpg')] bg-cover bg-center h-screen">
      <Navbar />
    <div className=" pt-20  flex items-center">
      <div className="container mx-auto py-20 px-4 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md border rounded-xl p-8 bg-black/50">
        <div className='sm:w-full sm:flex sm:justify-center sm:items-center sm:mb-9 hidden'>
            <img src={logo} alt="Luvas de Boxe" className='w-44' />
            </div>

         <div className='w-full flex justify-center items-center mb-9 sm:hidden'>
            <h1 className="text-3xl font-bold">LOGIN</h1>
            </div>    

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="relative">
                <label className="block text-sm mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-martial hover:bg-martial/80"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white/50 border-t-white rounded-full mr-2"></div>
                    Entrando...
                  </div>
                ) : (
                  "ENTRAR"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              Não tem uma conta?{" "}
              <Link to="/register" className="text-martial hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>  
  );
};

export default Login;
