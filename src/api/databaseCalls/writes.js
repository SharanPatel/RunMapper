import firebase from '../../../firebase'

export async function createUser() {
  const authUser = firebase.auth().currentUser
  const { uid, email, displayName } = authUser
  const firstName = displayName ? displayName.split(' ')[0] : ''
  const lastName = displayName ? displayName.split(' ')[1] : ''

  const existingUser = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => doc.exists)

  if (!existingUser) {
    firebase.firestore().collection('users').doc(uid).set({
      email: email,
      firstName,
      lastName,
    })
  }
}
