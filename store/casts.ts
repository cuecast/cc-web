import { action, getter, CuecastStore, Module, mutation } from "~/store/cuecast-store";
import { api, router } from '~/utils'
import { Cast } from "~/types";

@Module({namespacedPath: "casts/", target: "nuxt"})
export class CastStore extends CuecastStore {
  public casts: Cast[] = []

  @action
  async addCast(params) {
    await api.$post('casts', params)
  }

  @action
  async getCasts() {
    await api.$get('casts')
  }

}
