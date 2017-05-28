
angular.module('starter.controllers')
        .controller('DriverHomeController', DriverHomeController);

function DriverHomeController($scope, $interval, FirebaseService, $cordovaGeolocation, $ionicPlatform, $firebaseArray, $stateParams) {

  var vm = this;
  vm.history = [{
    lat: 1234,
    long: 1234
  }];

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
