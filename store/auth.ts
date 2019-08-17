import { action, getter, CuecastStore, Module, mutation } from "~/store/cuecast-store";
import api from '~/utils/api'
import router from '~/utils/router'
import auth from '~/utils/auth'
import { User } from "~/types";

@Module({namespacedPath: "auth/", target: "nuxt"})
export class AuthStore extends CuecastStore {
  @getter currentUser: User | undefined

  @action
  async signIn(params) {
    await auth.loginWith('local', {
      data: {...params}
    })
  }

  @action
  async signOut() {
    await auth.logout()
  }

}
