<template>
  <div class="create">
    {{ user }}
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