---
title: Project Governance
layout: about.hbs
---
# Gestione progetto

## Technical Steering Committee (Comitato direttivo tecnico)

Il progetto è gestito congiuntamente da un Comitato Direttivo Tecnico (TSC, Technical Steering Committee) il quale è responsabile della direzione generale del progetto.

Il TSC ha l'autorità finale su questo progetto, incluso:

* Direzione tecnica
* Gestione e flussi del progetto (incluso questo documento)
* Politica dei contributi
* Gestione del repository GitHub
* Linee di condotta
* Mantenimento della lista dei Collaboratori aggiuntivi

Gli inviti iniziali all'iscrizione al TSC sono stati consegnati a persone che erano state collaboratori attivi, e che avevano esperienze significative nel mantenimento del progetto. 

è previsto che l'iscrizione si evolva nel corso del tempo in accordo con le necessità del progetto.

Per l'attuale lista dei membri del TSC, consulta il
[README.md](https://github.com/nodejs/node/blob/master/README.md#tsc-technical-steering-committee)
del progetto.

## Collaboratori

Il repository GitHub di [nodejs/node](https://github.com/nodejs/node) è manutenuto dal TSC e da Collaboratori aggiuntivi che vengono inseriti dal TSC su basi in corso d'aggiornamento.

Coloro che diano contributi significativi e di valore sono resi Collaboratori e hanno i privilegi di commit verso il progetto. Queste persone sono identificate dal TSC e la loro aggiunta in qualità di Collaboratori è discussa durante l'incontro settimanale del TSC.

_Nota:_ Se hai dato contributi significativi e non sei considerato per l'accesso ai commit, apri una segnalazione o contatta un membro del TSC direttamente, egli poi porterà l'argomento al prossimo incontro del TSC.

Le modifiche ai contenuti del repository nodejs/node vengono eseguite su una base di collaborazione.
Ognuno che abbia un account GitHub può potenzialmente proporre una modifica tramite una pull request e questa verrà considerata dai Collaboratori del progetto. Tutte le pull request devono essere revisionate e accettate da un Collaboratore che abbia competenze sufficienti e che sia in grado di prendersi la piena responsabilità per la modifica. Nel caso in cui le pull requests siano proposte da un Collaboratore esistente, è necessario che un Collaboratore aggiuntivo le validi.
Dovrebbe essere ricercato un consenso comune se altri Collaboratori partecipano e si verifica un disaccordo circa una particolare modifica. Vedi il _Processo di Ricerca del Consenso_ sotto per maggiori dettagli sul modello di consenso utilizzato per la gestione.

I Collaboratori potrebbero proporre di segnalare per la discussione modifiche significative o problematiche, o modifiche che non hanno trovato il consenso del TSC assegnando il tag ***tsc-agenda*** ad una pull request o ad una segnalazione (issue).
Il TSC dovrebbe fungere da arbitro finale dove richiesto.

Per la lista attuale dei Collaboratori, consulta il [README.md](https://github.com/nodejs/node/blob/master/README.md#current-project-team-members) del progetto.

Una guida per Collaboratori è manutenuta nel file [COLLABORATOR_GUIDE.md](https://github.com/nodejs/node/blob/master/COLLABORATOR_GUIDE.md).

## Iscrizione al TSC

I "seggi del TSC" non scadono. Non c'è un numero chiuso per il TSC. Comunque, il numero previsto è tra 6 e 12 persone, per assicurare una copertura adeguata nelle aree di competenza importanti, bilanciata dall'abilità di prendere decisioni in modo efficiente.

Non c'è una lista di specifici prerequisiti o qualifiche per la partecipazione come membro al TSC oltre queste regole.

Il TSC potrebbe aggiungere membri aggiuntivi al TSC per mezzo di un atto standard del TSC.

Un membro del TSC potrebbe essere sollevato dal TSC tramite dimissioni volontarie, o tramite atto standard del TSC.

Eventuali modifiche all'assetto dei membri dovrebbero essere inserite in agenda, e potrebbero essere suggerite come ogni altro elemento dell'agenda (Vedi "Incontri del TSC" sotto).

Non più di 1/3 dei membri del TSC possono essere aggiunti dallo stesso principale.
Se la rimozione o dimissione di un membro del TSC, o una modifica di carica di un membro del TSC, dovesse creare una situazione in cui più di 1/3 dei membri del TSC condivide un principale, allora il problema dovrà essere immediatamente risolto con la riassegnazione o dimissione di uno o più membri del TSC affiliati con il/i principale/i sovrarappresentato/i.

## Incontri del TSC

Il TSC si riunisce settimanalmente su Google Hangout On Air. Il meeting viene ospitato da un moderatore scelto, approvato dal TSC. Ogni riunione dovrebbe essere pubblicata su YouTube.

Vengono aggiunti all'agenda del TSC punti di discussione quali screzi o cambi di direzione del progetto, di politica di contribuzione, gestione dei membri del TSC, o processi di rilascio.

L'intenzione dell'agenda è di non approvare o revisionare tutte le modifiche.
Esse dovrebbero susseguirsi di continuo su GitHub e sono gestite dal più vasto gruppo di Collaboratori.

Ogni membro della comunità o contributore può chiedere che qualcosa sia aggiunto all'agenda del prossimo incontro inserendo una Issue in GitHub. Ogni Collaboratore, membro del TSC o il moderatore può aggiungere l'elemento all'agenda inserendo il tag ***tsc-agenda*** alla segnalazione.

Prima di ogni meeting del TSC, il moderatore condividerà l'Agenda con i membri del TSC. I membri del TSC possono aggiungere qualsiasi cosa vogliano all'agenda all'inizio di ogni meeting. Il moderatore e il TSC non possono apporre veto o rimuovere elementi.

Il TSC potrebbe invitare persone o rappresentati di alcuni progetti a partecipare in qualità di ospiti non votanti. Attualmente questi invitati sono:
 
* Un rappresentante da [build](https://github.com/node-forward/build)
  scelto da quel progetto.

Il moderatore deve riassumere la discussione di ogni elemento dell'agenda e deve poi inviarlo come pull request al termine dell'incontro. 

## Processo di Ricerca del Consenso

Il TSC segue un modello di [Ricerca del Consenso](http://en.wikipedia.org/wiki/Consensus-seeking_decision-making) per la presa di decisioni

Quando l'oggetto dell'agenda pare aver raggiunto un consenso, il moderatore chiederà "Qualcuno ha delle obiezioni?" come ultima chiamata per un dissenso.

Se un oggetto dell'agenda non raggiunge il consenso, un membro del TSC può chiamare un voto di chiusura o una sospensione del giudizio al prossimo meeting. La chiamata al voto deve essere approvata da una maggioranza del TSC oppure la discussione continuerà. La maggioranza semplice vince.
