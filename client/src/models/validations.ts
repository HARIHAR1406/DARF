import { z } from 'zod';

export const UserSchema = z.object({
  firebase_uid: z.string().min(1),
  username: z.string().min(3).max(25),
  email: z.string().email(),
  avatar_url: z.string().url().nullable().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  status: z.enum(['active', 'suspended', 'corrupted']).default('active'),
});

export const ProfileSchema = z.object({
  user_id: z.string().uuid(),
  bio: z.string().max(500).nullable().optional(),
  country: z.string().max(100).nullable().optional(),
  website: z.string().url().nullable().optional(),
  github: z.string().url().nullable().optional(),
  linkedin: z.string().url().nullable().optional(),
  skills: z.array(z.string()).nullable().optional(),
});

export const ChatSchema = z.object({
  user_id: z.string().uuid(),
  title: z.string().min(1).max(255),
  chat_type: z.enum(['standard', 'corrupted', 'rebuild']).default('standard'),
});

export const MessageSchema = z.object({
  chat_id: z.string().uuid(),
  sender_type: z.enum(['user', 'ai', 'system']),
  message_content: z.string().min(1),
});

export const SessionSchema = z.object({
  user_id: z.string().uuid(),
  session_token: z.string().min(1),
  device_information: z.string().nullable().optional(),
  ip_address: z.string().ip().nullable().optional(),
  expires_at: z.string().datetime(),
});

export const LogSchema = z.object({
  user_id: z.string().uuid().nullable().optional(),
  event_type: z.string().min(1),
  description: z.string().min(1),
  severity: z.enum(['info', 'warning', 'error', 'critical']),
});

export const AnalyticsSchema = z.object({
  user_id: z.string().uuid().nullable().optional(),
  metric_name: z.string().min(1),
  metric_value: z.number(),
});
