import Vue from 'vue'
import getProp from 'dotprop'
import { decodeValue, encodeValue, isSet, isUnset } from './utilities'
import { User } from "~/types";

interface InitialState {
  user?: User
  loggedIn: boolean
}

export default class Storage {
  ctx: any;
  state: any;
  initialState: InitialState;

  constructor(ctx) {
    this.ctx = ctx;
    this.initialState = {user: undefined, loggedIn: false};

    this._initState();
    this.state
  }

  // ------------------------------------
  // Universal
  // ------------------------------------

  setUniversal(key, value) {
    // Unset null, undefined
    if (isUnset(value)) {
      return this.removeUniversal(key)
    }

    // Local state
    this.setState(key, value);

    // Local Storage
    this.setLocalStorage(key, value);

    return value
  }

  getUniversal(key) {
    // Local state
    let value = this.getState(key);

    // Local Storage
    if (isUnset(value)) {
      value = this.getLocalStorage(key)
    }

    return value
  }

  syncUniversal(key, defaultValue) {
    let value = this.getUniversal(key);

    if (isUnset(value) && isSet(defaultValue)) {
      value = defaultValue
    }

    if (isSet(value)) {
      this.setUniversal(key, value)
    }

    return value
  }

  removeUniversal(key) {
    this.removeState(key);
    this.removeLocalStorage(key);
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
    };

    this.ctx.store.registerModule('auth', authModule, {
      preserveState: Boolean(this.ctx.store.state['auth'])
    });

    this.state = this.ctx.store.state['auth']
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
    if (isUnset(value)) {
      return this.removeLocalStorage(key)
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

    const value = localStorage.getItem(key);

    return decodeValue(value)
  }

  removeLocalStorage(key) {
    if (typeof localStorage === 'undefined') {
      return
    }

    localStorage.removeItem(key)
  }

}
