
angular.module('starter.controllers')
        .controller('DriverHomeController', DriverHomeController);

function DriverHomeController($scope, $interval, FirebaseService, $cordovaGeolocation, $ionicPlatform, $firebaseArray, $stateParams) {

  var vm = this;
  vm.history = [{
    lat: 1234,
    long: 1234
  }];

  /*
    TODO's
    1- obtener de firebase el array de tokens del canal obtenido.
    2- establecer interval para lanzar callback cada X mins.
    3- en ese callback, obtener GPS y enviar los datos por $HTTP a cada uno de los tokens obtenidos
  */

  console.log($stateParams.channel);
  //FirebaseService.test();

  $ionicPlatform.ready(function() {

    //$interval(calculatePosition, 5000);
    calculatePosition();
  });

  function calculatePosition() {
    $cordovaGeolocation.getCurrentPosition({
      enableHighAccuracy: true
    })
    .then(function (position) {
        vm.history.push({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
        //how to send to mobiles??? push notifications maybe?
      }, function(err) {
        // error
      });
  }

}
