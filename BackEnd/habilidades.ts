interface IHabilidades {
  Nombre: string;
  Tipo: string;
  Descripcion: string;
  Accion: (personajePrincipal: Personaje, personajeObj?: Personaje) => void;
  Cooldown: number;
  Masa: boolean;
  Mejora: boolean;
}

class Habilidades implements IHabilidades {
  Nombre: string;
  Tipo: string;
  Descripcion: string;
  Accion: (personajePrincipal: Personaje, personajeObj?: Personaje) => void;
  Cooldown: number;
  Masa: boolean;
  Mejora: boolean;
  Espera: number;

  constructor(
    nombre: string,
    Tipo: string,
    Descripcion: string,
    Accion: (personajePrincipal: Personaje, personajeObj?: Personaje) => void,
    Cooldown: number,
    Masa: boolean,
    Mejora: boolean
  ) {
    this.Nombre = nombre;
    this.Tipo = Tipo;
    this.Descripcion = Descripcion;
    this.Accion = Accion;
    this.Espera = 0;
    this.Cooldown = Cooldown;
    this.Masa = Masa;
    this.Mejora = Mejora;
  }

  Activar(personajePrincipal: Personaje, personajeObj?: Personaje): void {
    if (this.Espera !== 0) {
      console.info('La habilidad no se podra usar hasta dentro de', this.Espera, 'turnos');
      return;
    }
    if (personajeObj && personajeObj.estaMuerto()) {
      console.warn('El personaje', personajeObj.nombre, 'esta muerto');
      return;
    }
    if (personajeObj && personajePrincipal.equipo === personajeObj.equipo && this.Tipo === 'Ataque') {
      console.warn('no puedes atacar aliados!!');
      return;
    }
    this.Accion(personajePrincipal, personajeObj);
    this.Espera = this.Cooldown;
    Personaje.validarExcesos();
  }

  reducirEspera(): void {
    if (this.Espera === 0) {
      console.info('la habilidad no se encuentra en espera');
      return;
    }
    this.Espera -= 1;
  }
}

// ---------------HABIIDADES PARA PROBAR SI LOS EFECTOS CONTINUOS DE FORTALECIMIENTO Y DEBILITAMIENTO FUNCIONAN-----------------------
function AumentoDePoder(): Habilidades {
  return new Habilidades(
    'Aumento de Poder',
    'propio',
    'Aumenta tu ataque en +5 puntos cada turno durante 3 turnos',
    (personajePrincipal: Personaje) => {
      const indicePoder = personajePrincipal.fortalecimiento.findIndex((ef) => ef.nombre === 'Aumento de Poder');
      if (indicePoder === -1) {
        const efecto = AumentoPoderContinuo(personajePrincipal);
        personajePrincipal.fortalecimiento.push(efecto);
        personajePrincipal.fortalecimiento.forEach((ef) => {
          if (ef.nombre === 'Aumento de Poder') {
            ef.Activar(personajePrincipal);
            console.info(ef.nombre, 'activado');
          }
        });
      } else {
        personajePrincipal.fortalecimiento[indicePoder].tiempo = 3;
        console.info('Efecto nuevamente aplicado:', personajePrincipal.fortalecimiento[indicePoder].nombre);
      }
    },
    3,
    false,
    true
  );
}

function AumentoPoderContinuo(personaje: Personaje): EfectoContinuo {
  return new EfectoContinuo({
    nombre: 'Aumento de Poder',
    descripcion: 'Aumenta tu ataque en 5 puntos cada turno (dura 3 turnos)',
    tiempo: 3,
    efecto: (p: Personaje = personaje) => {
      p.ataque += 5;
      console.info('¡Tu ataque ha aumentado! Ataque actual:', p.ataque);
    }
  });
}





//----------------------------------------------------------------------------------------------------------------------//


