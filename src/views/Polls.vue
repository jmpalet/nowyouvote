<template>
  <v-layout>
    <v-list>
      <v-list-tile v-for="poll in polls" v-bind:key="poll.id">
        <v-list-tile-action>
          <v-btn flat color="#039be5" @click="deletePoll(poll.id)"><v-icon medium>close</v-icon>Delete</v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile router :to="{name: 'poll', params: {id: poll.id}}" exact>{{poll.title}}</v-list-tile>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-layout>
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