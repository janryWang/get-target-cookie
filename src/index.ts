import Koa from 'koa'
import open from 'open'

export const getCookie = (
  target: string,
  callback: (cookie: string) => void
) => {
  const port = 5000
  const url = new URL(target)
  url.searchParams.set('callback', `http://127.0.0.1:${port}`)
  open(url.href)

  const app = new Koa()

  app.use(async (ctx, next) => {
    const params = new URLSearchParams(ctx.request.search)
    const cookie = params.get('cookie')
    ctx.set('access-control-allow-credentials', 'true')
    ctx.set('Access-Control-Allow-Origin', `${url.protocol}//${url.host}`)
    ctx.set('Access-Control-Request-Headers', '*')
    ctx.set('Access-Control-Request-Method', 'GET')
    if (params.get('cookie')) {
      ctx.status = 200
      ctx.body = JSON.stringify({ success: true })
      await next()
      callback(cookie)
      server.close()
      return
    }
    ctx.throw(500, 'can not found cookie')
  })

  const server = app.listen(port, '0.0.0.0')
}