function LluviaDeEstrellas(): Habilidades { // 13 
  return new Habilidades(
    'Lluvia De Estrellas',
    'Daño',
    'causas 20 de daño a todos los enemigos',
    (Personaje: Personaje, PersonajeObj?: Personaje) => {
      const objetivoEquipo = PersonajeObj && PersonajeObj.equipo === 1 ? Juego.equipo1 : Juego.equipo2;
      objetivoEquipo.forEach((personaje) => {
        if (!personaje.estaMuerto()) {
          personaje.vida -= 20;
        }
      });
    },
    3,
    true,
    false
  );
}
function TempestadEterea(): Habilidades { // 12
  return new Habilidades(
    'Tempestad Eterea',
    'Daño',
    'Causa 10 de daño y reduce la defensa de un enemigo en 10',
    (PersonajePrincipal: Personaje, PersonajeObj?: Personaje) => {
      if (!PersonajeObj) return;
      PersonajeObj.vida -= 10;
      PersonajeObj.defensa -= 10;
    },
    2,
    false,
    false
  );
}

function Guerra(): Habilidades { // 11
  return new Habilidades(
    'Guerra',
    'propio',
    'aumentas tu defensa en 10 y tu ataque en 20 durante 2 turnos',
    (Personaje: Personaje) => {
      const indiceEndurecimiento = Personaje.fortalecimiento.findIndex((ef) => ef.nombre === 'Endurecimiento');
      if (indiceEndurecimiento === -1) {
        const ef = Endurecimiento(Personaje);
        Personaje.fortalecimiento.push(ef);
        Personaje.fortalecimiento.forEach((efect) => {
          if (efect.nombre === 'Endurecimiento' && efect instanceof EfectoFijo) {
            efect.Aplicar(Personaje);
            console.info(efect.nombre, 'activado');
          }
        });
      } else {
        Personaje.fortalecimiento[indiceEndurecimiento].tiempo = 3;
        console.info('efecto nuevamente aplicado');
      }

      const indiceFuria = Personaje.fortalecimiento.findIndex((ef) => ef.nombre === 'Furia');
      if (indiceFuria === -1) {
        const ef = Furia(Personaje);
        Personaje.fortalecimiento.push(ef);
        Personaje.fortalecimiento.forEach((efect) => {
          if (efect.nombre === 'Furia' && efect instanceof EfectoFijo) {
            efect.Aplicar(Personaje);
            console.info(efect.nombre, 'activado');
          }
        });
      } else {
        Personaje.fortalecimiento[indiceFuria].tiempo = 2;
        console.info('efecto nuevamente aplicado');
      }
    },
    3,
    false,
    true
  );
}

function Endurecimiento(personaje: Personaje): EfectoFijo {
  return new EfectoFijo({
    nombre: 'Endurecimiento',
    descripcion: 'Aumenta tu defensa en +10 puntos durante 2 turnos',
    tiempo: 2,
    efecto: (p: Personaje = personaje) => {
      p.defensa += 10;
    },
    finEfecto: (p: Personaje = personaje) => {
      p.defensa -= 10;
    }
  });
}


function Furia(personaje: Personaje): EfectoFijo {
  return new EfectoFijo({
    nombre: 'Furia',
    descripcion: 'Aumenta tu daño en +20 puntos durante 2 turnos',
    tiempo: 2,
    efecto: (p: Personaje = personaje) => {
      p.ataque += 20;
    },
    finEfecto: (p: Personaje = personaje) => {
      p.ataque -= 20;
    }
  });
}


function Blindar(): Habilidades { // 10
  return new Habilidades(
    'Blindar',
    'ataque',
    'Aumentas tu defensa 20 y reduces la de un objetivo 10 por 2 turnos',
    (Personaje: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      const indiceEndurecimiento = Personaje.fortalecimiento.findIndex((ef) => ef.nombre === 'Endurecimiento');
      if (indiceEndurecimiento === -1) {
        const ef = Endurecimiento(Personaje);
        Personaje.fortalecimiento.push(ef);
        Personaje.fortalecimiento.forEach((efect) => {
          if (efect instanceof EfectoFijo) {
            efect.Aplicar(Personaje);
            console.info(efect.nombre, 'activado');
          }
        });
      } else {
        Personaje.fortalecimiento[indiceEndurecimiento].tiempo = 3;
        console.info('efecto nuevamente aplicado');
      }

      const indiceDefensaReducida = Personaje.debilitamiento.findIndex((ef) => ef.nombre === 'Desgaste Defensa');
      if (indiceDefensaReducida === -1) {
        const ef = DesgasteDefensa(personajeObj);
        personajeObj.debilitamiento.push(ef);
        personajeObj.debilitamiento.forEach((efect) => {
          if (efect.nombre === 'Desgaste Defensa' && efect instanceof EfectoFijo) {
            efect.Aplicar(personajeObj);
            console.info(efect.nombre, 'activado');
          }
        });
      } else {
        personajeObj.debilitamiento[indiceDefensaReducida].tiempo = 2;
        console.info('efecto nuevamente aplicado');
      }

    },
    3,
    false,
    false
  );
}

