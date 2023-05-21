import { Markup } from 'telegraf';

export const ACCOUNTS_SCENE = 'ACCOUNTS_SCENE';
export const WORDS_SCENE = 'WORDS_SCENE';
export const WORDS_ADD_SCENE = 'WORDS_ADD_SCENE';

export const COMMANDS = {
  START: 'start',
  BACK: 'BACK',
  OK: 'OK',
  CONTINUE: 'CONTINUE',
};

export const MENU_BUTTONS = {
  ACCOUNTS: { text: 'Аккаунты' },
  WORDS: { text: '➖ Минус-слова' },
  PAYMENT: { text: 'Оплата' },
  CHATS: { text: 'Чаты' },
  WORDS_LIST: { text: '📋 Список моих минус-слов' },
  WORDS_ADD: { text: '➕ Добавить новое' },
  WORDS_DELETE_ALL: { text: '🗑 Удалить все' },
  BACK_TO_MENU: { text: 'Вернуться в меню' },
  OK: { text: '✅' },
  CANCEL: { text: '⛔️' },
};

export const BUTTONS = {
  BACK: Markup.button.callback('⬅ Назад ️', COMMANDS.BACK),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  NO: Markup.button.callback('⛔️', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ продолжить', COMMANDS.CONTINUE),
};

export const TEXTS = {
  MAIN: {
    WELCOME: 'Приветственное сообщение',
  },
  WORDS: {
    MAIN: `В данном меню вы можете управлять минус словами/фразами, чтобы бот не присылал ненужные сообщения`,
  },
};

export const MENUS = {
  MAIN_MENU: [
    [MENU_BUTTONS.CHATS, MENU_BUTTONS.WORDS],
    [MENU_BUTTONS.ACCOUNTS, MENU_BUTTONS.PAYMENT],
  ],
  WORDS_MENU: [
    [MENU_BUTTONS.WORDS_LIST],
    [MENU_BUTTONS.WORDS_ADD, MENU_BUTTONS.WORDS_DELETE_ALL],
    [MENU_BUTTONS.BACK_TO_MENU],
  ],
};

export const TEXT = {
  START: `Привет! У нас можно поменять USDT (TRC20) на EUR cash и обратно. 🔒⚡️💶🧩\nКупить / продать недвижимость за криптовалюту🏡`,
  PULL_FILLED: (amout: number, id: number) =>
    `Мы собрали достаточное количество заявок и запускаем пул! 🚀\nУбедитесь, что вы перевели ${amout}_USDT на кошелёквремя для перевода ЗАВТРА 13:13\n\nДля подтвержения перевода наберите /approve ${id}`,
};
