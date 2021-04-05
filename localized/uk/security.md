---
layout: security.hb
title: Безпека
---

# Безпека 1

## Меседж про помилку в Node.js

Повідомити про помилки безпеки в Node.js через [HackerOne](https://hackerone.com/nodejs).

Ваш звіт буде підтверджено протягом 24 годин, і ви отримаєте більш детальну відповідь на ваш звіт протягом 48 годин, що вказує на наступні кроки обробки ваших сабмітів.

Після початкової відповіді на ваш звіт команда безпеки настійить вам повідомити про прогрес, який буде досягнуто до фіксації та повного оголошення, і може запитати додаткову інформацію чи інструкцію, що відповідає повідомленим проблемі.

### Програма винагороди Node.js

The Node.js project engages in an official bug bounty program for security researchers and responsible public disclosures. The program is managed through the HackerOne platform. See <https://hackerone.com/nodejs> for further details.

## Повідомити про помилку в модулі третьої сторони

Групувати помилки безпеки в модулях третіх сторін слід повідомляти їх супроводжуючих, а також координувати через Node. s Ecosystem Команда безпеки через [HackerOne](https://hackerone.com/nodejs-ecosystem).

Детальну інформацію про цей процес можна знайти в [Робочій Груповому репозиторії](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md).

Thank you for improving the security of Node.js and its ecosystem. Your efforts and responsible disclosure are greatly appreciated and will be acknowledged.

## Політика розкриття інформації

Ось політика розкриття безпеки для Node.js

* The security report is received and is assigned a primary handler. This person will coordinate the fix and release process. The problem is confirmed and a list of all affected versions is determined. Code is audited to find any potential similar problems. Fixes are prepared for all releases which are still under maintenance. These fixes are not committed to the public repository but rather held locally pending the announcement.

* Пропонована дата ембарго на цю вразливість обрана, а також умовна неймовірна (Common Vulnerabilities і Exposures (CVE®)) запитана на вразливість.

* On the embargo date, the Node.js security mailing list is sent a copy of the announcement. The changes are pushed to the public repository and new builds are deployed to nodejs.org. Within 6 hours of the mailing list being notified, a copy of the advisory will be published on the Node.js blog.

* Typically the embargo date will be set 72 hours from the time the CVE is issued. However, this may vary depending on the severity of the bug or difficulty in applying a fix.

* This process can take some time, especially when coordination is required with maintainers of other projects. Every effort will be made to handle the bug in as timely a manner as possible; however, it’s important that we follow the release process above to ensure that the disclosure is handled in a consistent manner.

## Отримання оновлень безпеки

Оповіщення про безпеку будуть поширюватися серед наступних методів.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

## Коментарі до цієї політики

Якщо у вас є пропозиції, як можна покращити цей процес, будь ласка, надішліть [запит на злиття](https://github.com/nodejs/nodejs.org) або [файл питання](https://github.com/nodejs/security-wg/issues/new) , щоб обговорити.
