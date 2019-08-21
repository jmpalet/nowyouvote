<template>
  <v-card flat class="text-xs-center">
    <v-flex text-xs-center>
      <div class="headline">Profile</div>
    </v-flex>
    <v-card-text v-if="user">
      <v-avatar
        size="180px"
        v-if="user.photoURL"
      >
        <img
          :src="user.photoURL"
          alt="avatar"
        >
      </v-avatar>
    </v-card-text>
    <v-btn :to="{name: 'logout'}"><v-icon>exit_to_app</v-icon>Logout</v-btn>
  </v-card>
</template>

<script>
import store from '../store';
export default {
  name: 'profile',
  data() {
    return {
      user: store.state.user
    }
  },
  methods: {
    log() {
      console.log(this.user)
    }
  }
}
</script>