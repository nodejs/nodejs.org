---
layout: security.hbs
title: 安全
---

# 安全

## 回報 Node.js 的臭蟲

Node.js 非常嚴肅地看待安全性臭蟲，所有的臭蟲都應回報至 [HackerOne](https://hackerone.com/nodejs)，其後將由專責安全問題的部門處理。

我們將在 24 小時內確認你的回報，並於 48 小時內回覆你後續處置的相關細節。

向你回覆初步的進展後，安全團隊將會持續讓你了解修補狀況及全面公告的進展，他們可能會向你詢問進一步的細節或尋求你對此問題的建議。我們至少每五天就會向你更新進展，通常每隔約 24-48 小時就會更新一次。

### Node.js 臭蟲獎勵計劃

Node.js 官方為了安全研究員們及負責的公開揭露而展開了一個臭蟲獎勵計劃。我們使用 HackerOne 管理計畫，詳情請見 [https://hackerone.com/nodejs](https://hackerone.com/nodejs)。

## 回報第三方模組中的臭蟲

第三方模組中的安全性臭蟲應向其維護者回報，且應透過 [HackerOne](https://hackerone.com/nodejs-ecosystem) 來協調。關於此流程的細節可參考安全性工作小組的 [Repository](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md)。

感謝你對於 Node.js 及其生態系安全性的改善，我們相當感謝並認可你的付出及負責任地揭露問題。

## 揭露政策

下列為 Node.js 之安全性揭露政策：

* 收到安全性的回報後我們會指派一個主要負責人，此人會負責確認問題，並協調修補、釋出的流程及確認受影響版本，審核程式碼以確保沒有其他類似問題，為所有維護中的版本提供修補程式，並確保這些修補程式不會在發布前被公開。

* 對此漏洞建議一個解禁日期 (Embargo Date)，並提出 CVE® (Common Vulnerabilities and Exposures)。

* Node.js 安全性郵件列表將於解禁日時以公告副本形式發出，並將更動推送至公開 repository 且部署新版本至 nodejs.org。諮詢副本將在通知郵件列表的六小時內發佈至 Node.js 部落格。

* 一般而言解禁日會訂於 CVE 發布的 72 小時後，但仍可能依照漏洞的複雜度及部署的困難度而有變化。

* 整個流程需要耗費不少時間，尤其在需要與其他專案的維護者協調的情況下更是如此，我們會盡力即時處理漏洞，最重要的是我們仍會遵循上述的流程來確保以一致的手段處理漏洞。

## 接收安全性更新

安全通告會由下列方式發布：

* [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
* [https://nodejs.org/en/blog/](https://nodejs.org/en/blog/)

## 對本政策的建言

若你對改善本流程有任何建議的話，請開一個 [pull request](https://github.com/nodejs/nodejs.org) 或是 [issue](https://github.com/nodejs/security-wg/issues/new) 來與我們一同討論。
