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
    MAIN_MENU:
      'Для навигации по разделам воспользуйтесь меню под клавиатурой. \nВ случае проблем с использованием бота, обновите сессию отправив комманду /start',
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
    TASK_MENU: `Вы выбрали задачу &1. Для настройки воспользуйтесь меню под клавиатурой`,
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
    STATS: `Задача активна дней: &1 🗓️
      \nНайденно сообщений: &2 📨
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
    MAIN: `В данном меню вы можете управлять ключевыми словами и фразами, которые бот будет искать в чатах. Наэмите кнопку "Добавить новое" чтобы добавить новое ключевое слово или фразу.
    `,
    ADD: `Добавьте слова или фразы, вы можете отправить сразу несколько, разделив их запятой. Максимальное количество слов или фраз для одной задачи - 25
    \nВы можете задать следующие критерии поиска:
    \n1. Указать одно слово, например "рентал" в этом случае бот будет перехватывать и отправлять вам все сообщения которые содержат это слово
    \n2. Eсли вы введете "Ищу Nmax Рентал", то бот будет искать сообщения содержащие слова "Ищу" и "Аренда" и "Nmax" в любом порядке, но перехватит сообщение только если в нем есть все эти слова
    Поэтому сообщение вида "ИЩУ где снять байк: NMAX или pcx, не подскажете где нормальный РЕНТАЛ" попадут под критерий поиска, так как содержат все нужные слова.
    Мы рекомендуем использовать ключевые слова из 2 - 3 слов, которые характерны для сообщений о поиске вашего сервиса или других целей. 
    \n3. Но если вы хотите добавить поиск по точному вхождению фразы используйте записть формата "Ищу+байк", тогда бот будет искать точное вхождение фразы (ищу байк) в сообщении.
    Мы советуем начинать вам с общих фраз и слов. По мере получения сообщений от бота, вы сможете более тонко настроить его под себя, опыт пользователей говорит, что за 2-3 недели вы настроите бота под себя идеально, так, что мимо вас не пройдет ни одного нужного вас сообщения.
    \nВ разделе Минус Слова вы можете добавить слова которые характерны, например, для обьявлений в этой сфере, чтобы бот присылал вам только клиентов, а не продавцов
    Так же у вас будет возможно по нажатию кнопки под сообщением заблокировать для бота пользователя или даже целый чат, если от него вы получаете не интересующие вас сообщение
    \nМы надеемся, что наш сервис станет для вас удобным и привычным инструментом и не забывайте вы всегда можете связаться с поддержкой используя кнопку в меню
    \nУдачной охоты  
    `,
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
      'SamuiGroup',
      'SamuiAds',
      'Samui_Friends',
      'kosamui',
      'samuipar',
      'samui0',
      'samui5',
      'SamuiChatik',
      'Pattaya_Go',
      'pattaya_top',
      'phuket_top',
      'phuket_prodam',
      'pattayarental',
      'pattayachat',
      'Pattaya_Avito',
      'pattaya_community',
      'forum_pattaya',
      'Phuketpar',
      'bangkok111',
      'pattaya_kids',
      'chatik_pattaya',
      'pattaya_beauty_service',
      'baraholka_pattaya',
      'pattaya_connect',
      'sportpattaya',
      'nedvizhimost_pattaya',
      'it_pattaya',
      'edapattaya',
      'pattaya_arenda',
      'it_phuket',
      'chatik_phuket',
      'phuket_buy_sell',
      'kids_phuket',
      'sportphuket',
      'phuket_beauty_service',
      'thai_medicine',
      'the_thailand_chat',
      'chiangmai_chat',
      'samui_chatik',
      'pet_thailand',
      'thailand_rus',
      'bangkok_buy_sell',
      'bangkok_chatik',
      'SEA_Bangkok',
      'bangkok_tusa',
      'bangkok_forum',
      'Bangkok_sale',
      'Lifein_Bangkok',
      'thailand_rus',
      'bankokpa',
      'bangkokcannabisclub',
      'officialkamm',
      'job_bangkok',
      'bkk_chat',
      'realphuket',
      'thailand_rus',
      'info_phuket',
      'phuket_connect',
      'ttb_thai_chat',
      'phk_chat',
      'thai_light_chat',
      'phyket_obmen_chat',
      'rubconvertings',
      'buysalephuket',
      'phuket_island',
      'vmeste_phuket',
      'pkhuketo',
      'phyket2023',
      'ads_phuket',
      'phuketonapp_chat',
      'phuketonapp_group',
      'phuket_talk',
      'ttb_where_to_go',
      'phuket_chatik',
      'ttb_phuket_women',
      'ttb_phuket_ads',
      'nedvizhimost_pkhuket',
      'obyavlenia_pkhuket',
      'pkhuketb',
      'ttb_phuket_women',
      'phuketbarohlo',
      'obmen_thb_rub',
      'barakholka_pkhuket',
      'phuketra',
      'pkhuketi',
      'phuket_add',
      'chat_pkhuket',
      'phuket_arendaa',
      'pkhuket',
      'ads_chiangmai',
      'chiangmay',
      'chiangmai_chatt',
      'panganchatik',
      'job_phangan',
      'pangan_chatt',
      'phanganyog',
      'samuibussines',
      'realty_samui',
      'samuichatik',
      'blizkie_samui',
      'samuichat',
      'koh_samui_services',
      'chat_samui',
      'job_samui',
      'samuichat',
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
      'Cozy_Rentals',
      'phuket_top',
      'phuket_prodam',
      'Phuketpar',
      'bangkok111',
      'it_phuket',
      'chatik_phuket',
      'phuket_buy_sell',
      'kids_phuket',
      'sportphuket',
      'phuket_beauty_service',
      'auto_moto_thailand',
      'realphuket',
      'thailand_rus',
      'info_phuket',
      'phuket_connect',
      'ttb_thai_chat',
      'phk_chat',
      'thai_light_chat',
      'phyket_obmen_chat',
      'rubconvertings',
      'buysalephuket',
      'phuket_island',
      'vmeste_phuket',
      'pkhuketo',
      'phyket2023',
      'ads_phuket',
      'phuketonapp_chat',
      'phuketonapp_group',
      'phuket_talk',
      'ttb_where_to_go',
      'phuket_chatik',
      'ttb_phuket_women',
      'ttb_phuket_ads',
      'nedvizhimost_pkhuket',
      'obyavlenia_pkhuket',
      'pkhuketb',
      'ttb_phuket_women',
      'phuketbarohlo',
      'obmen_thb_rub',
      'barakholka_pkhuket',
      'phuketra',
      'pkhuketi',
      'phuket_add',
      'chat_pkhuket',
      'phuket_arendaa',
      'pkhuket',
    ],
  },
  {
    id: 7,
    alias: 'pattaya',
    name: 'Паттайя',
    usernames: [
      'AfishaPattaya',
      'Pattaya_Go',
      'pattaya_top',
      'pattayarental',
      'pattayachat',
      'Pattaya_Avito',
      'pattaya_community',
      'forum_pattaya',
      'bangkok111',
      'pattaya_kids',
      'chatik_pattaya',
      'pattaya_beauty_service',
      'baraholka_pattaya',
      'pattaya_connect',
      'sportpattaya',
      'nedvizhimost_pattaya',
      'it_pattaya',
      'edapattaya',
      'pattaya_arenda',
      'SEA_Bangkok',
      'thailand_rus',
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
      'phangan_chat',
      'panganchatik',
      'job_phangan',
      'pangan_chatt',
      'phanganyog',
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
      'SamuiGroup',
      'SamuiAds',
      'Samui_Friends',
      'kosamui',
      'samuipar',
      'samui0',
      'samui5',
      'samuichatik',
      'samui_chatik',
      'thailand_rus',
      'samuibussines',
      'realty_samui',
      'samuichatik',
      'blizkie_samui',
      'samuichat',
      'koh_samui_services',
      'chat_samui',
      'job_samui',
      'samuichat',
    ],
  },
  {
    id: 5,
    alias: 'chiangmai',
    name: 'Чианг Май',
    usernames: [
      'chiangmai_chat',
      'ads_chiangmai',
      'chiangmay',
      'chiangmai_chatt',
    ],
  },
  {
    id: 6,
    alias: 'bangkok',
    name: 'Бангкок',
    usernames: [
      'bangkok_buy_sell',
      'bangkok_chatik',
      'SEA_Bangkok',
      'bangkok_tusa',
      'bangkok_forum',
      'Bangkok_sale',
      'Lifein_Bangkok',
      'thailand_rus',
      'bankokpa',
      'bangkokcannabisclub',
      'officialkamm',
      'job_bangkok',
      'bkk_chat',
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
    name: 'Байки',
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
      'Эндуро',
      'Kawasaki',
      'Мотосалон',
      'Байкер',
      'Эндуро',
      'Чоппер',
      'Скупи',
      'Филано',
      'Фелано',
      'Клик',
      'Макси-скутер',
      'Прокат',
      'Рентал',
    ],
    minus_words: ['продам', 'сдам', 'цена на сутки', 'цена в месяц'],
  },
  {
    id: 3,
    alias: 'preset_3',
    name: 'Недвижимость',
    words: [
      'Ищу Недвижимость',
      'Ищу Апартаменты',
      'Ищу Апарты',
      'Ищу Кондо',
      'Ищу Кондоминиум',
      'Ищу Резорт',
      'Ищу Отель',
      'Ищу Комнату',
      'Ищу Дом',
      'Ищу Виллу',
      'Ищу Бунгало',
      'Сниму Недвижимость',
      'Сниму Апартаменты',
      'Сниму Апарты',
      'Сниму Кондо',
      'Сниму Кондоминиум',
      'Сниму Резорт',
      'Сниму Отель',
      'Сниму Комнату',
      'Сниму Виллу',
      'Сниму Бунгало',
      'Таунхаус',
      'Куплю недвижимость',
      'Снять квартиру',
      'Агентство недвижимости',
      'Жилье в Таиланде',
      'Долгосрочная аренда',
      'Краткосрочная аренда',
      'ЖК',
      'жилой комплекс',
      'Пентхаус',
      'Земельный участок',
      'Инвестиции в недвижимость',
      'Риэлтор',
      'Переезжаю в Таиланд',
      'Эксклюзивная недвижимость',
      'Студия',
      'Двухкомнатная квартира',
      'Собственность',
      'Лизинг',
    ],
    minus_words: [],
  },
  {
    id: 4,
    alias: 'preset_4',
    name: 'Брови и ресницы',
    words: [
      'Брови',
      'Бровки',
      'Реснички',
      'Ресницы',
      'ресниц',
      'Мастер по бровям',
      'Наращивание ресниц',
      'Коррекция бровей',
      'Ламинирование ресниц',
      'Микроблейдинг',
      'Татуаж бровей',
      'Биозавивка ресниц',
      'Брови Хна',
      'Окрашивание бровей',
      'Пудровые брови',
      '3D ресницы',
      '2D ресницы',
      'Лента ресниц',
      'Окрашивание ресниц',
      'Татуаж ресниц',
      'Мастер по ресницам',
      'Студия бровей',
      'Классическое наращивание',
      'Объемное наращивание',
      'Кератиновый лифтинг ресниц',
      'Кератиновое восстановление бровей',
      'Архитектура бровей',
      'Брови омбре',
      'Ботокс ресниц',
      'Снятие ресниц',
      'Перманент бровей',
      'Японское наращивание ресниц',
      'Салон красоты',
      'Татуаж',
    ],
    minus_words: ['я мастер', 'делаю', 'занимаюсь', 'сделаю'],
  },

  {
    id: 7,
    alias: 'preset_7',
    name: 'Косметология и эпиляция',
    words: [
      'Косметолог',
      'Косметическая',
      'Косметический',
      'Чистка лица',
      'Пилинг',
      'Ботокс',
      'Филлеры',
      'Мезотерапия',
      'Контурная пластика',
      'Уход за кожей',
      'Антивозрастные процедуры',
      'Биоревитализация',
      'эпиляция',
      'Лазерная',
      'Дерматолог',
      'Микродермабразия',
      'Косметический массаж',
      'Ультразвуковая чистка',
      'Гиалуроновая кислота',
      'Скульптурирование лица',
      'Карбокситерапия',
      'Фотоомоложение',
      'Мезонити',
      'Элос-эпиляция',
      'Косметический кабинет',
      'Салон красоты',
      'косметология',
      'Аппаратная косметология',
      'Омоложение лица',
      'Плацентарные маски',
      'Подтяжка лица',
      'Липолитики',
      'Лазерное омоложение',
      'Криолиполиз',
      'Фотоэпиляция',
      'Глубокое бикини',
      'Диодный лазер',
      'Жидкий воск',
      'Шугаринг',
      'Татуаж',
    ],
    minus_words: ['я косметолог', 'я доктор', 'делаю', 'занимаюсь', 'сделаю'],
  },

  {
    id: 8,
    alias: 'preset_8',
    name: 'Маникюр и педикюр',
    words: [
      'Маникюр',
      'Педикюр',
      'Мастер',
      'Ногти',
      'Гель-лак',
      'Дизайн ногтей',
      'Наращивание',
      'Кутикула',
      'Френч',
      'Покрытие',
      'Лак',
      'Пилка',
      'Маникюрный сервис',
      'Ногтевая студия',
      'Салон красоты',
      'Обрезной маникюр',
      'Европейский маникюр',
      'Ноготочки',
      'Гелевые ногти',
      'Аппаратный маникюр',
      'Комбинированный маникюр',
      'Мастер по ногтям',
      'Гель для ногтей',
      'Рисунок на ногтях',
      'Глянцевые ногти',
      'Матовые ногти',
      'Снятие гель-лака',
      'Коррекция ногтей',
      'Спа для рук',
      'Лампа для гель-лака',
      'Стразы на ногти',
    ],
    minus_words: ['я мастер', 'я нейлартист', 'делаю', 'занимаюсь', 'сделаю'],
  },

  {
    id: 9,
    alias: 'preset_9',
    name: 'Фитнесс',
    words: [
      'Тренер',
      'Фитнес',
      'Групповые тренировки',
      'Фитнес-центр',
      'Кроссфит',
      'Функциональные тренировки',
      'Аэробика',
      'Пилатес',
      'Силовые тренировки',
      'Тренажерный зал',
      'Кардио тренировки',
      'Бодибилдинг',
      'Персональные занятия',
      'Фитнес-диета',
      'Спортивное питание',
      'Тренировки на улице',
    ],
    minus_words: ['я тренер', 'я тренирую'],
  },

  {
    id: 10,
    alias: 'preset_10',
    name: 'Дети',
    words: [
      'Няня',
      'Репетитор',
      'Школа',
      'Детский сад',
      'Образование',
      'Занятия для детей',
      'Детский клуб',
      'Развивающие занятия',
      'Педагог',
      'Учитель',
      'Домашнее обучение',
      'Частный репетитор',
      'Детский лагерь',
      'Английский для детей',
      'Присмотр за ребенком',
      'Детский психолог',
      'Математика',
      'Детский развивающий центр',
      'Чтение',
      'Подготовка к школе',
      'Творческие занятия',
      'Музыкальная школа',
      'Художественное образование',
      'Танцы для детей',
      'Часы присмотра',
      'Детская игровая комната',
      'Рисование',
      'Детский языковой курс',
      'Логопед',
      'Школа раннего развития',
      'Детский спорт',
      'Детская йога',
      'Школа искусств',
      'Детский массаж',
      'Обучение игре на музыкальных инструментах',
      'Детские экскурсии',
      'Русская школа',
      'Домашнее задание',
      'Детские лагеря',
      'Летний лагерь',
    ],
    minus_words: ['я учитель', 'преподаю'],
  },
  {
    id: 11,
    alias: 'preset_11',
    name: 'Йога',
    words: [
      'Йога',
      'Зал для йоги',
      'Асаны',
      'Йога-ретрит',
      'Медитация',
      'Стретчинг',
      'Йога-терапия',
      'Йога-курсы',
      'Групповые классы по йоге',
    ],
    minus_words: ['я тренер', 'я тренирую'],
  },
  {
    id: 12,
    alias: 'preset_12',
    name: 'Тайский бокс',
    words: [
      'Тайский бокс',
      'Муай тай',
      'Тренировки по боксу',
      'Тайский бокс для женщин',
      'Кикбоксинг',
      'Бойцовский клуб',
      'Тайский бокс для детей',
      'Спарринг',
      'Лагерь муай тай',
      'Техника бокса',
      'Турниры по тайскому боксу',
    ],
    minus_words: [],
  },
  {
    id: 13,
    alias: 'preset_13',
    name: 'Медицина',
    words: [
      'Врач',
      'Врача',
      'Доктор',
      'Доктора',
      'Медицина',
      'Поликлиника',
      'Стоматология',
      'Терапевт',
      'Терапевта',
      'Педиатр',
      'Педиатра',
      'Хирург',
      'Гинеколог',
      'Аптека',
      'Анализы',
      'УЗИ',
      'Вакцинация',
      'Кардиолог',
      'Дерматолог',
      'Офтальмолог',
      'Лечение',
      'Страховка',
      'Страховая',
      'Клиника',
      'Госпиталь',
    ],
    minus_words: ['я доктор', 'я врач'],
  },
  {
    id: 0,
    alias: 'preset_0',
    name: 'Без пресета (настроить самостоятельно)',
    words: [],
    minus_words: [],
  },
];
