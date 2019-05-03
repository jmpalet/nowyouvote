import store from './../store'
import Firebase from 'firebase'

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
    const firebase = Firebase.initializeApp(config);
    const auth = firebase.auth()
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass)
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