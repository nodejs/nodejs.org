---
layout: security.hbs
title: セキュリティ
---

<!--
# Security

## Reporting a Bug in Node.js

Report security bugs in Node.js via [HackerOne](https://hackerone.com/nodejs).

Your report will be acknowledged within 24 hours, and you’ll receive a more detailed response to your report within 48
hours indicating the next steps in handling your submission.

After the initial reply to your report, the security team will endeavor to keep you informed of the progress being made
towards a fix and full announcement, and may ask for additional information or guidance surrounding the reported issue.
These updates will be sent at least every five days; in practice, this is more likely to be every 24-48 hours.
-->

# セキュリティ

## 脆弱性の報告

セキュリティに関わるバグは [HackerOne](https://hackerone.com/nodejs) を通じて Node.js に報告してください。

あなたの報告は24時間以内に確認され、48時間以内に問題の扱いやこれからのステップについての詳細を受け取ることができます。

あなたの報告への返信を行ったのちに、セキュリティチームはあなたに問題を解決するための修正に関する進捗報告、及びに詳細の発表に尽力します。状況によっては、問題の詳細や発生した環境などについてあなたに尋ねることもあります。これらの更新は5日おきに送信することになっていますが、実際は毎24-48時間以内に送られています。

<!--
### Node.js Bug Bounty Program

The Node.js project engages in an official bug bounty program for security researchers and responsible public disclosures.

The program is managed through the HackerOne platform at [https://hackerone.com/nodejs](https://hackerone.com/nodejs) with further details.

-->

### Node.js 脆弱性報奨金プログラム

Node.js は、セキュリティ研究者と責任ある一般公開のための公式の脆弱性報奨金プログラムに取り組んでいます。

プログラムは HackerOne プラットフォーム [https://hackerone.com/nodejs](https://hackerone.com/nodejs) を通じて管理されています。さらなる詳細はリンクからご確認ください。

<!--

## Reporting a Bug in a third party module

Security bugs in third party modules should be reported to their respective maintainers and should also be coordinated
through the Node Ecosystem Security Team via [HackerOne](https://hackerone.com/nodejs-ecosystem).

Details regarding this process can be found in the [Security Working Group repository](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md).

Thank you for improving the security of Node.js and its ecosystem. Your efforts and responsible disclosure are greatly
appreciated and will be acknowledged.
-->

## サードパーティのモジュールの脆弱性を報告する

サードパーティモジュールのセキュリティバグはそれぞれのメンテナに報告されるべきであり、また [HackerOne](https://hackerone.com/nodejs-ecosystem) の Node エコシステムセキュリティチームを通じて調整されるべきです。

このプロセスの詳細は [セキュリティワーキンググループリポジトリ](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md) に記載されています。

Node.js とそのエコシステムのセキュリティを向上に協力いただきありがとうございます。あなたの努力と責任ある開示は大いに感謝されていて、認められるでしょう。

<!--
## Disclosure Policy

Here is the security disclosure policy for Node.js

* The security report is received and is assigned a primary handler. This person will coordinate the fix and release
process. The problem is confirmed and a list of all affected versions is determined. Code is audited to find any
potential similar problems. Fixes are prepared for all releases which are still under maintenance. These fixes are not
committed to the public repository but rather held locally pending the announcement.

* A suggested embargo date for this vulnerability is chosen and a CVE (Common Vulnerabilities and Exposures (CVE®))
is requested for the vulnerability.

* On the embargo date, the Node.js security mailing list is sent a copy of the announcement. The changes are pushed to
the public repository and new builds are deployed to nodejs.org. Within 6 hours of the mailing list being notified, a
copy of the advisory will be published on the Node.js blog.

* Typically the embargo date will be set 72 hours from the time the CVE is issued. However, this may vary depending on
the severity of the bug or difficulty in applying a fix.

* This process can take some time, especially when coordination is required with maintainers of other projects. Every
effort will be made to handle the bug in as timely a manner as possible; however, it’s important that we follow the
release process above to ensure that the disclosure is handled in a consistent manner.
-->

## 情報開示のポリシー

Node.js における、情報開示のポリシーをここに記します。

* 脆弱性が報告されると、主要なメンバーがアサインされます。このメンバーは、修正とリリースのプロセスを調整します。脆弱性が確認されたら、影響のある全てのバージョンのリストを作成します。コードは、潜在的な同様の問題があるか精査されます。修正は、メンテナンスされている全てのバージョンに向けて用意されます。これらの修正は、正式なアナウンスを行うまでは公開リポジトリには追加されません。

* CVE (Common Vulnerabilities and Exposures (CVE®)) により、脆弱性に関する情報解禁日が提案され、それを決定します。

* 情報解禁日に、Node.js のメーリングリストに公式発表と同様のものが送信されます。修正済みのバージョンは、公開リポジトリに送信され、新しいビルドが nodejs.org に置かれます。メーリングリストに共有されてから6時間以内に、セキュリティ勧告を Node.js のブログにて行います。

* 一般的に情報解禁日は、CVEに報告されてから72時間と設定されます。しかし、脆弱性を修正する複雑さによってはこの限りではありません。

* このプロセスは他のプロジェクトの管理者との調整を必要とする際など、ときに時間を要することがあります。可能な限り迅速にバグを修正するために尽力するだけでなく、一貫性のあるプロセスで情報開示を行うために上記のリリースプロセスを従うこともまた重要です。

<!--
## Receiving Security Updates

Security notifications will be distributed via the following methods.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>
-->

## セキュリティリポートを受け取る

セキュリティリポートは、以下のサイトを介して報告されます。

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

<!--
## Comments on this Policy

If you have suggestions on how this process could be improved please submit a [pull request](https://github.com/nodejs/nodejs.org)
or [file an issue](https://github.com/nodejs/security-wg/issues/new) to discuss.
-->

## このポリシーに関して提案をする

このプロセスを改善するための提案をお持ちの際は、[プルリクエスト](https://github.com/nodejs/nodejs.org)を送るか、 [イシュー](https://github.com/nodejs/security-wg/issues/new) にて報告をお願いします。
