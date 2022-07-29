---
title: შეცდომების აღმოჩენა/აღმოფხვრა - პირველი ნაბიჯები
layout: docs.hbs
---

# Debugging Guide

წინამდებარე სახელმძღვანელო დაგეხმარებათ შეისწავლოთ Node.js-აპლიკაციებისა და სკრიპტების გამართვა.

## ინსპექტორის გააქტიურება

როდესაც `--inspect` არგუმენტით ეშვება, Node.js პროცესი უსმენს შეცდომათა აღმომჩენ
(გამმართავ) კლიენტს. ნაგულისხმევად, იგი მოუსმენს შემდეგ ჰოსტზე (*მასპინძელზე*) და პორტზე: 127.0.0.1:9229.
თითოეულ პროცესს ასევე ენიჭება უნიკალური [UUID][].

კავშირის დასამყარებლად ინსპექტორმა კლიენტებმა უნდა იცოდნენ და მიუთითონ ჰოსტის მისამართი, პორტი და UUID.
სრული URL დაახლოებით ასე უნდა გამოიყურებოდეს:
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js ასევე დაიწყებს გამართვის შეტყობინებათა მოსმენას, თუკი იგი მიიღებს `SIGUSR1` სიგნალს
(`SIGUSR1` ხელმისაწვდომი არ არის Windows-ის გარემოში). Node.js-ის მე-7 და უფრო ძველ ვერსიებში
ეს გაააქტიურებს მოძველებულ Debugger API-ს. Node.js-ის მე-8 და უფრო ახალ ვერსიებში Inspector API
გააქტიურდება.

---
## გავლენა უსაფრთხოების დონეზე

რამდენადაც გამმართველს სრული წვდომა აქვს Node.js გამშვებ გარემოზე, ბოროტმოქმედს,
რომელსაც შეუძლია ამ პორტთან დაკავშირება, შესაძლებლობა ეძლევა Node.js პროცესის სახელით
გაუშვას თვითნებური კოდი. აქედან გამომდინარე, მნიშვნელოვანია გვესმოდეს გამმართველის პორტის
საჯარო ან კერძო ქსელში გამჟღავნების [უარყოფითი] გავლენა უსაფრთხოების დონეზე.

### გამართვის (debug) პორტის გასაჯაროება სახიფათოა

თუ გამმართველი მიბმულია საჯარო IP-მისამართთან ან 0.0.0.0-თან, ნებისმიერ კლიენტს,
რომელსაც წვდომა აქვს თქვენს IP-მისამართთან, ყოველგვარი შეზღუდის გარეშე შეძლებს
გამმართველთან დაკავშირებას და თვითნებური კოდის გაშვებას.

ნაგულისხმევად, `node --inspect` ებმის 127.0.0.1-ს. გამმართველთან გარე კავშირების
დასაშვებად, თქვენ ცალსახად დაგჭირდებათ, უზრუნველყოთ საჯარო IP-მისამართი ან 0.0.0.0
და ა.შ. [თუმცა,] ამის გაკეთებამ, შესაძლოა პოტენციურად საყურადღებო უსაფრთხოების რისკების
წინაშე დაგაყენოთ. ჩვენ გირჩევთ, უზრუნველყოთ სათანადო firewall-ებისა და წვდომის კონტროლის
არსებობა, რათა თავიდან აიცილოთ მსგავსი საფრთხეები.

See the section on '[Enabling remote debugging scenarios](#enabling-remote-debugging-scenarios)' on some advice on how
to safely allow remote debugger clients to connect.

### ლოკალურ აპლიკაციებს აქვთ სრული წვდომა ინსპექტორზე

მაშინაც კი, თუ თქვენ ინსპექტორის პორტს მიაბამთ 127.0.0.1-ს (ნაგულისხმევი), ლოკალურად, თქვენს
მოწყობილობაზე გაშვებულ ნებისმიერ აპლიკაციას ექნება შეუზღუდავი წვდომა. ეს იმისათვის კეთდება,
რომ ლოკალურ გამმართველებს მიეცეთ ადვილად მიმაგრების საშუალება.

### ბრაუზერები, WebSocket-ები და იგივე წარმოშობის (same-origin) პოლიტიკა

