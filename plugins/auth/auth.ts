import Storage from './storage'
import LocalScheme from '~/plugins/auth/schemes/local'
import { routeOption } from '~/plugins/auth/utilities'

export default class Auth {

  ctx: any
  error: null
  options: any
  $storage: any
  $state: any
  $axios: any
  $redirect: any
  strategies: any = {}
  authHeaders: any = ['access-token', 'client', 'uid', 'expiry']

  constructor(ctx) {
    this.ctx = ctx
    this.$axios = this.ctx.app.$axios

    const storage = new Storage(ctx)

    this.$redirect = this.ctx.redirect
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

    this.strategies = {}
    this.strategies['local'] = new LocalScheme(this.ctx)
    // this.strategies['google'] = new GoogleScheme(this.ctx);
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
    this.$storage.syncUniversal('strategy', 'local')
    //
    // // Set default strategy if current one is invalid
    if (!this.strategy) {
      this.$storage.setUniversal('strategy', 'login')

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
    } finally {
      // Watch for loggedIn changes only in client side
      if (process.client) {
        this.$storage.watchState('loggedIn', loggedIn => {
          if (!routeOption(this.ctx.route, 'auth', false)) {
            this.redirect(loggedIn ? 'profile' : 'login')
          }
        })
      }
    }
  }

  login(name, args) {
    this.setStrategy(name)

    this.$storage.setState('busy', true)
    this.error = null

    this.strategy.login(args)

  }

  logout() {
    this.$storage.setState('busy', true)

    return Promise.resolve(this.strategy.logout(...arguments))
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
      tokens[authHeader] = this.$storage.setUniversal(authHeader, headers[authHeader])
    })
    return tokens
  }

  clearTokens() {
    let tokens = {}
    this.authHeaders.map((authHeader) => {
      tokens[authHeader] = this.$storage.setHeader(authHeader, undefined)
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

  private setStrategy(name) {
    if (name === this.strategy) {
      return Promise.resolve()
    }

    this.$storage.setUniversal('strategy', name)
  }

  private async mounted() {
    return Promise.resolve(this.strategy.mounted(...arguments)).catch(error => {
      return Promise.reject(error)
    })
  }

}
