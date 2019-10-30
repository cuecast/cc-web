import Storage from './storage'
import { NuxtAxiosInstance } from "~/node_modules/@nuxtjs/axios";

export default class Auth {

  ctx: any;
  error: null;
  options: any;
  $storage: any;
  $state: any;
  $axios: NuxtAxiosInstance;

  constructor(ctx) {
    this.ctx = ctx;
    this.$axios = this.ctx.app.$axios;

    const storage = new Storage(ctx);

    this.$storage = storage;
    this.$state = storage.state;

    this.options = {
      prefix: 'auth',
    }
  }


  async init() {

  }

  async login() {
    this.$storage.setState('busy', true);
    this.error = null;

    const result = await this.$axios.post('/users/sign_in', ...arguments);

    this.setToken('login', result)
  }

  getToken(strategy) {
    const _key = this.options.prefix + strategy;

    return this.$storage.getUniversal(_key)
  }

  setToken(strategy, token) {
    const _key = this.options.prefix + strategy;

    return this.$storage.setUniversal(_key, token)
  }

  syncToken(strategy) {
    const _key = this.options.prefix + strategy;

    return this.$storage.syncUniversal(_key)
  }

}
