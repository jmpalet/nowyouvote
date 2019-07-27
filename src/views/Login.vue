<template>
  <v-card flat>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" v-model="email" name="login" label="Login" type="text"></v-text-field>
        <v-text-field prepend-icon="lock" v-model="password" name="password" label="Password" id="password" type="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onSubmit">Login</v-btn>
      <v-card-text>You don't have an account ? You can <router-link :to="{ name: 'sign-up', query: { redirect: this.nextRoute }}">create one</router-link></v-card-text>
    </v-card-actions>
  </v-card>
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
        await this.$auth.login(this.email, this.password)
      }
    }
  }
</script>