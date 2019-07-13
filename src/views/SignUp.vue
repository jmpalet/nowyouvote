<template>
  <v-container>
    <form class="login" @submit.prevent="onSubmit">
      <h3>Sign up</h3>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <input type="submit" value="Sign up"/>
      <p>or go back to <router-link :to="{ name: 'login', query: { redirect: this.nextRoute }}">login</router-link></p>
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
        await this.$auth.signup(this.email, this.password)
      }
    }
  }
</script>