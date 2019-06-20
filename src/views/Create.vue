<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <form class="create" @submit.prevent="onSubmit">
          <input type="text" v-model="title" placeholder="Title" v-if="!id"><br>
          <div v-for="(option, key) in options" v-if="!id">
            <input type="text" placeholder="Option" v-model="option.title" v-if="!id">
            <v-icon @click="options.push({})" v-if="key == options.length-1">add_circle_outline</v-icon>
            <v-icon @click="options.pop()" v-if="key == options.length-1 && options.length > 1">remove_circle_outline</v-icon>
          </div>
          <input type="submit" value="Create" v-if="!id"/>
          <router-link :to="{ name: 'poll', params: {id: id}}" v-if="id">
            <a>{{id}}</a>
          </router-link>
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
        await this.$db.newPoll(this.title).then((data) => {
          console.log(data.id)
          this.id = data.id
          this.options.forEach(async (option) => {
            if ('title' in option) {
              await this.$db.newOption(data.id, option.title).then((data) => {
                console.log(data.id)
              })
            }
          })
        })
      }
    }
}
</script>