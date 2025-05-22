
import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { CreatePollRequest } from '@/types/api.types';
import { PollsService } from '@/services/polls.service';

interface CreatePollFormProps {
  martialArtId: string;
  onPollCreated: () => void;
}

export const CreatePollForm: React.FC<CreatePollFormProps> = ({ martialArtId, onPollCreated }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']);
    } else {
      toast({
        title: "Limite atingido",
        description: "Máximo de 10 opções permitidas",
        variant: "destructive"
      });
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
      toast({
        description: "Uma enquete precisa ter pelo menos 2 opções",
        variant: "destructive"
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!question.trim()) {
      toast({
        title: "Pergunta necessária",
        description: "Por favor, insira uma pergunta para sua enquete",
        variant: "destructive"
      });
      return;
    }
    
    // Checar se todas as opções estão preenchidas
    const emptyOptions = options.filter(opt => !opt.trim());
    if (emptyOptions.length > 0) {
      toast({
        title: "Opções incompletas",
        description: "Todas as opções precisam estar preenchidas",
        variant: "destructive"
      });
      return;
    }

    // Checar por opções duplicadas
    const uniqueOptions = new Set(options);
    if (uniqueOptions.size !== options.length) {
      toast({
        title: "Opções duplicadas",
        description: "Cada opção deve ser única",
        variant: "destructive"
      });
      return;
    }
    
    // Enviar para a API
    try {
      setIsSubmitting(true);
      
      const pollData: CreatePollRequest = {
        question,
        options: options.filter(opt => opt.trim()),
        martialArtId
      };
      
      await PollsService.create(pollData);
      
      // Resetar o formulário
      setQuestion('');
      setOptions(['', '']);
      
      toast({
        title: "Enquete criada",
        description: "Sua enquete foi publicada com sucesso!"
      });
      
      // Notificar o componente pai
      onPollCreated();
    } catch (error: any) {
      console.error('Error creating poll:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar a enquete",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black/20 border border-martial/30 rounded-xl p-4 mb-6">
      <h3 className="text-lg font-bold mb-3">Criar Nova Enquete</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-1">Pergunta</label>
          <input 
            type="text" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ex: Quem vai vencer a luta?"
            className="w-full bg-black/30 border border-martial/30 rounded px-3 py-2"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm mb-2">Opções</label>
          
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input 
                type="text" 
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Opção ${index + 1}`}
                className="flex-1 bg-black/30 border border-martial/30 rounded px-3 py-2 mr-2"
              />
              {index > 1 && (
                <button 
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <MinusCircle size={20} />
                </button>
              )}
            </div>
          ))}
          
          <button 
            type="button"
            onClick={handleAddOption}
            className="flex items-center text-sm text-martial hover:text-martial/80 mt-2"
          >
            <PlusCircle size={16} className="mr-1" /> 
            Adicionar opção
          </button>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-martial hover:bg-martial/80"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            ) : (
              <Send size={16} className="mr-1" />
            )}
            Publicar Enquete
          </Button>
        </div>
      </form>
    </div>
  );
};
