let development = process.env.NODE_ENV !== 'production'
let hostName = development ? 'localhost:4000' : 'cuecast-alb-1030250719.ca-central-1.elb.amazonaws.com'
console.log('=============================================')
console.log(`hostName: ${hostName}`)
console.log('=============================================')

export default {
  env: {
    // baseUrl: hostName,
  },
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
    {src: '~/plugins/nuxt-client-init.ts'},
    {src: '~/plugins/actioncable.client.ts'},
    {src: '~/plugins/auth.ts'},
    {src: '~/plugins/faker.ts'},
  ],
  loading: {color: "#3B8070"},
  css: ["~/assets/css/main.css"],
  build: {},
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/vuetify',

    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {set: '@fortawesome/free-solid-svg-icons', icons: ['fas']},
        {set: '@fortawesome/free-brands-svg-icons', icons: ['fab']}
      ]
    }],
  ],
  axios: {
    baseURL: `http://localhost:4000/api`,
    // ssr: false,
    debug: true,
    proxyHeaders: false,
    credentials: false,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {url: '/auth/sign_in'},
  //         logout: {url: '/auth/sign_out', method: 'delete'},
  //         user: {url: '/users/current', propertyName: 'user'}
  //       },
  //     },
  //     google: {
  //       client_id: '1093614674363-621bn6aavnrt0s64v725aj1qpe6n8rqu.apps.googleusercontent.com',
  //       redirect_uri: 'http://localhost:3000/login',
  //       user: false,
  //       response_type: 'code',
  //       access_type: 'offline',
  //       access_token_endpoint: 'http://localhost:3000/api/users/google_oauth2/callback'
  //     },
  //   },
  //   // redirect: {
  //   //   login: '/stream',
  //   //   logout: '/users/sign-in',
  //   //   callback: '/users/sign-in',
  //   //   home: '/stream'
  //   // },
  // }
}
