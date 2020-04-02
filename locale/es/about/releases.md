---
layout: about-release-schedule.hbs
title: Versiones
statuses:
  maintenance: 'Mantenimiento LTS'
  active: 'LTS Activo'
  current: 'Actual'
  pending: 'Pendiente'
columns:
  - 'Versión'
  - 'Estado'
  - 'Nombre Clave'
  - 'Lanzamiento Inicial'
  - 'Inicio LTS Activo'
  - 'Inicio Mantenimiento LTS'
  - 'Fin-de-vida'
schedule-footer: Las fechas están sujetas a cambios
---

# Versiones

Major Node.js versions enter _Current_ release status for six months, which gives library authors time to add support for them. After six months, odd-numbered releases (9, 11, etc.) become unsupported, and even-numbered releases (10, 12, etc.) move to _Active LTS_ status and are ready for general use. _LTS_ release status is "long-term support", which typically guarantees that critical bugs will be fixed for a total of 30 months. Production applications should only use _Active LTS_ or _Maintenance LTS_ releases.
