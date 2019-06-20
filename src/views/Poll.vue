<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <div v-if="poll">
          <h3 v-if="poll">{{poll.title}}</h3>
          <div v-for="(option, key) in poll.options">
            {{ option.title }}
            <button @click="voteUp(key)">👍{{option.votes.positive}}</button>
            <button @click="voteDown(key)">👎{{option.votes.negative}}</button>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'poll',
  data: () => {
    return {
      id: null,
      poll: null,
    }
  },
  methods: {
    voteUp (key) {
      this.$db.vote(this.id, this.poll.options[key].id, 1).then((data) => {
        this.refreshOption(key)
      })
    },
    voteDown (key) {
      this.$db.vote(this.id, this.poll.options[key].id, -1).then((data) => {
        this.refreshOption(key)
      })
    },
    refreshOption(key) {
      this.$db.getVotes(this.id, this.poll.options[key].id).then((votes) => {
        if ('votes' in this.poll.options[key]) {
          this.poll.options[key].votes = votes
        }
      })
    },
    getPoll (id) {
      this.$db.getPoll(id).then((poll) => {
        this.$db.getOptions(id).then((data) => {
          let options = []
          data.forEach(option => {
            this.$db.getVotes(this.id, option.id).then((votes) => {
              options.push({id: option.id, title: option.get('title'), votes: votes})
            })
          })
          this.poll = {
            title: poll.get('title'),
            options: options
          }
        });
      })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getPoll(this.id);
  }
}
</script>