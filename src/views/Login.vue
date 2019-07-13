<template>
  <v-container>
    <form class="login" @submit.prevent="onSubmit">
      <h3>Login</h3>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <input type="submit" value="Login"/>
      <p>You don't have an account ? You can <router-link :to="{ name: 'sign-up', query: { redirect: this.nextRoute }}">create one</router-link></p>
    </form>
  </v-container>
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
    data() {
      return {
        email: '',
        password: ''
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
        const auth = await this.$auth.login(this.email, this.password)
      }
    }
  }
</script>