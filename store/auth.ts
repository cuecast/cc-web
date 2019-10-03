import { action, Module, mutation, VuexModule } from "~/store/cuecast-store";
import { User } from "~/types";
import { api, auth, router } from "~/utils";

declare var $nuxt: any;

@Module({namespacedPath: 'auth'})
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
      router.push('/')
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
    }).then(() => {
      this.setCurrentUser()
      router.push('/')
    })
  }

  @mutation setCurrentUser() {
    this.currentUser = $nuxt.$auth.$state.user
  }

}