function Hades(): Habilidades { // 1
  return new Habilidades(
    'Infierno de hades',
    'Daño',
    'Veneno magico que quita 4 de defensa y 5 de ataque',
    (personajePrincipal: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      if (!personajeObj.estaMuerto()) {
        const indiceVenenoInfernal = personajeObj.debilitamiento.findIndex(Efecto => Efecto.nombre == 'Veneno Infernal')
        if (indiceVenenoInfernal == -1) {
          personajeObj.debilitamiento.push(VenenoInfernal(personajeObj))
          personajeObj.debilitamiento.forEach(debilitamiento => {
            if (debilitamiento.nombre == 'Veneno Infernal') {
              debilitamiento.Activar(personajeObj)
              console.info(debilitamiento.nombre, 'activado')
            }
          })
        } else {
          personajeObj.debilitamiento[indiceVenenoInfernal].tiempo = 4
          console.info('efecto nuevamente aplicado', personajeObj.debilitamiento[indiceVenenoInfernal].nombre)
        }
      }
    },
    3,
    false,
    false
  )
}


function Quemar(Personaje: Personaje): EfectoContinuo {
  return new EfectoContinuo({
    nombre: 'Quemar',
    descripcion: 'marca al enemigo por 4 rondas quitando 5 de vida cada vez',
    tiempo: 4,
    efecto: (personaje: Personaje = Personaje) => {
      personaje.vida -= 5;
    }
  });
}

function Incinerar(): Habilidades {
  return new Habilidades(
    'Incinerar',
    'ataque',
    'Causa daño y aplica quemadura por 4 turnos',
    (personajePrincipal: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      personajeObj.vida -= 30;
      const indiceQuemar = personajeObj.debilitamiento.findIndex(e => e.nombre === 'Quemar');
      if (indiceQuemar === -1) {
        const ef = Quemar(personajeObj);
        personajeObj.debilitamiento.push(ef);
        personajeObj.debilitamiento.forEach(debilitamiento => {
          if (debilitamiento.nombre === 'Quemar') debilitamiento.Activar(personajeObj);
        });
      } else {
        personajeObj.debilitamiento[indiceQuemar].tiempo = 4;
      }
    },
    2,
    false,
    false
  );
}
function Limpiar(): Habilidades { // FUNCIONA
  return new Habilidades(
    'Limpiar',
    'Mejora',
    'Elimina un efecto negativo de un aliado',
    (personajePrincipal: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      const indiceVeneno = personajeObj.debilitamiento.findIndex(Efecto => Efecto.nombre == 'Veneno')
      if (personajeObj.equipo == 1) {
        Juego.equipo1.forEach(personaje => {
          if (personajeObj == personaje) {
            personaje.ataque -= 10
            personaje.defensa -= 10
            if (indiceVeneno == -1) {
              personaje.debilitamiento.push(Veneno(personaje))
              personaje.debilitamiento.forEach(debilitamiento => {
                if (debilitamiento.nombre == 'Veneno') {
                  debilitamiento.Activar(personaje)
                  console.info(debilitamiento.nombre, 'activado')
                }
              })
            } else {
              personaje.debilitamiento[indiceVeneno].tiempo = 3
              console.info('efecto nuevamente aplicado', personaje.debilitamiento[indiceVeneno].nombre)
            }
          }
        })
      }

      if (personajeObj.equipo == 2) {
        Juego.equipo2.forEach(personaje => {
          if (personajeObj == personaje) {
            personaje.ataque -= 10
            personaje.defensa -= 10
            if (indiceVeneno == -1) {
              personaje.debilitamiento.push(Veneno(personaje))
              personaje.debilitamiento.forEach(debilitamiento => {
                if (debilitamiento.nombre == 'Veneno') {
                  debilitamiento.Activar(personaje)
                  console.info(debilitamiento.nombre, 'activado')
                }
              })
            } else {
              personaje.debilitamiento[indiceVeneno].tiempo = 3
              console.info('efecto nuevamente aplicado', personaje.debilitamiento[indiceVeneno].nombre)
            }
          }
        })
      }
    },
    2,
    false,
    true
  );
}

