---
layout: about-release-schedule.hbs
title: Sorties
statuses:
  maintenance: 'Maintenance LTS'
  active: 'Active LTS'
  current: 'Current'
  pending: 'Pending'
columns:
  - 'Release'
  - 'Status'
  - 'Codename'
  - 'Initial Release'
  - 'Active LTS Start'
  - 'Maintenance LTS Start'
  - 'End-of-life'
schedule-footer: Dates are subject to change.
---

# Sorties

Les versions majeures de Node.js passent au statut de version _Current_ pendant six mois, ce qui donne aux auteurs de bibliothèques le temps d'ajouter la prise en charge de ces versions. Après six mois, les versions impaires (9, 11, etc.) ne sont plus prises en charge et les versions paires (10, 12, etc.) passent au statut _Active LTS_ et sont prêtes pour une utilisation générale. Le statut de la version _LTS_ est un "support à long terme", qui garantit généralement que les bogues critiques seront corrigés pendant un total de 30 mois. Les applications de production ne doivent utiliser que les versions _Active LTS_ ou _Maintenance LTS_.
