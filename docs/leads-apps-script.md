# Заявки з /lp у Google Таблицю

Сайт статичний (`output: "export"`), сервера немає. Тому форма шле POST напряму
в Google Apps Script Web App, а URL цього скрипта видно у вихідному коді сторінки.

Це усвідомлений компроміс. На клієнті стоїть ханіпот і ліміт на повторну
відправку — цього досить проти ботів-сканерів, але **не** проти того, хто
відкриє DevTools і навмисно засипле форму. Валідація на боці скрипта
обов'язкова, і саме вона є справжнім захистом.

## 1. Таблиця

Створіть Google Таблицю й перейменуйте аркуш на **`Ліди`**.

Заголовки вручну вписувати не треба — їх ставить функція `setup()` зі скрипта нижче.

## 2. Скрипт

Extensions → Apps Script, замініть увесь код на цей:

```js
const SECRET = 'lgh12356lm';                 // той самий, що в Netlify
const SHEET_ID = 'ВСТАВТЕ_ID_ТАБЛИЦІ';       // з адреси таблиці, між /d/ і /edit
const SHEET_NAME = 'Ліди';
const TZ = 'Europe/Kyiv';

const HEADERS = ['Час', 'Форма', 'Імʼя', 'Контакт', 'Ніша',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'Звідки прийшов', 'Сторінка'];

function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const names = ss.getSheets().map(function (s) { return s.getName(); });
    throw new Error('Аркуша "' + SHEET_NAME + '" немає. Є такі: ' + names.join(', '));
  }
  return sheet;
}

/**
 * Запустіть ОДИН РАЗ вручну: обрати "setup" у списку функцій угорі → Run.
 * Наводить лад: заголовки, закріплення, формати, ширина колонок.
 * Наявні заявки не чіпає.
 */
function setup() {
  const sheet = getSheet_();

  // Заголовки в перший рядок
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold')
    .setBackground('#f1f3f4')
    .setVerticalAlignment('middle');

  sheet.setFrozenRows(1);

  // Контакт і fbclid — текстом, інакше Google зʼїдає "+" і провідні нулі
  sheet.getRange('D:D').setNumberFormat('@');
  sheet.getRange('K:K').setNumberFormat('@');
  // Час — читабельний формат замість ISO
  sheet.getRange('A:A').setNumberFormat('dd.MM.yyyy HH:mm');

  // Ширина колонок і перенесення тексту
  const widths = [130, 80, 130, 150, 170, 110, 110, 140, 140, 110, 90, 160, 90];
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length)
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);

  SpreadsheetApp.flush();
}

// Діагностика: просто відкрийте URL скрипта у браузері.
function doGet() {
  let report;
  try {
    const sheet = getSheet_();
    report = 'OK. Аркуш "' + SHEET_NAME + '" знайдено. Заявок: ' +
      Math.max(0, sheet.getLastRow() - 1);
  } catch (err) {
    report = 'ПОМИЛКА: ' + err.message;
  }
  return ContentService.createTextOutput(report).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    if (d.secret !== SECRET) return ok();
    if (!d.name || !d.contact) return ok();
    if (String(d.name).length > 100 || String(d.contact).length > 100) return ok();
    if (d.website) return ok(); // ханіпот заповнений — бот

    const sheet = getSheet_();
    if (sheet.getLastRow() === 0) setup();  // таблиця порожня — створити заголовки

    sheet.appendRow([
      Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm'),
      d.form || '',
      d.name || '',
      "'" + String(d.contact),   // апостроф змушує Google лишити текст як є
      d.niche || '',
      d.utm_source || '', d.utm_medium || '', d.utm_campaign || '',
      d.utm_content || '', d.utm_term || '',
      d.fbclid ? "'" + d.fbclid : '',
      d.referrer || '', d.page || '',
    ]);

    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      'Нова заявка: ' + d.name,
      ["Імʼя: " + d.name,
       'Контакт: ' + d.contact,
       'Ніша: ' + (d.niche || '—'),
       'Форма: ' + d.form,
       'Кампанія: ' + (d.utm_campaign || 'прямий захід'),
      ].join('\n'),
    );
  } catch (err) {
    console.error(err);
  }
  return ok();
}

function ok() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
```

> Погодинного обмеження на кількість заявок тут навмисно немає — воно ускладнювало
> код і давало ще одне місце для мовчазної помилки. Від ботів захищають пароль,
> ханіпот і пауза на боці сайту.

## 3. Один раз запустити setup()

У редакторі Apps Script угорі є список функцій. Оберіть **`setup`** → **Run**.
Це поставить заголовки, закріпить перший рядок, задасть формати колонок
і ширину. Наявні заявки не постраждають.

## 4. Деплой

Deploy → New deployment → тип **Web app**:

- Execute as: **Me**
- Who has access: **Anyone**

Скопіюйте URL виду `https://script.google.com/macros/s/.../exec`.

## 5. Значення в коді

Змінних оточення немає — адреса скрипта й пароль вшиті прямо в
`src/lib/leads.ts`, ID пікселя в `src/lib/fbq.ts`.

Це усвідомлений вибір заради простоти: нема чого налаштовувати в Netlify
і неможливо забути про повторний деплой після зміни змінної. Ці значення
в будь-якому разі потрапляють у код сторінки, тож на рівні захисту нічого
не змінюється — справжній захист це перевірки на боці Apps Script.

Змінити адресу скрипта або пароль = правка в коді + звичайний `git push`.

## 6. Перевірка

1. Відкрити URL скрипта у браузері — має показати `OK. Аркуш "Ліди" знайдено`.
2. Заповнити форму на `/lp/`. Рядок має з'явитись у таблиці, лист — на пошту.
   Номер телефону має лишитись текстом, разом із `+`.
3. Відкрити `/lp/?utm_source=fb&utm_campaign=test` і надіслати ще одну заявку —
   в колонках `utm_*` мають бути значення. Саме за ними ви розрізнятимете кампанії.
4. Друга заявка протягом 20 секунд відхиляється — так і має бути.
