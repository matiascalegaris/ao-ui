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
      'database-error': 'Database error.',
      'invalid-character-name': 'Invalid character name.',
      'invalid-code': 'Invalid code.',
      'unknown-error': 'Unknown error',
      'invalid-request': 'Invalid request',
      'invalid-email': 'Invalid email',
      'not-char-owner': 'You are not the owner of the character.',
      'TRANSFER_CHARACTER_OKAY': 'Character transfer success',
      'newowner-not-exist': 'Newowner does not exist',
      'locked-in-mao': 'Cannot delete character listed in MAO.',
      'not-patreon': 'You or de destination are not patreon.',
      'not-enough-credits': 'You do not have enough credits.',
      'invalid-account': 'Invalid account',
      'invalid-character-owner': 'You are not the character owner.',
      'validation-code': `validation code`,
      'resend-code': `resend validation code`,
      'set new password': `set new password`,
      'delete-char-success': 'Delete char success',
      'class': `Class: {{className}}`,
      'level': `Level: {{level}}`,
      'Human': 'Human',
      'Elf': 'Elf',
      'Drow': 'Drow',
      'Gnomw': 'Gnome',
      'Dwarf': 'Dwarf',
      'Orc': 'Orc',
      'Mage': 'Mage',
      'Cleric': 'Cleric',
      'Warrior': 'Warrior',
      'Assasin': 'Assasin',
      'Bard': 'Bard',
      'Druid': 'Druid',
      'Paladin': 'Paladin',
      'Hunter': 'Hunter',
      'Worker': 'Worker',
      'Pirate': 'Pirate',
      'Thief': 'Thief',
      'Bandit': 'Bandit',
      'sta-str': 'Strength',
      'sta-agi': 'Agility',
      'sta-int': 'Inteligence',
      'sta-cha': 'Charisma',
      'sta-cons': 'Constitution',
      'rules-desc': `The character's name must comply with our rules of coexistence. Any offensive and inappropriate name <1>will be penalized.<1>`,
      'Mage-desc': "Magic oriented class\n\nMages are the main magic class in argentum, they have a good balance between doing damage and adding effect to other but they normally has low hp",
      'validate-code-intro': 'Enter the validation code sent to the email you used for registering.',
      'already-have-code': 'I already have a recovery code',
      'verification-code-input': 'Enter the validation code sent to the email you used for registering.',
      'delete-char-message': `Are you sure you want to delete the character {{charName}} from the account?`,
      'transfer-char-message': `Are you sure you want to transfer the character {{charName}} from the account?`,
      'transfer-character': 'transfer character',
      'dest-email': 'Enter the email of the account to which you want to transfer the character.',
      'Cleric-desc': '',
      'Warrior-desc': '',
      'Assasin-desc': '',
      'Bard-desc': '',
      'Druid-desc': '',
      'Paladin-desc': '',
      'Hunter-desc': '',
      'Worker-desc': '',
      'Pirate-desc': '',
      'Thief-desc': '',
      'Bandit-desc': '',
      'report-bug': "Report\nbugs",
      'spell-use': 'Throw',
      'user-class-and-level': `{{class}} - Level {{level}}`
    }
  },
  es: {
    translation: {
      'log in': 'ingresar',
      "SETTINGS": "Configuración",
      'recovery-mail-hint': `Si no recibiste el email de recuperacion, revisa la carpeta de "Spam".`,
      'recover-password-text': `Ingresa el mail que usaste para crear la cuenta y te enviaremos un codigo de recuperacion`,
      'password-requirements': `La contraseña debe incluyes una mayucula, una minuscula y dos numeros. La contraseña no puede empezar con un numero.`,
      'robot-code': "{{first}} + {{second}} =",
      'connection-failure': `Ha ocurrido un error al conectar con el servidor. Le recomendamos verificar el estado de los servidores en ao20.com.ar, y asegurarse de estar conectado directamente a internet`,
      'connecting-to-server': `Conectandose al servidor`,
      'connection-closed': `Se perdio la conexion con el servidor`,
      'database-error': 'Se produjo un error en la base de datos.',
      'validation-code': `código de validación`,
      'invalid-character-name': 'Nombre de personaje invalido.',
      'newowner-not-exist': 'El destinatario no existe.',
      'invalid-code': 'Codigo invalido.',
      'invalid-request': 'Consulta invalida',
      'invalid-email': 'El email es invalido.',
      'not-char-owner': 'No sos el dueño del personaje.',
      'TRANSFER_CHARACTER_OKAY': 'Personaje transferido correctamente',
      'unknown-error': 'Error desconocido.',
      'locked-in-mao': 'No podes borrar un personaje listado en MAO.',
      'not-patreon': 'Tu cuenta o el destinatario no esta registrado como patreon.',
      'not-enough-credits': 'No tenes suficientes creditos.',
      'invalid-account': 'Cuenta invalida.',
      'invalid-character-owner': 'No sos el dueño del personaje.',
      'delete-char-success': 'El personaje fue borrado correctamente.',
      'resend-code': `Reenviar código de activación`,
      'send': `enviar`,
      'cancel': 'cancelar',
      'set new password': 'Nueva Contraseña',
      'class': `Clase: {{className}}`,
      'level': `Nivel: {{level}}`,
      'Human': 'Humano',
      'Elf': 'Elfo',
      'Drow': 'Elfo Oscuro',
      'Gnome': 'Gnomo',
      'Dwarf': 'Enano',
      'Orc': 'Orco',
      'Mage': 'Mago',
      'Cleric': 'Clerigo',
      'Warrior': 'Guerrero',
      'Assasin': 'Asesino',
      'Bard': 'Bardo',
      'Druid': 'Druida',
      'Paladin': 'Paladin',
      'Hunter': 'Cazador',
      'Worker': 'Trabajador',
      'Pirate': 'Pirata',
      'Thief': 'Ladron',
      'Bandit': 'Bandido',
      'sta-str': 'Fuerza',
      'sta-agi': 'Agilidad',
      'sta-int': 'Inteligencia',
      'sta-cha': 'Carisma',
      'sta-cons': 'Constitucion',
      'rules-desc': 'El nombre del personaje debe cumplir nuestras normas de convivencia. Cualquier nombre ofensivo y desubicado <1>será sancionado.<1>',
      'name': 'nombre',
      'surname': 'apellido',
      'password': 'contraseña',
      'create account': 'crear cuenta',
      'Validate account': 'Validar cuenta',
      'Recover passoword': 'Recuperar contraseña',
      'Rememer me': 'Recordarme',
      'account': 'cuenta',
      'exit': 'salir',
      'connect': 'conectar',
      "recover password": 'recuperar contraseña',
      "Recover password": 'Recuperar contraseña',
      'create character': 'Crear Personaje',
      'play': 'jugar',
      'validation-code-intro': 'Ingrese el código de validación enviado al correo electrónico que utilizó para registrarse.',
      'already-have-code': 'Ya tengo un codigo de recuperacion.',
      'enter recovery code': 'codigo de recuperacion',
      'new password': 'nueva constraseña',
      'confirm new password': 'confirmar nueva contraseña',
      'validate account': 'validar cuenta',
      'character name': 'nombre del personaje',
      'male': 'hombre',
      'female': 'mujer',
      'continue': 'Continuar',
      'accept': 'Aceptar',
      'verification': 'Validacion',
      'verification-code-input': 'Ingresa el código de validación enviado al correo electrónico que utilizaste para registrarte.',
      'delete-char-message': `¿Esta seguro que desea borrar el personaje {{charName}} de la cuenta?`,
      'transfer-char-message': `¿Esta seguro que desea transferir el personaje {{charName}} de la cuenta?`,
      'transfer-character': 'Transferir personaje',
      'dest-email': 'Ingrese el email de la cuenta a la cual quire transferir el personaje',
      'Mage-desc': '',
      'Cleric-desc': '',
      'Warrior-desc': '',
      'Assasin-desc': '',
      'Bard-desc': '',
      'Druid-desc': '',
      'Paladin-desc': '',
      'Hunter-desc': '',
      'Worker-desc': '',
      'Pirate-desc': '',
      'Thief-desc': '',
      'Bandit-desc': '',
      'report-bug': "Reportar\nBugs",
      'spell-use': 'Lanzar',
      'user-class-and-level': `{{class}} - Nivel {{level}}`
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