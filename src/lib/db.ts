import "server-only";

import { Db, MongoClient, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "buek";
const mongoOptions: MongoClientOptions = {
  connectTimeoutMS: 5000,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 15000,
  tls: true,
};

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
      global.__buekMongoClientPromise = new MongoClient(uri, mongoOptions).connect();
    }
    clientPromise = global.__buekMongoClientPromise;
  } else if (!clientPromise) {
    clientPromise = new MongoClient(uri, mongoOptions).connect();
  }

  const client = await clientPromise;
  return client.db(dbName);
}
