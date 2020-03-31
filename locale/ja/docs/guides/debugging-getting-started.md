---
title: デバッグ - 入門
layout: docs.hbs
---

# デバッグガイド

This guide will help you get started debugging your Node.js apps and scripts.

## インスペクタを有効にする

このガイドは、Node.js アプリケーションとスクリプトのデバッグを開始するのに役立ちます。

Inspector clients must know and specify host address, port, and UUID to connect. A full URL will look something like `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

`--inspect` スイッチを指定して起動すると、Node.js プロセスはデバッグクライアントを待機します。 デフォルトでは、ホストとポート 127.0.0.1:9229 で待機します。 各プロセスには固有の [UUID](https://tools.ietf.org/html/rfc4122) も割り当てられています。

---
## セキュリティへの影響

インスペクタクライアントは、接続するホストアドレス、ポート、および UUID を認識して指定する必要があります。 フル URL は、 `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e` のようになります。

### デバッグポートを公開するのは危険です

Node.js は、`SIGUSR1` シグナルを受信した場合にもデバッグメッセージの受信を開始します (`SIGUSR1` は Windows では使用できません)。 Node.js 7 以前では、これにより古い Debugger API がアクティブになります。 Node.js 8 以降では、Inspector API を起動します。

By default `node --inspect` binds to 127.0.0.1. You explicitly need to provide a public IP address or 0.0.0.0, etc., if you intend to allow external connections to the debugger. Doing so may expose you to a potentially significant security threat. We suggest you ensure appropriate firewalls and access controls in place to prevent a security exposure.

デバッガは Node.js 実行環境にフルアクセスできるため、 このポートに接続できる悪意のあるアクターが Node プロセスに代わって任意のコードを実行できる可能性があります。 パブリックおよびプライベートネットワークでデバッガポートを公開することによる セキュリティへの影響を理解することが重要です。

### ローカルアプリケーションはインスペクタにフルアクセスできます

Even if you bind the inspector port to 127.0.0.1 (the default), any applications running locally on your machine will have unrestricted access. This is by design to allow local debuggers to be able to attach conveniently.

### ブラウザ、WebSocket、および同一生成元ポリシー

デバッガがパブリック IP アドレス、または 0.0.0.0 にバインドされている場合、 自分の IP アドレスに到達できるクライアントは制限なしにデバッガに接続でき、 任意のコードを実行できます。

デフォルトでは、`node --inspect` は 127.0.0.1 にバインドします。 デバッガへの外部接続を許可する場合は、明示的にパブリック IP アドレスまたは 0.0.0.0 などを指定する必要があります。 これを行うと、潜在的に重大なセキュリティ上の脅威にさらされる可能性があります。 セキュリティ上の問題を防ぐために、適切なファイアウォールとアクセス制御を 適切に設定することをお勧めします。

## インスペクタクライアント

リモートデバッガクライアントの接続を安全に許可する方法については、 '[リモートデバッグシナリオの有効化](#enabling-remote-debugging-scenarios)'のセクションを参照してください。

### [node-inspect](https://github.com/nodejs/node-inspect)

* [Inspector プロトコル](https://chromedevtools.github.io/debugger-protocol-viewer/v8/)を使用する Node.js Foundation によってサポートされている CLI デバッガ
* バージョンは Node にバンドルされており、`node inspect myscript.js`と一緒に使うことができます
* 最新バージョンは独立してインストールすることもでき (例えば `npm install -g node-inspect`)、 `node-inspect myscript.js` と一緒に使うことができます

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Option 1**: Open `chrome://inspect` in a Chromium-based browser or `edge://inspect` in Edge. Click the Configure button and ensure your target host and port are listed.
* **Option 2**: Copy the `devtoolsFrontendUrl` from the output of `/json/list` (see above) or the --inspect hint text and paste into Chrome.

### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* デバッグパネルで、設定アイコンをクリックして `.vscode/launch.json` を開きます。初期設定は "Node.js" を選択してください

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* メニューから "デバッグ > デバッグの開始" を選択するか、F5 を押します
* [Detailed instructions](https://github.com/Microsoft/nodejstools/wiki/Debugging).

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ と他の JetBrains IDE

* 新しい Node.js デバッグ設定を作成して Debug をクリックします。Node.js 7 以降の場合、`--inspect` がデフォルトで使用されます。IDE レジストリで `js.debugger.node.use.inspect` のチェックを外します

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Inspector Protocol エンドポイントへの接続を容易にするためのライブラリ

### [Gitpod](https://www.gitpod.io)

* `Debug` ビュー から Node.js デバッグ設定を開始するか、`F5` を押します。[詳しい説明](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://eclipse.org/eclipseide) with Eclipse Wild Web Developer extension

* From a .js file, choose "Debug As... > Node program", or
* Create a Debug Configuration to attach debugger to running Node.js application (already started with `--inspect`).

---

## コマンドラインオプション

The following table lists the impact of various runtime flags on debugging:

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

## リモートデバッグシナリオを有効にする

インスペクタポートを 127.0.0.1 (デフォルト) にバインドしても、 マシン上でローカルに実行されているすべてのアプリケーションに無制限のアクセス権が与えられます。 これはローカルデバッガが便利にアタッチできるようにするための仕様です。

Let's say you are running Node.js on a remote machine, remote.example.com, that you want to be able to debug. On that machine, you should start the node process with the inspector listening only to localhost (the default).

```bash
node --inspect server.js
```

Web ブラウザで開かれた Web サイトは、ブラウザセキュリティモデルの下で WebSocket および HTTP リクエストを行うことができます。 一意のデバッガセッション ID を取得するには、 最初の HTTP 接続が必要です。 同一生成元ポリシーは、Web サイトがこの HTTP 接続を確立できないようにします。 [DNS リバインド攻撃](https://en.wikipedia.org/wiki/DNS_rebinding)に対するさらなるセキュリティのために、 Node.js は接続のための 'Host' ヘッダが IP アドレスまたは `localhost` もしくは `localhost6` を正確に指定していることを検証します。

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

これらのセキュリティポリシーでは、ホスト名を指定してリモートデバッグサーバーに接続することを禁止しています。 この制限を回避するには、IP アドレスを指定するか、 または後述のように ssh トンネルを使用します。

---

## レガシーデバッガ

**The legacy debugger has been deprecated as of Node.js 7.7.0. Please use `--inspect` and Inspector instead.**

一部の商用およびオープンソースのツールが Node の Inspector に接続できます。 これらに関する基本的な情報は次のとおりです。

The V8 Debugging Protocol is no longer maintained or documented.

### [node-inspector](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `node debug script_name.js` to start your script under the builtin command-line debugger. Your script starts in another Node.js process started with the `--debug-brk` option, and the initial Node.js process runs the `_debugger.js` script and connects to your target.

### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process which translates the Inspector Protocol used in Chromium to the V8 Debugger protocol used in Node.js.

<!-- refs -->

