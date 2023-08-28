export class DatabaseSchema {
  Name: string;
  Database: Record<string, JsonSchema>;

  constructor(name: string, database: Record<string, JsonSchema>) {
    this.Name = name;
    this.Database = database;
  }
}