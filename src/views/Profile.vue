<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        {{ user }}
        <router-link to="logout">
          <a>Logout</a>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
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