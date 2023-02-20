import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "SETTINGS": "Settings",
      'recovery-mail-hint': `If you don't get the recovery email, please check in the "Spam" folder.`,
      'recover-password-text': `Enter the email address that you used to create the account and we'll send you a recovery code.`,
      'password-requirements': `Plase include at least one Upper and one lower case letter, and two numbers. The password can't start with a number.`,
      'robot-code': "{{first}} + {{second}} =",
      'connection-failure': `An error has occurred while connecting to the server. We recommend checking the status of the servers at ao20.com.ar, and ensuring that you are directly connected to the internet.`,
      'connecting-to-server': `Connecting to server`,
      'connection-closed': `Connection closed by server`,
      'validation-code': `validation code`,
      'resend-code': `resend validation code`,
      'set new password': `set new password`
    }
  },
  es: {
    translation: {
      "SETTINGS": "Configuración",
      'recovery-mail-hint': `Si no recibiste el email de recuperacion, revisa la carpeta de "Spam".`,
      'recover-password-text': `Ingresa el mail que usaste para crear la cuenta y te enviaremos un codigo de recuperacion`,
      'password-requirements': `La contraseña debe incluyes una mayucula, una minuscula y dos numeros. La contraseña no puede empezar con un numero.`,
      'robot-code': "{{first}} + {{second}} =",
      'connection-failure': `Ha ocurrido un error al conectar con el servidor. Le recomendamos verificar el estado de los servidores en ao20.com.ar, y asegurarse de estar conectado directamente a internet`,
      'connecting-to-server': `Conectandose al servidor`,
      'connection-closed': `Se perdio la conexion con el servidor`,
      'validation-code': `código de validación`,
      'resend-code': `Reenviar código de activación`,
      'send': `enviar`,
      'cancel': 'cancelar',
      'set new password': 'Nueva Contraseña'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;