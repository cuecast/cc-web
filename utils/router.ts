import { VueRouter } from "vue-router/types/router";

// @ts-ignore
let router: VueRouter = {};

let app;
let client;

export function setRouter(newApp, newClient) {
  app = newApp
  client = newClient
}

const reqMethods = [
  'push', 'go'
]

for (let method of reqMethods) {
  router[method] = function () {
    if (!client) throw new Error('router not installed')
    return client[method].apply(app.router, arguments)
  }
}

export default router
