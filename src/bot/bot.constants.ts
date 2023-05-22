import { Markup } from 'telegraf';
import { backCallback } from './bot.utils';

export const ACCOUNTS_SCENE = 'ACCOUNTS_SCENE';
export const WORDS_SCENE = 'WORDS_SCENE';
export const WORDS_ADD_SCENE = 'WORDS_ADD_SCENE';
export const CHANNELS_SCENE = 'CHANNELS_SCENE';
export const CHANNELS_ADD_SCENE = 'CHANNELS_ADD_SCENE';

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
};

export const TEXTS = {
  MAIN: {
    WELCOME: 'Приветственное сообщение',
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
    [MENU_BUTTONS.CHATS, MENU_BUTTONS.WORDS],
    [MENU_BUTTONS.ACCOUNTS, MENU_BUTTONS.PAYMENT],
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
