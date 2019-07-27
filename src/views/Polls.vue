<template>
  <v-card flat>
    <v-card-title primary-title>
      <div class="headline">My polls</div>
    </v-card-title>
    <v-card column v-for="poll in polls" v-bind:key="poll.id" class="ma-3 pa-3">
      <v-flex class="title">
        {{poll.title}}
      </v-flex>
      <v-flex>
        <v-container pa-0>
          <v-layout row>
            <v-flex>
              <v-btn flat color="primary" @click="deletePoll(poll.id)"><v-icon medium>close</v-icon>Delete</v-btn>
            </v-flex>
            <v-flex>
              <v-btn flat color="primary" :to="{name: 'poll', params: {id: poll.id}}"><v-icon medium>chevron_right</v-icon>View</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-card>
  </v-card>
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

<style scoped>
.v-list__tile__action {
  flex-direction: row;
}
</style>