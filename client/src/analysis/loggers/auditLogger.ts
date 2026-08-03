import { AuditRecord } from '../models/AuditRecord';
export const logAudit = (record: AuditRecord): void => { console.log(record); };
