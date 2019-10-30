import { action, Module, mutation, VuexModule } from "~/store/cuecast-store";
import { User } from "~/types";
import { api } from "~/utils";

declare var $nuxt: any;

@Module({namespacedPath: 'auth'})
export class AuthStore extends VuexModule {
  // currentUser: User = {
  //   id: 0,
  //   email: ''
  // };
  //
  // get user () {
  //   // this.setCurrentUser();
  //   return this.currentUser
  // }

  @action
  async signIn(params) {
    await $nuxt.$auth.login({
      email: params.email,
      password: params.password
    })
  }

  @action
  async signOut() {
    await $nuxt.$auth.logout()
  }

  @action
  async signUp(params) {
    await api.post('/users', {
      email: params.email,
      password: params.password
    }).then(() => {
      // this.setCurrentUser()
    })
  }

  @action
  async googleSignIn() {
    await $nuxt.$auth.loginWith('google')
  }


  @mutation setCurrentUser() {
    // this.currentUser = $nuxt.$auth.user
  }
}
