angular.module('starter.services')
      .service('FirebaseService', FirebaseService);

function FirebaseService($firebaseObject) {

  var config = {
  apiKey: "XXXXXX",
  authDomain: "XXXXXX",
  databaseURL: "XXXXXX",
  projectId: "XXXXXX",
  storageBucket: "XXXXXX",
  messagingSenderId: "XXXXXX4"
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
