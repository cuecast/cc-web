import { normalizePath } from '~/plugins/auth/utilities'

export default async function (ctx) {

  const insidePage = key =>
    normalizePath(ctx.route.path) === normalizePath(ctx.$auth.options.redirect[key]);

  console.log('AUTH MIDDLEWARE')
  if (ctx.$auth.$state.loggedIn) {
    console.log('LOGGED IN 1')
    if (insidePage('login')) {
    console.log('LOGGED IN 2')
      ctx.$auth.redirect('profile')
    }
  } else {
    console.log('NOT LOGGED IN')
    if ((!insidePage('login'))) {
      ctx.$auth.redirect('test')
    }
  }

}
