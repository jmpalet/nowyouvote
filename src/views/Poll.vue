<template>
  <v-layout column>
    <v-card flat>
      <v-card-title primary-title>
        <div class="headline">{{poll.title}}</div>
      </v-card-title>
      <transition-group :name="transitionName" tag="ul" class="pa-0">
        <v-list-tile v-for="option in sortedOptionsByScore" :key="option.title">
          <v-list-tile-action class="vote-action">
            <v-btn flat icon color="primary" @click="voteUp(option.id)"><v-icon medium v-bind:class="{ 'material-icons-outlined': option.processedVotes.user !== 1, 'material-icons': option.processedVotes.user === 1 }">thumb_up</v-icon><span class="votes">{{option.processedVotes.positive}}</span></v-btn>
            <v-btn flat icon color="primary" @click="voteDown(option.id)"><v-icon medium v-bind:class="{ 'material-icons-outlined': option.processedVotes.user !== -1, 'material-icons': option.processedVotes.user === -1 }">thumb_down</v-icon><span class="votes">{{option.processedVotes.negative}}</span></v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="option.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="user && user.uid == poll.user" class="ma-0 pa-0">
            <v-btn flat icon @click="removeOption(option)"><v-icon>clear</v-icon></v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </transition-group>
    </v-card>
    <v-divider v-if="user"></v-divider>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-if="user"
      class="px-3"
    >
      <v-text-field
        v-model="newOption"
        :rules="newOptionRules"
        counter="25"
        label="Add option"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        @click="addOption(newOption)"
      >
        Add
      </v-btn>
    </v-form>
  </v-layout>
</template>

<script>
import {mapGetters} from 'vuex'
import router from '../router'
import stats from 'simple-statistics'
export default {
  name: 'poll',
  data: () => {
    return {
      transitionName: null,
      valid: false,
      newOptionRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Max 25 characters',
      ],
      id: null,
      poll: {title: null},
      options: [],
      newOption: "",
    }
  },
  computed: {
    ...mapGetters(['user']),
    sortedOptionsByScore() {
      let clone = this.options.slice()
      return clone.sort((a,b) => {
        if ('processedVotes' in a && 'processedVotes' in b) {
          return b.processedVotes.score - a.processedVotes.score
        }
      }).filter(option => {
        return 'title' in option && 'processedVotes' in option
      })
    }
  },
  methods: {
    voteUp (optionId) {
      this.vote(optionId, 1)
    },
    voteDown (optionId) {
      this.vote(optionId, -1)
    },
    score (upvotes, n = 0, confidence = 0.95) {
      if (n === 0) return 0
      const z = stats.probit(1-(1-confidence)/2)
      const phat = 1.0 * upvotes / n
      return (phat + z*z / (2*n) - z * Math.sqrt((phat * (1 - phat) + z*z / (4*n)) / n)) / (1 + z*z/n)
    },
    vote (optionId, vote) {
      this.transitionName = "sorted-list"
      this.$db.vote(this.id, optionId, vote)
        .then(() => {
          this.transitionName = null
        })
        .catch(() => {
          router.push({
            name: 'login',
            query: { redirect: this.$route.fullPath }
          })
        })
    },
    getPoll (pollId) {
      this.$db.getPoll(pollId).onSnapshot((doc) => {
        this.poll = doc.data()
      })
    },
    getOptions (pollId) {
      this.$db.getOptions(pollId).onSnapshot((querySnapshot) => {
        this.options = []
        querySnapshot.forEach((doc) => {
          var key = this.getIdxByOptionId(doc.id)
          if (key<0) {
            key = this.options.length
          }
          var data = doc.data()
          data.id = doc.id
          this.$set(this.options, key, data)
          this.getVotes(this.id, doc.id)
        });
      })
    },
    getVotes (pollId, optionId) {
      this.$db.getVotes(pollId, optionId).onSnapshot((querySnapshot) => {
        var votes = [];
        querySnapshot.forEach((doc) => {
            votes.push(doc.data());
        });
        var key = this.getIdxByOptionId(optionId)
        this.$set(this.options[key], "votes", votes)
        this.$set(this.options[key], "processedVotes", this.processVotes(key))
      })
    },
    processVotes(key) {
      var positive = 0;
      var negative = 0;
      var userVote = null;
      this.options[key].votes.forEach((vote) => {
        if (this.user && vote.user === this.user.uid) {
          userVote = vote.vote
        }
        if (vote.vote > 0) {
          positive++
        }
        if (vote.vote < 0) {
          negative++
        }
      })
      return {
        user: userVote,
        positive: positive,
        negative: negative,
        score: this.score(positive, positive + negative)
      }
    },
    async addOption (newOption) {
      if (this.$refs.form.validate()) {
        await this.$db.newOption(this.id, newOption)
      }
    },
    removeOption (option) {
      let opt = this.options[this.getIdxByOptionId(option.id)]
      this.$db.getOption(this.id, opt.id).delete()
    },
    getIdxByOptionId(optionId) {
      return this.options.findIndex((option) => {
        return option.id == optionId
      })
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getPoll(this.id)
    this.getOptions(this.id)
  }
}
</script>

<style scoped>
.v-list__tile__action.vote-action {
  min-width: 100px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 20px;
}
.v-list__tile__action .v-btn__content .votes {
  font-size: 14pt;
  padding: 0 5px;
}
.v-list__tile__content {
  align-items: center;
}
.v-list__tile__action {
  flex-direction: row;
}
</style>

<style scoped>
.sorted-list-move {
  transition: transform 0.5s;
}
</style>