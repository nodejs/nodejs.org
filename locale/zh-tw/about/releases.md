---
layout: about-release-schedule.hbs
title: 發布版
statuses:
  maintenance: '維護 LTS'
  active: '活躍 LTS'
  current: '最新版'
  pending: '待發布版'
columns:
  - '發布版'
  - '狀態'
  - '內部代號'
  - '初始發布版'
  - '活躍 LTS 週期開始'
  - '維護 LTS 週期開始'
  - '結束生命週期'
schedule-footer: 日期會隨時變更。
---

# 發布版

主要 Node.js 版本會進入為時 6 個月的 _最新版_ 發布狀態，以讓函式庫作者有時間支援。
6 個月後，奇數版號（9、11 等等）會不再受支援，而偶數版號（10、12 等等）會移至 _活躍 LTS_ 狀態並準備日常使用。
_LTS_ 發布版狀態指「長期維護」，通常保證會在 30 個月的維護期間內修復發現的嚴重臭蟲。
生產環境的應用程式應只使用 _活躍 LTS_ 或 _維護 LTS_ 版本。
