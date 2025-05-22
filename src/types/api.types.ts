
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  success: boolean;
}

export interface MartialArt {
  id: string;
  name: string;
  description: string;
  origin: string;
  foundedYear?: number;
  location: {
    lat: number;
    lng: number;
  };
  styles?: string[];
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
}

export interface MartialArtRequest {
  name: string;
  description: string;
  origin: string;
  foundedYear?: number;
  location: {
    lat: number;
    lng: number;
  };
  styles?: string[];
  imageUrl?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  creatorName: string;
  creatorAvatar?: string;
  martialArtId: string;
  createdAt: string;
  totalVotes: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
  voters: string[];
}

export interface CreatePollRequest {
  question: string;
  options: string[];
  martialArtId: string;
}

export interface VotePollRequest {
  optionId: string;
}
