/* eslint-disable */

export function showLogin () {
  gigya.accounts.showScreenSet({
    screenSet: 'Default-RegistrationLogin',
    containerID: 'gigya-container-login',
    onAfterScreenLoad: () => {
      $("#gigya-login-screen").removeClass("landscape").addClass("portrait")
      $("#gigya-register-screen").removeClass("landscape").addClass("portrait")
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }
  })
}

export function showProfile () {
  gigya.accounts.showScreenSet({
    screenSet: 'Default-ProfileUpdate',
    onAfterScreenLoad: () => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }
  })
}

export function showPrivacy () {
  gigya.accounts.showScreenSet({
    screenSet: 'Default-ProfileUpdate',
    startScreen: 'gigya-privacy-screen',
    onAfterScreenLoad: () => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }
  })
}

export function showCommunications () {
  gigya.accounts.showScreenSet({
    screenSet: 'Default-ProfileUpdate',
    startScreen: 'gigya-communication-screen',
    onAfterScreenLoad: () => {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    }
  })
}

export function sendNotification (msg) {
  gigya.accounts.getJWT({
    fields:"profile.email",
    callback: (response) => {
      if(response.errorCode == 0) {
        // Get Firebase JWT
        fetch('https://api-catalog.cfapps.eu10.hana.ondemand.com/notification/send', {
          method: 'post',
          headers: new Headers({
            'Authorization': `Bearer ${response.id_token}`,
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify(msg),
        })
        .then(response => response.text()
          .then((text) => {
        }))
        .catch(function(error) {
          console.log(`${new Date().toTimeString()} - Error sending notification`);
          console.error(error);
        })
      } else {
        console.log(`${new Date().toTimeString()} - Error requesting a Gigya JWT: ${response.errorMessage}`);
      }
    }
  })
}

export function getAccountInfo (callback) {
  // getAccountInfo replaced by JWT to integrate with Firebase
  gigya.accounts.getJWT({
    fields:"profile.firstName,profile.lastName,profile.email",
    callback: (response) => {
      if(response.errorCode == 0) {
        // Get JWT payload
        var base64Url = response.id_token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var token = JSON.parse(window.atob(base64));

        // Get Firebase JWT
        fetch('https://api-catalog.cfapps.eu10.hana.ondemand.com/firebase/getToken', {
          method: 'post',
          headers: new Headers({
            'Authorization': `Bearer ${response.id_token}`
          }),
        })
        .then(response => response.text()
          .then((text) => {
            if (response.ok) {
              callback({
                profile: {
                  firstName: token["profile.firstName"],
                  lastName: token["profile.lastName"],
                  email: token["profile.email"]
                },
                JWT: response,
                FirebaseToken: text
              })
            } else {
              console.log(`${new Date().toTimeString()} - Error requesting Firebase JWT`);
              console.error(text);
              callback(null)
              showLogin()
            }
        }))
        .catch(function(error) {
          console.log(`${new Date().toTimeString()} - Error requesting Firebase JWT`);
          console.error(error);
          callback(null)
          showLogin()
        })
      } else {
        console.log(`${new Date().toTimeString()} - Error requesting a Gigya JWT: ${response.errorMessage}`);
        callback(null)
        showLogin()
      }
    }
  })
}

export function logout () {
  gigya.accounts.logout()
}

export function addEventHandlers (onLogin, onLogout) {
  gigya.accounts.addEventHandlers({
    onLogin: () => {
      getAccountInfo(onLogin)
    },
    onLogout: () => {
      onLogout()
      setTimeout(() => {
        showLogin()
      }, 500)
    }
  })
}
