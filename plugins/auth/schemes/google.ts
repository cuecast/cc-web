import { AuthScheme } from '~/types'

declare var $nuxt: any

export default class GoogleScheme implements AuthScheme {


  ctx: any
  $state: any
  $axios: any
  $auth: any
  options: any
  oAuthTimer: any

  constructor(ctx) {
    this.ctx = ctx
    this.$auth = ctx.app.$auth
    this.$axios = ctx.app.$axios

    this.options = {
      apiUrl: 'http://localhost:4000/api/',
      providerPath: 'auth/google_oauth2'
    }

    if (process.client) {
      window.addEventListener('message', this.handlePostMessage, false)
    }
  }

  async login() {
    this.openProviderLogin()
  }

  async logout() {
    this.ctx.$auth.syncTokens()
    await this.$axios.delete('/auth/sign_out').then(() => {
      this.ctx.$auth.clearTokens()
    })
  }

  async mounted() {
    this.ctx.$auth.syncTokens()
    return await this.$axios.get('/users/current').then((res: any) => {
      this.ctx.$auth.setTokens(res.headers)
      this.ctx.$auth.$storage.setState('busy', false)
      this.ctx.$auth.$storage.setState('loggedIn', true)
      this.ctx.$auth.$storage.setState('user', res.data)
    }).catch((err: any) => {
      this.ctx.$auth.$storage.setState('busy', false)
      this.ctx.$auth.$storage.setState('loggedIn', false)
      this.ctx.$auth.$storage.setState('user', {})
      this.ctx.$auth.redirect('login')
    })
  }


  handlePostMessage(e) {
    if (process.server) return
    let ctx = $nuxt.context
    ctx.$auth.$storage.setState('busy', true)

    if (e.data.message === 'deliverCredentials') {
      delete e.data.message

      ctx.$auth.setTokens(ctx.$auth.normalizeTokenKeys(e.data))
      ctx.$auth.$storage.setState('busy', false)
      ctx.$auth.$storage.setState('loggedIn', true)
      ctx.$auth.$storage.setState('user', e.data)

      if (ctx.$auth.loggedIn) {
        clearTimeout(this.oAuthTimer)
        this.oAuthTimer = null
      }

    }
  }

  private openProviderLogin() {
    let url = this.buildOAuthUrl()

    const strWindowFeatures =
      'toolbar=no, menubar=no, width=600, height=700, top=100, left=333'

    let popup = window.open(url, '', strWindowFeatures)

    if (window.focus) popup!.focus()
    this.listenForCredentials(popup)
  }

  private buildOAuthUrl() {
    return this.options.apiUrl + this.options.providerPath +
      '?auth_origin_url=' + encodeURIComponent(window.location.href) +
      '&omniauth_window_type=newWindow'
  }

  private listenForCredentials(popup) {
    var self = this
    if (popup.closed) {
      console.log('Failed to get credentials from popup.')
    } else {
      popup.postMessage('requestCredentials', '*')
      self.oAuthTimer = setTimeout(function () {
        self.listenForCredentials(popup)
      }, 100)
    }
  };

}
