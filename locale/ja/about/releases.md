---
layout: about-release-schedule.hbs
title: リリース
statuses:
  maintenance: 'メンテナンス LTS'
  active: 'アクティブ LTS'
  current: '現行'
  pending: '次期'
columns:
  - 'リリース'
  - 'ステータス'
  - 'コードネーム'
  - '初回リリース'
  - 'アクティブ LTS 開始'
  - 'メンテナンス LTS 開始'
  - 'サポート終了'
schedule-footer: 日程は変更される場合があります。
---

<!--

# Releases

Major Node.js versions enter _Current_ release status for six months, which gives library authors time to add support for them.
After six months, odd-numbered releases (9, 11, etc.) become unsupported, and even-numbered releases (10, 12, etc.) move to _Active LTS_ status and are ready for general use.
_LTS_ release status is "long-term support", which typically guarantees that critical bugs will be fixed for a total of 30 months.
Production applications should only use _Active LTS_ or _Maintenance LTS_ releases.

-->

# リリース

Node.js のメジャーバージョンは 6 ヶ月間 _現行_ リリースの状態になり、ライブラリの作者はそれらのサポートを追加する時間を与えられます。
6 ヶ月後、奇数番号のリリース (9, 11 など) はサポートされなくなり、偶数番号のリリース (10, 12 など) は _アクティブ LTS_ ステータスに移行し、一般的に使用できるようになります。
_LTS_ のリリースステータスは「長期サポート」であり、基本的に重要なバグは 30 ヶ月の間修正されることが保証されています。
プロダクションアプリケーションでは、_アクティブ LTS_ または _メンテナンス LTS_ リリースのみを使用してください。
