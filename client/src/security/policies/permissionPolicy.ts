export enum Role {
    GUEST = 'GUEST',
    USER = 'USER',
    ADMIN = 'ADMIN',
    SYSTEM = 'SYSTEM'
}

export enum Permission {
    EXECUTE_WORKFLOW = 'EXECUTE_WORKFLOW',
    READ_KNOWLEDGE = 'READ_KNOWLEDGE',
    WRITE_KNOWLEDGE = 'WRITE_KNOWLEDGE',
    MODIFY_LEARNING = 'MODIFY_LEARNING',
    ACCESS_SECURITY = 'ACCESS_SECURITY'
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [Role.GUEST]: [Permission.READ_KNOWLEDGE],
    [Role.USER]: [Permission.EXECUTE_WORKFLOW, Permission.READ_KNOWLEDGE],
    [Role.ADMIN]: [
        Permission.EXECUTE_WORKFLOW,
        Permission.READ_KNOWLEDGE,
        Permission.WRITE_KNOWLEDGE,
        Permission.MODIFY_LEARNING
    ],
    [Role.SYSTEM]: [
        Permission.EXECUTE_WORKFLOW,
        Permission.READ_KNOWLEDGE,
        Permission.WRITE_KNOWLEDGE,
        Permission.MODIFY_LEARNING,
        Permission.ACCESS_SECURITY
    ]
};
