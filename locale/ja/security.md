---
layout: security.hbs
title: セキュリティ
---
<!--
# Security

## Reporting a Bug

All security bugs in Node.js are taken seriously and should be reported by emailing [security@nodejs.org](mailto:security@nodejs.org).
This will be delivered to a subset of the core team who handle security issues.
-->
# セキュリティ

## 脆弱性の報告

すべての Node.js の脆弱性は、速やかにメールにて報告するようお願いします [security@nodejs.org](mailto:security@nodejs.org)。
このメールは、セキュリティの問題を管理しているコアチームに自動で送信されます。

あなたのメールは24時間以内に確認され、48時間以内に問題の扱いやこれからの
ステップについての詳細を受け取ることができます。

<!--
After the initial reply to your report, the security team will endeavor to keep you informed of the progress being made
towards a fix and full announcement, and may ask for additional information or guidance surrounding the reported issue.
These updates will be sent at least every five days, in practice, this is more likely to be every 24-48 hours.
-->
あなたの報告への返信を行ったのちに、セキュリティチームはあなたに問題を解決するための修正に関する
進捗報告、及びに詳細の発表に尽力します。状況によっては、問題の詳細や発生した環境などについて
あなたに尋ねることもあります。これらの更新は5日おきに送信することになっていますが、実際は
毎24-48時間以内に送られています。

<!--
Security bugs in third party modules should be reported to their respective maintainers and can also be coordinated
through the [Node Security Project](https://nodesecurity.io).

Thank you for improving the security of Node.js. Your efforts and responsible disclosure are greatly appreciated and
will be acknowledged.
-->
サードパーティ製のモジュールに関するセキュリティのバグは、各モジュールの管理者に報告するように
お願いします。また、[Node セキュリティプロジェクト](https://nodesecurity.io) との調整も
お忘れないようにお願いします。

Node.js のセキュリティ向上への協力に感謝します。あなたの貢献に対する努力と、責任感を伴った情報
共有は、広く評価されます。

<!--

## Disclosure Policy

Here is the security disclosure policy for Node.js
-->
## 情報開示のポリシー

Node.js における、情報開示のポリシーをここに記します。

<!--
- The security report is received and is assigned a primary handler. This person will coordinate the fix and release
process. The problem is confirmed and a list of all affected versions is determined. Code is audited to find any
potential similar problems. Fixes are prepared for all releases which are still under maintenance. These fixes are not
committed to the public repository but rather held locally pending the announcement.
-->
- 脆弱性が報告されると、主要なメンバーがアサインされます。このメンバーは、修正とリリースの
プロセスを調整します。脆弱性が確認されたら、影響のある全てのバージョンのリストを作成します。
コードは、潜在的な同様の問題があるか精査されます。修正は、メンテナンスされている全てのバージョン
に向けて用意されます。これらの修正は、正式なアナウンスを行うまでは公開リポジトリには追加されません。

<!--
- A suggested embargo date for this vulnerability is chosen and a CVE (Common Vulnerabilities and  Exposures (CVE®))
is requested for the vulnerability.
-->
- CVE (Common Vulnerabilities and  Exposures (CVE®)) により、脆弱性に関する
情報解禁日が提案され、それを決定します。

<!--
- On the embargo date, the Node.js security mailing list is sent a copy of the announcement. The changes are pushed to
the public repository and new builds are deployed to nodejs.org. Within 6 hours of the mailing list being notified, a
copy of the advisory will be published on the Node.js blog.
-->
- 情報解禁日に、Node.js のメーリングリストに公式発表と同様のものが送信されます。修正済みの
バージョンは、公開リポジトリに送信され、新しいビルドが nodejs.org に置かれます。メーリングリスト
に共有されてから6時間以内に、セキュリティ勧告を Node.js のブログにて行います。

<!--
- Typically the embargo date will be set 72 hours from the time the CVE is issued. However, this may vary depending on
the severity of the bug or difficulty in applying a fix.
-->
- 一般的に情報解禁日は、CVEに報告されてから72時間と設定されます。しかし、脆弱性を修正する複雑さによってはこの限りではありません。

<!--
- This process can take some time, especially when coordination is required with maintainers of other projects. Every
effort will be made to handle the bug in as timely a manner as possible, however, it’s important that we follow the
release process above to ensure that the disclosure is handled in a consistent manner.
-->
- このプロセスは他のプロジェクトの管理者との調整を必要とする際など、ときに時間を要することがあります。可能な限り迅速にバグを修正するために尽力するだけでなく、一貫性のあるプロセスで情報開示を行うために上記のリリースプロセスを従うこともまた重要です。


<!--
## Receiving Security Updates

Security notifications will be distributed via the following methods.

- [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
- [https://nodejs.org/en/blog](https://nodejs.org/en/blog)
-->
## セキュリティリポートを受け取る

セキュリティリポートは、以下のサイトを介して報告されます。

- [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
- [https://nodejs.org/en/blog](https://nodejs.org/en/blog)


<!--
## Comments on this Policy

If you have suggestions on how this process could be improved please submit a [pull request](https://github.com/nodejs/nodejs.org)
or email [security@nodejs.org](mailto:security@nodejs.org) to discuss.
-->
## このポリシーに関して提案をする

このプロセスを改善するための提案をお持ちの際は、[プルリクエスト](https://github.com/nodejs/nodejs.org)
か、 メール [security@nodejs.org](mailto:security@nodejs.org) にて報告をお願いします。
