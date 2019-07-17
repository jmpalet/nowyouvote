<template>
  <v-layout align-center>
    <v-layout align-center column>
      <v-layout :column="mobile" wrap>
        <v-flex xs4 v-for="(block, key) in blocks" v-bind:key="key" >
          <v-card flat class="text-xs-center" color="#f5f5f5" height="100%" style="margin: 0 10px; padding: 20px">
            <v-icon x-large>{{block.icon}}</v-icon>
            <v-card-title primary-title class="justify-center">
              <div class="headline">{{block.title}}</div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout column style="margin-top: 20px">
        <v-icon>code</v-icon>
        <div style="display:inline-block;">
          <a href="https://github.com/jmpalet/nowyouvote">nowyouvote</a> is maintained by <a href="https://github.com/jmpalet">jmpalet</a>
        </div>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        mobile: this.$vuetify.breakpoint.name == 'xs',
        blocks: [
          {icon:'add_circle', title:'Create a poll'},
          {icon:'share', title:'Share it'},
          {icon:'poll', title:'Get real time results'},
        ] 
      }
    }
  }
</script>