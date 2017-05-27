angular.module('starter.services')
      .service('FirebaseService', FirebaseService);

function FirebaseService($firebaseObject) {

  var config = {
    apiKey: "credentials here",
    authDomain: "credentials here",
    databaseURL: "credentials here",
    projectId: "credentials here",
    storageBucket: "credentials here",
    messagingSenderId: "credentials here"
  };

  return {
    connect: connect,
    getCollection: getCollection,
    test: test
  }

  function connect() {
    var fireRef = firebase.initializeApp(config);
  }

  function getCollection() {
    var ref = firebase.database().ref('channels');
    return $firebaseArray(ref);
  }

  function test() {

    var fireRef = firebase.initializeApp(config);
    var ref = firebase.database().ref('madridJerez');

     var obj = $firebaseObject(ref);

     // to take an action after the data loads, use the $loaded() promise
     obj.$loaded().then(function() {
        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          console.log(key, value);
       });
     });
  }

}
