export const WORK_CATEGORIES = {
  'anna-key': 'b2c',
  double: 'b2b',
  kokoshi: 'b2c',
  xella: 'b2c',
  fredomtag: 'b2c',
  'gazpromneft-hr': 'b2b',
  'iru-b2b': 'b2b',
};

export const CATEGORY_LABELS = {
  all: 'Все',
  b2c: 'B2C',
  b2b: 'B2B',
};

export const MARQUEE_ITEMS = [
  'Instagram',
  'Telegram',
  'VK',
  'Reels',
  'Контент-план',
  'Тон общения',
  'Работа с аудиторией',
  'Блогеры',
  'Съёмки',
  'Тексты',
  'Оформление',
  'Аналитика соцсетей',
];

export const SKILLS = [
  { title: 'Контент', tags: ['Контент-план', 'Рубрики', 'Тексты', 'Reels', 'Сценарии'] },
  { title: 'Оформление', tags: ['Съёмка', 'Монтаж', 'Концепция ленты', 'Задания дизайнерам'] },
  { title: 'Аудитория', tags: ['Комментарии', 'Личные сообщения', 'Блогеры', 'Розыгрыши и акции'] },
  { title: 'Аналитика', tags: ['Охваты', 'Вовлечённость', 'Записи из соцсетей', 'Отчёты'] },
];

export const HERO_FLOATS = [
  { text: 'Instagram · Telegram · VK', position: 'hero__float--1' },
  { text: 'B2B и B2C · 7 проектов', position: 'hero__float--2', accent: true },
];

export const TIMELINE = [
  {
    year: '2025–26',
    title: 'ANNA KEY — соцсети сети студий',
    text: 'Вела Instagram и Telegram, снимала Reels, работала с блогерами. Прибавилось 50 000 подписчиков, охваты выросли на 200%, записи из соцсетей выросли на 300%.',
    tags: ['Instagram', 'Telegram', 'Reels'],
  },
  {
    year: '2024–26',
    title: 'Double — проектная работа в агентстве',
    text: 'Одновременно вела четыре проекта студии. Шесть спецпроектов собрали охват 1,2 млн человек.',
    tags: ['Агентство', '4 клиента'],
  },
  {
    year: '2021–24',
    title: 'Соцсети для клиник, магазинов, найма и техники',
    text: 'Kokoshi, xella, Fredomtag, АЗС «Газпромнефть», iRU: вела аккаунты, организовывала съёмки, запускала Telegram-каналы.',
    tags: ['B2C', 'B2B'],
  },
];

export const CARD_HIGHLIGHT = {
  double: 'Спецпроекты: охват 1,2 млн',
  'iru-b2b': 'Telegram 0 → 10 000',
};

export function getCardHighlight(item) {
  if (CARD_HIGHLIGHT[item.slug]) return CARD_HIGHLIGHT[item.slug];
  return item.cardMetric.split('·')[0]?.trim() ?? item.cardMetric;
}
