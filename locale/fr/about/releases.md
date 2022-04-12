---
layout: about-release-schedule.hbs
title: Versions
statuses:
  maintenance: 'Maintenance LTS'
  active: 'Active LTS'
  current: 'Actuel'
  pending: 'En attente'
columns:
  - 'Version'
  - 'Statut'
  - 'Nom de code'
  - 'Version initiale'
  - 'Démarrage LTS actif'
  - 'Démarrage LTS maintenance'
  - 'Fin de vie'
schedule-footer: Les dates sont sujettes à changement.
---

# Versions

Les versions majeures de Node.js entrent dans le statut de version _Current_ pour six mois, ce qui laisse le temps aux auteurs des librairies d'ajouter le support nécessaire. Après six mois les versions impaires (9, 11, etc.) ne sont plus supportées, les versions paires (10, 12, etc.) passent au statut _Active LTS_ et sont prêtes pour utilisation. Le statut de version _LTS_ signifie "long-term support", ce qui garantit généralement que tous les bugs critiques seront fixés pendant 30 mois. Les applications utilisées en prodution doivent utiliser uniquement les versions _Active LTS_ ou _Maintenance LTS_.
