<template>
  <div id="app">
    <h1 class="logo"><span class="logo-1">now</span><span class="logo-2">you</span><span class="logo-3">vote</span><span class="logo-4">.com</span></h1>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="!user" to="/login">Login</router-link>
      <router-link v-if="!!user" to="/create">Create</router-link>
      <router-link v-if="!!user" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
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
</style>
