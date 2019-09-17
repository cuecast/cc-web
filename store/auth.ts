import { action, mutation, VuexModule } from "~/store/cuecast-store";
import api from '~/utils/api'
import auth from '~/utils/auth'
import { User } from "~/types";

declare var $nuxt: any;

export class AuthStore extends VuexModule {
  currentUser: User = {
    id: 0,
    email: ''
  };

  get user() {
    this.setCurrentUser()
    return this.currentUser
  }

  @action
  async signIn(params) {
    await auth.login({
      data: {...params}
    }).then(() => {
      this.setCurrentUser()
    })
  }

  @action
  async signOut() {
    await auth.logout()
  }

  @action
  async signUp(params) {
    await api.post('/users', {
      user: {...params}
    })
  }

  @mutation setCurrentUser() {
    this.currentUser = $nuxt.$auth.$state.user
  }

}
