<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <div v-if="loading" class="loading">
          Loading...
        </div>
        <ul>
          <li v-for="poll in polls" v-bind:key="poll.id">
            <router-link :to="{ name: 'poll', params: {id: poll.id}}">
              <a>{{poll.get('title')}}</a>
            </router-link>
            <button @click="deletePoll(poll.id)">Delete</button>
          </li>
        </ul>
        <p v-if="message">{{message}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'polls',
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
      if (this.polls.length) {
        return;
      }
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