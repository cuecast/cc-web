import { action, getter, CuecastStore, Module, mutation } from "~/store/cuecast-store";
import api from '~/utils/api'
import router from '~/utils/router'
import Vue from 'vue'
import { User } from "~/types";

@Module({namespacedPath: "auth/", target: "nuxt"})
export class AuthStore extends CuecastStore {
  @getter currentUser: User | undefined

  @action()
  async signIn(params) {
    return api.$post('/users/sign_in', params)
      .then(res => {
        this.setCurrentUser(res.user);
        router.push(`/users/${res.user.id}`)
      })
      .catch(err => console.dir(err))
  }

  @mutation setCurrentUser({...user}: User) {
    this.currentUser = user
  }
}
