
import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Button } from '@/components/ui/buttonSlider';
import { useAuth } from '@/contexts/AuthContext';
import { Pencil, Eye, EyeOff, Upload, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { UpdateProfileRequest } from '@/types/api.types';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Valores para o formulário
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  // Verifica se o usuário está autenticado, senão redireciona para login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Você precisa fazer login para acessar esta página</h1>
          <Button onClick={() => navigate('/login')} className="bg-martial hover:bg-martial-dark">
            Ir para login
          </Button>
        </div>
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset error state
    setUploadError(null);
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 2MB",
        variant: "destructive"
      });
      setUploadError("Arquivo muito grande (máx 2MB)");
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "O arquivo deve ser uma imagem",
        variant: "destructive"
      });
      setUploadError("Tipo de arquivo inválido");
      return;
    }
    
    // Iniciar processo de atualização de perfil com a imagem
    handleSave(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async (avatarFile?: File) => {
    try {
      setUploading(true);
      
      // Filtrar campos vazios ou que não mudaram
      const updates: UpdateProfileRequest = {};
      if (formData.name && formData.name !== user?.name) {
        updates.name = formData.name;
      }
      if (formData.email && formData.email !== user?.email) {
        updates.email = formData.email;
      }
      if (formData.password) {
        updates.password = formData.password;
      }
      
      // Atualizar o perfil
      await updateProfile(updates, avatarFile || null);
      
      setIsEditing(false);
      // Se foi uma atualização de senha, limpar o campo
      if (formData.password) {
        setFormData(prev => ({ ...prev, password: '' }));
      }
      
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu perfil",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Restaurar os valores originais
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Background com estrelas */}
      <div className="stars-background"></div>
      
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-xl mx-auto mt-10 border border-martial rounded-xl p-6 bg-black/80 backdrop-blur-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 relative mb-4">
              <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-white text-5xl overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user?.name || 'Avatar'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || 'U'
                )}
              </div>
              <button 
                onClick={triggerFileInput} 
                disabled={uploading}
                className="absolute right-0 bottom-0 w-10 h-10 bg-martial rounded-full flex items-center justify-center"
              >
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <Upload size={18} className="text-white" />
                )}
              </button>
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            
            {uploadError && (
              <div className="text-red-500 text-sm mb-2">
                {uploadError}
              </div>
            )}
            
            <h1 className="text-3xl font-bold text-white mb-1 tracking-wider">
              {user?.name || 'Usuário'}
              <span className="ml-2 inline-block bg-martial text-white text-xs px-2 py-0.5 rounded-full">✓</span>
            </h1>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>

          <div className="space-y-4">
            {/* Nome */}
            <div className="relative">
              <label className="block text-white text-sm mb-1">Nome:</label>
              <div className="flex items-center">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
                />
                {!isEditing && (
                  <button 
                    onClick={handleEdit}
                    className="absolute right-2 top-9"
                  >
                    <Pencil size={18} className="text-martial" />
                  </button>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-white text-sm mb-1">Email:</label>
              <div className="flex items-center">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
                />
                {!isEditing && (
                  <button 
                    onClick={handleEdit}
                    className="absolute right-2 top-9"
                  >
                    <Pencil size={18} className="text-martial" />
                  </button>
                )}
              </div>
            </div>

            {/* Senha */}
            <div className="relative">
              <label className="block text-white text-sm mb-1">Senha:</label>
              <div className="flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={isEditing ? "Digite para alterar" : "••••••••••"}
                  className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
                />
                <button 
                  onClick={togglePasswordVisibility}
                  className="absolute right-12 top-9"
                  disabled={!isEditing}
                >
                  {showPassword ? (
                    <EyeOff size={18} className={`${isEditing ? 'text-gray-400' : 'text-gray-700'}`} />
                  ) : (
                    <Eye size={18} className={`${isEditing ? 'text-gray-400' : 'text-gray-700'}`} />
                  )}
                </button>
                {!isEditing && (
                  <button 
                    onClick={handleEdit}
                    className="absolute right-2 top-9"
                  >
                    <Pencil size={18} className="text-martial" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-center space-x-4">
              <Button 
                onClick={() => handleSave()}
                className="bg-martial text-white px-6 hover:bg-martial-dark"
              >
                <Check size={18} className="mr-1" />
                SALVAR
              </Button>
              <Button 
                onClick={handleCancel}
                className="bg-gray-700 text-white px-6 hover:bg-gray-600"
              >
                <X size={18} className="mr-1" />
                CANCELAR
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
