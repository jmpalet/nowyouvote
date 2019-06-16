<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <div v-if="poll">
          <h3 v-if="poll">{{poll.title}}</h3>
          <div v-for="option in poll.options">
            <input type="text" placeholder="Option" v-model="option.title" v-if="!id">
            <button @click="voteUp()">👍</button>
            <button @click="voteDown()">👎</button>
          </div>
        </div>
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
      id: null,
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