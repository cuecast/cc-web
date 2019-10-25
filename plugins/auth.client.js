export default async function({app, store}) {
  console.log('auth executed');
  if (!store.loggedIn) {
    debugger
    return;
  }

  const auth = app.$auth;

  const authStrategy = auth.strategy.name;
  if (authStrategy === 'facebook' || authStrategy === 'google') {
    const token = auth.getToken(authStrategy).substr(7);
    const authStrategyConverted = authStrategy === 'facebook' ? 'fb' : 'google';
    const url = `/user/signup/${authStrategyConverted}?token=${token}`;

    try {
      const {data} = await app.$axios.$post(url, null);
      auth.setToken('local', 'Bearer ' + data.access_token);
      setTimeout(async () => {
        auth.setStrategy('local');
        setTimeout(async () => {
          await auth.fetchUser();
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
}
