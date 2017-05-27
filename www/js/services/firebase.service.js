angular.module('starter.services')
      .service('FirebaseService', FirebaseService);

function FirebaseService() {


  return {
    connect: connect,
    getCollection: getCollection
  }

  function connect() {
    var config = {
      apiKey: "credentials here",
      authDomain: "credentials here",
      databaseURL: "credentials here",
      projectId: "credentials here",
      storageBucket: "credentials here",
      messagingSenderId: "credentials here"
    };
    var fireRef = firebase.initializeApp(config);
  }

  function getCollection() {
    var ref = firebase.database().ref('channels');
    return $firebaseArray(ref);
  }

}
