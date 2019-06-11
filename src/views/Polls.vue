<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <div v-if="loading" class="loading">
          Loading...
        </div>
        <ul>
          <li v-for="poll in polls" v-bind:key="poll.id">
            <a :href="'/poll/' + poll.id">{{ poll.get('title') }}</a><button variant="danger" @click="deletePoll(poll.id)">Delete</button>
          </li>
        </ul>
        <p v-if="message">{{message}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'create',
  data: () => {
    return {
      loading: false,
      polls: [],
      message: null
    }
  },
  methods: {
    getPolls () {
      this.loading = true;
      this.$db.getPolls(this.title).then((results) => {
        this.loading = false;
        results.forEach((result) => {
          this.polls.push(result);
        })
      });
    },
    deletePoll (id) {
      this.$db.deletePoll(id).then(() => {
        this.polls = this.polls.filter(function(poll){
            return poll.id != id;
        });
        this.message = "Deleted!"
      });
    }
  },
  mounted() {
      this.getPolls();
  }
}
</script>