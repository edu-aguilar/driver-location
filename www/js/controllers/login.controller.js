
angular.module('starter.controllers')
        .controller('LoginController', LoginController);

function LoginController($state) {
  var vm = this;

  vm.role = null;
  vm.channel = null;
  vm.time = null;

  vm.goLogin = goLogin;

  function goLogin() {
    $state.go('app.' + vm.role + 'Home', {channel: vm.channel, time: vm.time});
  }
}
