
angular.module('starter.controllers')
        .controller('ListenerHomeController', ListenerHomeController);

function ListenerHomeController($stateParams) {
  var vm = this;
  console.log($stateParams.channel);

  /*
    TODO's
    1- obtener TOKEN FCM
    2- obtener de firebase el array de tokens del canal obtenido.
    3- comprobar si existe el token obtenido en el array de canales.
    4- si no existe, pushearlo.
  */
}
