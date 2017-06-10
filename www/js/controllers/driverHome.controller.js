
angular.module('starter.controllers')
        .controller('DriverHomeController', DriverHomeController);

function DriverHomeController($scope, $interval, FirebaseService, $cordovaGeolocation, $ionicPlatform, pushService, $stateParams) {

  var vm = this;
  vm.registeredTokens = null;
  vm.history = [];

  /*
    TODO's
    1- obtener de firebase el array de tokens del canal obtenido.
    2- establecer interval para lanzar callback cada X mins.
    3- en ese callback, obtener GPS y enviar los datos por $HTTP a cada uno de los tokens obtenidos
  */

  FirebaseService.getCollectionFromChannel($stateParams.channel)
    .then(getCollectionFromChannelSuccess);

  function getCollectionFromChannelSuccess(obj) {
    vm.registeredTokens = obj.hasOwnProperty('pushTo') ? obj.pushTo : null;
    $ionicPlatform.ready(setIntervalActions);
  }

  function setIntervalActions() {
    //$interval(calculatePosition, 5000);
    calculatePosition();
  }


  function calculatePosition() {

    $cordovaGeolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    })
    .then(sendPushNotifications, calculatePositionError);

    function calculatePositionError() {
      alert('error getting location');
    }
  }

  function sendPushNotifications(position) {
    vm.history.push({
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
    var l = vm.registeredTokens.length;
    for (var i = 0; i < l; i++) {
      pushService.sendPush(position, vm.registeredTokens[i]);
    }
  }

}
