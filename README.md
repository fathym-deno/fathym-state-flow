# Fathym Data Flow

Fathym Data Flow is a Typescript based data access layer that can be entirely defined by a single JSON Schema. The schema is passed into the constructor of a database, and based on that an entire typesafe Typescript object is created.

The root of the JsonSchema represents the database itself, the first level of properties will be used to define attributes of the database, the main property will be the "Schema". This object will contain the actual database schema used to generate the CRUD/ORM.

## Usage

```ts
import { Database } from "./Database.ts";
import { DenoKVDataProvider } from "./DenoKVDataProvider.ts";

const kv = await Deno.openKv();
const dataProvider = new DenoKVDataProvider(kv);
const schema = {}; // Your JSON schema here

const db = new Database(dataProvider, schema);

// Use the db object to interact with the database
```

Please note that the `query` method in `DenoKVDataProvider` and the validation in `Database` class are not implemented. You will need to implement these parts based on your requirements.