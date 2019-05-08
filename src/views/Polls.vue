<template>
  <div class="polls">
    <ul id="example-1">
      <li v-for="poll in polls" v-bind:key="poll.id">
        <a :href="'/poll/' + poll.id">{{ poll.get('title') }}</a><button variant="danger" @click="deletePoll(poll.id)">Delete</button>
      </li>
    </ul>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'create',
  data: () => {
    return {
      polls: [],
      message: null
    }
  },
  methods: {
    getPolls () {
      var self = this;
      this.$db.getPolls(this.title).then((results) => {
        results.forEach((result) => {
          self.polls.push(result);
        })
      });
    },
    deletePoll (id) {
      var self = this;
      this.$db.deletePoll(id).then(() => {
        self.polls = self.polls.filter(function(poll){
            return poll.id != id;
        });
        self.message = "Deleted!"
      });
    }
  },
  mounted() {
      this.getPolls();
  }
}
</script>