import { action, CuecastStore, Module } from "~/store/cuecast-store";
import api from '~/services/api'

@Module({namespacedPath: "auth/", target: "nuxt"})
export class AuthStore extends CuecastStore {

  @action()
  async signIn() {
    return api.post('users/sign_in')
  }
}
