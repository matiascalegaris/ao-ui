
const RegisterApiCallback = (name,callback) => {
  console.log('registering callback ' + name);
  if (window.parent.APicallbacks == null) {
    console.log('creating empty ' + name);
    window.parent.APicallbacks = {}
    
  }
  window.parent.APicallbacks[name] = callback
  console.log('registering callback done');
}

if (process.env.NODE_ENV === 'development') {
  window.parent.BabelUI = {
    Login: (email, password, storeCredentials) => {
      setTimeout(() => {
        window.parent.APicallbacks.SetActiveDialog('character-selection')
      }, 100)
    },
    CloseClient: () => {
      console.log('close client')
    },
    GetCredentials: () => ({
      user: "test@a.com",
      password: "pwdd",
    }),
    CreateAccount: (email, password, name, surname) => ({
    }),
    ResendValidationCode: email => {
    },
    ValidateCode: (email, code) => {
    },
    SetHost: (environment) => {
      console.log('set server: ' + environment);
    },
    RequestPasswordReset: email => {
    },
    NewPasswordRequest: (email, code, password) => {
    },
    ExitCharacterSelection: () => {
      setTimeout(() => {
        window.parent.APicallbacks.SetActiveDialog('login')
      }, 100)
    }
  }
}
export {RegisterApiCallback}