<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        {{poll}}
      </v-flex>
    </v-layout>
  </v-container>
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
          title: result.get('title'),
          options: result.get('options')
        }
      });
    }
  },
  mounted() {
      this.getPoll(this.$route.params.id);
  }
}
</script>