
import api from './api';
import { MartialArt, MartialArtRequest } from '@/types/api.types';

export const MartialArtsService = {
  getAllMartialArts: async (): Promise<MartialArt[]> => {
    try {
      const response = await api.get('/martial-arts');
      return response.data;
    } catch (error) {
      console.error('Error fetching martial arts:', error);
      throw error;
    }
  },
  
  getMartialArtById: async (id: string): Promise<MartialArt> => {
    try {
      const response = await api.get(`/martial-arts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching martial art with id ${id}:`, error);
      throw error;
    }
  },
  
  createMartialArt: async (martialArtData: MartialArtRequest): Promise<MartialArt> => {
    try {
      const response = await api.post('/martial-arts', martialArtData);
      return response.data;
    } catch (error) {
      console.error('Error creating martial art:', error);
      throw error;
    }
  },
  
  updateMartialArt: async (id: string, martialArtData: Partial<MartialArtRequest>): Promise<MartialArt> => {
    try {
      const response = await api.put(`/martial-arts/${id}`, martialArtData);
      return response.data;
    } catch (error) {
      console.error(`Error updating martial art with id ${id}:`, error);
      throw error;
    }
  },
  
  deleteMartialArt: async (id: string): Promise<void> => {
    try {
      await api.delete(`/martial-arts/${id}`);
    } catch (error) {
      console.error(`Error deleting martial art with id ${id}:`, error);
      throw error;
    }
  },
  
  uploadImage: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await api.post('/uploads/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
};
