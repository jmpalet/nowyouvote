import store from './../store'
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth'
// import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAPTrugWv2_GF8nHecetJYgKkO5WkwDKSk",
    authDomain: "nowyouvote-com.firebaseapp.com",
    databaseURL: "https://nowyouvote-com.firebaseio.com",
    projectId: "nowyouvote-com",
    storageBucket: "nowyouvote-com.appspot.com",
    messagingSenderId: "801533474477"
  };

export default {
  install: (Vue) => {  
    const app = firebase.initializeApp(config);
    const auth = app.auth()
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass)
      },
      signup: async (username, pass) => {
        return await auth.createUserWithEmailAndPassword(username, pass)
      },
      logout: async () => {
        await auth.signOut()
      }
    }
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
    })
  }
}