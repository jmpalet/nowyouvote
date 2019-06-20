import store from '../store'
import firebase, { firestore } from 'firebase/app';
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
      newPoll: async(title, options) => {
        return await db.collection('polls').add({
          title: title,
          user: store.state.user.uid,
          created: Date.now()
        })
      },
      vote: async(poll, option, vote) => {
        return await db.collection('polls').doc(poll).collection('options').doc(option).collection('votes').add({user: store.state.user.uid, vote: vote})
      },
      newOption: async(id, title) => {
        return await db.collection('polls').doc(id).collection('options').add({title: title})
      },
      getPolls: async () => {
        return await db.collection("polls").orderBy("created", 'desc').where("user", "==", store.state.user.uid).get()
      },
      getVotes: async (poll, option) => {
        return await db.collection('polls').doc(poll).collection('options').doc(option).collection('votes').get().then((data) => {
          let votes = {
            positive: 0,
            negative: 0
          }
          data.forEach(async (vote) => {
            if(vote.get('vote') > 0) {
              votes.positive += vote.get('vote')
            } else {
              votes.negative -= vote.get('vote')
            }
          })
          return votes
        })
      },
      getPoll: async (id) => {
        return await db.collection("polls").doc(id).get()
      },
      deletePoll: async (id) => {
        return await db.collection("polls").doc(id).delete()
      },
      getOptions: async (id) => {
        return await db.collection("polls").doc(id).collection('options').get()
      },
    },
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
    })
  }
}