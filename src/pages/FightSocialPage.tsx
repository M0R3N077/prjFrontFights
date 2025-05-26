
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, Send, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { martialArts } from '@/data/globeData';
import { SocialPost } from '@/components/social/SocialPost';
import { CreatePostForm } from '@/components/social/CreatePostForm';
import { CreatePollForm } from '@/components/social/CreatePollForm';
import { PollCard } from '@/components/social/PollCard';
import { toast } from '@/hooks/use-toast';
import { PostsService } from '@/services/posts.service';
import { PollsService } from '@/services/polls.service';
import { Poll } from '@/types/api.types';

// Tipos de reações por luta
export const getReactionIcon = (martialArtId: string) => {
  switch (martialArtId) {
    case 'boxing':
      return { icon: '🥊', label: 'Luva' };
    case 'judo':
      return { icon: '🥋', label: 'Ippon' };
    case 'wrestling':
      return { icon: '💪', label: 'Takedown' };
    case 'taekwondo':
      return { icon: '🦶', label: 'Chute' };
    case 'fencing':
      return { icon: '🤺', label: 'Florete' };
    case 'karate':
      return { icon: '✋', label: 'Kata' };
    default:
      return { icon: '👍', label: 'Like' };
  }
};

export interface FightSocialPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: Date;
  reactions: {
    count: number;
    users: string[];
  };
  comments: {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: Date;
  }[];
}

enum ContentType {
  Posts,
  Polls
}

const FightSocialPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState<FightSocialPost[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ContentType>(ContentType.Posts);
  const [showNewPollForm, setShowNewPollForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Encontrar a arte marcial com base no ID
  const martialArt = martialArts.find(art => art.id === id);
  
  useEffect(() => {
    // Fetch content when martial art or tab changes
    if (id) {
      if (activeTab === ContentType.Posts) {
        fetchPosts();
      } else {
        fetchPolls();
      }
    }
  }, [id, activeTab]);

  // Function to fetch posts
  const fetchPosts = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const fetchedPosts = await PostsService.getPostsByMartialArt(id);
      const parsedPosts = (fetchedPosts || []).map(post => ({
        ...post,
        timestamp: new Date(post.timestamp),
        comments: post.comments.map(comment => ({
          ...comment,
          timestamp: new Date(comment.timestamp),
        })),
      }));
      setPosts(parsedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os posts.",
        variant: "destructive"
      });
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch polls
  const fetchPolls = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const fetchedPolls = await PollsService.getByMartialArt(id);
      setPolls(fetchedPolls || []);
    } catch (error) {
      console.error('Error fetching polls:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as enquetes.",
        variant: "destructive"
      });
      setPolls([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (content: string, media?: File) => {
    if (!user || !id) return;
    
    try {
      const newPost = await PostsService.createPost({
        content,
        martialArtId: id,
        media
      });
      
      if (newPost) {
        // Atualizar a lista de posts com segurança
        setPosts(prevPosts => [{
          ...newPost,
          timestamp: new Date(newPost.timestamp),
          comments: newPost.comments.map(comment => ({
            ...comment,
            timestamp: new Date(comment.timestamp),
          }))
        }, ...(prevPosts || [])]);
        
        toast({
          title: "Post criado com sucesso!",
          description: "Seu post foi compartilhado com a comunidade.",
        });
        
        // Recarregar todos os posts para garantir a consistência
        setTimeout(() => {
          fetchPosts();
        }, 500);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o post.",
        variant: "destructive"
      });
    }
  };

  const handlePollCreated = () => {
    setShowNewPollForm(false);
    fetchPolls();
    setActiveTab(ContentType.Polls);
  };

  const handleReaction = async (postId: string) => {
    if (!user) {
      toast({
        title: "Autenticação necessária",
        description: "Faça login para reagir aos posts.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const updatedReactions = await PostsService.toggleReaction(postId);
      
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            reactions: updatedReactions
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error toggling reaction:', error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar sua reação.",
        variant: "destructive"
      });
    }
  };

  const handleAddComment = async (postId: string, commentContent: string) => {
    if (!user || !commentContent.trim()) {
      if (!user) {
        toast({
          title: "Autenticação necessária",
          description: "Faça login para comentar nos posts.",
          variant: "destructive"
        });
      }
      return;
    }
    
    try {
      const newComment = await PostsService.addComment(postId, { content: commentContent });
      
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                ...newComment,
                timestamp: new Date(newComment.timestamp),
              }
            ]
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o comentário.",
        variant: "destructive"
      });
    }
  };

  const handlePollVoted = (updatedPoll: Poll) => {
    setPolls(prevPolls => 
      prevPolls.map(poll => 
        poll.id === updatedPoll.id ? updatedPoll : poll
      )
    );
  };

  if (!martialArt) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 text-center">
          <h1 className="text-3xl font-bold mb-4">Arte marcial não encontrada</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto pt-36 sm:pt-24 px-4 pb-16">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Coluna lateral esquerda - Informações da luta */}
          <div className="md:w-1/4">
            <div className="bg-black/20 border border-martial/30 rounded-xl p-4 sticky top-28">
              <div 
                className="h-32 rounded-lg mb-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${martialArt.image || '/martial-art-placeholder.jpg'})` }}
              />
              
              <h1 className="text-2xl font-bold mb-2">{martialArt.name}</h1>
              <p className="text-sm mb-4 opacity-80">{martialArt.country} • {martialArt.origin || 'Origem desconhecida'}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Sobre</h3>
                <p className="text-sm opacity-80">{martialArt.description}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Links</h3>
                <div className="flex flex-col gap-2">
                  <Link 
                    to={`/martial-art/${id}`}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    Detalhes completos
                  </Link>
                  <Link 
                    to={`/find-gyms/${id}`}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    Encontrar academias
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feed principal */}
          <div className="md:flex-1" ref={containerRef}>
            {/* Abas para alternar entre posts e enquetes */}
            <div className="flex mb-6 border-b border-martial/30">
              <button
                className={`py-3 px-6 font-medium ${activeTab === ContentType.Posts ? 'text-martial border-b-2 border-martial' : 'text-gray-400'}`}
                onClick={() => setActiveTab(ContentType.Posts)}
              >
                Posts
              </button>
              <button
                className={`py-3 px-6 font-medium ${activeTab === ContentType.Polls ? 'text-martial border-b-2 border-martial' : 'text-gray-400'}`}
                onClick={() => setActiveTab(ContentType.Polls)}
              >
                Enquetes
              </button>
            </div>
            
            {/* Conteúdo baseado na aba selecionada */}
            {activeTab === ContentType.Posts ? (
              <>
                {/* Formulário para criar post */}
                {isAuthenticated ? (
                  <CreatePostForm 
                    onSubmit={handleCreatePost}
                    martialArtId={id || ''}
                  />
                ) : (
                  <div className="bg-black/20 border border-martial/30 rounded-xl p-6 mb-6 text-center">
                    <MessageSquare className="mx-auto mb-3 text-martial" size={30} />
                    <h3 className="text-xl font-bold mb-2">Faça login para participar</h3>
                    <p className="mb-4 opacity-80">Entre na sua conta para postar e interagir com outros fãs</p>
                    <Link to="/login">
                      <Button className="bg-martial hover:bg-martial/80">
                        Fazer Login
                      </Button>
                    </Link>
                  </div>
                )}
                
                {/* Lista de posts */}
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-black/20 border border-martial/30 rounded-xl p-6 animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-600" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-600 rounded w-1/3 mb-2" />
                            <div className="h-3 bg-gray-600 rounded w-1/4" />
                          </div>
                        </div>
                        <div className="h-4 bg-gray-600 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-600 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-600 rounded w-3/4" />
                        <div className="h-40 bg-gray-700 rounded-lg mt-4" />
                      </div>
                    ))}
                  </div>
                ) : posts.length > 0 ? (
                  <div className="space-y-6">
                    {posts.map(post => (
                      <SocialPost
                        key={post.id}
                        post={post}
                        currentUserId={user?.id}
                        martialArtId={id || ''}
                        onReaction={() => handleReaction(post.id)}
                        onAddComment={(content) => handleAddComment(post.id, content)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-black/20 border border-martial/30 rounded-xl p-10 text-center">
                    <h3 className="text-xl font-bold mb-2">Nenhum post ainda</h3>
                    <p className="opacity-80 mb-4">
                      Seja o primeiro a compartilhar algo na comunidade de {martialArt.name}!
                    </p>
                    {isAuthenticated && (
                      <Button className="bg-martial hover:bg-martial/80">
                        Criar Post
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Área de enquetes */}
                {isAuthenticated && (
                  <div className="mb-6">
                    {showNewPollForm ? (
                      <CreatePollForm 
                        martialArtId={id || ''} 
                        onPollCreated={handlePollCreated} 
                      />
                    ) : (
                      <Button 
                        onClick={() => setShowNewPollForm(true)}
                        className="bg-martial hover:bg-martial/80 mb-4"
                      >
                        <Plus size={18} className="mr-1" /> Nova Enquete
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Lista de enquetes */}
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-black/20 border border-martial/30 rounded-xl p-6 animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gray-600" />
                          <div className="flex-1">
                            <div className="h-4 bg-gray-600 rounded w-1/3 mb-2" />
                            <div className="h-3 bg-gray-600 rounded w-1/4" />
                          </div>
                        </div>
                        <div className="h-6 bg-gray-600 rounded w-3/4 mb-4" />
                        <div className="space-y-3">
                          <div className="h-10 bg-gray-700 rounded-md w-full" />
                          <div className="h-10 bg-gray-700 rounded-md w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : polls.length > 0 ? (
                  <div className="space-y-4">
                    {polls.map(poll => (
                      <PollCard 
                        key={poll.id} 
                        poll={poll} 
                        currentUser={user} 
                        onVoted={handlePollVoted}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-black/20 border border-martial/30 rounded-xl p-10 text-center">
                    <h3 className="text-xl font-bold mb-2">Nenhuma enquete ainda</h3>
                    <p className="opacity-80 mb-4">
                      Seja o primeiro a criar uma enquete na comunidade de {martialArt.name}!
                    </p>
                    {isAuthenticated && !showNewPollForm && (
                      <Button 
                        onClick={() => setShowNewPollForm(true)}
                        className="bg-martial hover:bg-martial/80"
                      >
                        <Plus size={18} className="mr-1" /> Nova Enquete
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Coluna lateral direita - Eventos e Lutadores */}
          <div className="md:w-1/4">
            <div className="bg-black/20 border border-martial/30 rounded-xl p-4 sticky top-28">
              <h2 className="text-lg font-bold mb-3">Próximos Eventos</h2>
              <div className="space-y-3 mb-6">
                {/* Lista de eventos fictícios */}
                {[
                  { title: `Campeonato de ${martialArt.name}`, date: '24 Jun' },
                  { title: 'Torneio Internacional', date: '12 Jul' },
                  { title: 'Copa Brasil', date: '03 Ago' }
                ].map((event, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-martial/20 pb-2">
                    <span className="text-sm">{event.title}</span>
                    <span className="text-xs bg-martial/20 px-2 py-1 rounded">{event.date}</span>
                  </div>
                ))}
              </div>
              
              <h2 className="text-lg font-bold mb-3">Principais Lutadores</h2>
              <div className="space-y-3">
                {/* Lista de lutadores da arte marcial */}
                {(martialArt.famousFighters || [
                  { name: "Fighter 1", record: "20-2", country: "Brasil" },
                  { name: "Fighter 2", record: "18-4", country: "EUA" },
                  { name: "Fighter 3", record: "15-1", country: "Japão" }
                ]).slice(0, 3).map((fighter, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-martial/20 pb-2">
                    <div className="w-8 h-8 rounded-full bg-martial/30 flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{fighter.name}</div>
                      <div className="text-xs opacity-70">{fighter.record} • {fighter.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightSocialPage;
