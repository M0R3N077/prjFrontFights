
import { useEffect, useState } from 'react';
import { MartialArtsService } from '@/services/martialArts.service';
import { MartialArt, MartialArtRequest } from '@/types/api.types';
import { useToast } from '@/components/ui/use-toast';

export const useMartialArts = () => {
  const [martialArts, setMartialArts] = useState<MartialArt[]>([]);
  const [selectedMartialArt, setSelectedMartialArt] = useState<MartialArt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMartialArts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MartialArtsService.getAllMartialArts();
      setMartialArts(data);
    } catch (err) {
      setError('Erro ao carregar artes marciais');
      toast({
        title: "Erro",
        description: "Não foi possível carregar as artes marciais",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMartialArtById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MartialArtsService.getMartialArtById(id);
      setSelectedMartialArt(data);
      return data;
    } catch (err) {
      setError(`Erro ao carregar arte marcial com ID ${id}`);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os detalhes da arte marcial",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createMartialArt = async (martialArtData: MartialArtRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MartialArtsService.createMartialArt(martialArtData);
      setMartialArts(prev => [...prev, data]);
      toast({
        title: "Sucesso",
        description: "Arte marcial criada com sucesso",
      });
      return data;
    } catch (err) {
      setError('Erro ao criar arte marcial');
      toast({
        title: "Erro",
        description: "Não foi possível criar a arte marcial",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMartialArt = async (id: string, martialArtData: Partial<MartialArtRequest>) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await MartialArtsService.updateMartialArt(id, martialArtData);
      setMartialArts(prev => prev.map(item => item.id === id ? data : item));
      if (selectedMartialArt && selectedMartialArt.id === id) {
        setSelectedMartialArt(data);
      }
      toast({
        title: "Sucesso",
        description: "Arte marcial atualizada com sucesso",
      });
      return data;
    } catch (err) {
      setError(`Erro ao atualizar arte marcial com ID ${id}`);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a arte marcial",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMartialArt = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await MartialArtsService.deleteMartialArt(id);
      setMartialArts(prev => prev.filter(item => item.id !== id));
      if (selectedMartialArt && selectedMartialArt.id === id) {
        setSelectedMartialArt(null);
      }
      toast({
        title: "Sucesso",
        description: "Arte marcial removida com sucesso",
      });
      return true;
    } catch (err) {
      setError(`Erro ao remover arte marcial com ID ${id}`);
      toast({
        title: "Erro",
        description: "Não foi possível remover a arte marcial",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await MartialArtsService.uploadImage(file);
      return imageUrl;
    } catch (err) {
      setError('Erro ao fazer upload da imagem');
      toast({
        title: "Erro",
        description: "Não foi possível fazer upload da imagem",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar artes marciais automaticamente quando o componente é montado
  useEffect(() => {
    fetchMartialArts();
  }, []);

  return {
    martialArts,
    selectedMartialArt,
    isLoading,
    error,
    fetchMartialArts,
    fetchMartialArtById,
    createMartialArt,
    updateMartialArt,
    deleteMartialArt,
    uploadImage,
    setSelectedMartialArt
  };
};
