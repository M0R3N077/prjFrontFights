
import api from './api';
import { Poll, CreatePollRequest, VotePollRequest } from '@/types/api.types';

export const PollsService = {
  // Get all polls for a specific martial art
  getByMartialArt: async (martialArtId: string): Promise<Poll[]> => {
    try {
      const response = await api.get(`/polls/martial-art/${martialArtId}`);
      return response.data.polls;
    } catch (error) {
      console.error('Error fetching polls:', error);
      throw error;
    }
  },

  // Create a new poll
  create: async (data: CreatePollRequest): Promise<Poll> => {
    try {
      const response = await api.post('/polls', data);
      return response.data.poll;
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  },

  // Vote in a poll
  vote: async (pollId: string, data: VotePollRequest): Promise<Poll> => {
    try {
      const response = await api.post(`/polls/${pollId}/vote`, data);
      return response.data.poll;
    } catch (error) {
      console.error('Error voting in poll:', error);
      throw error;
    }
  },

  // Get a specific poll by ID
  getById: async (pollId: string): Promise<Poll> => {
    try {
      const response = await api.get(`/polls/${pollId}`);
      return response.data.poll;
    } catch (error) {
      console.error('Error fetching poll:', error);
      throw error;
    }
  }
};
