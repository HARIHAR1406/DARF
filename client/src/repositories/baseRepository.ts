import { supabase, executeQuery } from '../config/supabase';

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
    return executeQuery(`${this.tableName}.getById`, () =>
      supabase.from(this.tableName as never).select('*').eq('id', id).single()
    ) as Promise<TRow | null>;
  }

  async getAll(options?: QueryOptions): Promise<TRow[]> {
    return executeQuery(`${this.tableName}.getAll`, () => {
      let query = supabase.from(this.tableName as never).select('*');
      if (options?.orderBy) query = query.order(options.orderBy, { ascending: options.ascending ?? true });
      if (options?.limit) query = query.limit(options.limit);
      if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      return query;
    }) as Promise<TRow[]>;
  }

  async create(data: TInsert): Promise<TRow | null> {
    return executeQuery(`${this.tableName}.create`, () =>
      supabase.from(this.tableName as never).insert(data as never).select().single()
    ) as Promise<TRow | null>;
  }

  async update(id: string, data: TUpdate): Promise<TRow | null> {
    return executeQuery(`${this.tableName}.update`, () =>
      supabase.from(this.tableName as never).update(data as never).eq('id', id).select().single()
    ) as Promise<TRow | null>;
  }

  async delete(id: string): Promise<boolean> {
    const result = await executeQuery(`${this.tableName}.delete`, () =>
      supabase.from(this.tableName as never).delete().eq('id', id).select().single()
    );
    return !!result;
  }
}
