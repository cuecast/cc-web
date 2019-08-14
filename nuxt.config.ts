export default {
  env: {},
  head: {
    title: "cuecast-web",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {hid: "description", name: "description", content: "Nuxt.js TypeScript project"}
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"}
    ]
  },
  plugins: [
    {src: '~/plugins/axios-port.ts'},
    {src: '~/plugins/nuxt-client-init.ts'},
  ],
  loading: {color: "#3B8070"},
  css: ["~/assets/css/main.css"],
  build: {},
  modules: [
    "@nuxtjs/axios",
    'bootstrap-vue/nuxt',
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    host: 'localhost',
    port: 4000,
    prefix: '/api',
    ssr: false,
    proxyHeaders: false,
    credentials: false
  },
}
