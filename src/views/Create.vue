<template>
  <v-card flat>
    <v-card-title primary-title>
      <div class="headline">New poll</div>
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      class="px-3"
    >
      <v-text-field
        v-model="title"
        :rules="titleRules"
        counter="25"
        label="Title"
        ref="test"
        required
      ></v-text-field>

      <v-text-field
        v-for="(option, key) in options"
        v-bind:key="key"
        v-model="option.title"
        label="Option"
        :rules="optionRules"
        counter="25"
        :ref="key"
        @keydown.tab.exact="keydownAdd(isLastOption(key))"
        @keydown.delete.exact="keydownRemove(isLastOption(key) && !isFirstOption(key) && !option.title)"
      >
        <template slot="append" v-if="isLastOption(key)">
          <v-btn icon small @click="pushOption()" style="margin:0"><v-icon>add</v-icon></v-btn>
          <v-btn icon small @click="popOption()"  style="margin:0"><v-icon>remove</v-icon></v-btn>
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
    },
    isFirstOption(key) {
      return key == 0
    },
    isLastOption(key) {
      return key == this.options.length-1
    },
    keydownAdd(valid) {
      if (valid) {
        this.pushOption()
      }
    },
    keydownRemove(valid) {
      if (valid) {
        this.popOption()
      }
    },
    pushOption() {
      this.options.push({})
    },
    popOption() {
      this.options.pop()
      this.$refs[this.options.length - 1][0].focus()
    }
  }
}
</script>