export interface Database {
  public: {
    Tables: {
      users: {
        Row: { id: string; firebase_uid: string; username: string; email: string; avatar_url: string | null; role: string; status: string; created_at: string; updated_at: string; };
        Insert: { id?: string; firebase_uid: string; username: string; email: string; avatar_url?: string | null; role?: string; status?: string; created_at?: string; updated_at?: string; };
        Update: { id?: string; firebase_uid?: string; username?: string; email?: string; avatar_url?: string | null; role?: string; status?: string; created_at?: string; updated_at?: string; };
      };
      profiles: {
        Row: { id: string; user_id: string; bio: string | null; country: string | null; website: string | null; github: string | null; linkedin: string | null; skills: string[] | null; created_at: string; updated_at: string; };
        Insert: { id?: string; user_id: string; bio?: string | null; country?: string | null; website?: string | null; github?: string | null; linkedin?: string | null; skills?: string[] | null; created_at?: string; updated_at?: string; };
        Update: { id?: string; user_id?: string; bio?: string | null; country?: string | null; website?: string | null; github?: string | null; linkedin?: string | null; skills?: string[] | null; created_at?: string; updated_at?: string; };
      };
      chats: {
        Row: { id: string; user_id: string; title: string; chat_type: string; created_at: string; updated_at: string; };
        Insert: { id?: string; user_id: string; title: string; chat_type?: string; created_at?: string; updated_at?: string; };
        Update: { id?: string; user_id?: string; title?: string; chat_type?: string; created_at?: string; updated_at?: string; };
      };
      messages: {
        Row: { id: string; chat_id: string; sender_type: string; message_content: string; created_at: string; };
        Insert: { id?: string; chat_id: string; sender_type: string; message_content: string; created_at?: string; };
        Update: { id?: string; chat_id?: string; sender_type?: string; message_content?: string; created_at?: string; };
      };
      sessions: {
        Row: { id: string; user_id: string; session_token: string; device_information: string | null; ip_address: string | null; created_at: string; expires_at: string; };
        Insert: { id?: string; user_id: string; session_token: string; device_information?: string | null; ip_address?: string | null; created_at?: string; expires_at: string; };
        Update: { id?: string; user_id?: string; session_token?: string; device_information?: string | null; ip_address?: string | null; created_at?: string; expires_at?: string; };
      };
      logs: {
        Row: { id: string; user_id: string | null; event_type: string; description: string; severity: string; created_at: string; };
        Insert: { id?: string; user_id?: string | null; event_type: string; description: string; severity: string; created_at?: string; };
        Update: { id?: string; user_id?: string | null; event_type?: string; description?: string; severity?: string; created_at?: string; };
      };
      analytics: {
        Row: { id: string; user_id: string | null; metric_name: string; metric_value: number; created_at: string; };
        Insert: { id?: string; user_id?: string | null; metric_name: string; metric_value: number; created_at?: string; };
        Update: { id?: string; user_id?: string | null; metric_name?: string; metric_value?: number; created_at?: string; };
      };
    };
  };
}
