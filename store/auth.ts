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

  get user () {
    this.setCurrentUser();
    return this.currentUser
  }

  @action
  async signIn (params) {
    await auth.login({
      data: {...params}
    }).then(() => {
      router.push('/');
      this.setCurrentUser()
    })
  }

  @action
  async signOut () {
    await auth.logout()
  }

  @action
  async signUp (params) {
    await api.post('/users', {
      user: {...params}
    }).then(() => {
      this.setCurrentUser()
    })
  }

  @action
  async googleSignIn () {
    window.location.href = 'http://localhost:4000/api/auth/google?scope=email%20profile'
  }


  @mutation setCurrentUser () {
    this.currentUser = $nuxt.$auth.user
  }
}
