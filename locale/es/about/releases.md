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
schedule-footer: Las fechas están sujetas a cambios.
---

# Versiones

Las versiones de Node.js ingresan en el estado _Current_ release durante seis meses, lo que proporciona a los autores librerías tiempo para añadir soporte a ella. Después de seis meses, los lanzamientos con números impares (9, 11, etc.) dejan de ser compatibles, y los lanzamientos con números pares (10, 12, etc.) pasan al estado _LTS activo_ y están listos para uso general. El estado de lanzamiento de LTS es "long-term support", de soporte a largo plazo, que generalmente garantiza que los errores críticos se solucionarán por un total de 30 meses. Las aplicaciones de producción solo deben usar versiones _Active LTS_ o _Maintenance LTS_.
