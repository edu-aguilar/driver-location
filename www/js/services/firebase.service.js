angular.module('starter.services')
      .service('FirebaseService', FirebaseService);

function FirebaseService($firebaseObject) {

  var config = {
    apiKey: "AIzaSyC1I22MAzlPlnHbNL66cwkzAHTV4eC4zCk",
    authDomain: "driver-location-1fae9.firebaseapp.com",
    databaseURL: "https://driver-location-1fae9.firebaseio.com",
    projectId: "driver-location-1fae9",
    storageBucket: "driver-location-1fae9.appspot.com",
    messagingSenderId: "932275972184"
  };

  return {
    connect: connect,
    getCollection: getCollection,
    getCollectionFromChannel: getCollectionFromChannel
  }

  function connect() {
    var fireRef = firebase.initializeApp(config);
  }

  function getCollection() {
    var ref = firebase.database().ref('channels');
    return $firebaseArray(ref);
  }

  function getCollectionFromChannel(channel) {

    var fireRef = firebase.initializeApp(config);
    var ref = firebase.database().ref(channel);
    var obj = $firebaseObject(ref);

    return obj.$loaded();
  }

}
