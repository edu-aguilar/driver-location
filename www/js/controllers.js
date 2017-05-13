angular.module('starter.controllers', [])

.controller('MenuController', function() {

  var vm = this;
  console.log('app controller');
})

.controller('HomeController', function($interval, AppService, $cordovaGeolocation, $ionicPlatform) {

  var vm = this;
  vm.history = [{
    lat: 1234,
    long: 1234
  }];

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

  //AppService.getSettings();
})

.controller('SettingsController', function() {
  var vm = this;

});
