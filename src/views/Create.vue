<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <form class="create" @submit.prevent="onSubmit">
          <input type="text" v-model="title" placeholder="Title" v-if="!id"><br>
          <div v-for="option in options">
            <input type="text" placeholder="Option" v-model="option.title" v-if="!id">
          </div>
          <v-btn fab small @click="options.push({})" v-if="!id">
            <v-icon>add</v-icon>
          </v-btn><br>
          <input type="submit" value="Create" v-if="!id"/>
          <a :href="'/poll/' + id" v-if="id">{{id}}</a>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'create',
  data() {
    return {
      title: null,
      id: null,
      options: [{}]
    }
  },
  methods: {
      async onSubmit () {
        await this.$db.newPoll(this.title, this.options).then((data) => {
          this.id = data.id;
        })
      }
    }
}
</script>