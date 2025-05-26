
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../public/logos/whiteLogo.png";


const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
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
    
    // Validar os campos
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "Senha curta",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      toast({
        title: "Registro concluído!",
        description: "Bem-vindo ao MartialWorld",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Erro no registro:", error);
      toast({
        title: "Erro no registro",
        description: error.message || "Ocorreu um erro ao registrar sua conta",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-[url(backgroundlr.jpg)] bg-cover bg-center flex items-center">
      <div className="container mx-auto py-20 px-4 flex flex-col items-center">
        <div className="w-full max-w-md border rounded-xl p-8 bg-black/80">
          <div className='w-full flex justify-center items-center mb-9'>
            <img src={logo} alt="Luvas de Boxe" className='w-44' />
            </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded"
                  placeholder="Seu nome"
                />
              </div>

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
                    placeholder="Crie uma senha segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Mínimo de 6 caracteres
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-martial hover:bg-martial/80"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin w-4 h-4 border-2 border-white/50 border-t-white rounded-full mr-2"></div>
                    Cadastrando...
                  </div>
                ) : (
                  "CADASTRAR"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              Já tem uma conta?{" "}
              <Link to="/login" className="text-martial hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
