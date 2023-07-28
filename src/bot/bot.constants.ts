import { Markup } from 'telegraf';

export const AREAS = [
  {
    id: 1,
    alias: 'all',
    name: 'Все чаты',
    usernames: [
      'kohphangan',
      'kophangan',
      'phangan_koh',
      'AvitoPhangan',
      'wheels_phng',
    ],
  },
  {
    id: 2,
    alias: 'phangan',
    name: 'Панган',
    usernames: [
      'kohphangan',
      'kophangan',
      'phangan_koh',
      'AvitoPhangan',
      'wheels_phng',
    ],
  },
  {
    id: 3,
    alias: 'samui',
    name: 'Самуи',
    usernames: ['test2', 'test3'],
  },
];

export const TASKS_SCENE = 'TASKS_SCENE';
export const ACCOUNTS_SCENE = 'ACCOUNTS_SCENE';
export const AREA_SCENE = 'AREA_SCENE';
export const ACCOUNTS_ADD_SCENE = 'ACCOUNTS_ADD_SCENE';
export const WORDS_SCENE = 'WORDS_SCENE';
export const WORDS_ADD_SCENE = 'WORDS_ADD_SCENE';
export const WORKS_SCENE = 'WORKS_SCENE';
export const WORKS_ADD_SCENE = 'WORKS_ADD_SCENE';
export const CHANNELS_SCENE = 'CHANNELS_SCENE';
export const CHANNELS_ADD_SCENE = 'CHANNELS_ADD_SCENE';

export const COMMANDS = {
  START: 'start',
  BACK: 'BACK',
  OK: 'OK',
  CONTINUE: 'CONTINUE',
  START_LISTEN: 'START_LISTEN',
  ADD_TASK: 'ADD_TASK',
};

export const MENU_BUTTONS = {
  ACCOUNTS: { text: 'Аккаунты' },
  AREA: { text: 'Регион работы' },
  WORKS: { text: 'Ключевые слова' },
  WORDS: { text: '➖ Минус-слова' },
  PAYMENT: { text: 'Оплата' },
  CHANNELS: { text: 'Чаты' },

  ACCOUNTS_LIST: { text: '📋 Список игнорируемых аккаунтов' },
  ACCOUNTS_ADD: { text: '➕ Добавить новый' },
  ACCOUNTS_DELETE_ALL: { text: '🗑 Удалить все' },

  WORKS_LIST: { text: '📋 Ключевые слова' },
  WORKS_ADD: { text: '➕ Добавить новое' },
  WORKS_DELETE_ALL: { text: '🗑 Удалить все' },

  WORDS_LIST: { text: '📋 Список моих минус-слов' },
  WORDS_ADD: { text: '➕ Добавить новое' },
  WORDS_DELETE_ALL: { text: '🗑 Удалить все' },

  CHANNELS_LIST: { text: '📋 Список игнорируемых чатов' },
  CHANNELS_ADD: { text: '➕ Добавить игнорируемый чат' },
  CHANNELS_DELETE_ALL: { text: '🗑 Удалить все' },

  BACK_TO_MENU: { text: 'Вернуться в меню' },
  OK: { text: '✅' },
  CANCEL: { text: '⛔️' },
  BACK: { text: '⬅ Назад', callback_data: 'BACK' },
};

