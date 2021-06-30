import Koa from 'koa'
import createRouter from './route'
import { PORT } from './config'
import bodyparser from './middleware/bodyparser'
import mountDbToContextOf from './middleware/db'
import cors from './middleware/cors'

async function main() {
  const app = new Koa()
  const { routes, allowedMethods } = createRouter()
  await mountDbToContextOf(app)
  app.use(cors)
  app.use(bodyparser)
  app.use(routes)
  app.use(allowedMethods)
  app.listen(PORT, () => {
    console.log(`listening at port: ${PORT}`)
  })
}

main()
