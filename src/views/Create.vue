<template>
  <v-layout align-center justify-center column fill-height>
    <v-card flat v-if="!id">
      <v-card-title primary-title>
        <div class="headline">New poll</div>
      </v-card-title>
      <v-form
        ref="form"
        lazy-validation
        v-model="valid"
      >
        <v-text-field
          v-model="title"
          :rules="titleRules"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-for="(option, key) in options"
          v-bind:key="key"
          v-model="option.title"
          label="Option"
          @keydown.tab="options.push({})"
        >
          <template slot="append" v-if="key == options.length-1">
            <v-btn icon small @click="options.push({})" style="margin:0"><v-icon>add</v-icon></v-btn>
            <v-btn icon small @click="options.pop()"  style="margin:0"><v-icon>remove</v-icon></v-btn>
          </template>
        </v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          @click="create"
        >
          Create
        </v-btn>
      </v-form>
    </v-card>
    <v-card flat v-if="id" class="text-xs-center">
      <v-card-text>Poll created!</v-card-text>
      <router-link :to="{name: 'poll', params: {id: id}}" v-if="id">
        Share it
      </router-link>
      <v-icon>share</v-icon>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      valid: false,
      title: null,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      id: null,
      options: [{}]
    }
  },
  methods: {
    test (test) {
      console.log(test)
    },
    async create () {
      await this.$db.newPoll(this.title).then((data) => {
        this.id = data.id
        this.options.forEach(async (option) => {
          if ('title' in option) {
            await this.$db.newOption(data.id, option.title).then((data) => {
            })
          }
        })
      })
    }
  }
}
</script>