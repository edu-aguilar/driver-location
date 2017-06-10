
angular.module('starter.controllers')
        .controller('ListenerHomeController', ListenerHomeController);

function ListenerHomeController($stateParams, pushService, FirebaseService) {
  var vm = this;
  vm.status = null;

  var channel = $stateParams.channel;
  var FCMToken = null;
  var registeredTokens = null;

  /*
    TODO's
    1- obtener TOKEN FCM
    2- obtener de firebase el array de tokens del canal obtenido.
    3- comprobar si existe el token obtenido en el array de canales.
    4- si no existe, pushearlo.
  */
  
  pushService.registerDeviceToFCM()
    .then(registerDeviceToFCMSuccess);

  function registerDeviceToFCMSuccess(token) {
    FCMToken = token;
    FirebaseService.getCollectionFromChannel(channel)
      .then(getCollectionFromChannelSuccess);
  }

  function getCollectionFromChannelSuccess (obj) {
    registeredTokens = obj.hasOwnProperty('pushTo') ? obj.pushTo : null;
    var exists = _checkIfTokenExists(FCMToken, registeredTokens);
    if (exists) {
      vm.status = 'All is done!! just wait for driver notifications.';
    } else {
      _registerFCMTokenToFirebase(obj);
    }
  }

  function _checkIfTokenExists(token, registeredTokens) {
    var l = registeredTokens.length;
    for (var i = 0; i < l; i++) {
      if (registeredTokens[i] === token) {
        return true;
      }
    }
    return false;
  }

  function _registerFCMTokenToFirebase(firebaseObj) {
    firebaseObj.pushTo.push(FCMToken);
    firebaseObj.$save().then(function(ref) {
      ref.key === firebaseObj.$id; // true
      vm.status = 'All is done!! just wait for driver notifications.';
    }, function(error) {
      console.log("Error:", error);
    });
  }

}