ვებბრაუზერში გახსნილ ვებსაიტებს შეუძლიათ განახორციელონ WebSocket- და HTTP-მოთხოვნები
ბრაუზერის უსაფრთხოების მოდელის მიხედვით. საწყისი HTTP კავშირი აუცილებელია გამმართველის
სესიის უნიკალური id-ის მისაღებად. იგივე წარმოშობის პოლიტიკა (same-origin-policy) ხელს უშლის
ვებსაიტებს ამ HTTP კავშირის დამყარებაში. დამატებითი დაცვისათვის
[DNS rebinding შეტევების](https://en.wikipedia.org/wiki/DNS_rebinding)
წინააღმდეგ, Node.js ამოწმებს, ზუსტად არის თუ არა მითითებული
კავშირის 'Host' სათაურებში (headers) IP-მისამართი, `localhost` ან `localhost6`.

ეს უსაფრთხოების წესები კრძალავს დისტანციურ გამართვის სერვერთან დაკავშირებას
ჰოსტის სახელის (hostname) მითითებით. ამ შეზღუდვისათვის გვერდის ავლა შეგიძლიათ
IP-მისამართის მითითებით ან ssh-გვირაბების (tunnels) გამოყენებით, როგორც ეს ქვემოთ არის აღწერილი.

## ინსპექტორი კლიენტები

მინიმალისტური CLI-გამმართველი ხელმისაწვდომია ბრძანებით `node inspect myscript.js`.
Node.js ინსპექტორთან დაკავშირება ასევე შეუძლია რამდენიმე კომერციულ და ღიად ხელმისაწვდომ ინსტრუმენტს.

### [Chrome დეველოპერის ინსტრუმენტები](https://github.com/ChromeDevTools/devtools-frontend) 55+, [Microsoft Edge](https://www.microsoftedgeinsider.com)

* **ვარიანტი 1**: გახსენით `chrome://inspect` Chromium-ზე დაფუძნებულ
  ბრაუზერში ან `edge://inspect` — Edge-ში. დააწკაპუნეთ Configure ღილაკზე და დარწმუნდით, რომ სასურველი ჰოსტი და პორტი
  არის ჩამონათვალში.
* **ვარიანტი 2**: დააკოპირეთ `devtoolsFrontendUrl` მნიშვნელობა `/json/list`-დან
  (იხილეთ ზემოთ) ან --inspect მიმნიშნებელი ტექსტი და ჩასვით Chrome-ში.

> გაითვალისწინეთ, რომ Node.js და Chrome ერთსა და იმავე პლატფორმაზე უნდა გაეშვას.

### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* „გამართვის“ (Debug) პანელში დააწკაპუნეთ პარამეტრების ხატულაზე, რათა გახსნათ `.vscode/launch.json` [ფაილი].
  აირჩიეთ „Node.js“ საწყისი მოწყობისათვის.

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017+

* მენიუდან აირჩიეთ „Debug > Start Debugging“ ან დააჭირეთ `F5`-ს.
* [დეტალური ინსტრუქციები](https://github.com/Microsoft/nodejstools/wiki/Debugging).

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) და სხვა JetBrains IDE-ები

* შექმენით ახალი Node.js გამართვის კონფიგურაცია და დააჭირეთ „Debug“ ღილაკს. `--inspect` ნაგულისხმევად იქნება
  გამოყენებული `Node.js 7+`-ისთვის. გამოსართავად IDE რეესტრში მოხსენით მონიშვნა (uncheck)
  `js.debugger.node.use.inspect`-ს. WebStorm-ში და სხვა JetBrains IDE-ებში Node.js-ის გაშვებასა და გამართვასთან დაკავშირებით
  დეტალური ინფორმაციისათვის იხილეთ [WebStorm ონლაინ დახმარება](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html).

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* ბიბლიოთეკა, რომელიც ამარტივებს კავშირს [Inspector Protocol][] endpoint-ებთან.

### [Gitpod](https://www.gitpod.io)

* გაუშვით Node.js გამართვის კონფიგურაცია `Debug` ხედიდან (view) ან დააჭირეთ `F5`-ს. [დეტალური ინსტრუქციები](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://eclipse.org/eclipseide) Eclipse Wild Web Developer დამატებით (*extension-ით*)

* გახსენით .js [გაფართოების მქონე] ფაილი, აირჩიეთ „Debug As... > Node program“, ან
* შექმენით გამართვის კონფიგურაცია, რათა მიამაგროთ გამმართველი გაშვებულ Node.js-აპლიკაციას (უკვე დაიწყო `--inspect`-ით).

---

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

## Enabling remote debugging scenarios (შენიშვნა)

We recommend that you never have the debugger listen on a public IP address. If
you need to allow remote debugging connections we recommend the use of ssh
tunnels instead. We provide the following example for illustrative purposes only.
Please understand the security risk of allowing remote access to a privileged
service before proceeding.

Let's say you are running Node.js on a remote machine, remote.example.com, that
you want to be able to debug. On that machine, you should start the node process
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

## Legacy Debugger

**The legacy debugger has been deprecated as of Node.js 7.7.0. Please use
`--inspect` and Inspector instead.**

When started with the **--debug** or **--debug-brk** switches in version 7 and
earlier, Node.js listens for debugging commands defined by the discontinued
V8 Debugging Protocol on a TCP port, by default `5858`. Any debugger client
which speaks this protocol can connect to and debug the running process; a
couple popular ones are listed below.

The V8 Debugging Protocol is no longer maintained or documented.

### [Built-in Debugger](https://nodejs.org/dist/{#var currentVersion}/docs/api/debugger.html)

Start `node debug script_name.js` to start your script under the builtin
command-line debugger. Your script starts in another Node.js process started with
the `--debug-brk` option, and the initial Node.js process runs the `_debugger.js`
script and connects to your target.

### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process
which translates the [Inspector Protocol][] used in Chromium to the V8 Debugger
protocol used in Node.js.

<!-- refs -->

[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
