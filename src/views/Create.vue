<template>
  <v-card flat>
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
          counter="25"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-for="(option, key) in options"
          v-bind:key="key"
          v-model="option.title"
          label="Option"
          :rules="optionRules"
          counter="25"
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
        v => v && v.length <= 25 || 'Max 25 characters',
      ],
      optionRules: [
        v => !v || v.length <= 25 || 'Max 25 characters',
      ],
      options: [{}]
    }
  },
  methods: {
    async create () {
      await this.$db.newPoll(this.title).then((data) => {
        this.options.forEach(async (option) => {
          if ('title' in option) {
            await this.$db.newOption(data.id, option.title)
          }
        })
        this.$router.push({
          name: 'poll',
          params: {id: data.id}
        })
      })
    }
  }
}
</script>