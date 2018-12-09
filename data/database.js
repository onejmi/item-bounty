import * as firebase from 'firebase';

export default class Database {
  async connect() {
    await firebase.initializeApp(firebaseConfig);
  }
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuue4nh5Bno3wwRuUfRavJEyPk4nZFfKk",
  authDomain: "item-bounty-fd3f9.firebaseapp.com",
  databaseURL: "https://item-bounty-fd3f9.firebaseio.com",
  storageBucket: "item-bounty-fd3f9.appspot.com"
};