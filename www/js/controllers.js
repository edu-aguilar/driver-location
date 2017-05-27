angular.module('starter.controllers', [])

.controller('MenuController', function() {

  var vm = this;
  console.log('app controller');
})

.controller('HomeController', function($scope, $interval, AppService, $cordovaGeolocation, $ionicPlatform, $firebaseArray) {

  var vm = this;
  vm.history = [{
    lat: 1234,
    long: 1234
  }];

  var config = {
    apiKey: "firebase config here",
    authDomain: "firebase config here",
    databaseURL: "firebase config here",
    projectId: "firebase config here",
    storageBucket: "firebase config here",
    messagingSenderId: "firebase config here"
  };
  var fireRef = firebase.initializeApp(config);

  var ref = firebase.database().ref('channels');
  vm.newslist = $firebaseArray(ref);


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
