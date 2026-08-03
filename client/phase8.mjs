import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, 'src');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const writeFile = (relPath, content) => {
  const fullPath = path.join(baseDir, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
};

const files = {
  'auth/types/index.ts': `
export type Role = 'USER' | 'ADMIN' | 'SYSTEM';
export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'execute';
}
export interface AuthSession {
  token: string;
  expiresAt: number;
  refreshToken: string;
}
  `,
  'auth/utils/session.ts': `
import { AuthSession } from '../types';

export const SessionManager = {
  persist: (session: AuthSession) => {
    localStorage.setItem('darf_session', JSON.stringify(session));
  },
  restore: (): AuthSession | null => {
    const data = localStorage.getItem('darf_session');
    return data ? JSON.parse(data) : null;
  },
  clear: () => {
    localStorage.removeItem('darf_session');
  },
  isExpired: (session: AuthSession) => {
    return Date.now() >= session.expiresAt;
  }
};
  `,
  'auth/guards/RoleGuard.tsx': `
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Role } from '../types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { user } = useAuthStore();
  // We assume user role is mapped somewhere or default to USER
  const userRole: Role = (user as any)?.role || 'USER';

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
  `,
  'auth/services/tokenService.ts': `
export const TokenService = {
  refreshSession: async () => {
    // Handle specific refresh logic against Firebase/Supabase
    return true;
  }
};
  `,
  'routes/PublicRoute.tsx': `
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/chat" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
  `,
  'pages/auth/VerifyEmailPage.tsx': `
import React from 'react';

const VerifyEmailPage: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="glass p-8 rounded-xl max-w-md w-full border border-border shadow-2xl flex flex-col items-center">
        <h2 className="text-2xl font-heading mb-4 text-center text-text-DEFAULT">Verify Email</h2>
        <p className="text-text-secondary text-center mb-6">
          Please check your inbox and follow the link to verify your email address.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="w-full py-2 bg-primary text-background font-medium rounded transition-opacity hover:opacity-90"
        >
          I have verified my email
        </button>
      </div>
    </div>
  );
};
export default VerifyEmailPage;
  `,
  'routes/index.tsx': `
export * from './AppRouter';
export * from './ProtectedRoute';
export * from './PublicRoute';
  `,
  'routes/AuthLayout.tsx': `
export { AuthLayout } from '../layouts/AuthLayout';
  `
};

for (const [name, content] of Object.entries(files)) {
  writeFile(name, content);
}

// Modify AppRouter to use PublicRoute for Auth routes and add VerifyEmailPage
const appRouterPath = path.join(baseDir, 'routes/AppRouter.tsx');
if (fs.existsSync(appRouterPath)) {
  let routerContent = fs.readFileSync(appRouterPath, 'utf8');
  if (!routerContent.includes('PublicRoute')) {
    routerContent = routerContent.replace("import { ProtectedRoute } from './ProtectedRoute';", "import { ProtectedRoute } from './ProtectedRoute';\\nimport { PublicRoute } from './PublicRoute';");
    routerContent = routerContent.replace('<Route element={<AuthLayout />}>', '<Route element={<PublicRoute />}><Route element={<AuthLayout />}>');
    routerContent = routerContent.replace('<Route path="/reset-password" element={<Pages.ResetPasswordPage />} />\\n            </Route>', '<Route path="/reset-password" element={<Pages.ResetPasswordPage />} />\\n              <Route path="/verify-email" element={<Pages.VerifyEmailPage />} />\\n            </Route></Route>');
    fs.writeFileSync(appRouterPath, routerContent, 'utf8');
  }
}

// Update routeConfig to include VerifyEmailPage
const routeConfigPath = path.join(baseDir, 'routes/routeConfig.tsx');
if (fs.existsSync(routeConfigPath)) {
  let routeConfigContent = fs.readFileSync(routeConfigPath, 'utf8');
  if (!routeConfigContent.includes('VerifyEmailPage')) {
    routeConfigContent = routeConfigContent.replace("export const ResetPasswordPage", "export const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage'));\\nexport const ResetPasswordPage");
    fs.writeFileSync(routeConfigPath, routeConfigContent, 'utf8');
  }
}

console.log('Phase 8 execution complete');
