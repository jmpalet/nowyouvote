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
      loginWithGoogle: async () => {
        var provider = new firebase.auth.GoogleAuthProvider()
        return await auth.signInWithPopup(provider)
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
      vote: async(poll, option, vote) => {
        if (store.state.user == null) {
          throw new Error('not logged in')
        }
        return await db.collection('polls').doc(poll).collection('options').doc(option).collection('votes').where('user', '==', store.state.user.uid).get()        
          .then(function(querySnapshot) {
            let batch = db.batch();
            let removed = false;
            let exists = false;
            querySnapshot.forEach(function(doc) {
              if(doc.get('vote') === vote) {
                exists = true;
              }
              batch.delete(doc.ref);
              removed = true;
            });
            if (removed) {
              batch.commit();
            }
            if((removed && !exists) || !removed) {
              return db.collection('polls').doc(poll).collection('options').doc(option).collection('votes').add({user: store.state.user.uid, vote: vote})
            }
          })
      },
      newOption: async(id, title) => {
        return await db.collection('polls').doc(id).collection('options').add({title: title})
      },
      getOption: (poll, option) => {
        return db.collection('polls').doc(poll).collection('options').doc(option)
      },
      getPolls: () => {
        return db.collection("polls").orderBy("created", 'desc').where("user", "==", store.state.user.uid)
      },
      getVotes: (poll, option) => {
        return db.collection('polls').doc(poll).collection('options').doc(option).collection('votes')
      },
      getPoll: (id) => {
        return db.collection("polls").doc(id)
      },
      getOptions: (id) => {
        return db.collection("polls").doc(id).collection('options')
      },
    },
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
    })
  }
}