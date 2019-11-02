import Auth from './auth/auth'

export default function (ctx, inject) {
  const $auth = new Auth(ctx)

  inject('auth', $auth)
  ctx.$auth = $auth

  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
