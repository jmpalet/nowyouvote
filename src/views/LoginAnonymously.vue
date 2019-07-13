<template>
  <form class="login" @submit.prevent="onSubmit">
    <h3>Login (anonymously)</h3>
    <input type="submit" value="Login"/>
  </form>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['user']),
      nextRoute () {
        return this.$route.query.redirect || '/'
      }
    },
    watch: {
      user (auth) {
        if(auth){
            this.$router.replace(this.nextRoute)
        }
      }
    },
    methods: {
      async onSubmit () {
        await this.$auth.loginAnonymously()
      }
    }
  }
</script>