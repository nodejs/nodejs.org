---
layout: security.hbs
title: 보안
---

<!--
# Security

## Reporting a Bug in Node.js

Report security bugs in Node.js via [HackerOne](https://hackerone.com/nodejs).

Your report will be acknowledged within 24 hours, and you’ll receive a more detailed response to your report within 48
hours indicating the next steps in handling your submission.
-->

# 보안

## Node.js 버그 보고

Node.js의 보안 버그는 [HackerOne](https://hackerone.com/nodejs)을 통해
보고해주시기 바랍니다.

보고된 내용은 24시간 이내에 확인될 것이고, 48시간 이내에 다음 처리 단계를
안내하는 자세한 답변을 받게 될 것입니다.

<!--
After the initial reply to your report, the security team will endeavor to keep you informed of the progress being made
towards a fix and full announcement, and may ask for additional information or guidance surrounding the reported issue.
These updates will be sent at least every five days; in practice, this is more likely to be every 24-48 hours.
-->

보고한 내용에 첫 답변을 한 후 보안 팀은 수정사항과 전체 공지를 만드는 과정을 보고자에게 계속 알려주려고
노력할 것입니다. 보고된 이슈에 대한 추가 정보나 안내를 물어볼 수도 있습니다. 이러한 진행사항은
최소 5일마다 계속 알려줄 것입니다만 실제로는 24~48시간마다 알려줄 가능성이 큽니다.

<!--
### Node.js Bug Bounty Program

The Node.js project engages in an official bug bounty program for security researchers and responsible public disclosures.

The program is managed through the HackerOne platform at <https://hackerone.com/nodejs> with further details.
-->

### Node.js 버그 바운티 프로그램

Node.js 프로젝트는 보안 연구자와 책임 있는 공개를 위해 공식 버그 바운티 프로그램에 참여합니다.

이 프로그램은 HackerOne 플랫폼을 통해 관리되며, 자세한 사항은
<https://hackerone.com/nodejs>에서 확인하실 수 있습니다.

<!--
## Reporting a Bug in a third party module

Security bugs in third party modules should be reported to their respective maintainers and should also be coordinated
through the Node Ecosystem Security Team via [HackerOne](https://hackerone.com/nodejs-ecosystem).

Details regarding this process can be found in the [Security Working Group repository](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md).

Thank you for improving the security of Node.js and its ecosystem. Your efforts and responsible disclosure are greatly
appreciated and will be acknowledged.
-->

## 서드 파티 모듈의 버그 제보하기

서드 파티 모듈의 보안 버그는 각 메인테이너에게 보고해야 하고
[HackerOne](https://hackerone.com/nodejs-ecosystem)의 Node 생태계 보안 팀을 통해 조정되어야 합니다.

절차에 관한 자세한 사항은 [보안 워킹 그룹 저장소](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md)에서
보실 수 있습니다.

Node.js와 Node.js 생태계의 보안을 개선해주셔서 감사드립니다. 당신이 들인 노력과 책임 있는 공개에 아주
감사드리고 이는 인정받을 것입니다.

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

## 공개 정책

다음은 Node.js의 보안 공개 정책입니다.

* 보안 보고를 받으면 1차 담당자에게 할당됩니다. 이 사람은 수정사항과 릴리스 절차를 조율합니다.
  해당 문제가 확인되면 영향을 받는 버전 목록을 결정합니다. 잠재적으로 비슷한 문제를 일으킬 수 있는
  코드를 점검합니다. 관리 중인 모든 릴리스 버전에 대한 수정사항을 준비합니다. 이 수정사항은
  공개 저장소에 커밋하지 않고 공지할 때까지 로컬에 보관해 둡니다.

* 해당 취약점에 대한 공개 금지 날짜를 결정하고
  CVE(Common Vulnerabilities and Exposures (CVE®))를 요청합니다.

* 공개 금지 날짜가 끝나면 Node.js 보안 메일링 리스트로 공지의 복사본을 보냅니다. 수정사항을 공개
  저장소에 올리고 새로운 빌드를 nodejs.org에 배포합니다. 메일링 리스트에 공지하고 6시간 이내에
  권고안의 복사본을 Node.js 블로그에 발행합니다.

* 보통 공개 금지 날짜는 CVE가 발급된 후 72시간으로 정하지만, 버그의 심각도나 수정의 어려움에 따라
  달라질 수 있습니다.

* 이 절차는 시간이 걸릴 수 있고 다른 프로젝트의 메인테이너들과의 협업이 필요한 경우에는 더 오랜 시간이
  걸릴 수 있습니다. 가능한 최적의 시기에 버그를 처리하려고 노력할 것이지만 정보 공개를 일관되게 하려고
  위에서 설명한 릴리스 절차를 따르는 것이 중요합니다.

<!--
## Receiving Security Updates

Security notifications will be distributed via the following methods.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>
-->

## 보안 업데이트 받기

다음 방법으로 보안 공지를 합니다.

* <https://groups.google.com/group/nodejs-sec>
* <https://nodejs.org/en/blog/>

<!--
## Comments on this Policy

If you have suggestions on how this process could be improved please submit a [pull request](https://github.com/nodejs/nodejs.org)
or [file an issue](https://github.com/nodejs/security-wg/issues/new) to discuss.
-->

## 이 정책에 대한 의견

이 절차를 개선하기 위한 의견이 있다면 논의를 위해 [풀 리퀘스트](https://github.com/nodejs/nodejs.org)를 올리거나
[이슈를 생성](https://github.com/nodejs/security-wg/issues/new)해주시기 바랍니다.
