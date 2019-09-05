---
title: Gouvernance du Projet
layout: about.hbs
---

# Gouvernance du Projet

## Comité de Pilotage Technique

Le projet est co-dirigé par un Comité de Pilotage Technique
(Technical Steering Committee - TSC) qui est responsable de
la gouvernance de haut-niveau du projet.

Le TSC a toute autorité sur ce projet, y compris:

* La direction technique
* La gouvernance et la gestion du projet (y compris cette politique)
* La politique de contribution
* La gestion des dépôts GitHub
* Les guides de conduite
* La maintenance de la liste des Collaborateurs

Les invitations originelles à siéger au TSC ont été proposées
à des contributeurs actifs qui avaient une expérience significative
avec la gestion du projet. La participation à ce comité est susceptible
d'évoluer dans le temps en rapport avec les besoins du projet.

Pour trouver la liste des membres actuels du TSC, voir le [README.md]
(https://github.com/nodejs/node/blob/master/README.md#tsc-technical-steering-committee) du projet.

## Collaborateurs

Le dépôt GitHub [nodejs/node](https://github.com/nodejs/node) est
maintenu par le TSC et un groupe de Collaborateurs additionnels
qui sont ajoutés par le TSC de manière continue.

Les personnes proposant des contributions significatives sont faites
Collaborateurs et se voient accorder les droits d'écriture sur le projet.
Ces personnes sont identifiées par le TSC et leur ajout aux Collaborateurs
est discuté lors des réunions hebdomadaires du TSC

_Note:_ Si vous faites des contributions significatives et n'avez pas encore
obtenu les droits d'écriture, ouvrez un ticket ou contactez un membre du TSC
directement et votre demande sera examinée lors de la prochaine réunion.

Les modifications de contenu sur le dépôt nodejs/node sont validées de
manière collaborative. N'importe qui possédant un compte GitHub peut
proposer une modification par pull request et elle sera examinée par les
Collaborateurs du projet. Toutes les pull request doivent être relues et acceptées
par un Collaborateur ayant une expertise suffisante et qui soit capable
d'assumer l'entière responsabilité du changement effectué. Dans le cas d'une pull
request proposée par un Collaborateur, un Collaborateur additionnel est requis
pour valider la modification. Un consensus doit être recherché si
d'autres Collaborateurs participent et qu'un désaccord survient sur
une modification. Voyez _Processus de Recherche de Consensus_ plus
bas pour plus de détails sur le modèle de consensus utilisé.

Les Collaborateurs peuvent choisir de faire remonter au TSC pour
discussion des modifications significatives ou sujettes à controverse,
ou des modifications n'ayant pas obtenu de consensus, en leur assignant
l'étiquette ***tsc-agenda*** sur une pull request ou un ticket. Le
TSC servira alors d'arbitre final lorsque requis.

Pour la liste des Collaborateurs actuels, voir le [README.md]
(https://github.com/nodejs/node/blob/master/README.md#current-project-team-members) du projet.

Un guide des Collaborateurs est maintenu sur
[COLLABORATOR_GUIDE.md](https://github.com/nodejs/node/blob/master/COLLABORATOR_GUIDE.md).

## Siéger au TSC

Les sièges au TSC ne sont pas limités dans le temps. Le TSC n'a pas
de taille fixe. Cependant, l'objectif recherché est entre 6 et 12 personnes,
afin d'assurer une couverture adéquate des différents domaines d'expertise,
tout en conservant une capacité de prise de décision efficace.

Il n'y a aucun prérequis ou qualifications nécessaires au-delà de
ces règles pour siéger au TSC.

Le TSC peut ajouter des membres additionnels au TSC par une motion
standard du TSC.

Un membre du TSC peut être retiré du TSC par démission volontaire, ou
par une motion standard du TSC.

Les changements de modalités de participation au TSC devront être mises
au programme et peuvent être ajoutés comme n'importe quel autre
objet de programme (voir "Réunions du TSC" plus bas).

Pas plus d'1/3 des membres du TSC ne pourra être affilié au même
employeur. Si le retrait ou la démission d'un membre du TSC, ou le
changement d'employeur d'un membre du TSC, créé une situation dans
laquelle plus d'1/3 des membres du TSC partage le même employeur,
la situation devra immédiatement être corrigée par la démission ou le
retrait d'un ou plusieurs membres du TSC affiliés avec le ou les
employeurs sur-représentés.

## Réunions du TSC

Le TSC se réunit de manière hebdomadaire sur Google Hangout On Air.
La réunion est animée par un modérateur désigné et approuvé par le TSC.
Chaque réunion est publiée sur Youtube.

Sont ajoutés au programme les objets qui sont considérés contentieux
ou sont des modifications de gouvernance, de politique de contribution, de
participation au TSC, ou concernant le processus de release.

L'intention du programme n'est pas d'approuver ou relire tous les
correctifs. Ceci devra être fait de manière continue sur GitHub
et géré par l'ensemble des Collaborateurs.

N'importe quel membre de la communauté ou contributeur peut demander
à ajouter un objet au programme de la prochaine réunion en ouvrant un
ticket sur GitHub. N'importe quel Collaborateur, membre du TSC ou le
modérateur peut ajouter des objets au programme en ajoutant l'étiquette
***tsc-agenda*** au ticket.

Avant chaque réunion du TSC, le modérateur partagera le Programme
avec les membres du TSC. Les membres du TSC pourront ajouter n'importe
quel objet de leur choix au programme au début de chaque réunion. Ni le
modérateur ni le TSC ne peuvent retirer ou poser de veto sur les objets.

Le TSC peut inviter des personnes ou des représentants de certains projets
à participer sans pouvoir de vote. Ces invitations sont actuellement:

* Un représentant du projet [build](https://github.com/node-forward/build)
  choisi par ce projet.

Le modérateur est chargé de résumer la discussion concernant chaque
objet du programme et de l'envoyer sous forme de pull request après
chaque réunion.

## Processus de Recherche de Consensus

Le TSC suit un modèle décisionnaire de
[Recherche de Consensus](https://en.wikipedia.org/wiki/Consensus-seeking_decision-making)
(en anglais).

Quand un objet du programme a atteint un consensus, le modérateur
demande une dernière fois "Quelqu'un a-t'il une objection?" pour valider
le consensus.

Si un objet du programme n'atteint pas de consensus, un membre du TSC
peut soit appeler à un vote de clôture, ou à un vote pour reporter
l'objet à la prochaine réunion. L'appel au vote doit être approuvé par
la majorité du TSC, sinon la discussion continue. Seule la majorité simple
est requise.
