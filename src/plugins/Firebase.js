import store from '../store'
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';

const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
  };

export default {
  install: (Vue) => {  
    const app = firebase.initializeApp(config);
    const auth = app.auth();
    const db = app.firestore();

    Vue.prototype.$auth = {
      loginAnonymously: async () => {
        return await auth.signInAnonymously()
      },
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass)
      },
      signup: async (username, pass) => {
        return await auth.createUserWithEmailAndPassword(username, pass)
      },
      logout: async () => {
        await auth.signOut()
      }
    },
    Vue.prototype.$db = {
      newPoll: async(title) => {
        return await db.collection('polls').add({
          title: title,
          user: store.state.user.uid,
          created: Date.now()
        })
      },
      getPolls: async () => {
        return await db.collection("polls").orderBy("created", 'desc').where("user", "==", store.state.user.uid).get()
      },
      getPoll: async (id) => {
        return await db.collection("polls").doc(id).get()
      },
      deletePoll: async (id) => {
        return await db.collection("polls").doc(id).delete()
      },
    },
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
    })
  }
}