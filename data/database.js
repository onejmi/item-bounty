import * as firebase from 'firebase';

export default class Database {
  async connect() {
    await firebase.initializeApp(firebaseConfig);
  }

  async write() {
    let users = await firebase.firestore().collection('users/');
    await users.add({"dummy": {
      "data": "test"
    }});
  }

  async getName(id) {
    await firebase.firestore().collection('users/').doc(id).name;
  }

  async hasId(id) {
    let containsId = false;
    await firebase.firestore().collection('users/').once(
      "value", snapshot => {
        console.log(snapshot.val())
        if(snapshot.key === id) {
          containsId = true;
        }
      }
    );
    return containsId;
}
}

// Initialize Firebase (implement credentials below)
const firebaseConfig = {
  apiKey: "*",
  authDomain: "*",
  databaseURL: "*",
  storageBucket: "*"
};
