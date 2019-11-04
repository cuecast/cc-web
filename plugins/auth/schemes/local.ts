import { AuthScheme } from '~/types'

export default class LocalScheme implements AuthScheme {

  ctx: any
  $state: any
  $axios: any
  $auth: any

  constructor(ctx) {
    this.ctx = ctx
    this.$auth = ctx.app.$auth
    this.$axios = ctx.app.$axios
  }

  async login() {
    return await this.$axios.post('/auth/sign_in', ...arguments).then((res: any) => {
      this.ctx.$auth.setTokens(res.headers)
      this.ctx.$auth.$storage.setState('busy', false)
      this.ctx.$auth.$storage.setState('loggedIn', true)
      this.ctx.$auth.$storage.setState('user', res.data.data)
      this.ctx.$auth.redirect('profile')
    })
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
}
