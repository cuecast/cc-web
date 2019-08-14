import { NuxtAxiosInstance } from "~/node_modules/@nuxtjs/axios";

declare module service {
  interface Context {
    $axios: NuxtAxiosInstance
  }
}

// @ts-ignore
let service: NuxtAxiosInstance = {};

let client;

export function setClient(newClient) {
  client = newClient
}

// Request helpers
const reqMethods = [
  'request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
]

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error('api not installed')
    return client[method].apply(null, arguments)
  }
})

export default service
