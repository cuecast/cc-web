import Vue from 'vue'
import getProp from 'dotprop'
import { decodeValue, encodeValue, isSet, isUnset } from './utilities'
import { parse as parseCookie, serialize as serializeCookie } from 'cookie'
import { User } from '~/types'

interface InitialState {
  user?: User
  loggedIn: boolean
}

export default class Storage {
  ctx: any
  state: any
  initialState: InitialState = {user: undefined, loggedIn: false}
  prefix: string = 'auth.'

  constructor(ctx) {
    this.ctx = ctx
    this._initState()
  }

  // ------------------------------------
  // Local state (reactive)
  // ------------------------------------

  _initState() {
    const authModule = {
      namespaced: true,
      state: () => this.initialState,
      mutations: {
        SET(state, payload) {
          Vue.set(state, payload.key, payload.value)
        }
      }
    }

    this.ctx.store.registerModule('auth', authModule, {
      preserveState: Boolean(this.ctx.store.state['auth'])
    })

    this.state = this.ctx.store.state['auth']
  }

  // ------------------------------------
  // Universal
  // ------------------------------------

  setUniversal(key, value) {
    // Unset null, undefined
    if (isUnset(value)) {
      console.log('removing ' + key)
      return this.removeUniversal(key)
    }

    this.setState(key, value)

    let cookie = this.setCookie(key, value)

    if (isUnset(cookie)) {
      this.setLocalStorage(key, value)
    }

    this.setHeader(key, value)

    return value
  }

  getUniversal(key) {
    // Local state
    let value = this.getState(key)

    // Cookies
    if (isUnset(value)) {
      value = this.getCookie(key)
    }

    // Local Storage
    if (isUnset(value)) {
      value = this.getLocalStorage(key)
    }

    return value
  }

  syncUniversal(key, defaultValue = undefined) {

    let value = this.getUniversal(key)

    if (isUnset(value) && isSet(defaultValue)) {
      value = defaultValue
    }

    if (isSet(value)) {
      this.setUniversal(key, value)
    } else {
      console.log(key + ' is not set.')
    }

    return value
  }

  removeUniversal(key) {
    this.removeState(key)
    this.removeLocalStorage(key)
    this.removeCookie(key)
    this.removeHeader(key)
  }


  setState(key, value) {
    this.ctx.store.commit('auth/SET', {key, value})
    return value
  }

  getState(key) {
    return this.state[key]
  }

  watchState(key, fn) {
    return this.ctx.store.watch(
      state => getProp(state['auth'], key),
      fn
    )
  }

  removeState(key) {
    this.setState(key, undefined)
  }

  // ------------------------------------
  // Local storage
  // ------------------------------------

  setLocalStorage(key, value) {
    if (process.server) return
    if (isUnset(value)) {
      // return this.removeLocalStorage(key)
    }

    try {
      localStorage.setItem(key, encodeValue(value))
    } catch (e) {
      throw e
    }

    return value
  }

  getLocalStorage(key) {
    if (typeof localStorage === 'undefined') {
      return
    }

    const value = localStorage.getItem(key)

    return decodeValue(value)
  }

  removeLocalStorage(key) {
    if (typeof localStorage === 'undefined') {
      return
    }

    localStorage.removeItem(key)
  }

  // ------------------------------------
  // Headers
  // ------------------------------------

  setHeader(key, token) {
    if (!this.ctx.$auth.authHeaders.includes(key)) return
    this.ctx.app.$axios.setHeader(key, token)
  }

  removeHeader(key) {
    if (!this.ctx.$auth.authHeaders.includes(key)) return
    this.ctx.app.$axios.setHeader(key, false)
  }

  // ------------------------------------
  // Cookies
  // ------------------------------------

  getCookies() {
    const cookieStr = process.client
      ? document.cookie
      : this.ctx.req.headers.cookie

    return parseCookie(cookieStr || '') || {}
  }

  setCookie(key, value, options: any = {}) {
    if (process.server && !this.ctx.res) {
      return
    }

    const _key = this.prefix + key
    const _value = encodeValue(value)

    // Unset null, undefined
    if (isUnset(value)) {
      options.maxAge = -1
    }

    // Accept expires as a number for js-cookie compatiblity
    if (typeof options.expires === 'number') {
      let date = new Date().getDate()
      options.expires = new Date((date * 1) + options.expires * 864e+5)
    }

    const serializedCookie = serializeCookie(_key, _value, {path: '/'})

    if (process.client) {
      // Set in browser
      document.cookie = serializedCookie
    } else if (process.server && this.ctx.res) {
      // Send Set-Cookie header from server side
      const prevCookies = this.ctx.res.getHeader('Set-Cookie')
      this.ctx.res.setHeader('Set-Cookie', [].concat(prevCookies, serializedCookie).filter(v => v))
    }

    return value
  }

  getCookie(key) {
    if ((process.server && !this.ctx.req)) {
      return
    }

    const _key = this.prefix + key

    const cookies = this.getCookies()

    const value = cookies[_key] ? decodeURIComponent(cookies[_key]) : undefined

    return decodeValue(value)
  }

  removeCookie(key) {
    this.setCookie(key, undefined)
  }

}
