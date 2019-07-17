<template>
  <v-card flat>
    <v-card-title primary-title>
      <div class="headline">Profile</div>
    </v-card-title>
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
  }
}
</script>