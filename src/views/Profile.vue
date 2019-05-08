<template>
  <div class="create">
    {{ user }}
    <a href="/logout">Logout</a>
  </div>
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