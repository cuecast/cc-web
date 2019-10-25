export default async function({$auth, $axios}) {
  console.log('auth executed');
  if (!$auth.loggedIn) {
    return;
  }

  const auth = $auth;

  const authStrategy = auth.strategy.name;
  if (authStrategy === 'facebook' || authStrategy === 'google') {
    const token = auth.getToken(authStrategy).substr(7);
    const authStrategyConverted = authStrategy === 'facebook' ? 'fb' : 'google';
    const url = `/users/auth/google_oauth2?token=${token}`;

    try {
      const {data} = await $axios.$post(url, null);
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
