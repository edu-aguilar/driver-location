
angular.module('starter.controllers')
        .controller('ListenerHomeController', ListenerHomeController);

function ListenerHomeController($stateParams, pushService, FirebaseService) {
  var vm = this;
  var channel = $stateParams.channel;
  var FCMToken = null;
  var registeredTokens = null;
  console.log(channel);

  /*
    TODO's
    1- obtener TOKEN FCM
    2- obtener de firebase el array de tokens del canal obtenido.
    3- comprobar si existe el token obtenido en el array de canales.
    4- si no existe, pushearlo.
  */

  registerDeviceToFCMSuccess('1234'); //browser test

  pushService.registerDeviceToFCM()
    .then(registerDeviceToFCMSuccess);

  function registerDeviceToFCMSuccess(token) {
    console.log(token);
    FCMToken = token;
    FirebaseService.getCollectionFromChannel(channel)
      .then(getCollectionFromChannelSuccess);
  }

  function getCollectionFromChannelSuccess (obj) {
    registeredTokens = obj.hasOwnProperty('pushTo') ? obj.pushTo : null;
    console.log(registeredTokens);
    _checkIfTokenExists(FCMToken, registeredTokens);
  }

  function _checkIfTokenExists(token, registeredTokens) {
    //stuff
    //if not exists, just push, else, just w8 to push notifications
  }

}
