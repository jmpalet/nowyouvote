<template>
  <form class="login" @submit.prevent="onSubmit">
    <h3>Login</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <input type="submit" value="Login"/>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
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

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>