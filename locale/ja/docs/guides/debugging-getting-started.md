---
title: デバッグ - 入門
layout: docs.hbs
---

<!--
# Debugging Guide

This guide will help you get started debugging your Node.js apps and scripts.

-->
# デバッグガイド

このガイドは、Node.js アプリケーションとスクリプトのデバッグを開始するのに役立ちます。

<!--
## Enable Inspector

When started with the `--inspect` switch, a Node.js process listens for a
debugging client. By default, it will listen at host and port 127.0.0.1:9229.
Each process is also assigned a unique [UUID][].

Inspector clients must know and specify host address, port, and UUID to connect.
A full URL will look something like
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js will also start listening for debugging messages if it receives a
`SIGUSR1` signal. (`SIGUSR1` is not available on Windows.) In Node.js 7 and
earlier, this activates the legacy Debugger API. In Node.js 8 and later, it will
activate the Inspector API.

---
-->
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
<!--
## Security Implications

Since the debugger has full access to the Node.js execution environment, a
malicious actor able to connect to this port may be able to execute arbitrary
code on behalf of the Node process. It is important to understand the security
implications of exposing the debugger port on public and private networks.

-->
## セキュリティへの影響

デバッガは Node.js 実行環境にフルアクセスできるため、
このポートに接続できる悪意のあるアクターが Node プロセスに代わって任意のコードを実行できる可能性があります。
パブリックおよびプライベートネットワークでデバッガポートを公開することによる
セキュリティへの影響を理解することが重要です。

<!--
### Exposing the debug port publicly is unsafe

If the debugger is bound to a public IP address, or to 0.0.0.0, any clients that
can reach your IP address will be able to connect to the debugger without any
restriction and will be able to run arbitrary code.

By default `node --inspect` binds to 127.0.0.1. You explicitly need to provide a
public IP address or 0.0.0.0, etc., if you intend to allow external connections
to the debugger. Doing so may expose you a potentially significant security
threat. We suggest you ensure appropriate firewalls and access controls in place
to prevent a security exposure.

See the section on '[Enabling remote debugging scenarios](#enabling-remote-debugging-scenarios)' on some advice on how
to safely allow remote debugger clients to connect.

-->
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

<!--
### Local applications have full access to the inspector

Even if you bind the inspector port to 127.0.0.1 (the default), any applications
running locally on your machine will have unrestricted access. This is by design
to allow local debuggers to be able to attach conveniently.

-->
### ローカルアプリケーションはインスペクタにフルアクセスできます

インスペクタポートを 127.0.0.1 (デフォルト) にバインドしても、
マシン上でローカルに実行されているすべてのアプリケーションに無制限のアクセス権が与えられます。
これはローカルデバッガが便利にアタッチできるようにするための仕様です。

<!--
### Browsers, WebSockets and same-origin policy

