import { IDataProvider } from "../IDataProvider.ts";
import { JsonSchema } from "../JsonSchema.ts";
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export class PostgresDataProvider<T> implements IDataProvider<T> {
  private pool: Pool;

  constructor(private connectionString: string) {
    this.pool = new Pool(connectionString, 3, true);
  }

  public async Set(key: (string | number)[], value: T): Promise<void> {
    const connection = await this.pool.connect();
    try {
      await connection.queryObject`INSERT INTO table (key, value) VALUES (${key}, ${value})`;
    } finally {
      connection.release();
    }
  }

  public async Get(key: (string | number)[]): Promise<T | null> {
    const connection = await this.pool.connect();
    try {
      const result = await connection.queryObject`SELECT value FROM table WHERE key = ${key}`;
      return result.rows[0] as T;
    } finally {
      connection.release();
    }
  }

  public async Delete(key: (string | number)[]): Promise<void> {
    const connection = await this.pool.connect();
    try {
      await connection.queryObject`DELETE FROM table WHERE key = ${key}`;
    } finally {
      connection.release();
    }
  }

  public Query(_query: JsonSchema): Promise<T[]> {
    return Promise.resolve([]);
  }

  public async List(prefix: (string | number)[]): Promise<T[]> {
    const connection = await this.pool.connect();
    try {
      const result = await connection.queryObject`SELECT value FROM table WHERE key LIKE ${prefix}%`;
      return result.rows as T[];
    } finally {
      connection.release();
    }
  }
}