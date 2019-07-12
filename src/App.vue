<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <router-link class="logo" to="/">
          <h1 class="logo"><span class="logo-1">now</span><span class="logo-2">you</span><span class="logo-3">vote</span><span class="logo-4">.com</span></h1>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link v-if="!user" to="/login">Login</router-link>
        <router-link v-if="!!user" to="/create">Create</router-link>
        <router-link v-if="!!user" to="/profile">Profile</router-link>
        <router-link v-if="!!user" to="/polls">Polls</router-link>
      </div>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import store from './store'

export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
* {
	outline: none !important;
}
.headline {
  padding-top: 14px;
}
.logo:hover {
  text-decoration: none;
}
h1.logo {
  font-size: 26px;
  font-weight: 300;
  color: rgba(0,0,0,0.6);
  margin: 0 0 22px;
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #7c7c7c;
  padding: 0 10px;
  border-right: 1px solid;
}

#nav a:last-child {
  border-right: 0px;
}

#nav a.router-link-exact-active {
  color: #3c3c3c;
}

input[type=submit] {
  text-align: center;
  background: #039be5;
  text-transform: uppercase;
  text-decoration: none;
  border: 0;
  color: white;
  padding: 16px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

ul { 
  list-style-type: none;
}
</style>

