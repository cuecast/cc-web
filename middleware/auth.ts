export default async function (ctx) {

  const insidePage = key => {
    return ctx.route.path === ctx.$auth.options.redirect[key]
  }

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
