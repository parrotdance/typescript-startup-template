import Router from 'koa-router'
import root from './root'
import Koa from 'koa'
import { DbContext } from '../middleware/db'
import { RequestBodyContext } from '../middleware/bodyparser'

const activeRoutes: RouteDefinition[] = [
  root,
]

export type ContextForRouterHandler = Koa.ExtendableContext & DbContext & RequestBodyContext

export type RouteDefinition = {
  readonly PATH: string,
  readonly get?: Koa.Middleware<Koa.DefaultState, ContextForRouterHandler>
  readonly post?: Koa.Middleware<Koa.DefaultState, ContextForRouterHandler>
  readonly put?: Koa.Middleware<Koa.DefaultState, ContextForRouterHandler>
  readonly del?: Koa.Middleware<Koa.DefaultState, ContextForRouterHandler>
}

const logger = (context: ContextForRouterHandler) => {
  // TODO: logger
  console.log(context.url)
}

const createRouter = () => {
  const router = new Router()
  activeRoutes.forEach(({ PATH, get, post, put, del }) => {
    get && router.get<Koa.DefaultState, ContextForRouterHandler>(PATH, get, logger)
    post && router.post<Koa.DefaultState, ContextForRouterHandler>(PATH, post, logger)
    put && router.put<Koa.DefaultState, ContextForRouterHandler>(PATH, put, logger)
    del && router.del<Koa.DefaultState, ContextForRouterHandler>(PATH, del, logger)
  })
  const routes = router.routes()
  const allowedMethods = router.allowedMethods()
  return { routes, allowedMethods }
}

export default createRouter
