

angular
    .module('starter.services')
    .service('pushService', PushService);

function PushService($q, $http, $ionicPlatform, $rootScope, $timeout) {

  var FCMToken = null;
  var pushPluginConfig = {
    android: {}
  };
  var pushInstance = null;

  return {
    registerDeviceToFCM: registerDeviceToFCM,
    sendPush: sendPush
  }

  function registerDeviceToFCM() {

    var _d = $q.defer();

    $ionicPlatform.ready()
      .then(initRegistrationProgress)
      .catch(function functionName() {
        _d.reject();
      });

    function initRegistrationProgress() {
      if (window.cordova) {

        var pushInstance = PushNotification.init(pushPluginConfig);

        pushInstance.on('registration', onRegistration);
        pushInstance.on('notification', _onNotification);
        pushInstance.on('error', onError);

        function onRegistration(data) {
          FCMToken = data.registrationId;
        	console.log(FCMToken);
          _d.resolve(FCMToken);
        }

        function onError(e) {
          console.log(e.message);
          alert('PUSH PLUGIN ERROR' + e.message);
          _d.reject();
        }

      } else {
        _d.reject();
      }
    }

    return _d.promise;
  }

  function _onNotification(data) {
    console.log(data);
    var lat = data.additionalData.position.latitude;
    var lon = data.additionalData.position.longitude;
    $rootScope.$broadcast('_notificationReceived', {
      position: data.additionalData.position
    });

    $timeout(function() {
      window.location = 'geo:' + lat + ',' + lon;
    }, 2000);

    // if(isAndroid) {
    //   window.location = 'geo:50.060915,19.948066';
    // }
    // else {
    //   window.location = 'http://maps.apple.com/?ll=50.060915,19.948066';
    // }
  }

  function sendPush(position, token) {
    //send push to http FCM
    var _position = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    var body = {
    	"to": token,
        "data" : {
            "title": "Nueva ubicacion",
            "body": _position.latitude + ", " + _position.longitude,
            "notId": 10,
            "position": JSON.stringify(_position)
        }
    }
    $http({
        method: 'POST',
        dataType: 'jsonp',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=XXXXX'
        },
        data: JSON.stringify(body)
    }).then(registerDeviceToCamPushSuccess)
    .catch(registerDeviceToCamPushError);

    function registerDeviceToCamPushSuccess(response) {
      console.log('push sent');
    }

    function registerDeviceToCamPushError(error) {
      alert('error enviando push');
    }
  }

}
