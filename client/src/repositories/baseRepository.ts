import { supabase, executeQuery } from '../config/supabase';
import { cacheManager } from '../execution/managers/cacheManager';
import { syncManager } from '../execution/managers/syncManager';

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  ascending?: boolean;
}

export class BaseRepository<TRow, TInsert, TUpdate> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getById(id: string): Promise<TRow | null> {
    const cacheKey = `repo_${this.tableName}_${id}`;
    const cached = cacheManager.get<TRow>(cacheKey);
    if (cached) return cached;

    const result = await executeQuery(`${this.tableName}.getById`, () =>
      supabase.from(this.tableName as never).select('*').eq('id', id).single()
    ) as Promise<TRow | null>;

    if (result) {
        cacheManager.set(cacheKey, result);
    }
    return result;
  }

  async getAll(options?: QueryOptions): Promise<TRow[]> {
    const cacheKey = `repo_${this.tableName}_all_${JSON.stringify(options)}`;
    const cached = cacheManager.get<TRow[]>(cacheKey);
    if (cached) return cached;

    const result = await executeQuery(`${this.tableName}.getAll`, () => {
      let query = supabase.from(this.tableName as never).select('*');
      if (options?.orderBy) query = query.order(options.orderBy, { ascending: options.ascending ?? true });
      if (options?.limit) query = query.limit(options.limit);
      if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      return query;
    }) as unknown as Promise<TRow[]>;
    
    if (result) {
        cacheManager.set(cacheKey, result);
    }
    return result;
  }

  async create(data: TInsert): Promise<TRow | null> {
    const result = await executeQuery(`${this.tableName}.create`, () =>
      supabase.from(this.tableName as never).insert(data as never).select().single()
    ) as Promise<TRow | null>;
    
    if (result) {
        const rowResult = result as { id?: string };
        if (rowResult.id) {
            cacheManager.set(`repo_${this.tableName}_${rowResult.id}`, result);
            syncManager.queueWrite(this.tableName, `create_${rowResult.id}`, result);
        }
    }
    return result;
  }

  async update(id: string, data: TUpdate): Promise<TRow | null> {
    const result = await executeQuery(`${this.tableName}.update`, () =>
      supabase.from(this.tableName as never).update(data as never).eq('id', id).select().single()
    ) as Promise<TRow | null>;
    
    if (result) {
        cacheManager.set(`repo_${this.tableName}_${id}`, result);
        syncManager.queueWrite(this.tableName, `update_${id}`, result);
    }
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await executeQuery(`${this.tableName}.delete`, () =>
      supabase.from(this.tableName as never).delete().eq('id', id).select().single()
    );
    if (result) {
        cacheManager.invalidate(`repo_${this.tableName}_${id}`);
        syncManager.queueWrite(this.tableName, `delete_${id}`, { deleted: true });
    }
    return !!result;
  }
}
