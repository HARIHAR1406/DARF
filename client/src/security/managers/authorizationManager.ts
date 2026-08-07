import { Role, Permission, ROLE_PERMISSIONS } from '../policies/permissionPolicy';
import { AuthenticationManager } from './authenticationManager';

export class AuthorizationManager {
    private static currentUserRole: Role = Role.GUEST;
    
    public static setUserRole(role: Role): void {
        this.currentUserRole = role;
    }
    
    public static getCurrentRole(): Role {
        return this.currentUserRole;
    }
    
    public static hasPermission(permission: Permission): boolean {
        // Enforce authentication before high-level authorization
        if (permission !== Permission.READ_KNOWLEDGE && !AuthenticationManager.isAuthenticated()) {
            return false;
        }
        
        const rolePermissions = ROLE_PERMISSIONS[this.currentUserRole] || [];
        return rolePermissions.includes(permission);
    }
}
