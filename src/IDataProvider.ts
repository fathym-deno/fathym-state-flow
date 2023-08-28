export interface IDataProvider<T> {
  set(key: string, value: T): Promise<void>;
  get(key: string): Promise<T | null>;
  delete(key: string): Promise<void>;
  query(query: any): Promise<T[]>;
}