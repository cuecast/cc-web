export interface User {
  id: number
  email: string
}

export interface Cast {
  id: number
  name: string
}

export interface YoutubeStream {
  id: number
}

export interface Guest {
  id: number;
  name: string;
}

export interface ChatMessage {
  username: string;
  body: string;
}

export interface Stream {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  hostName: string;
  viewers: number;
}