Websites open in a web-browser can make WebSocket and HTTP requests under the
browser security model. An initial HTTP connection is necessary to obtain a
unique debugger session id. The same-origin-policy prevents websites from being
able to make this HTTP connection. For additional security against
[DNS rebinding attacks](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
verifies that the 'Host' headers for the connection either
specify an IP address or `localhost` or `localhost6` precisely.

These security policies disallow connecting to a remote debug server by
specifying the hostname. You can work-around this restriction by specifying
either the IP address or by using ssh tunnels as described below.

-->
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

<!--
## Inspector Clients

Several commercial and open source tools can connect to Node's Inspector. Basic
info on these follows:

-->
## インスペクタクライアント

一部の商用およびオープンソースのツールが Node の Inspector に接続できます。
これらに関する基本的な情報は次のとおりです。

<!--
#### [node-inspect](https://github.com/nodejs/node-inspect)

* CLI Debugger supported by the Node.js Foundation which uses the [Inspector Protocol][].
* A version is bundled with Node and can be used with `node inspect myscript.js`.
* The latest version can also be installed independently (e.g. `npm install -g node-inspect`)
  and used with `node-inspect myscript.js`.

-->
### [node-inspect](https://github.com/nodejs/node-inspect)

* [Inspector プロトコル][]を使用する Node.js Foundation によってサポートされている CLI デバッガ
* バージョンは Node にバンドルされており、`node inspect myscript.js`と一緒に使うことができます
* 最新バージョンは独立してインストールすることもでき (例えば `npm install -g node-inspect`)、 `node-inspect myscript.js` と一緒に使うことができます

<!--
#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Option 1**: Open `chrome://inspect` in a Chromium-based
  browser. Click the Configure button and ensure your target host and port
  are listed.
* **Option 2**: Copy the `devtoolsFrontendUrl` from the output of `/json/list`
  (see above) or the --inspect hint text and paste into Chrome.

-->
### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **オプション 1**: Chromium ベースのブラウザで `chrome://inspect` を開きます。設定ボタンをクリックして、ターゲットホストとポートが表示されていることを確認します。
* **オプション 2**: `/json/list`の出力 (上記を参照) または --inspect ヒントテキストから `devtoolsFrontendUrl` をコピーして Chrome に貼り付けます

<!--
#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* In the Debug panel, click the settings icon to open `.vscode/launch.json`.
  Select "Node.js" for initial setup.

-->
### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* デバッグパネルで、設定アイコンをクリックして `.vscode/launch.json` を開きます。初期設定は "Node.js" を選択してください

<!--
#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Choose "Debug > Start Debugging" from the menu or hit F5.
* [Detailed instructions](https://github.com/Microsoft/nodejstools/wiki/Debugging).

-->
### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* メニューから "デバッグ > デバッグの開始" を選択するか、F5 を押します
* [詳しい説明](https://github.com/Microsoft/nodejstools/wiki/Debugging)

<!--
#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ and other JetBrains IDEs

* Create a new Node.js debug configuration and hit Debug. `--inspect` will be used
  by default for Node.js 7+. To disable uncheck `js.debugger.node.use.inspect` in
  the IDE Registry.

-->
### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ と他の JetBrains IDE

* 新しい Node.js デバッグ設定を作成して Debug をクリックします。Node.js 7 以降の場合、`--inspect` がデフォルトで使用されます。IDE レジストリで `js.debugger.node.use.inspect` のチェックを外します

<!--
#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Library to ease connections to Inspector Protocol endpoints.

-->
### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Inspector Protocol エンドポイントへの接続を容易にするためのライブラリ

<!--
#### [Gitpod](https://www.gitpod.io)

* Start a Node.js debug configuration from the `Debug` view or hit `F5`. [Detailed instructions](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

---

-->
### [Gitpod](https://www.gitpod.io)

* `Debug` ビュー から Node.js デバッグ設定を開始するか、`F5` を押します。[詳しい説明](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

---

<!--
## Command-line options

The following table lists the impact of various runtime flags on debugging:

<table class="table-no-border-no-padding">
  <tr><th>Flag</th><th>Meaning</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on default address and port (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Bind to address or hostname <em>host</em> (default: 127.0.0.1)</li>
        <li>Listen on port <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on default address and port (127.0.0.1:9229)</li>
        <li>Break before user code starts</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Bind to address or hostname <em>host</em> (default: 127.0.0.1)</li>
        <li>Listen on port <em>port</em> (default: 9229)</li>
        <li>Break before user code starts</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Spawn child process to run user's script under --inspect flag;
            and use main process to run CLI debugger.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Spawn child process to run user's script under --inspect flag;
            and use main process to run CLI debugger.</li>
        <li>Listen on port <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

-->
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

<!--
## Enabling remote debugging scenarios

We recommend that you never have the debugger listen on a public IP address. If
you need to allow remote debugging connections we recommend the use of ssh
tunnels instead. We provide the following example for illustrative purposes only.
Please understand the security risk of allowing remote access to a privileged
service before proceeding.

Let's say you are running Node on remote machine, remote.example.com, that you
want to be able to debug. On that machine, you should start the node process
with the inspector listening only to localhost (the default).

```bash
node --inspect server.js
```

Now, on your local machine from where you want to initiate a debug client
connection, you can setup an ssh tunnel:

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

This starts a ssh tunnel session where a connection to port 9221 on your local
machine will be forwarded to port 9229 on remote.example.com. You can now attach
a debugger such as Chrome DevTools or Visual Studio Code to localhost:9221,
which should be able to debug as if the Node.js application was running locally.

---

-->

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

<!--
## Legacy Debugger

**The legacy debugger has been deprecated as of Node 7.7.0. Please use --inspect
and Inspector instead.**

When started with the **--debug** or **--debug-brk** switches in version 7 and
earlier, Node.js listens for debugging commands defined by the discontinued
V8 Debugging Protocol on a TCP port, by default `5858`. Any debugger client
which speaks this protocol can connect to and debug the running process; a
couple popular ones are listed below.

The V8 Debugging Protocol is no longer maintained or documented.

-->
## レガシーデバッガ

**レガシーデバッガは Node 7.7.0 の時点で非推奨になりました。代わりに --inspect と Inspector を使ってください。**

バージョン7以前の **--debug** または **--debug-brk** スイッチを指定して起動すると、
Node.js は TCP ポートで廃止された V8 デバッグプロトコルで定義されている
デバッグコマンド (デフォルトでは `5858`) を待ち受けます。
これで実行中のプロセスに接続してデバッグできます。
いくつかのポピュラーなものは以下のとおりです。

V8 デバッグプロトコルは、もはや保守もドキュメンテーションもされていません。

<!--
#### [Built-in Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `node debug script_name.js` to start your script under Node's builtin
command-line debugger. Your script starts in another Node process started with
the `--debug-brk` option, and the initial Node process runs the `_debugger.js`
script and connects to your target.

-->
### [組み込みデバッガ](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Node の組み込みコマンドラインデバッガの下でスクリプトを起動するには、
`node debug script_name.js` を起動します。
スクリプトは `--debug-brk` オプションで開始された別のノードプロセスで開始され、
最初のノードプロセスは `_debugger.js` スクリプトを実行してターゲットに接続します。

<!--
#### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process
which translates the Inspector Protocol used in Chromium to the V8 Debugger
protocol used in Node.js.

-->
### [node-inspector](https://github.com/node-inspector/node-inspector)

Chromium で使用されるインスペクタプロトコルを
Node.js で使用される V8 デバッガプロトコルに変換する中間プロセスを使用して、
Chrome DevTools で Node.js アプリケーションをデバッグします。

<!-- refs -->

<!--
[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122

-->
[Inspector プロトコル]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
