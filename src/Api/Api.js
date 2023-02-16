
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
        window.parent.APicallbacks.ErrorMessage('failed to connect to server', 0, 1)
      }, 5000)
    },
    CloseClient: () => {
      console.log('close client')
    },
    GetCredentials: () => ({
      user: "test@a.com",
      password: "pwdd",
    }),
    CreateAcount: (email, password, name, surname) => ({
      
    })
  }
}
export {RegisterApiCallback}