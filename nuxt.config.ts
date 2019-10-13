import fs from "fs";
import path from "path";

export default {
  env: {},
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },
  head: {
    title: "cuecast-web",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {hid: "description", name: "description", content: "CueCast"}
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"}
    ]
  },
  server: {
    port: 3000,
    // host: '0.0.0.0',
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, '10.0.93.162+5-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '10.0.93.162+5.pem')),
    // }
  },
  plugins: [
    {src: '~/plugins/axios-port.ts'},
    {src: '~/plugins/router-port.ts'},
    {src: '~/plugins/nuxt-client-init.ts'}
  ],
  loading: {color: "#3B8070"},
  css: ["~/assets/css/main.css"],
  build: {},
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/proxy',
    '@nuxtjs/auth',
    'nuxt-buefy',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {set: '@fortawesome/free-solid-svg-icons', icons: ['fas']},
        {set: '@fortawesome/free-brands-svg-icons', icons: ['fab']}
      ]
    }]
  ],
  axios: {
    baseURL: `https://cuecast-api.herokuapp.com/api`,
    // ssr: false,
    debug: true,
    proxyHeaders: false,
    credentials: false,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/users/sign_in'},
          logout: {url: '/users/sign_out', method: 'delete'},
          user: {url: '/users/current', propertyName: false}
        },
      }
    },
    redirect: {
      login: '/stream',
      logout: '/users/sign-in',
      callback: '/users/sign-in',
      home: '/stream'
    },
    plugins: [
      '~/plugins/auth-port.ts'
    ]
  }
}
