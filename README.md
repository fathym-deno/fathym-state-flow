# Fathym Data Flow

Fathym Data Flow is a Typescript based data access layer that can be entirely defined by a single JSON Schema. The schema is passed into the constructor of a database, and based on that an entire typesafe Typescript object is created.

The root of the JsonSchema represents the database itself, the first level of properties will be used to define attributes of the database, the main property will be the "Schema". This object will contain the actual database schema used to generate the CRUD/ORM.

## Usage

```ts
// ./fathym-state-flow.config.ts
import { DatabaseSchema, JsonSchema } from '@fathym/state-flow';

export const MyDBSchema: DatabaseSchema = {
  Name: "TestDB",
  Database: {
    Users: {
      type: "object",
      $id: "./Email",
      properties: {
        Email: { type: "string" },
        DisplayName: { type: "string" },
        Posts: {
          type: "object",
          $id: "./ID",
          properties: {
            ID: { type: "string" },
            Title: { type: "string" },
            Content: { type: "string" },
            Comments: {
              type: 'object',
              #ref: './Database/Users/Comments'
            }
          },
          required: ["Email", "DisplayName"]
        } as JsonSchema,
        Comments: {
          type: "object",
          $id: "./ID",
          properties: {
            ID: { type: "string" },
            Title: { type: "string" },
            Content: { type: "string" }
          },
          required: ["Email", "DisplayName"]
        } as JsonSchema
      },
      required: ["Email", "DisplayName"]
    } as JsonSchema
  }
};

// ./scripts/fathym-state-flow.ts
import { MyDBSchema } from '../fathym-state-flow.config.ts';

export const MyDatabaseManager = new DatabaseManager(MyDBSchema);

await MyDatabaseManager.Generate();

// ./deno.json
"tasks": {
  ...
  "db-gen": "deno run -A ./scripts/fathym-state-flow.ts",
  ...
}

// ./tests/using-the-db.ts
import { TestDB, User, Post, Comment } from "@fathym/state-flow/TestDB";
import { DenoKVDataProvider } from '@fathym/state-flow';

export const MyDataProvider = new DenoKVDataProvider(Deno.openKv());

const DB = new TestDB(MyDataProvider);

const user: User = DB.Users.set({
  Email: "useremail@domain.com",
  DisplayName: "The User"
} as User);

const post: Post = DB.Users(user.Email).Posts.set({
  ID: Guid.NewGuid(),
  Title: "This is an example post",
  Content: "This would be the content of the new example post"
} as Post);

const comment: Comment = DB.Users(user.email).Comments.set({
  ID: Guid.NewGuid(),
  Title: "This is an example comment",
  Content: "This would be the content of the new example comment"
} as Comment).Posts([post.ID]);
```

Please note that the `query` method in `DenoKVDataProvider` and the validation in `Database` class are not implemented. You will need to implement these parts based on your requirements.