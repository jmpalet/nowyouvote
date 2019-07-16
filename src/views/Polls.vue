<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <ul>
          <li v-for="poll in polls" v-bind:key="poll.id">
            <router-link :to="{ name: 'poll', params: {id: poll.id}}">
              <a>{{poll.title}}</a>
            </router-link>
            <button @click="deletePoll(poll.id)">Delete</button>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'polls',
  data: () => {
    return {
      polls: [],
    }
  },
  methods: {
    getPolls () {
      this.$db.getPolls().onSnapshot((querySnapshot) => {
        this.polls = []
        querySnapshot.forEach((doc) => {
          var key = this.polls.length
          var data = doc.data()
          data.id = doc.id
          this.$set(this.polls, key, data)
        });
      })
    },
    deletePoll (id) {
      this.$db.getPoll(id).delete()
    }
  },
  mounted() {
    this.getPolls();
  }
}
</script>