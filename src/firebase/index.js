const config = {
  apiKey: 'AIzaSyDgGT5hFomtsStWFZdYblv6k8d9Bx-5xC0',
  authDomain: 'builton-61902.firebaseapp.com'
}

let firebaseInstance
export const getFirebase = firebase => {
  if (typeof window !== 'undefined') {
    if (firebaseInstance) return firebaseInstance;

    firebase.initializeApp(config)
    firebaseInstance = firebase
    return firebaseInstance
  }

  return null;
}

