import firebase from '../../../firebase'
import { createUser } from './writes'

export async function getUserById(id, cb) {
  if (!id || !cb) return null
  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .onSnapshot((doc) => {
      if (doc.exists) {
        cb({ ...doc.data(), id })
      } else {
        // Create user if user doesn't exist
        createUser(id)
      }
    })
}

export async function getTestMessage() {
  return await firebase
    .firestore()
    .collection('users')
    .doc('j9ZghKbcvic86r96yePr')
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        return doc.data().name + ' ' + doc.data().message
      } else {
        return 'this should not happen'
      }
    })
}

export {}
