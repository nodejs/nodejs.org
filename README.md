# [nodejs.org](https://nodejs.org/)

[![Build Status](https://img.shields.io/travis/nodejs/nodejs.org/master.svg)](http://travis-ci.org/nodejs/nodejs.org)
[![Dependency Status](https://img.shields.io/david/nodejs/nodejs.org.svg)](https://david-dm.org/nodejs/nodejs.org)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## What is this repo?

[nodejs.org](https://nodejs.org) by the [Node.js Foundation](https://foundation.nodejs.org/) builds on the merged community's past website projects to form a self-publishing, community-managed version of the previous site.

On a technical level, inspiration has been taken from the `iojs.org` repo while design and content has been migrated from the old [nodejs.org repo](https://github.com/nodejs/nodejs.org-archive). These technical changes have helped to facilitate community involvement and empower the foundation's internationalization communities to provide alternative website content in other languages.

This repo's issues section has become the primary home for the Website WG's coordination efforts (meeting planning, minute approval, etc).

## Contributing

Please contribute! There are plenty of [good first issues](https://github.com/nodejs/nodejs.org/labels/good%20first%20issue) to work on. To get started, you have to [fork](https://github.com/nodejs/nodejs.org/fork) this repo to your own GitHub account first. Then open up a terminal on your machine and enter the following commands:

```bash
$ git clone https://github.com/<your user name>/nodejs.org.git
$ cd nodejs.org
$ npm install
$ npm start
```

This will start the development server on http://localhost:8080/en/. This should reload automatically when you make changes to the code, but no code is perfect, so sometimes you may need to restart it. :)

Note: You'll need Node.js v4 or newer as the build system uses some native ES2015 features.

If you want to submit a new feature or a bugfix, the best way is to create the changes in a separate branch, e.g.: `git checkout -b feature/mycoolfeature`. This will make it easier for you to submit a pull request and get your feature merged.

### Layout

* Page templates are in `/layouts`
* Global styles are in `/layouts/css`
* Global static files are in `/static`
* All content and localization specific styles are in `/locale`
 * Initial development usually happens in English: `/locale/en`
 * `/locale/{{locale}}/site.json` is where global localization information lives.
 * All content is in Markdown and is per locale.
  * The top of each Markdown file is a block of YAML for page specific localization information that is passed to various templates.
  * The bulk of the Markdown content for each page is referenced as `{{{content}}}` in the corresponding template.

### Deployment

Full set up is in https://github.com/nodejs/build/tree/master/setup/www minus secrets and certificates. The webhook is setup on GitHub for this project and talks to a small Node server on the host which does the work. See the [github-webhook](https://github.com/rvagg/github-webhook) package for this.

## Governance and Current Members

All of the Node.js Foundation websites, including this repo, are jointly governed by the **Website Working Group**. See [GOVERNANCE.md](./GOVERNANCE.md) to learn more about the group's structure and [CONTRIBUTING.md](./CONTRIBUTING.md) for guidance about the expectations for all contributors to this project.

### Content vs. Code

The Website Working Group is primarily concerned with the code and overall structure of the website.

The content of the website comes from a variety of working groups (Evangelism, Core, i18n, etc). 
The Website WG defers to these WGs on matters of content and routinely adds collaborators from these
working groups as they add and improve content on the website. In other words, the Website WG is not
an *editorial* Working Group except when no other Working Group has taken responsibility for a
content area.

### Website Working Group Members

- Yuta Hiroto ([abouthiroppy](https://github.com/abouthiroppy))
- Andy Gout ([andygout](https://github.com/andygout))
- Austin Winstanley ([AustinWinstanley](https://github.com/AustinWinstanley))
- Benget Nata ([bentinata](https://github.com/bentinata))
- &! (bitandbang) ([bnb](https://github.com/bnb))
- Divjot Singh ([bogas04](https://github.com/bogas04))
- Bryce Baril ([brycebaril](https://github.com/brycebaril))
- Csaba Palfi ([csabapalfi](https://github.com/csabapalfi))
- Bruno Heridet ([Delapouite](https://github.com/Delapouite))
- Steven Sinatra ([diagramatics](https://github.com/diagramatics))
- Evan Lucas ([evanlucas](https://github.com/evanlucas))
- Fábio Santos ([fabiosantoscode](https://github.com/fabiosantoscode))
- Jeremiah Senkpiel ([Fishrock123](https://github.com/Fishrock123))
- Frederic Hemberger ([fhemberger](https://github.com/fhemberger))
- Wyatt Preul ([geek](https://github.com/geek))
- Charlie Robbins ([indexzero](https://github.com/indexzero))
- Minwoo Jung ([JungMinu](https://github.com/JungMinu))
- Daniel Levy ([justsml](https://github.com/justsml))
- Kohei TAKATA ([kohei-takata](https://github.com/kohei-takata))
- Luigi Pinca ([lpinca](https://github.com/lpinca))
- marocchino ([marocchino](https://github.com/marocchino))
- Massimiliano Mura ([MassimilianoMura](https://github.com/MassimilianoMura))
- Matthew Loring ([matthewloring](https://github.com/matthewloring))
- Mikeal Rogers ([mikeal](https://github.com/mikeal))
- Mike Dolan ([mkdolan](https://github.com/mkdolan))
- Kiffie Liversage ([mrkiffie](https://github.com/mrkiffie))
- Vladimir Varankin ([narqo](https://github.com/narqo))
- Patrick Heneise ([PatrickHeneise](https://github.com/PatrickHeneise))
- Paul Grock ([paulgrock](https://github.com/paulgrock))
- Phillip Johnsen ([phillipj](https://github.com/phillipj))
- rnsloan ([rnsloan](https://github.com/rnsloan))
- Robert Kowalski ([robertkowalski](https://github.com/robertkowalski))
- Rod Vagg ([rvagg](https://github.com/rvagg))
- Seth Thompson ([s3ththompson](https://github.com/s3ththompson))
- silverwind ([silverwind](https://github.com/silverwind))
- Sean Ouimet ([snostorm](https://github.com/snostorm))
- Steven R. Loomis ([srl295](https://github.com/srl295))
- Steve Mao ([stevemao](https://github.com/stevemao))
- Michaël Zasso ([targos](https://github.com/targos))
- Myles Borins ([MylesBorins](https://github.com/MylesBorins))
- Sakthipriyan Vairamani ([thefourtheye](https://github.com/thefourtheye))
- Trent Oswald ([therebelrobot](https://github.com/therebelrobot))
- Anton Wilhelm ([timaschew](https://github.com/timaschew))
- Thomas Jensen ([tjconcept](https://github.com/tjconcept))
- Rich Trott ([Trott](https://github.com/Trott))
- wonderdogone ([wonderdogone](https://github.com/wonderdogone))
- Xcat Liu ([xcatliu](https://github.com/xcatliu))
- Francisco Baio Dias ([xicombd](https://github.com/xicombd))
- Yosuke Furukawa ([yosuke-furukawa](https://github.com/yosuke-furukawa))
- Chayoung You ([yous](https://github.com/yous))
- Zeke Sikelianos ([zeke](https://github.com/zeke))
