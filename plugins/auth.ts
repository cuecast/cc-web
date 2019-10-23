export default async function ({app}) {
  debugger
  if (!app.$auth.loggedIn) {
    return
  }
  const auth = app.$auth;
  const authStrategy = auth.strategy.name;
  debugger
  if (authStrategy === 'google') {
    const token = auth.getToken(authStrategy).substr(7)
    const authStrategyConverted = 'google';
    const url = `/users/google`;
    try {
      debugger
      const {data} = await app.$axios.$post(url, null);
      auth.setToken('local', "Bearer " + data.access_token);
      setTimeout(async () => {
        auth.setStrategy('local');
        setTimeout(async () => {
          await auth.fetchUser();
        })
      });
    } catch (e) {
      console.log(e);
    }
  }
}
