import { normalizePath } from '~/plugins/auth/utilities'

export default async function (ctx) {

  const insidePage = key =>
    normalizePath(ctx.route.path) === normalizePath(ctx.$auth.options.redirect[key])

  if (ctx.$auth.$state.loggedIn) {
    if (insidePage('login')) {
      console.log('redirecting in middleware after loggedIn was true')
      ctx.$auth.redirect('test')
    }
  } else {
    if ((!insidePage('login'))) {
      console.log('redirecting in middleware after loggedIn was false')
      ctx.$auth.redirect('login')
    }
  }

}
