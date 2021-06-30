import Koa from 'koa'

const cors: Koa.Middleware = async (c, n) => {
  c.response.set('Access-Control-Allow-Origin', '*')

  await n()
}

export default cors