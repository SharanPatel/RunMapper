import firebase from '../../../firebase'

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
