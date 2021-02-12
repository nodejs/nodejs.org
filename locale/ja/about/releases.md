---
layout: about-release-schedule.hbs
title: リリース
statuses:
  maintenance: 'Maintenance LTS'
  active: 'Active LTS'
  current: 'Current'
  pending: 'Pending'
columns:
  - 'Release'
  - 'Status'
  - 'Codename'
  - 'Initial Release'
  - 'Active LTS Start'
  - 'Maintenance LTS Start'
  - 'End-of-life'
schedule-footer: Dates are subject to change.
---

# リリース

Node.js のメジャーバージョンは 6 ヶ月間 _Current_ リリースの状態になり、ライブラリの作者はそれらのサポートを追加する時間を与えられます。
6 ヶ月後、奇数番号のリリース (9, 11 など) はサポートされなくなり、偶数番号のリリース (10, 12 など) は _Active LTS_ ステータスに移行し、一般的に使用できるようになります。
_LTS_ のリリースステータスは「長期サポート」であり、通常、重要なバグが合計 30 ヶ月間修正されることが保証されています。
プロダクションアプリケーションでは、_Active LTS_ または _Maintenance LTS_ リリースのみを使用してください。
