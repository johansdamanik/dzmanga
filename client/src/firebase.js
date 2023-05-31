import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { ref, onUnmounted, computed } from 'vue'

firebase.initializeApp({
  apiKey: "AIzaSyBYWDszwM4LxHETvWeEg09VXpnpNsMCx9I",
  authDomain: "dzmanga.firebaseapp.com",
  projectId: "dzmanga",
  storageBucket: "dzmanga.appspot.com",
  messagingSenderId: "164355727811",
  appId: "1:164355727811:web:d197ffca7e7f560856dd76"
})

const auth = firebase.auth()

export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const { user } = await auth.signInWithPopup(googleProvider)
    localStorage.setItem('userEmail', user.email)
  }

  const signOut = () => {
    auth.signOut()
    localStorage.removeItem('userEmail')
  }

  return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)

export function useChat() {
  const messages = ref([])
  const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(unsubscribe)

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage }
}