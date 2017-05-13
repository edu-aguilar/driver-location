angular.module('starter.services', [])

.service('AppService', function($timeout) {

  var config = {
    phoneList : [],
    frequency: 5000
  };

  return {
    getSettings: getSettings,
    setSettings: setSettings
  }

  function getSettings() {
    return config;
  }
  function setSettings(_config) {
    angular.copy(_config, config);
  }
})
