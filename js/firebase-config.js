// Firebase SDK
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// Konfigurasi projek Smart Exit Ticket
const firebaseConfig = {
  apiKey: "AIzaSyCOmaP6lNbSOo4_7yrGX9Bv9kcJvpEaV5A",
  authDomain: "smart-exit-ticket.firebaseapp.com",
  projectId: "smart-exit-ticket",
  storageBucket: "smart-exit-ticket.firebasestorage.app",
  messagingSenderId: "351545707375",
  appId: "1:351545707375:web:d67aae43d55695942d369a"
};

// Mulakan Firebase
const app = initializeApp(firebaseConfig);

// Sediakan Authentication dan Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Benarkan fail lain menggunakan Firebase
export {
  app,
  auth,
  db
};