import firebase from "firebase";
require("dotenv").config();
console.log(process.env)

const collectionName = "db_pilot_test";
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId:  process.env.REACT_APP_projectId || "no-firebase",
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Get a Firestore instance
const db = firebase.initializeApp(config).firestore();

// Add data to db
const createFirebaseDocument = (uniqueId) => {
  db.collection(collectionName).doc(uniqueId).set({
    uniqueId,
    totalEarnings: 0,
    dateCreated: new Date(),
  }); 
};



// create a document in the collection with a random id
const createFirebaseDocumentRandom = () => {
  db.collection(collectionName).add({
    dateCreated: new Date(),
  });
};

const addToFirebase = (data) => {
  const uniqueId = data.uniqueId;

  db.collection(collectionName)
    .doc(uniqueId ?? "undefined")
    .collection("data")
    .doc(`trial_${data.trial_index}`)
    .set(data)
};

const addEarningsToFirebase = (data) => {
  const totalEarnings = data.total_earnings;
  if (typeof totalEarnings !== 'undefined'){
    db.collection(collectionName)
      .doc(data.uniqueId)
      .update({ totalEarnings: totalEarnings });
  }
}

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export {
  db,
  TimeStamp,
  GeoPoint,
  createFirebaseDocument,
  addToFirebase,
  addEarningsToFirebase,
  createFirebaseDocumentRandom,
};

export default firebase;
