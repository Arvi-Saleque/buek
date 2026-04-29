import "server-only";

import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "buek";

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var __buekMongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb(): Promise<Db | null> {
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global.__buekMongoClientPromise) {
      global.__buekMongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = global.__buekMongoClientPromise;
  } else if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }

  const client = await clientPromise;
  return client.db(dbName);
}
