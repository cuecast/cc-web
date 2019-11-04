export interface AuthScheme {
  login: () => (void)
  logout: () => (void)
  mounted: () => (void)
}

export interface AuthOptions {
  prefix: string
  redirect: AuthRedirectMap
}

export interface AuthRedirectMap {
  login: string
  profile: string
  test: string
}

