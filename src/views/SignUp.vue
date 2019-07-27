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
      <v-btn color="primary" @click="onSubmit">Sign up</v-btn>
      <v-card-text>or go back to <router-link :to="{ name: 'login', query: { redirect: this.nextRoute }}">login</router-link></v-card-text>
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
        await this.$auth.signup(this.email, this.password)
      }
    }
  }
</script>