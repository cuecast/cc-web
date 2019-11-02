import { normalizePath } from '~/plugins/auth/utilities'

export default async function (ctx) {

  const insidePage = key =>
    normalizePath(ctx.route.path) === normalizePath(ctx.$auth.options.redirect[key])

  if (ctx.$auth.$state.loggedIn) {
    if (insidePage('login')) {
      ctx.$auth.redirect('profile')
    }
  } else {
    if ((!insidePage('login'))) {
      ctx.$auth.redirect('login')
    }
  }

}
