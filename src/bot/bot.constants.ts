import { Markup } from 'telegraf';

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
  TASKS: { text: '🕵️ Управление прослушкой' },
  ACCOUNTS: { text: 'Аккаунты' },
  AREA: { text: 'Регион работы' },
  WORKS: { text: 'Ключевые слова' },
  WORDS: { text: '➖ Минус-слова' },
  PAYMENT: { text: '💸 Оплата' },
  CHANNELS: { text: 'Чаты' },
  SUPPORT: { text: '🙋‍♂️ Поддержка' },
  MAIN_MENU: { text: '🏠 Главное меню' },

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
    '👂 Слушать бесплатно',
    COMMANDS.START_LISTEN
  ),
  ADD_TASK: Markup.button.callback('➕ Добавить новую задачу', 'ADD_TASK'),
};

export const TEXTS = {
  MAIN: {
    WELCOME: `Привет! Я ваш универсальный бот-помощник в поиске информации 🕵🏼‍♀️ 
    \nМоя основная задача – слушать важные для вас запросы в telegram и незамедлительно сообщать в сообщениях. Я помогу найти новых клиентов и постоянные заказы в Таиланде. 
    \nНажмите кнопку ниже, чтобы начать прослушку.
      `,
    MAIN_MENU: 'Для навигации по разделам воспользуйтесь меню под клавиатурой',
  },
  TASKS: {
    MAIN_ADD: `Я готов к работе! Давайте настроим первую задачу. Придумайте имя задаче и введите его в поле ниже, например: “Мопеды Самуи”, “Аренда домов”, или “Маникюр Панган”`,
    LIST: `Список ваших задач. Выберите любую, нажав на кнопку "↩️"`,
    TASK_MENU: (taskName) =>
      `Вы выбрали задачу ${taskName}. Для настройки воспользуйтесь меню под клавиатурой`,
    PRESET_LIST: `Остался последний шаг! Выберите ключевые слова, которые подходят под ваш запрос:`,
    SHOW: `Вы в кабинете управления и статистики задачи. Тут вы можешь настроить основные критерии прослушки: 
    \nКлючевые слова –  по этим словам в чатах будут находиться сообщения и высылаться вам, 
    \nВыбор региона –  в этом регионе будет осуществляться поиск, регионы можно менять, либо вы можете создать несколько задач с разными регионами, 
    \nМинус слова –  сообщения с этими словами не будут вам отправляться,  
    \nМинус чаты –  сообщения из этих чатов не будут вам присылаться. Важно! Название чата необходимо писать,
    \nМинус пользователи  – сообщения от этих пользователей не будут вам присылаться. Это могут быть ваши конкуренты. Имя пользователя необходимо писать ,
    \nЧтобы создать новую задачу – перейдите в главное меню.
    `,
    CREATED: `Поздравляю! Вы только что настроили ключевые слова в сообщениях и регион для прослушки. Я готов выслать вам все новые сообщения по этим параметрам в режиме реального времени. Параметры уже сохранены как отдельная задача, которую можно дополнительно настроить, нажав на кнопку “Управление задачей”. 
    \nОсталось только нажать кнопку “Начать прослушку бесплатно”.
    \nЯ дарю вам неделю бесплатной прослушки, чтобы было время убедиться в эффективности моей работы. Не забывайте, всегда можно настроить задачу, нажав на кнопку “Управление задачей”
    `,
  },
  AREA: {
    LIST: 'Отлично! Теперь выберите регион прослушки:',
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
    [MENU_BUTTONS.TASKS],
    [MENU_BUTTONS.SUPPORT, MENU_BUTTONS.PAYMENT],
  ],
  TASK_MENU: [
    [MENU_BUTTONS.AREA, MENU_BUTTONS.WORKS],
    [MENU_BUTTONS.ACCOUNTS, MENU_BUTTONS.WORDS],
    [MENU_BUTTONS.CHANNELS, MENU_BUTTONS.MAIN_MENU],
  ],
  ACCOUNTS_MENU: [
    [MENU_BUTTONS.ACCOUNTS_ADD, MENU_BUTTONS.ACCOUNTS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
  WORKS_MENU: [
    [MENU_BUTTONS.WORKS_ADD, MENU_BUTTONS.WORKS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
  WORDS_MENU: [
    [MENU_BUTTONS.WORDS_ADD, MENU_BUTTONS.WORDS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
  CHANNELS_MENU: [
    [MENU_BUTTONS.CHANNELS_ADD, MENU_BUTTONS.CHANNELS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
};

export const AREAS = [
  {
    id: 1,
    alias: 'all',
    name: 'Все регионы',
    usernames: [
      'kohphangan',
      'kophangan',
      'phangan_koh',
      'AvitoPhangan',
      'wheels_phng',
      'test978678967868',
      'KohPhangan',
      'kophanganwithlove',
      'khopangan',
      'test78479847983',
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
      'test978678967868',
      'KohPhangan',
      'kophanganwithlove',
      'khopangan',
    ],
  },
  {
    id: 3,
    alias: 'samui',
    name: 'Самуи',
    usernames: ['test78479847983'],
  },
  {
    id: 4,
    alias: 'phuket',
    name: 'Пхукет',
    usernames: ['test2', 'test3'],
  },
  {
    id: 5,
    alias: 'chiangmai',
    name: 'Чианг Май',
    usernames: ['test2', 'test3'],
  },
  {
    id: 6,
    alias: 'bangkok',
    name: 'Бангкок',
    usernames: ['test2', 'test3'],
  },
];

export const PRESETS = [
  {
    id: 1,
    alias: 'preset_1',
    name: 'Bikes',
    words: [
      'bike',
      'байк',
      'скутер',
      'мотоцикл',
      'мопед',
      'мот',
      'pcx',
      'nmax',
      'xmax',
      'forza',
      'click',
      'нмакс',
      'дрон',
      'felano',
      'drone',
    ],
    minus_words: [],
  },
  {
    id: 2,
    alias: 'preset_2',
    name: 'Test 2',
    words: ['test14', 'test24', 'test3'],
    minus_words: [],
  },
  {
    id: 3,
    alias: 'preset_3',
    name: 'Test 3',
    words: ['tes123t1', 'test32', 'tes2t3'],
    minus_words: [],
  },
  {
    id: 4,
    alias: 'preset_4',
    name: 'Без пресета',
    words: [],
    minus_words: [],
  },
];
