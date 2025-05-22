import api from './api';
import { FightSocialPost } from '@/pages/FightSocialPage';

export interface CreatePostDTO {
  content: string;
  martialArtId: string;
  media?: File;
}

export interface AddCommentDTO {
  content: string;
}

export class PostsService {
  // Get all posts for a specific martial art
  static async getPostsByMartialArt(martialArtId: string): Promise<FightSocialPost[]> {
    try {
      const response = await api.get(`/posts/martial-art/${martialArtId}`);
      return response.data.posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Create a new post
  static async createPost(postData: CreatePostDTO): Promise<FightSocialPost> {
    try {
      const formData = new FormData();
      formData.append('content', postData.content);
      formData.append('martialArtId', postData.martialArtId);
      
      if (postData.media) {
        formData.append('media', postData.media);
      }
      
      const response = await api.post(`/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Toggle reaction on a post
  static async toggleReaction(postId: string): Promise<{count: number, users: string[]}> {
    try {
      const response = await api.post(`/posts/${postId}/reaction`);
      return response.data.reactions;
    } catch (error) {
      console.error('Error toggling reaction:', error);
      throw error;
    }
  }

  // Add a comment to a post
  static async addComment(postId: string, commentData: AddCommentDTO): Promise<any> {
    try {
      const response = await api.post(`/posts/${postId}/comment`, commentData);
      return response.data.comment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Delete a post
  static async deletePost(postId: string): Promise<boolean> {
    try {
      await api.delete(`/posts/${postId}`);
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}
