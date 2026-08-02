import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { DestructorLayout } from '../layouts/DestructorLayout';

import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { DestructorRoute } from './DestructorRoute';

import * as Pages from './routeConfig';

export const AppRouter: React.FC = () => {
  // TODO: Wrap with context providers if necessary
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route element={<RootLayout />}>
            
            {/* Public Routes */}
            <Route path="/" element={<Pages.LandingPage />} />
            <Route path="/features" element={<Pages.FeaturesPage />} />
            <Route path="/docs" element={<Pages.DocsPage />} />

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Pages.LoginPage />} />
              <Route path="/register" element={<Pages.RegisterPage />} />
              <Route path="/forgot-password" element={<Pages.ForgotPasswordPage />} />
              <Route path="/reset-password" element={<Pages.ResetPasswordPage />} />
            </Route>

            {/* Protected App Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/chat" element={<Pages.ChatPage />} />
                <Route path="/profile" element={<Pages.ProfilePage />} />
                <Route path="/settings" element={<Pages.SettingsPage />} />
                <Route path="/history" element={<Pages.HistoryPage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Pages.DashboardPage />} />
                <Route path="users" element={<Pages.UsersPage />} />
                <Route path="logs" element={<Pages.LogsPage />} />
                <Route path="destructor" element={<Pages.DestructorPage />} />
                <Route path="rebuild" element={<Pages.RebuildPage />} />
                <Route path="monitoring" element={<Pages.MonitoringPage />} />
              </Route>
            </Route>

          </Route>

          {/* Destructor Route */}
          <Route element={<DestructorRoute />}>
            <Route element={<DestructorLayout />}>
              <Route path="/corrupted" element={<Pages.CorruptedPage />} />
            </Route>
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
