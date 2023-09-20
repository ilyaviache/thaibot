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
  NO: 'CANCEL',
  CANCEL: 'CANCEL',
  CONTINUE: 'CONTINUE',
  START_LISTEN: 'START_LISTEN',
  ADD_TASK: 'ADD_TASK',
};

export const MENU_BUTTONS = {
  TASKS: { text: '🕵️ Управление прослушкой' },
  ACCOUNTS: { text: '🚫 Стоп аккаунты' },
  AREA: { text: '🏝 Регион работы' },
  WORKS: { text: '❇️ Ключевые слова' },
  WORDS: { text: '🚫 Стоп фразы' },
  PAYMENT: { text: '💸 Оплата' },
  CHANNELS: { text: '🚫 Стоп чаты' },
  SUPPORT: { text: '🙋‍♂️ Поддержка' },
  MAIN_MENU: { text: '🏠 Главное меню' },

  ACCOUNTS_LIST: { text: '📋 Список игнорируемых аккаунтов' },
  ACCOUNTS_ADD: { text: '➕ Добавить новый' },
  ACCOUNTS_DELETE_ALL: { text: '🗑 Удалить все' },

  WORKS_LIST: { text: '📋 Ключевые слова' },
  WORKS_ADD: { text: '➕ Добавить новое' },
  WORKS_DELETE_ALL: { text: '🗑 Удалить все' },

  WORDS_LIST: { text: '📋 Список игнорируемых фраз' },
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
  NO: Markup.button.callback('⛔️', COMMANDS.NO),
  CANCEL: Markup.button.callback('⛔️', COMMANDS.CANCEL),
  CONTINUE: Markup.button.callback('➡️ продолжить', COMMANDS.CONTINUE),
  START_LISTEN: Markup.button.callback(
    '👂 Слушать бесплатно',
    COMMANDS.START_LISTEN
  ),
  ADD_TASK: Markup.button.callback('➕ Добавить новую задачу', 'ADD_TASK'),
};

