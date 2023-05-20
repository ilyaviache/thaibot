import { Markup } from 'telegraf';

export const ACCOUNTS_SCENE = 'ACCOUNTS_SCENE';

export const COMMANDS = {
  START: 'start',
  BACK: 'BACK',
  OK: 'OK',
  CONTINUE: 'CONTINUE',
};

export const MENU_BUTTONS = {
  ACCOUNTS: { text: 'Аккаунты' },
  WORDS: { text: 'Слова' },
  PAYMENT: { text: 'Оплата' },
  CHATS: { text: 'Чаты' },
  BACK_TO_MENU: { text: 'Вернуться в меню' },
};

export const BUTTONS = {
  BACK: Markup.button.callback('⬅ назад ️', COMMANDS.BACK),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ продолжить', COMMANDS.CONTINUE),
};

export const MENUS = {
  MAIN_MENU: [
    [MENU_BUTTONS.CHATS, MENU_BUTTONS.WORDS],
    [MENU_BUTTONS.ACCOUNTS, MENU_BUTTONS.PAYMENT],
  ],
  ACCOUNTS_MENU: [[MENU_BUTTONS.BACK_TO_MENU]],
};

export const TEXT = {
  START: `Привет! У нас можно поменять USDT (TRC20) на EUR cash и обратно. 🔒⚡️💶🧩\nКупить / продать недвижимость за криптовалюту🏡`,
  PULL_FILLED: (amout: number, id: number) =>
    `Мы собрали достаточное количество заявок и запускаем пул! 🚀\nУбедитесь, что вы перевели ${amout}_USDT на кошелёквремя для перевода ЗАВТРА 13:13\n\nДля подтвержения перевода наберите /approve ${id}`,
};
