import { AuthScheme } from '~/types'

declare var $nuxt: any

export default class GoogleScheme implements AuthScheme {


  ctx: any
  $state: any
  $axios: any
  $auth: any
  options: any

  constructor(ctx) {
    this.ctx = ctx
    this.$axios = ctx.app.$axios

    this.options = {
      apiUrl: 'http://localhost:4000/api/',
      providerPath: 'auth/google_oauth2'
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
      console.log('catch in mounted: ', err)
      this.ctx.$auth.$storage.setState('busy', false)
      this.ctx.$auth.$storage.setState('loggedIn', false)
      this.ctx.$auth.$storage.setState('user', {})
      this.ctx.$auth.redirect('login')
    })
  }

  handlePostMessage(e) {
    if (process.server) return
    let $auth = $nuxt.context.$auth

    if (e.data.message === 'deliverCredentials') {
      delete e.data.message

      $auth.setTokens($auth.normalizeTokenKeys(e.data))
      $auth.$storage.setState('loggedIn', true)
      $auth.$storage.setState('user', e.data)

      if ($auth.loggedIn) {
        console.log('Successfully received credentials from popup.')
        clearTimeout($auth.oAuthTimer)
        $auth.oAuthTimer = null
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
    window.addEventListener('message', this.handlePostMessage, false)
    let self = this
    if (popup.closed) {
      console.log('Failed to get credentials from popup.')
    } else {
      popup.postMessage('requestCredentials', '*')
      this.ctx.$auth.oAuthTimer = setTimeout(function () {
        self.listenForCredentials(popup)
      }, 500)
    }
  };

}
