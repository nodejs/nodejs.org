---
title: Project Governance
layout: about.hbs
---
# Gestione progetto

## Comitato direttivo tecnico

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
Se la rimozione o dimissione di un membro del TSC, o una modifica di 
No more than 1/3 of the TSC members may be affiliated with the same
employer.  If removal or resignation of a TSC member, or a change of
employment by a TSC member, creates a situation where more than 1/3 of
the TSC membership shares an employer, then the situation must be
immediately remedied by the resignation or removal of one or more TSC
members affiliated with the over-represented employer(s).

## TSC Meetings

The TSC meets weekly on a Google Hangout On Air. The meeting is run by
a designated moderator approved by the TSC. Each meeting should be
published to YouTube.

Items are added to the TSC agenda which are considered contentious or
are modifications of governance, contribution policy, TSC membership,
or release process.

The intention of the agenda is not to approve or review all patches.
That should happen continuously on GitHub and be handled by the larger
group of Collaborators.

Any community member or contributor can ask that something be added to
the next meeting's agenda by logging a GitHub Issue. Any Collaborator,
TSC member or the moderator can add the item to the agenda by adding
the ***tsc-agenda*** tag to the issue.

Prior to each TSC meeting, the moderator will share the Agenda with
members of the TSC. TSC members can add any items they like to the
agenda at the beginning of each meeting. The moderator and the TSC
cannot veto or remove items.

The TSC may invite persons or representatives from certain projects to
participate in a non-voting capacity. These invitees currently are:

* A representative from [build](https://github.com/node-forward/build)
  chosen by that project.

The moderator is responsible for summarizing the discussion of each
agenda item and sending it as a pull request after the meeting.

## Consensus Seeking Process

The TSC follows a
[Consensus Seeking](http://en.wikipedia.org/wiki/Consensus-seeking_decision-making)
decision making model.

When an agenda item has appeared to reach a consensus, the moderator
will ask "Does anyone object?" as a final call for dissent from the
consensus.

If an agenda item cannot reach a consensus, a TSC member can call for
either a closing vote or a vote to table the issue to the next
meeting. The call for a vote must be approved by a majority of the TSC
or else the discussion will continue. Simple majority wins.
