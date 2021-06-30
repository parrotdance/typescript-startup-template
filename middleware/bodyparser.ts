import Koa from 'koa'
import { DATA_TYPE, readAllDataFromStream } from '../utils/stream'

enum ContentType {
  JSON = 'application/json'
}

const bodyparser: Koa.Middleware = async (c, n) => {
  switch (c.headers['content-type']) {
    case ContentType.JSON:
      (c.request as any).body = await readAllDataFromStream(c.req, { readAs: DATA_TYPE.JSON })
      break
    default:
      (c.request as any).body = await readAllDataFromStream(c.req, { readAs: DATA_TYPE.JSON })
  }
  await n()
}

export type RequestBodyContext = {
  request: {
    body: unknown
  } & Koa.Request
}

export default bodyparser