function ultimoAliento(): Habilidades { // 6
  return new Habilidades(
    'Ultimo Aliento',
    'propio',
    'El objetivo pierde el 50% de su vida actual su ataque aumenta en 50 en un turno',
    (personajePrincipal) => {
      personajePrincipal.vida -= (personajePrincipal.vida / 2);
      const indiceEspada = personajePrincipal.fortalecimiento.findIndex(Efecto => Efecto.nombre == 'Espada Larga')
      if (indiceEspada == -1) {
        personajePrincipal.fortalecimiento.push(EspadaLarga(personajePrincipal))
        personajePrincipal.fortalecimiento.forEach(fortalecimiento => {
          if (fortalecimiento.nombre == 'Espada Larga') {
            if (fortalecimiento instanceof EfectoFijo) {
              fortalecimiento.Aplicar(personajePrincipal)
            }
            console.info(fortalecimiento.nombre, 'activado')
          }
        })
      } else {
        personajePrincipal.fortalecimiento[indiceEspada].tiempo = 1
        console.info('efecto nuevamente aplicado', personajePrincipal.fortalecimiento[indiceEspada].nombre)
      }

    },
    3,
    false,
    true
  )
}

function LlamadoSagrado(): Habilidades {  // FUNCIONA
  return new Habilidades(
    'Llamado Sagrado',
    'propio',
    'Sacrificas tu ataque en 10 para aumentar tu defensa 10 puntos',
    (personajeObj) => {
      personajeObj.ataque -= 10;
      personajeObj.defensa += 10;
    },
    2,
    false,
    true
  )
}


function EscudoBendito(): Habilidades {
  return new Habilidades(
    'Escudo bendito',
    'propio', //No se esta parte de tipo como funciona
    'Mejoras tu defensa en 20 pero tu ataque baja 15',
    (personajeObj: Personaje) => {
      personajeObj.defensa += 20;
      personajeObj.ataque -= 15;
    },
    1,
    false,
    true
  )
}


function FuerzaIrrompible(): Habilidades { // FUNCIONA
  return new Habilidades(
    'Fuerza Irrompible',
    'Mejora',
    'Aumenta el ataque de todos los aliados en +10 durante 2 turnos.',
    (personajePrincipal: Personaje, personajeObj?: Personaje) => {
      const equipo = personajePrincipal.equipo == 1 ? Juego.equipo1 : Juego.equipo2;
      equipo.forEach(personaje => {
        const indiceFuerza = personaje.fortalecimiento.findIndex(Efecto => Efecto.nombre == 'Impulso de ataque')
        if (indiceFuerza == -1) {
          personaje.fortalecimiento.push(ImpulsoAtaque(personaje))
          personaje.fortalecimiento.forEach(fortalecimiento => {
            if (fortalecimiento.nombre == 'Impulso de ataque') {
              if (fortalecimiento instanceof EfectoFijo) {
                fortalecimiento.Aplicar(personaje)
                console.info(fortalecimiento.nombre, 'activado')
              }
            }
          })
        } else {
          personaje.fortalecimiento[indiceFuerza].tiempo = 2
          console.info('efecto nuevamente aplicado', personaje.fortalecimiento[indiceFuerza].nombre)
        }
      })
      console.info('Fuerza Irrompible activada, el ataque de los aliados ha aumentado por 2 turnos');
    },
    2,
    true,
    true
  )
}

