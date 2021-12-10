'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getCookie = void 0
const koa_1 = __importDefault(require('koa'))
const open_1 = __importDefault(require('open'))
const getCookie = (target, callback) => {
  const port = 5000
  const url = new URL(target)
  url.searchParams.set('callback', `http://127.0.0.1:${port}`)
  open_1.default(url.href)
  const app = new koa_1.default()
  app.use((ctx, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const params = new URLSearchParams(ctx.request.search)
      const cookie = params.get('cookie')
      ctx.set('access-control-allow-credentials', 'true')
      ctx.set('Access-Control-Allow-Origin', `${url.protocol}//${url.host}`)
      ctx.set('Access-Control-Request-Headers', '*')
      ctx.set('Access-Control-Request-Method', 'GET')
      if (params.get('cookie')) {
        ctx.status = 200
        ctx.body = JSON.stringify({ success: true })
        yield next()
        callback(cookie)
        server.close()
        return
      }
      ctx.throw(500, 'can not found cookie')
    })
  )
  const server = app.listen(port, '0.0.0.0')
}
exports.getCookie = getCookie
//# sourceMappingURL=index.js.map
