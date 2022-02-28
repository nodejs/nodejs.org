---
title: 診断 - フレームのグラフ
layout: docs.hbs
---

<!--
# Flame Graphs

## What's a flame graph useful for?

Flame graphs are a way of visualizing CPU time spent in functions. They can help you pin down where you spend too much time doing synchronous operations.

-->
# フレームのグラフ

## フレームグラフは何に役立ちますか？

フレームグラフは、関数で費やされた CPU 時間を視覚化する方法です。同期処理に時間がかかりすぎる場所を特定するのに役立ちます。

<!--
## How to create a flame graph

You might have heard creating a flame graph for Node.js is difficult, but that's not true (anymore).
Solaris vms are no longer needed for flame graphs!

Flame graphs are generated from `perf` output, which is not a node-specific tool. While it's the most powerful way to visualize CPU time spent, it may have issues with how JavaScript code is optimized in Node.js 8 and above. See [perf output issues](#perf-output-issues) section below.

-->
## フレームグラフの作り方

Node.js のフレームグラフを作成するのは難しいと聞いたことがあるかもしれませんが、(もはや) そうではありません。
Solaris vms はフレームグラフには不要です。

フレームグラフは `perf` 出力から生成されます。これは Node 固有のツールではありません。これは、費やされた CPU 時間を視覚化する最も強力な方法ですが、Node.js 8 以降で JavaScript コードが最適化される方法に問題がある可能性があります。下記の[perf 出力の問題](#perf-output-issues) のセクションを参照してください。

<!--
### Use a pre-packaged tool

If you want a single step that produces a flame graph locally, try [0x](https://www.npmjs.com/package/0x)

For diagnosing production deployments, read these notes: [0x production servers](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md)

-->
### あらかじめパッケージ化されたツールを使う

部分的にフレームグラフを作成する単一のステップが必要な場合は、[0x](https://www.npmjs.com/package/0x) を試してください。

運用環境のデプロイメントを診断するために、[0x 運用サーバ](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md) という注意書きを読みましょう。

<!--
### Create a flame graph with system perf tools

The purpose of this guide is to show steps involved in creating a flame graph and keep you in control of each step.

If you want to understand each step better take a look at the sections that follow were we go into more detail.

Now let's get to work.

-->
### システムパフォーマンスツールでフレームグラフを作成する

このガイドの目的は、フレームグラフの作成に関連する手順を示し、各手順を管理し続けることです。

それぞれのステップをよりよく理解したいならば、続くセクションを見てください。

それでは作業に取り掛かりましょう。

<!--
1. Install `perf` (usually available through the linux-tools-common package if not already installed)
2. try running `perf` - it might complain about missing kernel modules, install them too
3. run node with perf enabled (see [perf output issues](#perf-output-issues) for tips specific to Node.js versions)
```bash
perf record -e cycles:u -g -- node --perf-basic-prof app.js
```
4. disregard warnings unless they're saying you can't run perf due to missing packages; you may get some warnings about not being able to access kernel module samples which you're not after anyway.
5. Run `perf script > perfs.out` to generate the data file you'll visualize in a moment. It's useful to [apply some cleanup](#filtering-out-node-internal-functions) for a more readable graph
6. install stackvis if not yet installed `npm i -g stackvis`
7. run `stackvis perf < perfs.out > flamegraph.htm`

-->

1. `perf` をインストールします (まだインストールされていなければ、通常 linux-tools-common パッケージ経由で利用可能です)
2. `perf` を実行してみてください - カーネルモジュールが足りないと表示されるかもしれません、それらもインストールしてください
3. perf を有効にして node を実行します (Node.js のバージョンに固有のヒントについては [perf の出力の問題](#perf-output-issues) を参照してください)

    ```bash
    perf record -e cycles:u -g -- node --perf-basic-prof app.js
    ```

4. パッケージが足りないために perf を実行できないと表示されていない限り、警告を無視してください。カーネルモジュールのサンプルにアクセスできないという警告が表示されることがあります
5. `perf script > perfs.out` を実行して、すぐに視覚化できるデータファイルを生成します。読みやすいグラフに[クリーンアップを適用する](#filtering-out-node-internal-functions)と便利です
6. stackvis がインストールされていない場合は、`npm i -g stackvis`を実行して stackvis をインストールします
7. `stackvis perf < perfs.out > flamegraph.htm` を実行します

<!--
Now open the flame graph file in your favorite browser and watch it burn. It's color-coded so you can focus on the most saturated orange bars first. They're likely to represent CPU heavy functions.

Worth mentioning - if you click an element of a flame graph a zoom-in of its surroundings will get displayed above the graph.

-->
お気に入りのブラウザでフレームグラフファイルを開いて、それが出力されるのを見てください。色分けされているので、最初に最も彩度の高いオレンジ色のバーに集中できます。それらは CPU を多用する機能を表している可能性があります。

言及する価値のあること - フレームグラフの要素をクリックするならば、その周囲のズームインはグラフの上に表示されるでしょう。

<!--
### Using `perf` to sample a running process

This is great for recording flame graph data from an already running process that you don't want to interrupt. Imagine a production process with a hard to reproduce issue.

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

Wait, what is that `sleep 3` for? It's there to keep the perf running - despite `-p` option pointing to a different pid, the command needs to be executed on a process and end with it.
perf runs for the life of the command you pass to it, whether or not you're actually profiling that command. `sleep 3` ensures that perf runs for 3 seconds.

Why is `-F` (profiling frequency) set to 99? It's a reasonable default. You can adjust if you want.
`-F99` tells perf to take 99 samples per second, for more precision increase the value. Lower values should produce less output with less precise results. Precision you need depends on how long your CPU intensive functions really run. If you're looking for the reason of a noticeable slowdown, 99 frames per second should be more than enough.

After you get that 3 second perf record, proceed with generating the flame graph with the last two steps from above.

-->
### `perf`を使って実行中のプロセスをサンプリングする

これは、中断したくない、既に実行中のプロセスからフレームグラフデータを記録するのに最適です。再現が困難な問題を伴う製造プロセスを想像してください。

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

ちょっと待ってください、何のための `sleep 3` でしょうか？ それはperf を実行し続けるためにあります。`-p` オプションが異なる pid を指していますが、コマンドはプロセス上で実行され、そこで終了する必要があります。perf は、実際にそのコマンドをプロファイリングしているかどうかにかかわらず、渡したコマンドの存続期間にわたって実行されます。`sleep 3` は perf が 3 秒間実行されるようにします。

`-F` (プロファイリング頻度) が 99 に設定されているのはなぜですか？ これは妥当なデフォルトの値です。必要に応じて調整できます。`-F99` はサンプルを毎秒 99 取るように perf に指示します。より正確にするには値を増やします。値が低いと出力が少なくなり、精度が低下します。必要な精度は、CPU に負荷がかかる機能が実際にどれくらいの時間実行されるかによって異なります。顕著な減速の理由を探しているなら、毎秒 99 フレームで十分すぎるはずです。

その 3 秒の perf レコードを取得したら、上に書いてある手順の最後の2つを実施してフレームグラフの生成に進みます。

<!--
### Filtering out Node.js internal functions

Usually you just want to look at the performance of your own calls, so filtering out Node.js and V8 internal functions can make the graph much easier to read. You can clean up your perf file with:

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

If you read your flame graph and it seems odd, as if something is missing in the key function taking up most time, try generating your flame graph without the filters - maybe you got a rare case of an issue with Node.js itself.

-->
### Node.js の内部関数を除外する

通常、自身の呼び出しのパフォーマンスを見たいだけなので、Node.js と V8 の内部関数を除外することでグラフをもっと読みやすくすることができます。次のようにして perf ファイルをクリーンアップできます。

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

フレームグラフを参照していて、何か時間がかかるキー関数が欠けているかのように不思議に思った場合は、フィルタなしでフレームグラフを生成してみてください。Node.js 自体に問題が発生することはまれです。

<!--
### Node.js's profiling options

`--perf-basic-prof-only-functions` and `--perf-basic-prof` are the two that are useful for debugging your JavaScript code. Other options are used for profiling Node.js itself, which is outside the scope of this guide.

`--perf-basic-prof-only-functions` produces less output, so it's the option with least overhead.

-->
### Node.js のプロファイリングオプション

`--perf-basic-prof-only-functions` と `--perf-basic-prof` は JavaScript コードをデバッグするのに便利です。Node.js 自体をプロファイリングするために他のオプションが使用されますが、これはこのガイドの範囲外です。

`--perf-basic-prof-only-functions` は出力が少なくなるので、オーバーヘッドが最も少ないオプションです。

<!--
### Why do I need them at all?

Well, without these options you'll still get a flame graph, but with most bars labeled `v8::Function::Call`.

-->
### どうしてそれらを全く必要としないのですか？

ええ、これらのオプションがなくてもフレームグラフが得られますが、ほとんどのバーには `v8::Function::Call` というラベルが付いています。

<!--
## `perf` output issues

### Node.js 8.x V8 pipeline changes

Node.js 8.x and above ships with new optimizations to JavaScript compilation pipeline in V8 engine which makes function names/references unreachable for perf sometimes. (It's called Turbofan)

The result is you might not get your function names right in the flame graph.

You'll notice `ByteCodeHandler:` where you'd expect function names.

[0x](https://www.npmjs.com/package/0x) has some mitigations for that built in.

For details see:
* https://github.com/nodejs/benchmarking/issues/168
* https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

-->
## `perf`出力の問題

### Node.js 8.x V8 パイプラインの変更

Node.js 8.x 以降には、V8 エンジンの JavaScript コンパイルパイプラインに対する新しい最適化が付属しているため、関数名/参照がperf にアクセスできない場合があります。(それはターボファンと呼ばれています)

その結果、関数名がフレームグラフの中で正しく得られないかもしれません。

あなたは、関数名を期待するところで `ByteCodeHandler:` に気付くでしょう。

[0x](https://www.npmjs.com/package/0x) にはいくつかの緩和策が組み込まれています。

詳細:

* https://github.com/nodejs/benchmarking/issues/168
* https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

<!--
### Node.js 10+

Node.js 10.x addresses the issue with Turbofan using the `--interpreted-frames-native-stack` flag.

Run `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` to get function names in the flame graph regardless of which pipeline V8 used to compile your JavaScript.

-->
### Node.js 10 以降

Node.js 10.x は Turbofan の問題に `--interpreted-frames-native-stack` フラグを使って対処します。

JavaScript をコンパイルするためにどの V8 パイプラインが使用されたかにかかわらず、フレームグラフの関数名を得るために `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` を実行してください。

<!--
### Broken labels in the flame graph

If you're seeing labels looking like this
```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```
it means the Linux perf you're using was not compiled with demangle support, see https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 for example

-->
### フレームグラフのラベルが壊れている

このようなラベルが表示されている場合

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

それは使っている Linux の perf が demangle サポート付きでコンパイルされていないことを意味します。例は https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 を参照してください。

<!--
## Examples

Practice capturing flame graphs yourself with [a flame graph exercise](https://github.com/naugtur/node-example-flamegraph)!

-->
## 例

[フレームグラフ演習](https://github.com/naugtur/node-example-flamegraph)を使用してフレームグラフを自分でキャプチャする練習をしてください!
