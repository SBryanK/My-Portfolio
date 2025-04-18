import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAU0JQv8MZR0Tr-ms6dURqZGFIY7bEeVmA",
  authDomain: "chatapp-da8d5.firebaseapp.com",
  projectId: "chatapp-da8d5",
  storageBucket: "chatapp-da8d5.firebasestorage.app",
  messagingSenderId: "740935995483",
  appId: "1:740935995483:web:57d7c52267a8c8e4226f7e",
  measurementId: "G-CKXTDREWH8"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [] = useAuthState(auth);

return (
  <div className="App">
    <header className="App-header">
      <h1>Chat App</h1>
      <button onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>Sign in with Google</button>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </header>

    <section>
      {user ? <ChatRoom /> : <SignIn />}
    </section>
  </div>
);

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <div>
      <h2>Please sign in</h2>
      <button onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>Sign in with Google</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
