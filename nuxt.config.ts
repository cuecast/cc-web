import fs from "fs";
import path from "path";

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
  server: {
    port: 3000,
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '10.0.93.162+5-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '10.0.93.162+5.pem')),
    }
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
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {set: '@fortawesome/free-solid-svg-icons', icons: ['fas']},
        {set: '@fortawesome/free-brands-svg-icons', icons: ['fab']}
      ]
    }]
  ],
  axios: {
    host: 'localhost',
    port: 4000,
    prefix: '/api',
    ssr: false,
    proxyHeaders: false,
    credentials: false,
    proxy: true
  },
  proxy: {
    '/api/': { target: 'cuecast-api.herokuapp.com', pathRewrite: {'^/api/': '/api/'}, changeOrigin: true }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/users/sign_in'},
          logout: {url: '/users/sign_out', method: 'delete'},
          user: {url: '/users/current', propertyName: false}
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      }
    },
    redirect: {
      login: '/users/sign-in',
      home: '/users/profile'
    },
    plugins: [
      '~/plugins/auth-port.ts'
    ]
  }

}
