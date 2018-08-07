---
layout: security.hbs
title: Sicurezza
---

# Sicurezza

## Riportare un Bug in Node.js

Tutti i bug di sicurezza in Node.js sono presi con la massima serietà e dovrebbero essere riportati tramite [HackerOne](https://hackerone.com/nodejs) o mandando una mail a [security@nodejs.org](mailto:security@nodejs.org). Questa verrà recapitata ad un sottoinsieme del team principale che gestisce i problemi di sicurezza.

Il tuo report verrà riconosciuto entro 24 ore, e riceverai una risposta più dettagliata al tuo report entro 48 ore indicando i prossimi passi nella gestione della tua richiesta.

Dopo averti dato una prima risposta, il team della sicurezza cercherà di tenerti informato dei progressi fatti prima di un annuncio completo e una fix, e potrebbe richiederti informazioni aggiuntivi o una consulenza circa il problema riportato.
Questi aggiornamenti verranno inviati come minimo ogni 5 giorni; nella pratica, è più probabile che succeda ogni 24-48 ore.

### Programma Premio Bug Node.js 

Il progetto Node.js intraprende un programma ufficiale di premiazione bug per ricercatori di sicurezza e responsabili di pubblicazioni.

Il programma è gestito nel dettaglio tramite la piattaforma HackerOne [https://hackerone.com/nodejs](https://hackerone.com/nodejs)

## Segnalare un bug in un modulo di terze parti

I bug di sicurezza nei moduli di terze parti dovrebbero essere riportati ai loro rispettivi manutentori e dovrebbero inoltre essere coordinati per mezzo del [Node Ecosystem Security Team](https://hackerone.com/nodejs-ecosystem) o mandando una mail a [security-ecosystem@nodejs.org](mailto:security-ecosystem@nodejs.org).

Dettagli a riguardo del processo possono essere trovati nel [Security Working Group repository](https://github.com/nodejs/security-wg/blob/master/processes/third_party_vuln_process.md)

Grazie per l'aiuto nel migliorare la sicurezza di Node.js e del suo ecosistema. I tuoi sforzi e le tue scoperte sono molto apprezzate e saranno considerate.

## Policy delle scoperte

Ecco la politica delle rivelazioni di sicurezza per Node.js

- Il report di sicurezza viene ricevuto e assegnato al gestore primario. Questa persona coordinerà la fix e il processo di rilascio. Il problema viene confermato e una lista di tutte le versioni affette viene stilata. Il codice viene sottoposto a revisione per trovare altri potenziali problemi della medesima natura. Delle fix vengono preparate per tutte le release che sono ancora supportate.
Queste fix non sono pubblicate nel repository ma piuttosto mantenute localmente in attesa dell'annuncio.

- Una data di embargo per questa vulnerabilità viene decretata e un CVE (Common Vulnerabilities and Exposures (CVE®)) viene richiesto per la vulnerabilità.

- Giunta la data di embargo, alla mailing list di sicurezza di Node.js viene inviata una copia dell'annuncio. Le modifiche vengono inviate al repository pubblico e vengono pubblicate nuove build su nodejs.org. Entro 6 ore dalla notifica alla mailing list, una copia dell'annuncio verrà pubblicata sul blog di Node.js. 

- Solitamente la data d'embargo viene stabilita a 72 ore dal momento in cui il CVE è stato richiesto. Tuttavia, ciò potrebbe variare dipendentemente alla gravità del problema o alla difficoltà di applicare un fix.

- Questo processo può richiedere del tempo, specialmente nel momento in cui è richiesto un coordinamento con i manutentori di altri progetti. Ogni sforzo verrà fatto per gestire il bug nella maniera più rapida possibile; d'altro canto, è importante che noi seguiamo il processo di rilascio sovrastante per assicurare che la scoperta venga gestita in modo coerente.
- This process can take some time, especially when coordination is required with maintainers of other projects. Every
effort will be made to handle the bug in as timely a manner as possible; however, it’s important that we follow the
release process above to ensure that the disclosure is handled in a consistent manner.


## Receiving Security Updates

Security notifications will be distributed via the following methods.

- [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
- [https://nodejs.org/en/blog](https://nodejs.org/en/blog)

## Comments on this Policy

If you have suggestions on how this process could be improved please submit a [pull request](https://github.com/nodejs/nodejs.org)
or [file an issue](https://github.com/nodejs/security-wg/issues/new) to discuss.
