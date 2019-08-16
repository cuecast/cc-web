import { NuxtAxiosInstance } from "@nuxtjs/axios";

declare module service {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

// @ts-ignore
let api: NuxtAxiosInstance = {};

let client;

export function setApi(newClient) {
  client = newClient
}

// Request helpers
const reqMethods = [
  'request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
]

for (let method of reqMethods) {
  api[method] = function () {
    if (!client) throw new Error('api not installed')
    return client[method].apply(null, arguments)
  }
}

for (let method of reqMethods) {
  api['$' + method] = function () {
    if (!client) throw new Error('api not installed')
    return client['$' + method].apply(null, arguments).then(res => res && res.data)
  }
}

export default api
