
import React, { useState } from 'react';
import { User, Poll } from '@/types/api.types';
import { Button } from '@/components/ui/button';
import { PollsService } from '@/services/polls.service';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PollCardProps {
  poll: Poll;
  currentUser: User | null;
  onVoted?: (updatedPoll: Poll) => void;
}

export const PollCard: React.FC<PollCardProps> = ({ poll, currentUser, onVoted }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentPoll, setCurrentPoll] = useState<Poll>(poll);
  
  // Verificar se o usuário já votou
  const hasVoted = currentUser && currentPoll.options.some(option => 
    option.voters.includes(currentUser.id)
  );
  
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };
  
  const handleVote = async () => {
    if (!currentUser) {
      toast({
        title: "Autenticação necessária",
        description: "Você precisa estar logado para votar",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedOption) {
      toast({
        description: "Selecione uma opção para votar",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsVoting(true);
      const updatedPoll = await PollsService.vote(currentPoll.id, {
        optionId: selectedOption
      });
      
      setCurrentPoll(updatedPoll);
      setSelectedOption(null);
      
      if (onVoted) {
        onVoted(updatedPoll);
      }
      
      toast({
        description: "Seu voto foi registrado com sucesso"
      });
    } catch (error: any) {
      toast({
        title: "Erro ao votar",
        description: error.message || "Não foi possível registrar seu voto",
        variant: "destructive"
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-black/20 border border-martial/30 rounded-xl overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={currentPoll.creatorAvatar} alt={currentPoll.creatorName} />
            <AvatarFallback>{currentPoll.creatorName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold">{currentPoll.creatorName}</h3>
            <p className="text-xs opacity-70">Publicado em {formatDate(currentPoll.createdAt)}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">{currentPoll.question}</h2>
          
          <div className="space-y-3">
            {currentPoll.options.map(option => {
              const isOptionSelected = selectedOption === option.id;
              const didVoteForThis = currentUser && option.voters.includes(currentUser.id);
              
              return (
                <div 
                  key={option.id}
                  className={`relative ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={() => !hasVoted && setSelectedOption(option.id)}
                >
                  <div className={`
                    border rounded-md p-3
                    ${didVoteForThis ? 'border-martial bg-martial/20' : isOptionSelected ? 'border-martial' : 'border-white/20'}
                    ${!hasVoted && 'hover:border-martial/50 transition-colors'}
                    relative z-10
                  `}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{option.text}</span>
                      {hasVoted && (
                        <span className="text-sm font-semibold">
                          {option.percentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    
                    {hasVoted && (
                      <>
                        <div className="bg-martial/20 absolute top-0 left-0 h-full z-0 rounded-md"
                             style={{ width: `${option.percentage}%` }}></div>
                        <div className="relative z-10 text-sm">
                          {option.votes} {option.votes === 1 ? 'voto' : 'votos'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div>
            Total: {currentPoll.totalVotes} {currentPoll.totalVotes === 1 ? 'voto' : 'votos'}
          </div>
          
          {!hasVoted && (
            <Button
              onClick={handleVote}
              disabled={!selectedOption || isVoting}
              className="bg-martial hover:bg-martial/80"
              size="sm"
            >
              {isVoting ? 'Votando...' : 'Confirmar Voto'}
            </Button>
          )}
          
          {hasVoted && (
            <div className="text-martial">Você já votou</div>
          )}
        </div>
      </div>
    </div>
  );
};
