export interface Database {
  public: {
    Tables: {
      users: {
        Row: { id: string; created_at: string; email: string; };
        Insert: { id?: string; created_at?: string; email: string; };
        Update: { id?: string; created_at?: string; email?: string; };
      };
      chats: {
        Row: { id: string; user_id: string; title: string; created_at: string; };
        Insert: { id?: string; user_id: string; title: string; created_at?: string; };
        Update: { id?: string; user_id?: string; title?: string; created_at?: string; };
      };
      history: {
        Row: { id: string; chat_id: string; role: string; content: string; created_at: string; };
        Insert: { id?: string; chat_id: string; role: string; content: string; created_at?: string; };
        Update: { id?: string; chat_id?: string; role?: string; content?: string; created_at?: string; };
      };
    };
  };
}
