<template>
  <v-card flat>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          prepend-icon="person"
          v-model="email"
          name="login"
          label="Email"
          type="text"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          v-model="password"
          name="password"
          label="Password"
          id="password" 
          type="password"
        ></v-text-field>
      </v-form>
      <v-alert
        outlined
        type="error"
        :value="error"
      >
        {{error}}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="onSubmit" :disabled="!valid">Login</v-btn>
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
        password: '',
        error: null,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
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
        if (this.$refs.form.validate()) {
          await this.$auth.login(this.email, this.password).catch((e) => {
            this.error = "Authentication failed"
          })
        }  
      }
    }
  }
</script>