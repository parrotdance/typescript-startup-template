import { RouteDefinition } from '.'

const root: RouteDefinition = {
  PATH: '/',
  get: (c) => {
    c.body = 'hello world'
  }
}

export default root