function ImpulsoAtaque(personaje: Personaje): EfectoFijo {
  return new EfectoFijo({
    nombre: 'Impulso de ataque',
    descripcion: 'Aumenta el ataque en +10 durante 2 turnos',
    tiempo: 2,
    efecto: (p: Personaje = personaje) => {
      p.ataque += 10;
    },
    finEfecto: (p: Personaje = personaje) => {
      p.ataque -= 10;
    }
  });
}

function Stun(personaje: Personaje): EfectoFijo {
  return new EfectoFijo({
    nombre: 'Stun',
    descripcion: 'Pierde 1 turno',
    tiempo: 1,
    efecto: (p: Personaje = personaje) => { },
    finEfecto: (p: Personaje = personaje) => { }
  });
}

function EspadaLarga(personaje: Personaje): EfectoFijo {
  return new EfectoFijo({
    nombre: 'Espada Larga',
    descripcion: 'Aumenta el ataque en +50 durante 1 turno',
    tiempo: 1,
    efecto: (p: Personaje = personaje) => {
      p.ataque += 50;
    },
    finEfecto: (p: Personaje = personaje) => {
      p.ataque -= 50;
    }
  });
}

function DesgasteDefensa(personaje: Personaje): EfectoFijo {
  return new EfectoFijo({
    nombre: 'Desgaste Defensa',
    descripcion: 'Reduce la defensa en 10 por 2 turnos',
    tiempo: 2,
    efecto: (p: Personaje = personaje) => {
      p.defensa -= 10;
    },
    finEfecto: (p: Personaje = personaje) => {
      p.defensa += 10;
    }
  });
}


function Alivio(): Habilidades {
  return new Habilidades( // 4
    'Alivio',
    'Mejora',
    'El objetivo reduce su vida en 30 puntos para curar a un aliado 20 puntos',
    (personajePrincipal: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      personajePrincipal.vida -= 30;
      personajeObj.vida += 20;
    },
    3,
    false,
    true
  )
}

function Curar(): Habilidades { //3
  return new Habilidades(
    'Curar',
    'Mejora',
    'El objetivo aumenta su defensa +5 y cura a todos los aliados +20',
    (personajePrincipal) => {
      if (personajePrincipal.equipo === 1) {
        personajePrincipal.defensa += 5;
        Juego.equipo1.forEach((personaje) => {
          if (!personaje.estaMuerto()) {
            personaje.vida += 20;
          }
        });
      } else {
        personajePrincipal.defensa += 5;
        Juego.equipo2.forEach((personaje) => {
          if (!personaje.estaMuerto()) {
            personaje.vida += 20;
          }
        });
      }
    },
    3,
    false,
    true
  )
}

function Pandemia(): Habilidades { // 2
  return new Habilidades(
    'Pandemia',
    'ataque',
    'Causa 10 de daño al objetivo y envenena a todos los enemigos',
    (personajePrincipal, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      personajeObj.vida -= 5
      const equipo = personajeObj.equipo === 1 ? Juego.equipo1 : Juego.equipo2;
      equipo.forEach(personaje => {
        const indiceVeneno = personaje.debilitamiento.findIndex(Efecto => Efecto.nombre == 'Veneno')
        if (indiceVeneno == -1) {
          personaje.debilitamiento.push(Veneno(personaje))
          personaje.debilitamiento.forEach(debilitamiento => {
            if (debilitamiento.nombre == 'Veneno') {
              debilitamiento.Activar(personaje)
              console.info(debilitamiento.nombre, 'activado')
            }
          })
        } else {
          personaje.debilitamiento[indiceVeneno].tiempo = 3
          console.info('efecto nuevamente aplicado', personaje.debilitamiento[indiceVeneno].nombre)
        }
      })
    },
    2,
    true,
    false
  )
}

function Veneno(Personaje: Personaje): EfectoContinuo { // FUNCIONA
  return new EfectoContinuo({
    nombre: 'Veneno',
    descripcion: 'marca al enemigo por 3 rondas quitando 10 de vida cada vez',
    tiempo: 3,
    efecto: (personaje: Personaje = Personaje) => {
      personaje.vida -= 10;
    }
  });
}

