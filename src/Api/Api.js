
const RegisterApiCallback = (name,callback) => {
  if (window.parent.APicallbacks == null) {
    window.parent.APicallbacks = {
      name: callback
    }
  }
  else {
    window.parent.APicallbacks[name] = callback
  }
}

if (process.env.NODE_ENV === 'development') {
  window.parent.BabelUI = {
    Login: (email, password) => {
      setTimeout(() => {
        window.parent.APicallbacks.ErrorMessage('failed to connect to server', 0, 1)
      }, 5000)
    },
    CloseClient: () => {
      console.log('close client')
    }
  }
}
export {RegisterApiCallback}