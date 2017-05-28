
angular.module('starter.controllers')
        .controller('ListenerHomeController', ListenerHomeController);

function ListenerHomeController($stateParams) {
  var vm = this;
  console.log($stateParams.channel);
}