function Congelar(): Habilidades {
  return new Habilidades(
    'Congelar',
    'Mejora',
    'Haces que el enemigo pierda 1 turno',
    (personajeActual: Personaje, personaje?: Personaje) => {
      if (!personaje) return;
      const indiceStun = personaje.debilitamiento.findIndex(Efecto => Efecto.nombre == 'Stun')
      if (indiceStun == -1) {
        const ef = Stun(personaje)
        personaje.debilitamiento.push(ef)
        personaje.debilitamiento.forEach(debilitamiento => {
          if (debilitamiento.nombre == 'Stun') {
            if (debilitamiento instanceof EfectoFijo) {
              debilitamiento.Aplicar(personaje)
            } else {
              debilitamiento.Activar(personaje)
            }
            console.info(debilitamiento.nombre, 'activado')
          }
        })
      } else {
        personaje.debilitamiento[indiceStun].tiempo = 1
        console.info('efecto nuevamente aplicado', personaje.debilitamiento[indiceStun].nombre)
      }
    },
    3,
    false,
    false
  )
}


function VenenoInfernal(Personaje: Personaje): EfectoContinuo {
  return new EfectoContinuo({
    nombre: 'Veneno Infernal',
    descripcion: 'Veneno que quita 4 de defensa y 5 de ataque cada vez',
    tiempo: 4,
    efecto: (personaje: Personaje = Personaje) => {
      personaje.defensa -= 4;
      personaje.ataque -= 5;
    },
    finEfecto: (personaje: Personaje = Personaje) => {
      personaje.defensa += 4;
      personaje.ataque += 5;
    }
  });
}


function Virus(): Habilidades { // FUNCIONA
  return new Habilidades(
    'Virus',
    'ataque',
    'Envenena al enemigo y reduce el ataque y defensa en 10 puntos',
    (personajePrincipal: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      const indiceVeneno = personajeObj.debilitamiento.findIndex(Efecto => Efecto.nombre == 'Veneno')
      if (personajeObj.equipo == 1) {
        Juego.equipo1.forEach(personaje => {
          if (personajeObj == personaje) {
            personaje.ataque -= 10
            personaje.defensa -= 10
            if (indiceVeneno == -1) {
              personaje.debilitamiento.push(Veneno(personaje))
              personaje.debilitamiento.forEach(debilitamiento => {
                if (debilitamiento.nombre == 'Veneno') {
                  debilitamiento.Activar(personaje)
                  console.info(debilitamiento.nombre, 'activado')
                }
              })
            } else {
              personaje.debilitamiento[indiceVeneno].tiempo = 3
              console.info('efecto nuevamente aplicado', personaje.debilitamiento[indiceVeneno].nombre)
            }
          }
        })
      }

      if (personajeObj.equipo == 2) {
        Juego.equipo2.forEach(personaje => {
          if (personajeObj == personaje) {
            personaje.ataque -= 10
            personaje.defensa -= 10
            if (indiceVeneno == -1) {
              personaje.debilitamiento.push(Veneno(personaje))
              personaje.debilitamiento.forEach(debilitamiento => {
                if (debilitamiento.nombre == 'Veneno') {
                  debilitamiento.Activar(personaje)
                  console.info(debilitamiento.nombre, 'activado')
                }
              })
            } else {
              personaje.debilitamiento[indiceVeneno].tiempo = 3
              console.info('efecto nuevamente aplicado', personaje.debilitamiento[indiceVeneno].nombre)
            }
          }
        })
      }
    },
    2,
    true,
    false
  )
}



