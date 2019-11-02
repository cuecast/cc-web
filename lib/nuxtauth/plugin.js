import Auth from './auth'

import './middleware'

// Active schemes
import scheme_003d9a64 from './schemes/local.js'
import scheme_23514a38 from './schemes/oauth2.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/login","logout":"/","home":"/","callback":"/login"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new scheme_003d9a64($auth, {"endpoints":{"login":{"url":"/users/sign_in","method":"post","propertyName":"token.accessToken"},"logout":{"url":"/users/sign_out","method":"delete"},"user":{"url":"/users/current","method":"get","propertyName":"user"}},"_name":"local"}))

  // google
  $auth.registerStrategy('google', new scheme_23514a38($auth, {"client_id":"1093614674363-621bn6aavnrt0s64v725aj1qpe6n8rqu.apps.googleusercontent.com","redirect_uri":"http://localhost:3000/login","user":false,"response_type":"code","access_type":"offline","access_token_endpoint":"http://localhost:3000/api/users/google_oauth2/callback","_name":"google","authorization_endpoint":"https://accounts.google.com/o/oauth2/auth","userinfo_endpoint":"https://www.googleapis.com/oauth2/v3/userinfo","scope":["openid","profile","email"]}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