export const TEXTS = {
  MAIN: {
    WELCOME: `🕵🏼‍♀️ Привет! Я ваш универсальный бот-помощник в поиске заинтересованных клиентов  
    \n🤯 Я слушаю сразу более 130 чатов в Таиланде и проверяю каждое новое сообщени от пользователей на наличие нужных вам ключевых слов  
    \n📨 Как только кто-то напишет нуные вам ключевые слова, например, "Подскажите где лучше снять байк на Пхукете" то я мгновенно перешлю сообщение и дополнительные данные в этот чат
    \n🤑 Первый месяц работы бота бесплатный, следующий месяц стоит всего 900 бат. 
    \n🔨 Вы можете начать пользоваться ботом прямо сейчас, указав интересующий вас регион и сферу деятельносити. Настройка займет не больше 20 секунд. 
    \nДля использования бота не требуется вводить данные карты и любые другие персональные данные, мы даже не узнаем кто вы, а если вам не понравится результат работы, то сделаем вид, что вообще не знакомы 😎
    \nНажмите кнопку ниже, чтобы начать прослушку
      `,
    MAIN_MENU: 'Для навигации по разделам воспользуйтесь меню под клавиатурой. \nВ случае проблем с использованием бота, обновите сессию отправив комманду /start',
    SUPPORT: 'Страница поддержки',
    PAYMENT: 'Страница оплаты',
    START: `Привет! Я ваш универсальный бот-помощник в поиске заинтересованных клиентов 🕵🏼‍♀️
    \nВаши задачи для прослушивания работают 24/7 🧑‍💼
    \nНиже можете отредактировать задачи или создать новую
    `,
    ERROR: `Извините, но я не понимаю вас. Может быть дело во мне, а может и вас. Но не будем искать виноватых, непонимание случаются, а отношенеия всегда сложно, даже с телеграм-ботом.
    \n Воспользуйтесь меню под клавиатурой, чтобы начать все сначала или напишите в поддержку, если у вас возникли проблемы с использованием бота`,
  },
  TASKS: {
    MAIN_ADD: `Я готов к работе! Давайте настроим первую задачу. Придумайте имя задаче и введите его в поле ниже, например: “Мопеды Самуи”, “Аренда домов”, или “Маникюр Панган”`,
    LIST: `Список ваших задач. Выберите любую, нажав на кнопку "↩️"`,
    REMOVE: `Вы уверены, что хотите удалить задачу? Все данные и история подслушанных будут удалены безвозвратно.`,
    TASK_MENU: (taskName) =>
      `Вы выбрали задачу ${taskName}. Для настройки воспользуйтесь меню под клавиатурой`,
    PRESET_LIST: `Остался последний шаг! Выберите ключевые слова, которые подходят под ваш запрос:`,
    SHOW: `Вы в кабинете управления задачи. Тут вы можете настроить основные критерии прослушки:  
    \n❇️ Ключевые слова–  по этим словам в чатах будут находиться сообщения и высылаться вам, 
    \n🏝 Регион работы –  в этом регионе будет осуществляться поиск, регионы можно менять, либо вы можете создать несколько задач с разными регионами, 
    \n🚫 Стоп фразы –  сообщения с этими словами/фразами не будут вам отправляться,  
    \n🚫 Стоп чаты  –  сообщения из этих чатов не будут вам присылаться. Важно! Название чата необходимо писать,
    \n🚫 Стоп аккаунты – сообщения от этих пользователей не будут вам присылаться. Это могут быть ваши конкуренты. Имя пользователя необходимо писать ,
    \nЧтобы создать новую задачу – перейдите в главное меню.
    `,
    CREATED: `Поздравляю! Вы только что настроили ключевые слова в сообщениях и регион для прослушки. Я готов выслать вам все новые сообщения по этим параметрам в режиме реального времени. Параметры уже сохранены как отдельная задача, которую можно дополнительно настроить, нажав на кнопку “Управление задачей”. 
    \nЧтобы посмотреть настройки задачи и внести изменения, нажмите на кнопку ниже. Мы советуем первым делом проверить и дополнить список ключевых слов, даже если вы выбрали готовый пресет.
    \n🤝 Мы надеемся что этот инструмент поможет вам найти новых клиентов, удачи!
    `,
    NO_MESSAGES: `С момента старта задачи еще не было перехваченных сообщений. Если поиск не дает результатов, то попробуйте изменить ключевые слова и проверьте список игнорируемыъ чатов, слов и пользователей. Вы также всегда можете написать в поддержку и мы поможем вам решить проблему`,
    STATS: (daysCount = 0, messagesCount) =>
      `Задача активна дней: ${daysCount} 🗓️
      \nНайденно сообщений: ${messagesCount} 📨
      \nЕсли поиск не дает результатов, то попробуйте изменить ключевые слова и проверьте список игнорируемыъ чатов, слов и пользователей`,
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
    MAIN: `В данном меню вы можете управлять ключевыми словами и фразами, которые бот будет искать в чатах. Например, если вы хотите найти клиентов для аренды байков, то можете добавить ключевые слова "байк", "ищу скутер", "мотоцикл" и т.д.`,
    ADD: `Добавьте слова или фразы, вы можете отправить сразу несколько, разделив их запятой. Максимальное количество слов или фраз для одной задачи - 25`,
    DELETE: `Вы уверены, что хотите удалить все записи?`,
  },
  WORDS: {
    LIST: `Список ваших стоп слов или фраз. Вы можете удалить их, нажав на кнопку "↩️"`,
    MAIN: `В данном меню вы можете управлять стоп словами/фразами, чтобы бот не присылал ненужные сообщения. Например, если вам приходят сообщения со словом "Предлагаю свои услуги по...", а вы хотите скрыть их, то можете добавить стоп слово "Предлагаю". Но используйте эту функцию вдумчиво, чтобы не отфильтровать полезные сообщения!`,
    ADD: `Добавьте стоп слова или фразы, по одному или массово через запятую, до 50 штук. Это нужно, чтобы отсеивать мусор. Если бот будет встречать их в сообщении, то он не будет присылать эти сообщения. 
    Например, если вам приходят сообщения со словом "Предлагаю свои услуги по...", а вы хотите скрыть их, то можете добавить стоп слово "Предлагаю". Но используйте эту функцию вдумчиво, чтобы не отфильтровать полезные сообщения!`,
    DELETE: `Вы уверены, что хотите удалить все стоп слова?`,
  },
  CHANNELS: {
    LIST: `Список игнорируемых чатов. Вы можете удалить любой из них, нажав на кнопку "↩️"`,
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
      'wheels_phng',
      'test978678967868',
      'KohPhangan',
      'kophanganwithlove',
      'khopangan',
      'test78479847983',
      'baraholka_phangan',
      'pangan4',
      'WomanPhuket',
      'adssamui',
      'phanganevents',
      'carphangan',
      'PhanganFriends2',
      'KohPhanganChat',
      'ActivePangan',
      'phangan_relocation',
      'PhanganAvito',
      'phngn',
      'AvitoSamui',
      'PanganWoman',
      'khopangan',
      'afishaphuket',
      'NetworkPhuket',
      'AfishaPanganSamui',
      'phuket_help_chat',
      'phanganvse',
      'Cozy_Rentals',
      'AfishaPattaya',
      'https://t.me/SamuiGroup',
      'https://t.me/SamuiAds',
      'https://t.me/Samui_Friends',
      'https://t.me/kosamui',
      'https://t.me/samuipar',
      'https://t.me/samui0',
      'https://t.me/samui5',
      'https://t.me/SamuiChatik',
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
      'test978678967868',
      'KohPhangan',
      'kophanganwithlove',
      'khopangan',
      'baraholka_phangan',
      'pangan4',
      'phanganevents',
      'carphangan',
      'PhanganFriends2',
      'KohPhanganChat',
      'ActivePangan',
      'phangan_relocation',
      'PhanganAvito',
      'phngn',
      'PanganWoman',
      'khopangan',
      'AfishaPanganSamui',
      'phanganvse',
    ],
  },
  {
    id: 3,
    alias: 'samui',
    name: 'Самуи',
    usernames: [
      'test78479847983',
      'adssamui',
      'WomanPhuket',
      'ActivePangan',
      'AvitoSamui',
      'PanganWoman',
      'NetworkPhuket',
      'AfishaPanganSamui',
      'https://t.me/SamuiGroup',
      'https://t.me/SamuiAds',
      'https://t.me/Samui_Friends',
      'https://t.me/kosamui',
      'https://t.me/samuipar',
      'https://t.me/samui0',
      'https://t.me/samui5',
      'https://t.me/SamuiChatik',
    ],
  },
  {
    id: 4,
    alias: 'phuket',
    name: 'Пхукет',
    usernames: [
      'Tipi4ny_Phuket',
      'phuket_talk',
      'afishaphuket',
      'phuket_help_chat',
      'Cozy_Rentals'
    ],
  },
  {
    id: 5,
    alias: 'chiangmai',
    name: 'Чианг Май',
    usernames: [],
  },
  {
    id: 6,
    alias: 'bangkok',
    name: 'Бангкок',
    usernames: [],
  },
  {
    id: 7,
    alias: 'pattaya',
    name: 'Паттайя',
    usernames: [
      'AfishaPattaya',
    ],
  },
];

export const PRESETS = [
  {
    id: 0,
    alias: 'preset_0',
    name: 'Без пресета (настроить самостоятельно)',
    words: [],
    minus_words: [],
  },
  {
    id: 1,
    alias: 'preset_1',
    name: 'Аренда байков',
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
    name: 'Пресет 1',
    words: ['test14', 'test24', 'test3'],
    minus_words: [],
  },
  {
    id: 3,
    alias: 'preset_3',
    name: 'Пресет 2',
    words: ['tes123t1', 'test32', 'tes2t3'],
    minus_words: [],
  },
];