export const BUTTONS = {
  BACK: Markup.button.callback('⬅ Назад ️', COMMANDS.BACK),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  NO: Markup.button.callback('⛔️', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ продолжить', COMMANDS.CONTINUE),
  START_LISTEN: Markup.button.callback(
    '👂 Начать cлушать чаты',
    COMMANDS.START_LISTEN
  ),
  ADD_TASK: Markup.button.callback('➕ Добавить новую задачу', 'ADD_TASK'),
};

export const TEXTS = {
  MAIN: {
    WELCOME:
      'Приветственное сообщение. Тут показываем какую-то общую инфу, отправляем внизу кнопки меню и говорим пользователю куда жать',
  },
  TASKS: {
    MAIN_ADD: `Добавьте новую задачу, введите название в сообщении, например: Ноготочки на Пангане 💅. 
    Название задачи видно только вам и нужно, чтобы облегчить навигацию между различными услугами, которые вы предоставляете`,
    LIST: `Список ваших задач. Выберите любую, нажав на кнопку "↩️"`,
  },
  AREA: {
    LIST: 'Выберите регион работы',
  },
  ACCOUNTS: {
    LIST: `Список игнорируемых аккаунтов. Вы можете удалить любой из них, нажав на кнопку "↩️"`,
    MAIN: `В данном меню вы можете управлять аккаунтами, сообщения из которых должны игнорироваться`,
    ADD: `Добавьте игнорируемые аккаунты. Отправте сообщение содержащие ID без знака @`,
    DELETE: `Вы уверены, что хотите удалить все игнорируемые аккаунты?`,
  },
  WORKS: {
    LIST: `Список слов которые бот будет искать в чатах. Вы можете удалить их, нажав на кнопку "↩️"`,
    MAIN: `В данном меню вы можете управлять ключевыми словами и фразами, которые бот будет искать в чатах`,
    ADD: `Добавьте слова или фразы, по одному или массово (каждое с новой строки), до 25 штук`,
    DELETE: `Вы уверены, что хотите удалить все записи?`,
  },
  WORDS: {
    LIST: `Вот список ваших минус-слов. Вы можете удалить их, нажав на кнопку "↩️"`,
    MAIN: `В данном меню вы можете управлять минус словами/фразами, чтобы бот не присылал ненужные сообщения`,
    ADD: `Добавьте минус-слова или фразы, по одному или массово (каждое с новой строки), до 50 штук. Это нужно, чтобы отсеивать мусор. Если бот будет встречать их в сообщении, то он не будет присылать эти сообщения. 
    Например, если вам приходят сообщения со словом "Предлагаю свои услуги по...", а вы хотите скрыть их, то можете добавить минус-слово "Предлагаю". Но используйте эту функцию вдумчиво, чтобы не отфильтровать полезные сообщения!`,
    DELETE: `Вы уверены, что хотите удалить все минус-слова?`,
  },
  CHANNELS: {
    LIST: `Список игнорируемых каналов. Вы можете удалить любой из них, нажав на кнопку "↩️"`,
    MAIN: `В данном меню вы можете управлять каналами, сообщения из которых должны игнорироваться`,
    ADD: `Добавьте игнорируемые чаты. Отправте сообщение содержащие ID без знака @`,
    DELETE: `Вы уверены, что хотите удалить все игнорируемые каналы?`,
  },
};

export const MENUS = {
  MAIN_MENU: [
    [MENU_BUTTONS.AREA, MENU_BUTTONS.WORKS],
    [MENU_BUTTONS.ACCOUNTS, MENU_BUTTONS.WORDS],
    [MENU_BUTTONS.CHANNELS, MENU_BUTTONS.PAYMENT],
  ],
  ACCOUNTS_MENU: [
    [MENU_BUTTONS.ACCOUNTS_LIST],
    [MENU_BUTTONS.ACCOUNTS_ADD, MENU_BUTTONS.ACCOUNTS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
  WORKS_MENU: [
    [MENU_BUTTONS.WORKS_LIST],
    [MENU_BUTTONS.WORKS_ADD, MENU_BUTTONS.WORKS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
  WORDS_MENU: [
    [MENU_BUTTONS.WORDS_LIST],
    [MENU_BUTTONS.WORDS_ADD, MENU_BUTTONS.WORDS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
  CHANNELS_MENU: [
    [MENU_BUTTONS.CHANNELS_LIST],
    [MENU_BUTTONS.CHANNELS_ADD, MENU_BUTTONS.CHANNELS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
};

// 'bike',
// 'байк',
// 'скутер',
// 'мотоцикл',
// 'мопед',
// 'мот',
// 'pcx',
// 'nmax',
// 'xmax',
// 'forza',
// 'click',
// 'нмакс',
// 'дрон',
// 'drone',
