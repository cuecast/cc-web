import Auth from './auth/index'

export default function (ctx, inject) {
  // Create a new Auth instance
  const $auth = new Auth(ctx);

  // Inject it to nuxt context as $auth
  inject('auth', $auth);
  ctx.$auth = $auth;

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
