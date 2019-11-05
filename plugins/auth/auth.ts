import Storage from './storage'
import LocalScheme from '~/plugins/auth/schemes/local'
import GoogleScheme from '~/plugins/auth/schemes/google'
import { isSet, isUnset, routeOption } from '~/plugins/auth/utilities'
import { AuthOptions, AuthScheme } from '~/types'

export default class Auth {

  ctx: any
  error: null
  options: AuthOptions
  $storage: any
  $state: any
  $axios: any
  $redirect: any
  oAuthTimer: any = null
  strategies: { [key: string]: AuthScheme } = {}
  authHeaders: Array<string> = ['access-token', 'client', 'uid', 'expiry']

  constructor(ctx) {
    console.log('AUTH CONSTRUCTOR')
    this.ctx = ctx
    this.$axios = ctx.app.$axios

    const storage = new Storage(ctx)

    this.$redirect = ctx.redirect
    this.$storage = storage
    this.$state = storage.state

    this.options = {
      prefix: 'auth.',
      redirect: {
        login: '/users/sign-in',
        profile: '/users/profile',
        test: '/testing/random',
      }
    }

    this.strategies['local'] = new LocalScheme(ctx)
    this.strategies['google'] = new GoogleScheme(ctx)
  }

  get strategy() {
    return this.strategies[this.$state.strategy]
  }

  get user() {
    return this.$state.user
  }

  get loggedIn() {
    return this.$state.loggedIn
  }

  async init() {
    this.$storage.syncUniversal('strategy')
    //
    // // Set default strategy if current one is invalid
    if (!this.strategy) {
      this.$storage.setUniversal('strategy', 'local')
      this.setStrategy(name)

      // Give up if still invalid
      if (!this.strategy) {
        return Promise.resolve()
      }
    }
    //
    try {
      // Call mounted for active strategy on initial load
      await this.mounted()
    } catch (error) {
      console.log('Failed to mount: ', error)
    } finally {
      // Watch for loggedIn changes only in client side
      if (process.client) {
        this.$storage.watchState('loggedIn', loggedIn => {
          if (!routeOption(this.ctx.route, 'auth', false)) {
            console.log('redirecting in finally')
            // if(loggedIn && !this.ctx.from) {
            //   return
            // }
            this.redirect(loggedIn ? 'profile' : 'login')
          }
        })
      }
    }
  }

  login(name, args) {
    this.setStrategy(name)

    this.$storage.setState('busy', true)

    this.strategy.login(args)

    this.$storage.setState('busy', false)
  }

  logout() {
    this.$storage.setState('busy', true)

    return Promise.resolve(this.strategy.logout())
      .then(() => {
        this.redirect('login')
        this.$storage.setState('busy', false)
        this.$storage.setState('loggedIn', false)
        this.$storage.setState('user', {})
      })
      .catch(error => {
        this.$storage.setState('busy', false)
        return Promise.reject(error)
      })
  }

  redirect(key) {
    this.$redirect(this.options.redirect[key], this.ctx.query)
  }

  getTokens() {
    let tokens = {}
    this.authHeaders.map((authHeader) => {
      tokens[authHeader] = this.$storage.getUniversal(authHeader)
    })
    return tokens
  }

  setTokens(headers) {
    let tokens = {}
    this.authHeaders.map((authHeader) => {
      if (isUnset(headers[authHeader])) {
        debugger
        console.log('authHeader ' + authHeader + ' is not set.')
      }
      tokens[authHeader] = this.$storage.setUniversal(authHeader, headers[authHeader])
    })
    return tokens
  }

  clearTokens() {
    let tokens = {}
    this.authHeaders.map((authHeader) => {
      tokens[authHeader] = this.$storage.removeUniversal(authHeader)
    })
    return tokens
  }

  syncTokens() {
    let tokens = {}
    this.authHeaders.map((authHeader) => {
      tokens[authHeader] = this.$storage.syncUniversal(authHeader)
    })
    return tokens
  }

  normalizeTokenKeys(params) {
    // normalize keys
    if (params.token) {
      params['access-token'] = params.token
      delete params.token
    }
    if (params.auth_token) {
      params['access-token'] = params.auth_token
      delete params.auth_token
    }
    if (params.client_id) {
      params.client = params.client_id
      delete params.client_id
    }

    return params
  };

  private setStrategy(name) {
    if (name === this.strategy) {
      return
    }

    this.$storage.setUniversal('strategy', name)
  }

  private async mounted() {
    return Promise.resolve(this.strategy.mounted()).catch(error => {
      return Promise.reject(error)
    })
  }

}
