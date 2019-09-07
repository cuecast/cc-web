import { action, getter, getRawActionContext, Module, mutation, VuexModule } from "vuex-class-component";
import { Socket } from "phoenix";

export class CuecastStore extends VuexModule {
}

export { Module, getter, action, mutation, VuexModule, getRawActionContext }

