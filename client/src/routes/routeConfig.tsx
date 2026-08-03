import { lazy } from 'react';

// Public
export const LandingPage = lazy(() => import('../pages/public/LandingPage'));
export const FeaturesPage = lazy(() => import('../pages/public/FeaturesPage'));
export const DocsPage = lazy(() => import('../pages/public/DocsPage'));

// Auth
export const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
export const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
export const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage'));
export const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));

// App
export const ChatPage = lazy(() => import('../pages/app/ChatPage'));
export const ProfilePage = lazy(() => import('../pages/app/ProfilePage'));
export const SettingsPage = lazy(() => import('../pages/app/SettingsPage'));
export const HistoryPage = lazy(() => import('../pages/app/HistoryPage'));

// Admin
export const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
export const MonitoringPage = lazy(() => import('../pages/admin/MonitoringPage'));
export const LogsPage = lazy(() => import('../pages/admin/LogsPage'));
export const UsersPage = lazy(() => import('../pages/admin/UsersPage'));
export const DestructorPage = lazy(() => import('../pages/admin/DestructorPage'));
export const RebuildPage = lazy(() => import('../pages/admin/RebuildPage'));

// System
export const CorruptedPage = lazy(() => import('../pages/system/CorruptedPage'));
