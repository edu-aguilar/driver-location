angular.module('starter.services')
      .service('FirebaseService', FirebaseService);

function FirebaseService($firebaseObject) {

  var config = {
    apiKey: "XXXXXXX",
    authDomain: "XXXXXXX",
    databaseURL: "XXXXXXX",
    projectId: "XXXXXXX",
    storageBucket: "XXXXXXX",
    messagingSenderId: "XXXXXXX4"
  };

  return {
    getCollectionFromChannel: getCollectionFromChannel
  }

  function getCollectionFromChannel(channel) {

    var fireRef = firebase.initializeApp(config);
    var ref = firebase.database().ref('/channels/' + channel);
    var obj = $firebaseObject(ref);
    return obj.$loaded();
  }

}
