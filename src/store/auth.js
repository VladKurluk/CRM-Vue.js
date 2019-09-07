import firebase from 'firebase/app'

export default {
  actions: {
    // Login in Firebas
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    // Registration in Firebas
    async registration ({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name: name
        })
      } catch (e) {
        throw e
      }
    },
    // Get User ID for successfully registration in Firebase
    getUserId () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout () {
      await firebase.auth().signOut()
    }
  }
}
