const firebaseConfig = {
  apiKey: "AIzaSyCn_cVfasO7XJqfMHMbiotbBXa22-eMLb8",
  authDomain: "restaurace-1e61e.firebaseapp.com",
  projectId: "restaurace-1e61e",
  storageBucket: "restaurace-1e61e.appspot.com",
  messagingSenderId: "1030213554703",
  appId: "1:1030213554703:web:98d9e600150a77aee8c97a",
  measurementId: "G-1TWDFH1GYK"
};


  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  async function getData() {
    const querySnapshot = await db.collection("booking").get();
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  getData();
