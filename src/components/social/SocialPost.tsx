
import { useState } from 'react';
import { MessageSquare, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FightSocialPost, getReactionIcon } from '@/pages/FightSocialPage';
import SocialReactionIcon from './SocialReactionIcon';

interface SocialPostProps {
  post: FightSocialPost;
  currentUserId?: string;
  martialArtId: string;
  onReaction: () => void;
  onAddComment: (content: string) => void;
}

export const SocialPost = ({ 
  post, 
  currentUserId, 
  martialArtId,
  onReaction,
  onAddComment 
}: SocialPostProps) => {
  const [showComments, setShowComments] = useState(post.comments.length > 0);
  const [commentContent, setCommentContent] = useState('');
  const reactionIcon = getReactionIcon(martialArtId);
  const hasReacted = currentUserId && post.reactions.users.includes(currentUserId);
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Menos de 1 minuto
    if (diff < 60000) { 
      return 'agora';
    }
    
    // Menos de 1 hora
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} min`;
    }
    
    // Menos de 1 dia
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h`;
    }
    
    // Menos de 7 dias
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days}d`;
    }
    
    // Data formatada
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    
    onAddComment(commentContent);
    setCommentContent('');
  };

  return (
    <div className="bg-black/20 border border-martial/30 rounded-xl overflow-hidden">
      {/* Cabeçalho do post */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={post.userAvatar} alt={post.userName} />
            <AvatarFallback>{post.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{post.userName}</h3>
            <p className="text-xs opacity-70">{formatTime(post.timestamp)}</p>
          </div>
        </div>
        
        {/* Conteúdo do post */}
        <p className="mb-4">{post.content}</p>
        
        {/* Mídia do post (foto ou vídeo) */}
        {post.mediaUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            {post.mediaType === 'image' ? (
              <img 
                src={post.mediaUrl} 
                alt="Post media" 
                className="w-full object-cover max-h-96"
                loading="lazy"
              />
            ) : (
              <video 
                src={post.mediaUrl} 
                controls 
                className="w-full max-h-96"
                preload="metadata"
              />
            )}
          </div>
        )}
        
        {/* Contadores de reações e comentários */}
        <div className="flex items-center justify-between text-sm opacity-70 mb-2">
          <div className="flex items-center gap-1">
            <SocialReactionIcon iconName={reactionIcon.icon} size={16} />
            <span>{post.reactions.count}</span>
          </div>
          <div>
            {post.comments.length > 0 && (
              <button 
                onClick={() => setShowComments(!showComments)}
                className="hover:underline"
              >
                {post.comments.length} comentário{post.comments.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="flex border-t border-martial/20 pt-2 -mx-1">
          <button 
            className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg transition-colors ${
              hasReacted ? 'text-martial' : 'hover:bg-martial/10'
            }`}
            onClick={onReaction}
          >
            <SocialReactionIcon iconName={reactionIcon.icon} size={18} />
            <span>{reactionIcon.label}</span>
          </button>
          
          <button 
            className="flex-1 flex items-center justify-center gap-1 p-2 rounded-lg transition-colors hover:bg-martial/10"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare size={18} />
            <span>Comentar</span>
          </button>
          
        </div>
      </div>
      
      {/* Área de comentários */}
      {showComments && (
        <div className="bg-black/30 p-4 border-t border-martial/30">
          {/* Formulário para adicionar comentário */}
          {currentUserId && (
            <form onSubmit={handleSubmitComment} className="flex gap-2 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${currentUserId}`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Escreva um comentário..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full bg-black/30 border border-martial/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-martial"
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="absolute right-1 top-1 bg-martial hover:bg-martial/80 rounded-full px-3 py-1 h-auto"
                  disabled={!commentContent.trim()}
                >
                  <MessageSquare size={14} />
                </Button>
              </div>
            </form>
          )}
          
          {/* Lista de comentários */}
          <div className="space-y-4">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.userAvatar} />
                  <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-black/20 rounded-lg p-2">
                    <div className="font-semibold text-sm">{comment.userName}</div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs opacity-70 mt-1 ml-2">
                    {formatTime(comment.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
