# Заявки з /lp у Google Таблицю

Сайт статичний (`output: "export"`), сервера немає. Тому форма шле POST напряму
в Google Apps Script Web App, а URL цього скрипта видно у вихідному коді сторінки.

Це усвідомлений компроміс. На клієнті стоїть ханіпот, перевірка часу заповнення
й ліміт «одна заявка на хвилину» — цього досить проти ботів-сканерів, але **не**
проти того, хто відкриє DevTools і навмисно засипле форму. Валідація нижче
на боці скрипта обов'язкова, і саме вона є справжнім захистом.

## 1. Таблиця

Створіть Google Таблицю. Перший рядок — заголовки, рівно в такому порядку:

```
sentAt | form | name | contact | niche | utm_source | utm_medium | utm_campaign | utm_content | utm_term | fbclid | referrer | page
```

## 2. Скрипт

Extensions → Apps Script, замініть увесь код на цей:

```js
// Пароль. Має збігатися з NEXT_PUBLIC_LEADS_SECRET у Netlify.
// Він не робить ендпоінт приватним (лежить у клієнтському коді),
// а лише відсікає ботів, які б'ють у знайдений URL навмання.
const SECRET = 'ЗАМІНІТЬ_НА_СВІЙ_ПАРОЛЬ';

// ID таблиці — довгий рядок із її адреси:
// docs.google.com/spreadsheets/d/  ⟵ ЦЕ ⟶  /edit
// Пряме звертання за ID надійніше за getActive(): останній повертає null,
// якщо скрипт створено окремо, а не з самої таблиці.
const SHEET_ID = 'ВСТАВТЕ_ID_ТАБЛИЦІ';
const SHEET_NAME = 'Ліди';

function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    const names = ss.getSheets().map(function (s) { return s.getName(); });
    throw new Error('Аркуша "' + SHEET_NAME + '" немає. Є такі: ' + names.join(', '));
  }
  return sheet;
}

// Діагностика: просто відкрийте URL скрипта у браузері.
// Покаже, чи бачить скрипт таблицю й аркуш.
function doGet() {
  let report;
  try {
    const sheet = getSheet_();
    report = 'OK. Аркуш "' + SHEET_NAME + '" знайдено. Рядків зараз: ' + sheet.getLastRow();
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

    getSheet_().appendRow([
      d.sentAt || new Date().toISOString(),
      d.form || '', d.name || '', d.contact || '', d.niche || '',
      d.utm_source || '', d.utm_medium || '', d.utm_campaign || '',
      d.utm_content || '', d.utm_term || '', d.fbclid || '',
      d.referrer || '', d.page || '',
    ]);

    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      'Нова заявка: ' + (d.name || ''),
      [
        "Ім'я: " + d.name,
        'Контакт: ' + d.contact,
        'Ніша: ' + (d.niche || '—'),
        'Форма: ' + d.form,
        'Кампанія: ' + (d.utm_campaign || '—'),
      ].join('\n'),
    );
  } catch (err) {
    console.error(err);
  }
  return ok();
}

// Завжди 200 без деталей — щоб бот не вгадав, яка саме перевірка спрацювала.
function ok() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
```

> Погодинного обмеження на кількість заявок тут навмисно немає — воно ускладнювало
> код і давало ще одне місце для мовчазної помилки. Від ботів захищають пароль,
> ханіпот і пауза на боці сайту.

## 3. Деплой

Deploy → New deployment → тип **Web app**:

- Execute as: **Me**
- Who has access: **Anyone**

Скопіюйте URL виду `https://script.google.com/macros/s/.../exec`.

## 4. Змінні оточення

Локально — у `.env.local`, на Netlify — Site settings → Environment variables.
Повний список є в `.env.local.example`:

```
NEXT_PUBLIC_SITE_URL=https://limiter-studio.netlify.app
NEXT_PUBLIC_LEADS_ENDPOINT=https://script.google.com/macros/s/.../exec
NEXT_PUBLIC_LEADS_SECRET=той_самий_рядок_що_і_в_SECRET
NEXT_PUBLIC_FB_PIXEL_ID=1234567890
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

Змінні `NEXT_PUBLIC_*` вшиваються у бандл під час білду — після їх зміни на
Netlify потрібен новий деплой, перезапуску недостатньо.

## 5. Перевірка

1. `npm run dev`, відкрити `/lp/`, заповнити форму — **зачекавши щонайменше 3 секунди**,
   інакше спрацює антибот і форма покаже помилку.
2. Рядок має з'явитись у таблиці, лист — на пошту.
3. Відкрити `/lp/?utm_source=fb&utm_campaign=test` і надіслати ще одну заявку —
   в колонках `utm_*` мають бути значення. Це те, за чим ви розрізнятимете кампанії.
4. Друга заявка поспіль має відхилитись повідомленням про хвилинну паузу.
