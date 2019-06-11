<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        {{ user }}
        <a href="/logout">Logout</a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from '../store';
export default {
  name: 'create',
  data() {
    return {
      user: store.state.user
    }
  }
}
</script>