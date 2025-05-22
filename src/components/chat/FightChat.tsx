
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare } from 'lucide-react';

interface FightChatProps {
  fightId: string;
  fightName: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

const FightChat = ({ fightId, fightName }: FightChatProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // In a real implementation, this would fetch messages from an API
    // For now, let's use some mock data
    setMessages([
      {
        id: '1',
        userId: '123',
        userName: 'FanDeLutas',
        content: `Esse estilo de ${fightName} é incrível! Adoro a fluidez dos movimentos.`,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        userId: '456',
        userName: 'MestreArtes',
        content: 'Alguém aqui pratica? Estou procurando um grupo para treinar juntos.',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        userId: '789',
        userName: 'Lutador2023',
        content: 'Alguém viu a última competição internacional? Foi incrível!',
        timestamp: new Date(Date.now() - 900000)
      }
    ]);
  }, [fightId, fightName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: message,
      timestamp: new Date(),
      
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-black/20 rounded-xl overflow-hidden border border-martial/30">
      <div className="p-4 bg-martial/20 flex items-center gap-2">
        <MessageSquare className="text-martial" />
        <h3 className="font-bold text-lg">Chat de {fightName}</h3>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-3 rounded-lg ${msg.userId === user?.id ? 
              'bg-martial/20 ml-6' : 'bg-secondary mr-6'}`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold">{msg.userName}</span>
              <span className="text-xs opacity-70">{formatTime(msg.timestamp)}</span>
            </div>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-martial/30 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 rounded bg-black/30 border border-martial/30 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-martial"
        />
        <Button 
          type="submit"
          className="bg-martial hover:bg-martial/80"
          disabled={!message.trim()}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default FightChat;
