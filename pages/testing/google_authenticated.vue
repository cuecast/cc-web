<template>
  <div>
    <h1>Signed in with this email:</h1>
<!--    <p>{{$auth.user.email}}</p>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component
export default class extends Vue {
  mounted () {
    // console.log('auth executed');
    // debugger
    // if (!this.$auth.loggedIn) {
    //   debugger
    //   return;
    // }

    // const auth = this.$auth;
    //
    // debugger
    // const authStrategy = auth.strategy.name;
    // if (authStrategy === 'facebook' || authStrategy === 'google') {
    //   debugger
    //   const token = auth.getToken(authStrategy).substr(7);
    //   const authStrategyConverted = authStrategy === 'facebook' ? 'fb' : 'google';
    //   const url = `/users/auth/google_oauth2?token=${token}`;
    //   try {
    //     debugger
    //     // const {data} = this.$axios.$post(url, null);
    //     // auth.setToken('local', 'Bearer ' + data.access_token);
    //     setTimeout(async () => {
    //       auth.setStrategy('local');
    //       setTimeout(async () => {
    //         await auth.fetchUser();
    //       });
    //     });
    //   } catch (e) {
    //     console.log(e);
    //   }

  }
}
</script>

<style scoped>
</style>
