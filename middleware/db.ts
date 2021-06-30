import Koa from 'koa'
import mongo from 'mongodb'
import { Collection, Db, MongoClient } from 'mongodb'

async function connectDb() {
  const uri = `mongodb://<write-uri-of-mongodb-here>`
  const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    console.log(`[Database] Connecting to database...`)
    await client.connect()
  } catch (err) {
    console.error(`[Database] Connection failed: `)
    throw err
  }
  console.log(`[Database] Connected.`)
  return { client }
}

export default async function mountDbToContextOf(app: Koa) {
  const { client } = await connectDb()
  app.use(async (c, n) => {
    c.db = { client }
    await n()
  })
}

export type DbContext = {
  db: {
    client: MongoClient,
    zeekie: Db,
    zeekieCols: Collection[]
  }
}
