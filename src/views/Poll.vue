<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <div v-if="poll">
          <h3 v-if="poll">{{poll.title}}</h3>
          <div v-for="(option, key) in sortedOptionsByScore">
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
import router from '../router'
import stats from 'simple-statistics'
export default {
  name: 'poll',
  data: () => {
    return {
      id: null,
      poll: null,
    }
  },
  computed: {
    sortedOptionsByScore() {
      return this.poll.options.sort((a,b) => {
        if ('score' in a && 'score' in b) {
          return a.score < b.score
        }
      })
    }
  },
  methods: {
    voteUp (key) {
      this.vote(key, 1)
    },
    voteDown (key) {
      this.vote(key, -1)
    },
    score (upvotes, n = 0, confidence = 0.95) {
      if (n === 0) return 0
      const z = stats.probit(1-(1-confidence)/2)
      const phat = 1.0 * upvotes / n
      return (phat + z*z / (2*n) - z * Math.sqrt((phat * (1 - phat) + z*z / (4*n)) / n)) / (1 + z*z/n)
    },
    vote (key, vote) {
      this.$db.vote(this.id, this.poll.options[key].id, vote).then((data) => {
        this.refreshOption(key)
      }).catch(error => {
        router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath }
        })
      })
    },
    refreshOption(key) {
      this.$db.getVotes(this.id, this.poll.options[key].id).then((votes) => {
        if ('votes' in this.poll.options[key]) {
          this.poll.options[key].votes = votes
          this.poll.options[key].score = this.score(votes.positive, votes.positive + votes.negative)
        }
      })
    },
    getPoll (id) {
      this.$db.getPoll(id).then((poll) => {
        this.$db.getOptions(id).then((data) => {
          let options = []
          data.forEach(option => {
            this.$db.getVotes(this.id, option.id).then((votes) => {
              options.push({
                id: option.id,
                title: option.get('title'),
                votes: votes,
                score: this.score(votes.positive, votes.positive + votes.negative)
              })
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