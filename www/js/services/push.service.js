

angular
    .module('starter.services')
    .service('pushService', PushService);

function PushService($q, $http, $ionicPlatform) {

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
          alert('TOKEN: ' + FCMToken);
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
    alert('llegó push'); //siempre saludaba
  }

  function sendPush(position, token) {
    //send push to http FCM
    var body = {
      "to": token,
      "notification":{
        "title":"[add title]",
        "body":"[add your message]"},
        "priority":"high"
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
