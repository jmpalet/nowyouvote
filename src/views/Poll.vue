<template>
  <div class="poll">
    {{poll}}
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'poll',
  data: () => {
    return {
      poll: null,
    }
  },
  methods: {
    getPoll (id) {
      var self = this;
      this.$db.getPoll(id).then((result) => {
        self.poll = {
          title: result.get('title')
        }
      });
    }
  },
  mounted() {
      this.getPoll(this.$route.params.id);
  }
}
</script>