<template>
  <form class="create" @submit.prevent="onSubmit">
    <input type="text" v-model="title" placeholder="Title" v-if="!id"><br>
    <input type="submit" value="Create" v-if="!id"/>
    <a :href="'/poll/' + id" v-if="id">{{id}}</a>
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'create',
  data() {
    return {
      title: null,
      id: null
    }
  },
  methods: {
      async onSubmit () {
        await this.$db.newPoll(this.title).then((data) => {
          this.id = data.id;
        })
      }
    }
}
</script>