---
title: デバッグ - 入門
layout: docs.hbs
---


# デバッグガイド

このガイドは、Node.js アプリケーションとスクリプトのデバッグを開始するのに役立ちます。


## インスペクタを有効にする

`--inspect` スイッチを指定して起動すると、Node.js プロセスはデバッグクライアントを待機します。
デフォルトでは、ホストとポート 127.0.0.1:9229 で待機します。
各プロセスには固有の [UUID][] も割り当てられています。

インスペクタクライアントは、接続するホストアドレス、ポート、および UUID を認識して指定する必要があります。
フル URL は、
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e` のようになります。

Node.js は、`SIGUSR1` シグナルを受信した場合にもデバッグメッセージの受信を開始します
(`SIGUSR1` は Windows では使用できません)。
Node.js 7 以前では、これにより古い Debugger API がアクティブになります。
Node.js 8 以降では、Inspector API を起動します。

---

## セキュリティへの影響

デバッガは Node.js 実行環境にフルアクセスできるため、
このポートに接続できる悪意のあるアクターが Node プロセスに代わって任意のコードを実行できる可能性があります。
パブリックおよびプライベートネットワークでデバッガポートを公開することによる
セキュリティへの影響を理解することが重要です。


### デバッグポートを公開するのは危険です

デバッガがパブリック IP アドレス、または 0.0.0.0 にバインドされている場合、
自分の IP アドレスに到達できるクライアントは制限なしにデバッガに接続でき、
任意のコードを実行できます。

デフォルトでは、`node --inspect` は 127.0.0.1 にバインドします。
デバッガへの外部接続を許可する場合は、明示的にパブリック IP アドレスまたは 0.0.0.0 などを指定する必要があります。
これを行うと、潜在的に重大なセキュリティ上の脅威にさらされる可能性があります。
セキュリティ上の問題を防ぐために、適切なファイアウォールとアクセス制御を
適切に設定することをお勧めします。

リモートデバッガクライアントの接続を安全に許可する方法については、
'[リモートデバッグシナリオの有効化](#enabling-remote-debugging-scenarios)'のセクションを参照してください。


### ローカルアプリケーションはインスペクタにフルアクセスできます

インスペクタポートを 127.0.0.1 (デフォルト) にバインドしても、
マシン上でローカルに実行されているすべてのアプリケーションに無制限のアクセス権が与えられます。
これはローカルデバッガが便利にアタッチできるようにするための仕様です。


### ブラウザ、WebSocket、および同一生成元ポリシー

Web ブラウザで開かれた Web サイトは、ブラウザセキュリティモデルの下で
WebSocket および HTTP リクエストを行うことができます。
一意のデバッガセッション ID を取得するには、
最初の HTTP 接続が必要です。
同一生成元ポリシーは、Web サイトがこの HTTP 接続を確立できないようにします。
[DNS リバインド攻撃](https://en.wikipedia.org/wiki/DNS_rebinding)に対するさらなるセキュリティのために、
Node.js は接続のための 'Host' ヘッダが IP アドレスまたは `localhost` もしくは `localhost6` を正確に指定していることを検証します。

これらのセキュリティポリシーでは、ホスト名を指定してリモートデバッグサーバーに接続することを禁止しています。
この制限を回避するには、IP アドレスを指定するか、
または後述のように ssh トンネルを使用します。


## インスペクタクライアント

一部の商用およびオープンソースのツールが Node の Inspector に接続できます。
これらに関する基本的な情報は次のとおりです。


### [node-inspect](https://github.com/nodejs/node-inspect)

* [Inspector プロトコル][]を使用する Node.js Foundation によってサポートされている CLI デバッガ
* バージョンは Node にバンドルされており、`node inspect myscript.js`と一緒に使うことができます
* 最新バージョンは独立してインストールすることもでき (例えば `npm install -g node-inspect`)、 `node-inspect myscript.js` と一緒に使うことができます


### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **オプション 1**: Chromium ベースのブラウザで `chrome://inspect` を開きます。設定ボタンをクリックして、ターゲットホストとポートが表示されていることを確認します。
* **オプション 2**: `/json/list`の出力 (上記を参照) または --inspect ヒントテキストから `devtoolsFrontendUrl` をコピーして Chrome に貼り付けます


### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* デバッグパネルで、設定アイコンをクリックして `.vscode/launch.json` を開きます。初期設定は "Node.js" を選択してください


### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* メニューから "デバッグ > デバッグの開始" を選択するか、F5 を押します
* [詳しい説明](https://github.com/Microsoft/nodejstools/wiki/Debugging)


### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ と他の JetBrains IDE

* 新しい Node.js デバッグ設定を作成して Debug をクリックします。Node.js 7 以降の場合、`--inspect` がデフォルトで使用されます。IDE レジストリで `js.debugger.node.use.inspect` のチェックを外します


### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Inspector Protocol エンドポイントへの接続を容易にするためのライブラリ


### [Gitpod](https://www.gitpod.io)

* `Debug` ビュー から Node.js デバッグ設定を開始するか、`F5` を押します。[詳しい説明](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

---


## コマンドラインオプション

次の表は、デバッグ時のさまざまなランタイムフラグの影響を示しています。

<table class="table-no-border-no-padding">
  <tr><th>フラグ</th><th>意味</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>インスペクタエージェントを有効にする</li>
        <li>デフォルトのアドレスとポートで待機する (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>インスペクタエージェントを有効にする</li>
        <li>アドレスまたはホスト名 <em>host</em> にバインド (デフォルト: 127.0.0.1)</li>
        <li><em>port</em> ポートで待ち受ける (デフォルト: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>インスペクタエージェントを有効にする</li>
        <li>デフォルトのアドレスとポートで待機する (127.0.0.1:9229)</li>
        <li>ユーザーコードが始まる前に中断する</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>インスペクタエージェントを有効にする</li>
        <li>アドレスまたはホスト名 <em>host</em> にバインド (デフォルト: 127.0.0.1)</li>
        <li><em>port</em> ポートで待ち受ける (デフォルト: 9229)</li>
        <li>ユーザーコードが始まる前に中断する</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>--inspect フラグの下でユーザのスクリプトを実行するための子プロセスを生成します。そして CLI デバッガを動かすのに主要なプロセスを使用します</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>--inspect フラグの下でユーザのスクリプトを実行するための子プロセスを生成します。そして CLI デバッガを動かすのに主要なプロセスを使用します</li>
        <li><em>port</em> ポートで待ち受ける (デフォルト: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---



## <!--enabling-remote-debugging-scenarios-->リモートデバッグシナリオを有効にする

デバッガがパブリック IP アドレスを待ち受けないようにすることをお勧めします。
リモートデバッグ接続を許可する必要がある場合は、代わりに ssh トンネルを使用することをお勧めします。
以下の例は、説明のみを目的として提供されています。
続行する前に特権サービスへのリモートアクセスを許可することの
セキュリティリスクを理解してください。

リモートマシン remote.example.com で Node を実行していて、デバッグできるようにしたいとしましょう。
そのマシンでは、インスペクタが localhost (デフォルト) のみを監視して
ノードプロセスを開始する必要があります。

```bash
node --inspect server.js
```

これで、デバッグクライアント接続を開始したい場所から
ローカルマシンに SSH トンネルを設定できます。

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

これにより、ローカルマシンの 9221 ポートへの接続が
remote.example.com の 9229 ポートに転送される ssh トンネルセッションが開始されます。
これで、Chrome DevTools や Visual Studio Code などのデバッガを localhost:9221 にアタッチできます。
Node.js アプリケーションがローカルで実行されているかのようにデバッグできるはずです。

---


## レガシーデバッガ

**レガシーデバッガは Node 7.7.0 の時点で非推奨になりました。代わりに --inspect と Inspector を使ってください。**

バージョン7以前の **--debug** または **--debug-brk** スイッチを指定して起動すると、
Node.js は TCP ポートで廃止された V8 デバッグプロトコルで定義されている
デバッグコマンド (デフォルトでは `5858`) を待ち受けます。
これで実行中のプロセスに接続してデバッグできます。
いくつかのポピュラーなものは以下のとおりです。

V8 デバッグプロトコルは、もはや保守もドキュメンテーションもされていません。


### [組み込みデバッガ](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Node の組み込みコマンドラインデバッガの下でスクリプトを起動するには、
`node debug script_name.js` を起動します。
スクリプトは `--debug-brk` オプションで開始された別のノードプロセスで開始され、
最初のノードプロセスは `_debugger.js` スクリプトを実行してターゲットに接続します。


### [node-inspector](https://github.com/node-inspector/node-inspector)

Chromium で使用されるインスペクタプロトコルを
Node.js で使用される V8 デバッガプロトコルに変換する中間プロセスを使用して、
Chrome DevTools で Node.js アプリケーションをデバッグします。


[Inspector プロトコル]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
