/** Короткие тексты для печатной версии А4 (/print) */

export const PRINT_CASE_COPY = {
  'anna-key': {
    resultsText: 'Записи из соцсетей выросли на 300%, охваты на 200%, прибавилось 50 000 подписчиков.',
  },
  double: {
    resultsText: 'Шесть спецпроектов, охват 1,2 млн, четыре клиента одновременно.',
  },
  kokoshi: {
    resultsText: 'Прибавилось 4 200 подписчиков за пять месяцев, 58% пришли с рекламы.',
  },
  xella: {
    resultsText: 'Записи из соцсетей выросли на 47%, запись с экспертного видео на 18% дешевле, чем с фото.',
  },
  fredomtag: {
    resultsText: 'Образы дали на 42% больше переходов, сохранения выросли на 55%, переходы с рекламы на 62%.',
  },
  'gazpromneft-hr': {
    resultsText: 'Более 200 откликов, охват 900 тысяч, стоимость отклика снизилась вдвое.',
  },
  'iru-b2b': {
    resultsText: 'Telegram-канал с нуля до 10 000 подписчиков за два месяца, продажи выросли на 10%, вовлечённость на 5%.',
  },
};

export function getPrintCaseCopy(slug, item) {
  const custom = PRINT_CASE_COPY[slug];
  if (custom) return custom;

  return {
    resultsText: item.results
      ?.slice(0, 3)
      .map((r) => `${r.value} (${r.label})`)
      .join('; '),
  };
}