function Aturdir(): Habilidades {
  return new Habilidades(
    'Sello del Silencio', // Nombre de la habilidad
    'Mejora', // Tipo de habilidad -> NO SE SI ES DEBILITAMIENTO O MEJORA
    'Congela 1 turno al enemigo y quita 20 de vida por el turno que esté congelado', // Descripción
    (personajeActual: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      personajeObj.vida -= 20;

      const indiceStun = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === 'Stun'
      );

      if (indiceStun === -1) {
        const efectoStun = Stun(personajeObj);
        personajeObj.debilitamiento.push(efectoStun);
        if (efectoStun instanceof EfectoFijo) efectoStun.Aplicar(personajeObj);
        console.info(efectoStun.nombre, 'activado');
      } else {
        personajeObj.debilitamiento[indiceStun].tiempo = 1;
        console.info('efecto nuevamente aplicado', personajeObj.debilitamiento[indiceStun].nombre);
      }
    },
    2,
    false,
    false
  );
}

function AbsorcionDePoder() {
  return new Habilidades(
    'Absorción de Poder', // Nombre de la habilidad
    'Debilitamiento', // Tipo de habilidad
    'Congela 1 turno al enemigo y roba el 10 puntos de su ataque', // Descripción
    (personajeActual: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      personajeObj.ataque -= 10;
      personajeActual.ataque += 10;

      const indiceStun = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === 'Stun'
      );

      if (indiceStun === -1) {
        const efectoStun = Stun(personajeObj);
        personajeObj.debilitamiento.push(efectoStun);
        if (efectoStun instanceof EfectoFijo) efectoStun.Aplicar(personajeObj);
        console.info(efectoStun.nombre, 'activado');
      } else {
        personajeObj.debilitamiento[indiceStun].tiempo = 1;
        console.info('efecto nuevamente aplicado', personajeObj.debilitamiento[indiceStun].nombre);
      }
    },
    3,
    false,
    false
  );
}

function VenenoCongelador() {
  return new Habilidades(
    'Veneno Congelador',
    'Debilitamiento',
    'Congela 1 turno del enemigo y envenena al enemigo',
    (personajeActual: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      const indiceVeneno = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === 'Veneno'
      );
      const indiceStun = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === 'Stun'
      );

      if (indiceVeneno === -1) {
        const efectoVeneno = Veneno(personajeObj);
        personajeObj.debilitamiento.push(efectoVeneno);
        efectoVeneno.Activar(personajeObj);
        console.info(`Se activó el efecto ${efectoVeneno.nombre}`);
      } else {
        personajeObj.debilitamiento[indiceVeneno].tiempo = 1;
        console.info(`Efecto ${personajeObj.debilitamiento[indiceVeneno].nombre} reaplicado`);
      }

      if (indiceStun === -1) {
        const efectoStun = Stun(personajeObj);
        personajeObj.debilitamiento.push(efectoStun);
        efectoStun.Activar(personajeObj);
        console.info(`Se activó el efecto ${efectoStun.nombre}`);
      } else {
        personajeObj.debilitamiento[indiceStun].tiempo = 1;
        console.info(`Efecto ${personajeObj.debilitamiento[indiceStun].nombre} reaplicado`);
      }
    },
    3,
    false,
    false

  );
}

// removed old-school duplicates of VenenoInfernal and Stun (we use typed implementations above)

function LlamaMortal() {
  return new Habilidades(
    //EJEMPLO DE HABILIDAD MASA
    "Llama Mortal",
    "Masa",
    "Ataque que quema a todos los enemigos",
    (personajeActual: Personaje, personajeObj?: Personaje) => {
      if (!personajeObj) return;
      const indiceQuemar = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === "quemar"
      );

      if (indiceQuemar == -1) {
        let efectoQuemar;
        const equipo =
          personajeObj.equipo == 1 ? Juego.equipo1 : Juego.equipo2;

        equipo.forEach((personaje) => {
          efectoQuemar = Quemar(personaje);
          personaje.debilitamiento.push(efectoQuemar);
          efectoQuemar.Activar(personaje);
          console.info(efectoQuemar.nombre, "activado");
        });
      } else {
        // Si el efecto ya existe, reiniciar su tiempo a 1 turno
        personajeObj.debilitamiento[indiceQuemar].tiempo = 1;
        console.info(
          "efecto nuevamente aplicado",
          personajeObj.debilitamiento[indiceQuemar].nombre
        );
      }
    },
    3,
    true,
    false
  );
}
