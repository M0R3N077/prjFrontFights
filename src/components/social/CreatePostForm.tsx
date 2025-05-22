
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Image, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

interface CreatePostFormProps {
  onSubmit: (content: string, media?: File) => void;
  martialArtId: string;
}


export const CreatePostForm = ({ onSubmit, martialArtId }: CreatePostFormProps) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();
  
  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(content, media || undefined);
      setContent('');
      setMedia(null);
      setMediaPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isMediaImage = media?.type.startsWith('image/');
  const isMediaVideo = media?.type.startsWith('video/');
  
  return (
    <form onSubmit={handleSubmit} className="bg-black/20 border border-martial/30 rounded-xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white overflow-hidden"
        >
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
        <p className="font-semibold">
          {user?.name || 'Usuário'}
        </p>
      </div>
      
      <Textarea
        placeholder={`O que você está pensando sobre ${martialArtId}?`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] mb-3 bg-black/10 border-martial/30 focus-visible:ring-martial"
      />
      
      {mediaPreview && (
        <div className="relative mb-3">
          <button 
            type="button"
            onClick={handleRemoveMedia}
            className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
          >
            <X size={16} />
          </button>
          {isMediaImage && (
            <img 
              src={mediaPreview} 
              alt="Preview" 
              className="w-full max-h-[300px] object-contain rounded-lg"
            />
          )}
          {isMediaVideo && (
            <video 
              src={mediaPreview} 
              controls 
              className="w-full max-h-[300px] rounded-lg"
            />
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <label className="cursor-pointer flex items-center gap-1 text-sm bg-black/10 px-3 py-1.5 rounded-lg hover:bg-black/20 transition-colors">
            <Image size={18} />
            <span>Imagem</span>
            <input 
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </label>
          
          <label className="cursor-pointer flex items-center gap-1 text-sm bg-black/10 px-3 py-1.5 rounded-lg hover:bg-black/20 transition-colors">
            <Video size={18} />
            <span>Vídeo</span>
            <input 
              type="file"
              accept="video/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </label>
        </div>
        
        <Button 
          type="submit" 
          disabled={!content.trim() || isSubmitting}
          className="bg-martial hover:bg-martial/80"
        >
          {isSubmitting ? 'Enviando...' : 'Publicar'}
        </Button>
      </div>
    </form>
  );
};
