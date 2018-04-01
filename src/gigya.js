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

export function showLiteReg () {
  // gigya.accounts.showScreenSet({
  //   screenSet: 'Default-LiteRegistration',
  //   containerID: 'gigya-container-lite',
  // })
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

export function getAccountInfo (callback) {
  // getAccountInfo replaced by JWT to integrate with Firebase
  gigya.accounts.getJWT({
    fields:"profile.firstName,profile.email",
    callback: (response) => {
      if(response.errorCode == 0) {
        // Get JWT payload
        var base64Url = response.id_token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var token = JSON.parse(window.atob(base64));

        // Get Firebase JWT
        var url = 'https://alejandro.gigya-cs.com/gigya-catalog-auth/auth.php';
        fetch(`${url}?id_token=${response.id_token}`)
        .then(response => response.text()
          .then((text) => {
            if (response.ok) {
              callback({
                profile: {
                  firstName: token["profile.firstName"]
                },
                JWT: response,
                FirebaseToken: text
              })
            } else {
              console.error(text);
              callback(null)
              showLogin()
            }
        }))
        .catch(function(error) {
          console.error(error);
          callback(null)
          showLogin()
        })
      } else {
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
        showLiteReg()
      }, 500)
    }
  })
}
