import { JsonSchema } from "./JsonSchema.ts";

export class DatabaseSchema {
  public Name: string;

  public Database: Record<string, JsonSchema>;

  constructor(name: string, database: Record<string, JsonSchema>) {
    this.Name = name;

    this.Database = database;
  }
}
