import Vue from "vue";
import { action, CuecastStore, getter, Module, mutation } from "~/store/cuecast-store";
import StreamSocket from '../channels/stream-socket'
import { api } from '~/utils'

let socket: StreamSocket;

@Module({namespacedPath: "stream/", target: "nuxt"})
export class StreamStore extends CuecastStore {
  @getter localStream!: Object
  @getter peers!: Object

}
