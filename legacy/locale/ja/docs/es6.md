---
title: ECMAScript 2015 (ES6) とそれ以降のバージョン
layout: docs.hbs
---

<!-- # ECMAScript 2015 (ES6) and beyond -->
# ECMAScript 2015 (ES6) とそれ以降のバージョン

<!-- Node.js is built against modern versions of [V8](https://v8.dev/). By keeping up-to-date with the latest releases of this engine, we ensure new features from the [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) which are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements. -->

Node.js は [V8](https://v8.dev/) のモダンなバージョンに対して作られています。V8 を最新の状態に保つことで [JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) の新機能を開発者にすみやかに提供し、継続的なパフォーマンスと安定性の向上を保証しています。

<!-- All ECMAScript 2015 (ES6) features are split into three groups for **shipping**, **staged**, and **in progress** features: -->
すべての ECMAScript 2015 (ES6) の機能は **shipping（リリース済み）**、**staged（ステージング）** と **in progress（開発中）**の3つに分けられています：

<!-- * All **shipping** features, which V8 considers stable, are turned **on by default on Node.js** and do **NOT** require any kind of runtime flag.
* **Staged** features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--harmony`.
* **In progress** features can be activated individually by their respective harmony flag, although this is highly discouraged unless for testing purposes. Note: these flags are exposed by V8 and will potentially change without any deprecation notice. -->

* V8 が安定しているとみなす **shipping（リリース済み）** の機能は Node.js では**標準で有効**になっているので、ランタイムフラグは**必要ありません**。
* **staged（ステージング）**の機能は V8 チームによって安定しているとはみなされないほぼ完成した機能であり、ランタイムフラグを必要とします： `--harmony`。
* **in progress（開発中）**の機能は、それぞれのハーモニーフラグによって個別に有効にすることができますが、テスト目的以外の使用は避けてください。注：これらのフラグは V8 によって公開されており、廃止予定の通知なしで変更される可能性があります。

<!-- ## Which features ship with which Node.js version by default? -->
## どの機能がどの Node.js のバージョンで標準で有効になってますか？

<!-- The website [node.green](https://node.green/) provides an excellent overview over supported ECMAScript features in various versions of Node.js, based on kangax's compat-table. -->
[node.green](https://node.green/) は Kangax 氏の互換性テーブルに基づいて Node.js のさまざまなバージョンでサポートされている ECMAScript の機能に関する優れた概要を提供します。

<!-- ## Which features are in progress? -->
## どの機能が開発中なのか？

<!-- New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future Node.js release, although timing is unknown. -->
新しい機能は定期的に V8 に追加されています。一般的に、時期は未定ですが、将来の Node.js のリリースで有効になることを期待してください。

<!-- You may list all the *in progress* features available on each Node.js release by grepping through the `--v8-options` argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk: -->
`--v8-options` を引数に指定した実行結果を `grep "in progress"` することで各 Node.js のリリースで利用可能なすべてのの **in progress（開発中）**の機能を列挙することができます。これらはV8の機能完全ではなく動かない可能性があるので、自己責任で使用してください：

```bash
node --v8-options | grep "in progress"
```

<!-- ## I have my infrastructure set up to leverage the --harmony flag. Should I remove it? -->
## インフラ側で --harmony フラグを使うように設定しているんですが、フラグを除くべきですか？

<!-- The current behavior of the `--harmony` flag on Node.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on Node.js. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard. -->
Node.js の --harmony フラグの現在の動作は **staged（ステージング）** 機能のみを有効にすることです。つまるところ `--es_staging` フラグと同じです。上記の通り、これらはまだ安定しているとは考えられていない完成した機能です。特に本番環境で安定して Node.js を使いたい場合は、このランタイムフラグが標準で V8 でリリースされ、その結果 Node.js でも標準になるまでランタイムフラグを削除することを検討してください。このフラグを継続的に利用する場合は Node.js のアップグレードの際に標準に準拠するために変更された V8 に挙動によってコードが動作しなくなる可能性を考慮して対策をする必要があります。

<!-- ## How do I find which version of V8 ships with a particular version of Node.js? -->
## 特定のバージョンの Node.js が組み込まれている V8 のバージョンを確認するにはどうすればよいですか？

<!-- Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version: -->
Node.js は `process` グローバルオブジェクトを通じて特定のバイナリに付属するすべての依存関係とそれぞれのバージョンを簡単に列挙する方法を提供します。 V8 エンジンの場合は、端末に次のように入力してバージョンを取得します：

```bash
node -p process.versions.v8
```
