export default async function ({$auth, $axios}) {
  if (!$auth.loggedIn) {
    return
  }
  const auth = $auth;
  const authStrategy = auth.strategy.name;
  if (authStrategy === 'facebook' || authStrategy === 'google') {
    const token = auth.getToken(authStrategy).substr(7)
    const authStrategyConverted = authStrategy === 'facebook' ? 'fb' : 'google';
    const url = `/users/oauth_sign_up?token=${token}`;
    try {
      const {data} = await $axios.$post(url, null);
      debugger
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
