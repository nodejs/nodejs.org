---
title: ECMAScript 2015 (ES6) and beyond
layout: docs.hbs
---

# ECMAScript 2015 (ES6) და მის ფარგლებს მიღმა

Node.js შექმნილია [V8](https://v8.dev/)-ის უახლეს ვერსიებზე დაყრდნობით. ძრავის (V8) უახლესი ვერსიების პარალელურად [Node.js-ის] მუდმივი განახლებების საფუძველზე Node.js დეველოპერებს რეალურ დროში, გარანტირებულად ეძლევათ წვდომა [JavaScript ECMA-262 სპეციფიკაციის](http://www.ecma-international.org/publications/standards/Ecma-262.htm) ახალ მახასიათებლებზე. გარდა ამისა, მუდმივად უმჯობესდება წარმადობა და სტაბილურობა.

ECMAScript 2015 (ES6) მახასიათებლები სამ ჯგუფად იყოფა: **მიწოდებული (shipping)**, **მზა (staged)** და **მოქმედი (in progress)**:

* ყოველი **მიწოდებული (shipping)** მახასიათებელი, რომელსაც V8 სტაბილურად მიიჩნევს, **Node.js-ზე ნაგულისხმევად არის გააქტიურებული** და **არ** მოითხოვს რაიმე სახის [დამატებით] მითითებას გაშვების მომენტში.
* **მზა (staged)** მახასიათებლები, ანუ თითქმის დასრულებული მახასიათებლები, რომლებიც V8-ის გუნდის მიერ არ არის მიჩნეული სტაბილურად გაშვების მომენტში მოითხოვს დამატებით არგუმენტს: `--harmony`.
* **მოქმედი (in progress)** მახასიათებლების გააქტიურება შესაძლებელია ინდივიდუალურად, მათთვის შესაბამისი თანაზომიერების (harmony) არგუმენტით, თუმცა ტესტირების გარდა რაიმე სხვა მიზნით ამის გაკეთება უკიდურესად არასასურველია. შენიშვნა: ეს არგუმენტები (flags) შემოღებულია V8-ის მიერ და შესაძლოა შეიცვალოს ყოველგვარი წინასწარი გაფრთხილების გარეშე. 

## Node.js-ის რომელ ვერსიას რომელი მახასიათებლები მოყვება ნაგულისხმევად?

ვებსაიტი [node.green](https://node.green/) kangax-ის თავსებადობის ცხრილზე დაყრდნობით გვაწვდის შესანიშნავ მიმოხილვას Node.js-ის სხვადასხვა ვერსიაში მხარდაჭერილი ECMAScript-ის მახასიათებლების შესახებ.

## რომელი მახასიათებლებია მოქმედი?

V8 ძრავას მუდმივად ემატება ახალი მახასიათებლები. ზოგადად, ველით, რომ ისინი გამოჩნდებიან Node.js-ის მომავალ გამოშვებაში, თუმცა ზუსტი თარიღი უცნობია.

თქვენ შეგიძლიათ იხილოთ Node.js-ის თითოეულ გამოშვებაში ხელმისაწვდომი *მოქმედი (in progress)* მახასიათებლების სია `--v8-options` არგუმენტის გამოყენებით. გთხოვთ გაითვალისწინოთ, რომ ესენი V8-ის დაუმთავრებელი და პოტენციურად გაუმართავი მახასიათებლებია, ასე რომ, მათი გამოყენება რისკის შემცველია:

```bash
node --v8-options | grep "in progress"
```

## I have my infrastructure set up to leverage the --harmony flag. Should I remove it?

The current behavior of the `--harmony` flag on Node.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on Node.js. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.

## How do I find which version of V8 ships with a particular version of Node.js?

Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:

```bash
node -p process.versions.v8
```
