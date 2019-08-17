<template>
  <v-app id="nowyouvote">
    <v-toolbar app absolute>
      <v-toolbar-title class="headline">
        <router-link class="logo" to="/">
          <v-layout row>
            <v-icon medium color="#3c3c3c">thumb_up</v-icon>
            <h1 class="logo"><span class="logo-1">now</span><span class="logo-2">you</span><span class="logo-3">vote</span><span class="logo-4">.com</span></h1>
          </v-layout>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in menu" :key="item.icon" :to="item.path" flat>
          <v-icon>{{item.icon}}</v-icon>
          <span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-md-and-up" v-if="this.$vuetify.breakpoint.name != 'xs'">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile v-for="item in menu" :key="item.icon">
            <router-link :to="item.path">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </router-link>
          </v-list-tile>   
        </v-list>
      </v-menu>
    </v-toolbar>
    
    <v-content>
      <v-container>
        <v-layout :align-center="!mobile" justify-center :column="!mobile" fill-height>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    
    <v-bottom-nav app
      v-if="this.$vuetify.breakpoint.name == 'xs'"
      :value="true"
      fixed
      color="white"
    >
      <router-link v-for="item in menu" :key="item.icon" :to="item.path">
        <v-btn flat>
          <span>{{item.title}}</span>
          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
      </router-link>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    mobile() {
      return this.$vuetify.breakpoint.name == 'xs'
    },
    menu() {
      var menu = [
        { icon: 'vpn_key', title: 'Login', path: '/login', show: !this.user },
        { icon: 'add_box', title: 'New poll', path: '/create', show: !!this.user },
        { icon: 'view_headline', title: 'My polls', path: '/polls', show: !!this.user },
        { icon: 'person', title: 'Profile', path: '/profile', show: !!this.user },
      ]
      return menu.filter((item) => {
        return item.show
      })
    },
  }
}
</script>

<style>
.logo:hover {
  text-decoration: none;
}
h1.logo {
  font-size: 26px;
  font-weight: 300;
  color: rgba(0,0,0,0.6);
  margin-left: 4px;
}
h1.logo .logo-1 {
  color:#5c5c5c;
}
h1.logo .logo-2 {
  color:#3c3c3c;
  font-weight: bold;
}
h1.logo .logo-3 {
  color:#1c1c1c;
}
h1.logo .logo-4 {
  color:#9c9c9c;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input[type=submit] {
  text-align: center;
  background: #039be5;
  text-transform: uppercase;
  text-decoration: none;
  border: 0;
  color: white;
  padding: 10px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
ul { 
  list-style-type: none;
}
a {
  text-decoration: none;
}
</style>

