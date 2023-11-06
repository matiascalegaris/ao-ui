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
      'validate-code-intro': 'Enter the validation code sent to the email you used for registering.',
      'already-have-code': 'I already have a recovery code',
      'verification-code-input': 'Enter the validation code sent to the email you used for registering.',
      'delete-char-message': `Are you sure you want to delete the character {{charName}} from the account?`,
      'transfer-char-message': `Are you sure you want to transfer the character {{charName}} from the account?`,
      'transfer-character': 'transfer character',
      'dest-email': 'Enter the email of the account to which you want to transfer the character.',
      'Mage-desc': 'Skilled in the use of arcane arts. Possesses the largest amount of mana in the world.\n\nHas a wide variety of long-range spells and incredible magical power, with which they are capable of defeating even the most formidable foes.',
      'Cleric-desc': 'The most versatile class within the vast world of Argentum.\n\nCapable of combining powerful physical strikes with a good amount of magical damage.\nBlessed with the priestly gift, they can resurrect their allies without needing a magical channeler.',
      'Warrior-desc': 'Master in combat with weapons.\n\nAlmost as skilled as the Hunter in terms of ranged combat. Similarly, they lack magical knowledge, but still, nothing will stop their formidable defense; their great strength and ferocity in battle.\nMore lethal than any other.',
      'Assasin-desc': 'Skilled in the use of daggers.\n\nWith their great skill in the art of stabbing, they are capable of piercing even the strongest armor and leaving even the healthiest opponents trembling or even finishing them off in combination with a simple spell.',
      'Bard-desc': 'Stands out for using daggers to combine the art of stabbing with magic.\n\nUnlike the Cleric, they have various catalysts to enhance their magical damage.\nAmong their qualities are evasion and shield blocking.',
      'Druid-desc': 'Possesses extensive magical knowledge that gives them great power.\n\nAccustomed to moving through nature, they can train the most diverse and majestic beasts, who are willing to face even the wildest and most monstrous abominations.',
      'Paladin-desc': 'Specialist in close-quarters combat.\n\nThey have outstanding physical damage that, combined with their limited magical knowledge, make them one of the most versatile classes, capable of facing anyone or anything that dares to consider themselves a worthy opponent.',
      'Hunter-desc': 'Always accompanied by their loyal and great friend, the bow. Specialized in long-range combat, they can inflict great amounts of damage while remaining hidden and undetected.\n\nUnlike most classes, they lack magical knowledge.\nFortunately, they have access to training areas where even the most powerful magic cannot reach them.',
      'Worker-desc': 'The noble artisan class.\n\nThey are the main exporter of raw materials, providing for most of the population.\nThey are poorly prepared for combat but are still capable of performing all kinds of tasks such as logging, fishing, mining, tailoring, carpentry, blacksmithing, or even all of them.\nOver time, they have acquired enough knowledge to move comfortably through the main caverns from where they extract their resources. Additionally, they have the ingenuity and use of some of their tools to catch those who try to take over their valuable resources.',
      'Pirate-desc': 'The king of the 7 seas, knows them like the back of their hand.\n\nWith their Galleon, they can move at maximum speed and inflict even more damage than anyone else across the wide sea.\nThey are adept in both weapon and long-range combat, but they stand out especially in the use of firearms.\nThey completely lack magical knowledge.',
      'Thief-desc': 'Renowned in the richest neighborhoods of different cities, where they are popular for their looting skills. Moving undetected, they are even capable of leaving you breathless.\nCompletely disregards and ignores what others dare to call "magic".',
      'Bandit-desc': 'Master in the art of stealth.\n\n It is the only class capable of moving completely hidden in the shadows, escaping the sight of the simplest mortals.\n Its main characteristic is to fight hand-to-hand, inflicting powerful critical blows that will leave anyone who dares to stand in their way dancing with death.',
      'report-bug': "Report\nbugs",
      'spell-use': 'Throw',
      'user-class-and-level': `{{class}} - Level  {{level}}`,
      'max-level-exp': 'Max level!',
      'keys': 'Keys',
      'delete-item-message': 'Are you sure you wnat to delete {{itemName}}',
      'send-private-message': "Please enter the username with whom you'd like to start a private conversation.",
      'cant-use-reason-1': 'Your gender cannot use it!',
      'cant-use-reason-2': 'Your class cannot use it!',
      'cant-use-reason-3': 'Your faction prohibits you from using this item!',
      'cant-use-reason-4': 'You do not have enough skills to use it!',
      'cant-use-reason-5': 'Your race cannot use it!',
      'cant-use-reason-6': 'You do not have a high enough level!',
      'throw-spells': 'Throw spells',
      'no-Lock': "Don't Lock",
      'lock-throw': "Lock on release",
      'lock-cast': "Lock on Cast",
      'graphic-cursor' : 'Use rendered cursor',
      'interface-language' : 'Language',
      'other': 'Other',
      'Npc-text': 'Npcs Text',
      'Tutorial': 'Tutorial',
      'text': 'Text',
      'rendered': 'Rendered',
      'Disabled': 'Disabled',
      'Enabled': 'Enabled',
      'block-spell-list-scroll': 'Block spell list scroll',
      'copy-terminal': 'Copy dialogs to terminal',
      'write-and-move': 'Move while writting',
      'fight': 'fight',
      'mouse-sens': 'Mouse sensitivity',
      'change-keysettings': 'Change Keys',
      'music': 'Music',
      'fx': 'Effects',
      'ambient': 'Ambient',
      'navigationFx': 'Navigations FX',
      'invertLR': 'Invert L / R channels',
      'showFps': 'Show Fps',
      'moveGameWindow': 'Move game window',
      'characterBreading': 'Character breading',
      'fullScreen': 'Fullscreen',
      'floorItemInfo': 'Floor item info',
      'fullInventoryNumber': 'Display full number on inventory',
      'clan-information': 'Clan information',
      'founder': 'Founder',
      'creation-date': 'Creation date',
      'leader': 'Leader',
      'members': 'Members',
      'alignment': 'Alignment',
      'clan-level': 'Clan level',
      'admission-application': 'Admission application',
      'request-admission': 'Request admission',
      'reload-character-warning': 'For safety, reload your character after the transaction is complete.',
      'decline': 'decline',
      'search': 'Search',
      'credits': 'Credits',
      'details': 'Details',
      'enableExperimentalUI': "Use experimental interface",
      'must-restart-for-changes': "You must restart the game for the changes to take effect.",
      'time-light': "Time light",
      'day': 'Day',
      'night': 'Night',
      'light-state': "Lighting",
      'event-description': 'Description',
      'event-type': 'Type',
      'group-size': 'Group size',
      'level-range': 'Level range',
      'max-players': 'Players',
      'incription-price': 'incription fee',
      'join': 'Join',
      'create-new': 'create new',
      'event-list': 'available battlegrounds',
      'teams-type': 'Teams type',
      'random': 'Random teams',
      'premade': 'Premade teams',
      'team-size': 'team size',
      'private-match': 'private match',
      'invalid-team-size': 'Min and Max players has to be multiple of the team size',
      'request-password': 'Request password',
      'request-lobby-password': 'Insert password  to join',
      'create-event': 'create battleground',
      'skill-list': 'Skills',
      'combat skills': 'Combat skills',
      'other skills': 'Other skills',
      'availableskills': 'Available skills:',
      'experience': "Experience",
      'clan-exp': "Clan Exp",
      'no-npc-found': 'there are no npc in this map',
      'npc-search': 'find npc'
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
      'Mage-desc': 'Versado en el uso de las artes arcanas. Es poseedor de la mayor cantidad de maná en el mundo.\n\nCuenta con una gran variedad de hechizos de largo alcance y un increíble poderío mágico, con el cual es capaz de abatir hasta a los adversarios más temibles.',
      'Cleric-desc': 'La clase más versátil dentro de todo el vasto mundo de Argentum.\n\n Es capaz de combinar potentes golpes físicos junto con una buena cantidad de daño mágico.\nBendito con el don sacerdotal, es capaz de resucitar a sus aliados sin necesidad de contar con un canalizador mágico.',
      'Warrior-desc': 'Sumo maestro en el combate con armas.\n\nCasi tan dotado como el cazador en cuanto a lo que combate a distancia se refiere. De igual forma, carece de conocimientos mágicos pero aún así, nada detendrá a su formidable defensa; su gran fuerza y su ferocidad en la batalla.\nMás letal que ningún otro.',
      'Assasin-desc': 'Dotado en el uso de las dagas.\n\nCon su gran destreza en el arte de apuñalar, es capaz de atravesar las armaduras más férreas y dejar tiritando o incluso y en combinación de un simple hechizo, acabar con aquellos, los más sanos.',
      'Bard-desc': 'Se destaca por utilizar dagas para combinar el arte de apuñalar con la magia.\n\nA diferencia del Clérigo, cuenta con diversos catalizadores para potenciar su daño mágico.\nEntre sus cualidades se incluyen la evasión y el bloqueo con escudos.',
      'Druid-desc': 'Posee amplios conocimientos mágicos que lo dotan de un gran poder.\n\nHabituado a moverse entre la naturaleza, es capaz de adiestrar a fieras de lo más diversas y majestuosas, quienes estarán dispuestas a enfrentarse incluso contra las más salvajes y monstruosas abominaciones.',
      'Paladin-desc': 'specialista en el combate con armas cuerpo a cuerpo.\n\nCuenta con un sobresaliente daño físico que, y en combinación de su limitado conocimiento mágico, lo convierten en una de las clases más versátiles al ser capaz de hacer frente a aquel o aquello que se atreva a considerarse un digno adversario.',
      'Hunter-desc': 'Siempre acompañado de su fiel y gran amigo, el arco. Especializado en el combate a distancia, es capaz de infligir grandes cantidades de daño mientras permanece oculto sin ser detectado.\n\nA diferencia de la mayoría de las clases, carece de conocimientos mágicos.\nPara su fortuna, cuenta con acceso a zonas de entrenamiento donde ni la magia más poderosa podrá alcanzarlo.',
      'Worker-desc': 'La noble clase artesana.\n\nEs el máximo exportador de materia prima ya que provee a la mayoría de los pobladores.\nEstá poco preparado para el combate pero aún así es capaz de realizar todo tipo de oficios como la tala; la pesca; la minería; la sastrería; la carpintería, la herrería o incluso todas ellas.\nCon el tiempo adquirió los conocimientos suficientes para moverse cómodamente por el interior de las principales cavernas de donde extrae sus recursos. Además, cuenta con el ingenio suficiente y utiliza alguna de sus herramientas para apresar a quienes intentan apoderarse de sus tan valiosos recursos.',
      'Pirate-desc': 'El rey de los 7 mares, los conoce como a la palma de su mano.\n\nCon su Galeón, es capaz de moverse a máxima velocidad e infligir incluso más daño que cualquier otro en todo el ancho mar.\nEs diestro tanto en combate con armas como en combate a distancia, aunque se destaca especialmente en el uso de armas de fuego.\nCarece por completo de conocimientos mágicos.',
      'Thief-desc': 'Reconocido en los barrios más ricos de las distintas ciudades, donde es popular por su habilidad de saquear. Moviéndose sin ser detectado, es capaz incluso de dejarte sin aliento.\nDesentiende y desconoce por completo aquello a lo que otros osan llamar “magia”.',
      'Bandit-desc': 'Maestro en el arte del sigilo.\n\n Es la única clase capaz de moverse completamente oculto entre las sombras, escapando a la vista de los más simples mortales.\nSu característica principal es la de combatir a puño cerrado, infligiendo poderosos golpes críticos que dejarán bailando con la muerte a cualquiera que se atreva a interponerse en su camino.',
      'report-bug': "Reportar\nBugs",
      'spell-use': 'Lanzar',
      'user-class-and-level': `{{class}} - Nivel  {{level}}`,
      'max-level-exp': '¡Nivel máximo!',
      'keys': 'Llaves',
      'stats': 'estadisticas',
      'inventory': 'inventario',
      'spells': 'hechizos',
      'delete-item-message': 'Estas seguro que deseas eliminar {{itemName}}',
      'send-private-message': 'Escriba el usuario con el que desea iniciar una conversación privada.',
      'cant-use-reason-1': 'Tu genero no puede usarlo!',
      'cant-use-reason-2': 'Tu clase no puede usarlo!',
      'cant-use-reason-3': 'Tu faccion te prohibe usar este objeto!',
      'cant-use-reason-4': 'No tienes suficientes skills para usarlo!',
      'cant-use-reason-5': 'Tu raza no puede usarlo!',
      'cant-use-reason-6': 'No tienes suficiente nivel!',
      'merchant': 'comerciante',
      'buy': 'comprar',
      'sell': 'vender',
      'offer': 'oferta',
      'throw-spells': 'Lanzar hechizos',
      'no-Lock': "Sin bloqueo",
      'lock-throw': "Bloqueo en soltar",
      'lock-cast': "Bloqueo al lanzar",
      'graphic-cursor' : 'Usar cursores graficos',
      'interface-language' : 'Idioma de la interfaz',
      'other': 'Otros',
      'Npc-text': 'Texto Npcs',
      'Tutorial': 'Tutorial',
      'text': 'Texto',
      'rendered': 'Renderizado',
      'Disabled': 'Desactivado',
      'Enabled': 'Activado',
      'block-spell-list-scroll': 'Bloquear scroll de lista de hechizos',
      'copy-terminal': 'Copiar dialogos a consola',
      'write-and-move': 'Moverse al escribir',
      'fight': 'Lucha',
      'mouse-sens': 'Sensibilidad del mouse',
      'change-keysettings': 'Configurar teclas',
      'music': 'Musica',
      'fx': 'Efectos',
      'ambient': 'Ambiente',
      'navigationFx': 'Efectos de navegacion',
      'invertLR': 'Invertir canales L / R',
      'showFps': 'Mostrar Fps',
      'moveGameWindow': 'Mover ventana del juego',
      'characterBreading': 'Respiracion de personajes',
      'fullScreen': 'Pantalla completa',
      'floorItemInfo': 'Informacion de items en el suelo',
      'fullInventoryNumber': 'Mostrar numeros completos en el inventario',
      'clan-information': 'Información del clan',
      'founder': 'Fundador',
      'creation-date': 'Fecha de creación',
      'leader': 'Líder',
      'members': 'Miembros',
      'alignment': 'Alineación',
      'clan-level': 'Nivel del clan',
      'admission-application': 'Solicitud de ingreso',
      'request-admission': 'Solicitar ingreso',
      'reload-character-warning': 'Una vez realizada la transaccion, reloguee su personaje por seguridad.',
      'deny': 'Rechazar',
      'credits': 'Créditos',
      'Amount': 'Cantidad',
      'decline': 'Rechazar',
      'search': 'Buscar',
      'details': 'Detalles',
      'price': 'Precio',
      'enableExperimentalUI': "Usar interfaz experimental",
      'must-restart-for-changes': "Deberas reiniciar el juego para que los cambios tengan efecto.",
      'time-light': "Luz horaria",
      'day': 'Día',
      'night': 'Noche',
      'light-state': "Iluminacion",
      'event-description': 'Descripcion',
      'event-type': 'Tipo',
      'group-size': 'Tamaño de grupo',
      'level-range': 'Limite de nivel',
      'max-players': 'Jugadores',
      'incription-price': 'Costo de inscripcion',
      'join': 'Ingresar',
      'create-new': 'Crear nuevo',
      'event-list': 'Battlegrounds disponibles',
      'teams-type': 'Formato de Equipos',
      'random': 'Aleatoreos',
      'premade': 'Grupos',
      'team-size': 'Tamaño de equipos',
      'private-match': 'Partida privada',
      'invalid-team-size': 'La cantidad maxima y minima de jugadores debe ser divisible por el tamaño del equipo',
      'request-password': 'Pedir contraseña',
      'request-lobby-password': 'Ingrese la contraseña para ingresar',
      'create': 'crear',
      'create-event': 'crear battleground',
      'Magic': 'Magia',
      'Meditatation': 'Meditar',
      'Magic resistance': 'Resistencia magica',
      'Combat dexterity': 'Destreza en combate',
      'Unarmed combat': 'Combate sin armas',
      'Armed combat': 'Combate con armas',
      'Shield defence': 'Defensa con escudos',
      'Ranged weapons': 'Armas a distancia',
      'Stabbing': 'Apuñalar',
      'Stealing': 'Robar',
      'Logging': 'Talar',
      'Fishing': 'Pesca',
      'Mining': 'Mineria',
      'Carpentry': 'Carpinteria',
      'Smithy': 'Herreria',
      'Hiding': 'Ocultarse',
      'Survival': 'Supervivencia',
      'Commerce': 'Comercio',
      'Leadership': 'Liderazgo',
      'Taming': 'Doma de animales',
      'Sailing': 'Navegacion',
      'Tailoring': 'Sastreria',
      'skill-list': 'Skills',
      'combat skills': 'Habilidades de combate',
      'other skills': 'Otras habilidades',
      'availableskills': 'Puntos disponibles:',
      'experience': "Experiencia",
      'clan-exp': "Experiencia de clan",
      'no-npc-found': "No se encontraron npc en este mapa",
      'npc-search': "buscar npc",
      'Continent': 'Continente',
      'Search zone': 'Buscar mapa',
      'Current zone': 'Mapa seleccionado',
      'Details': 'Detalles',
      'Search NPC': 'Buscar NPC',
      'Markers': 'Indicadores',
      'Map numbers': 'Número de mapa',
      'Safe-unsafe': 'Seguro / Inseguro',
      'world map': 'mapa del mundo',
      'map' : 'mapa',
      'amount': 'cantidad',
      'disableDungeonLighting': "Desactivar oscuridad en dungeons"
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