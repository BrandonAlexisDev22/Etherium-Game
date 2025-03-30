class Habilidades {
  constructor(nombre, Tipo, Descripcion, Accion, Cooldown,Masa,Mejora) {
    this.nombre = nombre;
    this.Tipo = Tipo;
    this.Descripcion = Descripcion;
    this.Accion = Accion;
    this.Espera = 0;
    this.Cooldown = Cooldown;
    this.Masa = Masa;
    this.Mejora = Mejora
  }

  Activar(personajePrincipal, PersonajeObj) {
    if (this.Espera != 0) return console.info('La habilidad no se podra usar hasta dentro de',this.Espera,'turnos'); // se valida si la habilidad tiene cooldown activo
    if (PersonajeObj.estaMuerto()) return console.warn('El personaje',PersonajeObj.nombre,'esta muerto'); // se valida que el objetivo este vivo si esta vivo retorna true (HABIA ERROR AQUI)
    if (personajePrincipal.equipo == PersonajeObj.equipo && this.Tipo == "Ataque") return console.warn('no puedes atacar aliados!!'); // se valida que la habilidad a usar no sea un ataque para usarse con un aliado
    this.Accion(personajePrincipal, PersonajeObj); // se activa la habilidad
    this.Espera = this.Cooldown; // la habilidad entra en cooldown
    Personaje.validarExcesos(personajePrincipal, PersonajeObj); // se validan excesos despues de accionarse la habilidad
  }

  reducirEspera() {
    if (this.Espera == 0) return console.info('la habilidad no se encuentra en espera') ; // se valida que la habilidad tenga cooldown activo para reducirse
    this.Espera -= 1; // se reduce el cooldown activo en 1
  }
}

// ---------------HABIIDADES PARA PROBAR SI LOS EFECTOS CONTINUOS DE FORTALECIMIENTO Y DEBILITAMIENTO FUNCIONAN-----------------------
function AumentoDePoder() {
  return new Habilidades(
    'Aumento de Poder',
    'propio',
    'Aumenta tu ataque en +5 puntos cada turno durante 3 turnos',
    (personajePrincipal) => {
      // Aplicamos el efecto de aumento de poder al personaje principal
      const indicePoder = personajePrincipal.fortalecimiento.findIndex(Efecto => Efecto.nombre === 'Aumento de Poder');
      if (indicePoder === -1) {
        personajePrincipal.fortalecimiento.push(AumentoPoderContinuo(personajePrincipal));
        personajePrincipal.fortalecimiento.forEach(fortalecimiento => {
          if (fortalecimiento.nombre === 'Aumento de Poder') {
            fortalecimiento.Activar(personajePrincipal);
            console.info(fortalecimiento.nombre, 'activado');
          }
        });
      } else {
        personajePrincipal.fortalecimiento[indicePoder].tiempo = 3; // Restablecer el tiempo del efecto
        console.info('Efecto nuevamente aplicado:', personajePrincipal.fortalecimiento[indicePoder].nombre);
      }
    },
    3,
    false,
    true
  );
}

function AumentoPoderContinuo(Personaje) {
  return new EfectoContinuo(
    'Aumento de Poder',
    'Aumenta tu ataque en 5 puntos cada turno (dura 3 turnos)',
    (personaje = Personaje) => {
      personaje.ataque += 5;
      console.info('¡Tu ataque ha aumentado! Ataque actual:', personaje.ataque);
    },
    3,
    false,
    true
  );
}

function Desgaste() {
  return new Habilidades(
    'Desgaste',
    'Debilitamiento',
    'Reduce la defensa del objetivo en 5 puntos cada turno durante 3 turnos',
    (personajePrincipal, personajeObj) => {
      // Verificar si el objetivo está muerto
      if (personajeObj.estaMuerto()) {
        return console.warn('El personaje', personajeObj.nombre, 'está muerto, no se puede aplicar Desgaste.');
      }
      
      const indiceDesgaste = personajeObj.debilitamiento.findIndex(Efecto => Efecto.nombre === 'Desgaste');
      
      if (indiceDesgaste === -1) {
        // Si el efecto de Desgaste no existe, se crea uno nuevo y se activa
        personajeObj.debilitamiento.push(DesgasteEfecto(personajeObj));
        personajeObj.debilitamiento.forEach(debilitamiento => {
          if (debilitamiento.nombre === 'Desgaste') {
            debilitamiento.Activar(personajeObj);
            console.info(debilitamiento.nombre, 'activado');
          }
        });
      } else {
        // Si el efecto ya existe, se reinicia su tiempo
        personajeObj.debilitamiento[indiceDesgaste].tiempo = 3;
        console.info('Efecto nuevamente aplicado:', personajeObj.debilitamiento[indiceDesgaste].nombre);
      }
    },
    3,
    false,
    true
  );
}

function DesgasteEfecto(Personaje) {
  return new EfectoContinuo(
    'Desgaste',
    'Reduce la defensa en 5 puntos cada vez durante 3 turnos',
    (personaje = Personaje) => {
      personaje.defensa -= 5;
      console.info('La defensa de', personaje.nombre, 'se ha reducido a', personaje.defensa);
    },
    3 // Duración del efecto en turnos
  );
}

//----------------------------------------------------------------------------------------------------------------------//


function LluviaDeEstrellas() { // 13 
  return new Habilidades(
    "Lluvia De Estrellas",
    "Daño",
    "causas 20 de daño a todos los enemigos",
    (Personaje, PersonajeObj) => {
      if (PersonajeObj.equipo == 1) {
        Juego.equipo1.forEach((personaje) => {
          if (!personaje.estaMuerto()){
            personaje.vida -= 20;
          } 
        })
      } else {
        Juego.equipo2.forEach((personaje) => {
          if (!personaje.estaMuerto()){
            personaje.vida += 20;
          } 
        })
      }      
    },
    3,
    true,
    false
  );
}
function TempestadEterea() { // 12
  return new Habilidades(
    "Tempestad Eterea",
    "Daño",
    "Causa 10 de daño y reduce la defensa de un enemigo en 10",
    (PersonajePrincipal,PersonajeObj) => {
      PersonajeObj.vida -= 10;
      PersonajeObj.defensa -= 10;
    },
    2,
    false,
    false
  );
}

function Guerra() { // 11
  return new Habilidades(
    "Guerra",
    "propio",
    "aumentas tu defensa en 10 y tu ataque en 20 durante 2 turnos",
    (Personaje) => {
      const indiceEndurecimiento = Personaje.fortalecimiento.findIndex(Efecto=> Efecto.nombre == 'Endurecimineto')
      if (indiceEndurecimiento == -1) {
        Personaje.fortalecimiento.push(Endurecimiento(Personaje))
        Personaje.fortalecimiento.forEach(fortalecimiento=>{
          if (fortalecimiento.nombre=='Endurecimiento') {
            fortalecimiento.Aplicar(Personaje)
            console.info(fortalecimiento.nombre,'activado')
          }
        })
      } else {
        Personaje.fortalecimiento[indiceEndurecimiento].tiempo = 3
        console.info('efecto nuevamente aplicado')
      }

      const indiceFuria = Personaje.fortalecimiento.findIndex(Efecto => Efecto.nombre == 'Furia')
      if (indiceFuria == -1) {
        Personaje.fortalecimiento.push(Furia(Personaje))
        Personaje.fortalecimiento.forEach(fortalecimiento=>{
          if (fortalecimiento.nombre=='Furia') {
            fortalecimiento.Aplicar(Personaje)
            console.info(fortalecimiento.nombre,'activado')
          }
        })
      } else {
        Personaje.fortalecimiento[indiceFuria].tiempo = 2
        console.info('efecto nuevamente aplicado')
      }
    },
    3,
    false,
    true
  );
}

function Endurecimiento(Personaje) {
  return new EfectoFijo(
    "Endurecimiento",
    "Aumenta tu defensa en + 10 puntos durante 2 turnos",
    (personaje = Personaje) => {
      personaje.defensa += 10;
    },
    2,
    (personaje = Personaje) => {
      personaje.defensa -= 10;
    }
  );
}

function Furia(Personaje) {
  return new EfectoFijo(
    "Furia",
    "Aumenta tu daño en +20 puntos durante 2 turnos",
    (personaje = Personaje) => {
      personaje.ataque += 20;
    },
    2,
    (personaje = Personaje) => {
      personaje.ataque -= 20;
    }
  );
}

function Blindar() { // 10
  return new Habilidades(
    "Blindar",
    "ataque",
    "Aumentas tu defensa 20 y reduces la de un objetivo 10 por 2 turnos",
    (Personaje,personajeObj) => {
      const indiceEndurecimiento = Personaje.fortalecimiento.findIndex(Efecto=> Efecto.nombre == 'Endurecimineto')
      if (indiceEndurecimiento == -1) {
        Personaje.fortalecimiento.push(Endurecimiento(Personaje))
        Personaje.fortalecimiento.forEach(fortalecimiento=>{
          if (fortalecimiento.nombre=='Endurecimiento') {
            fortalecimiento.Aplicar(Personaje)
            console.info(fortalecimiento.nombre,'activado')
          }
        })
      } else {
        Personaje.fortalecimiento[indiceEndurecimiento].tiempo = 3
        console.info('efecto nuevamente aplicado')
      }

      const indiceDefensaReducida = Personaje.debilitamiento.findIndex(Efecto => Efecto.nombre == 'Desgaste Defensa')
      if (indiceDefensaReducida == -1) {
        personajeObj.debilitamiento.push(DesgasteDefensa(personajeObj))
        personajeObj.debilitamiento.forEach(debilitamiento=>{
          if (debilitamiento.nombre=='Desgaste Defensa') {
            debilitamiento.Aplicar(personajeObj)
            console.info(debilitamiento.nombre,'activado')
          }
        })
      } else {
        personajeObj.debilitamiento[indiceDefensaReducida].tiempo = 2
        console.info('efecto nuevamente aplicado')
      }

    },
    3,
    false,
    false
  );
}

function Incinerar() { // 9
  return new Habilidades(
    "Incinerar",
    "ataque",
    "Marcas a un enemigo, reduciendo su vida en 5 durante 4 turnos",
    (Personaje, PersonajeObj) => {
      PersonajeObj.vida -= 5;
      PersonajeObj.debilitamiento.push(Quemar(PersonajeObj)); // Efecto
    },
    2,
    false,
    false
  );
}

function DesgasteDefensa(Personaje) {
  return new EfectoFijo(
    'Desgaste Defensa',
    'Disminuir defensa en 10',
    (personaje = Personaje) => {

      personaje.defensa -= 10;
    },
    2,
  );
}

function Quemar(Personaje) {
  return new EfectoContinuo(
    "Quemar",
    "marca al enemigo por 4 rondas quitando 5 de vida cada vez",
    (personaje = Personaje) => {
      personaje.vida -= 5;
      //AGREGAR AL ARRAY O A DEBILITAMIENTO
    },
    4,
  );
}

function Limpiar() {
  return new Habilidades(
    'Limpiar' ,
    'Mejora',
    'Elimina un efecto negativo de un aliado',
    (PersonajePrincipal,PersonajeObj)=>{
      PersonajeObj.debilitamiento.shift()
    }
    ),
    3,
    false,
    true
}

function Sacrificio() {
  return new Habilidades( // 7
    'Sacrificio',
    'reemplazo',
    'Elimina debilitamientos del objetivo, transfiriéndolos al usuario y reduciendo su duración en un turno.',
    (personajePrincipal,personajeObj)=>{
      personajeObj.debilitamiento.forEach(debilitamiento=>{
        personajePrincipal.debilitamiento.push(debilitamiento)
        if (Array.isArray(personajeObj.debilitamiento)) {
          personajeObj.debilitamiento = personajeObj.debilitamiento.filter((debil) => debil.nombre != debilitamiento.nombre);
        }
      }) 
      personajePrincipal.debilitamiento.forEach(debilitamiento=>{
        debilitamiento.tiempo-=1
      })
    },
    3,
    false,
    true
  )
}

function EspadaLarga(Personaje) {
  return new EfectoFijo(
    "Espada Larga",
    "Aumenta tu daño en +50 puntos durante 1 turno",
    (personaje = Personaje) => {
      personaje.ataque += 50;
    },
    1,
    (personaje = Personaje) => {
      personaje.ataque -= 50;
    }
  );
}

function ultimoAliento() { // 6
  return new Habilidades(
    'Ultimo Aliento',
    'propio',
    'El objetivo pierde el 50% de su vida actual su ataque aumenta en 50 en un turno',
    (personajePrincipal)=>{
      personajePrincipal.vida -= (personajePrincipal.vida/2);
      const indiceEspada = personajePrincipal.fortalecimiento.findIndex(Efecto=> Efecto.nombre == 'Espada Larga')
      if (indiceEspada == -1) {
        personajePrincipal.fortalecimiento.push(EspadaLarga(personajePrincipal))
        personajePrincipal.fortalecimiento.forEach(fortalecimiento=>{
          if (fortalecimiento.nombre=='Espada Larga') {
            fortalecimiento.Aplicar(personajePrincipal)
            console.info(fortalecimiento.nombre,'activado')
          }
        })
      } else {
        personaje.fortalecimiento[indiceEspada].tiempo = 1
        console.info('efecto nuevamente aplicado',personaje.fortalecimiento[indiceEspada].nombre)
      }
      
    },
    3,
    false,
    true
  )
}

function LlamadoSagrado(){  // FUNCIONA
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


function EscudoBendito() { 
  return new Habilidades(
    'Escudo bendito',
    'propio', //No se esta parte de tipo como funciona
    'Mejoras tu defensa en 20 pero tu ataque baja 15',
    (personajeObj) => {
      personajeObj.defensa += 20;
      personajeObj.ataque -= 15;
    },
    1,
    false,
    true
  )
}


function FuerzaIrrompible() { // FUNCIONA
  return new Habilidades(
    'Fuerza Irrompible',
    'Mejora',
    'Aumenta el ataque de todos los aliados en +10 durante 2 turnos.',
    (personajePrincipal,personajeObj) => {
      const equipo = personajePrincipal.equipo == 1 ? Juego.equipo1 : Juego.equipo2;
      equipo.forEach(personaje => {
        const indiceFuerza = personaje.fortalecimiento.findIndex(Efecto=> Efecto.nombre == 'Impulso de ataque')
        if (indiceFuerza == -1) {
          personaje.fortalecimiento.push(ImpulsoAtaque(personaje))
          personaje.fortalecimiento.forEach(fortalecimiento=>{
            if (fortalecimiento.nombre=='Impulso de ataque') {
              fortalecimiento.Aplicar(personaje)
              console.info(fortalecimiento.nombre,'activado')
            }
          })
        } else {
          personaje.fortalecimiento[indiceFuerza].tiempo = 2
          console.info('efecto nuevamente aplicado',personaje.fortalecimiento[indiceFuerza].nombre)
        }
      })
      console.info('Fuerza Irrompible activada, el ataque de los aliados ha aumentado por 2 turnos');
    },
    2,
    true,
    true
  )
}

function ImpulsoAtaque(Personaje) {
  return new EfectoFijo(
    'Impulso de ataque',
    'Aumenta el ataque en +10 durante 2 turnos',
    (personaje = Personaje) => {
      personaje.ataque += 10;
    },
    2,
    (personaje = Personaje) => {
      personaje.ataque -= 10;
    }
  )
}

function Alivio() {
  return new Habilidades( // 4
    'Alivio',
    'Mejora',
    'El objetivo reduce su vida en 30 puntos para curar a un aliado 20 puntos',
    (personajePrincipal, personajeObj) =>{
      personajePrincipal.vida -= 30;
      personajeObj.vida += 20;
    },
    3,
    false,
    true
  )
}

function Curar() { //3
  return new Habilidades(
    'Curar',
    'Mejora',
    'El objetivo aumenta su defensa +5 y cura a todos los aliados +20',
    (personajePrincipal) => {
      if (personajePrincipal.equipo = 1) {
        personajePrincipal.defensa += 5
        Juego.equipo1.forEach(personaje=>{
          if (!personaje.estaMuerto()) {
            personaje.vida += 20
          }
        })
      } else {
        personajePrincipal.defensa += 50
        Juego.equipo2.forEach(personaje=>{
          if (!personaje.estaMuerto()) {
            personaje.vida += 20
          }
        })
      }
    },
    3,
    false,
    true
  )
}

function Pandemia() { // 2
  return new Habilidades(
    'Pandemia',
    'ataque',
    'Causa 10 de daño al objetivo y envenena a todos los enemigos',
    (personajePrincipal,personajeObj)=>{
      personajeObj.vida-= 5
      if (personajeObj.equipo == 1) {
        Juego.equipo1.forEach(personaje=>{
          const indiceVeneno = personaje.debilitamiento.findIndex(Efecto=> Efecto.nombre == 'Veneno')
          if (indiceVeneno == -1) {
            personaje.debilitamiento.push(Veneno(personaje))
            personaje.debilitamiento.forEach(debilitamiento=>{
              if (debilitamiento.nombre=='Veneno') {
                debilitamiento.Activar(personaje)
                console.info(debilitamiento.nombre,'activado')
              }
            })
          } else {
            personaje.debilitamiento[indiceVeneno].tiempo = 3
            console.info('efecto nuevamente aplicado',personaje.debilitamiento[indiceVeneno].nombre)
          }
        })
      }
      
      if (personajeObj.equipo == 2) {
        
        Juego.equipo2.forEach(personaje=>{
          const indiceVeneno = personaje.debilitamiento.findIndex(Efecto=> Efecto.nombre == 'Veneno')
          if (indiceVeneno == -1) {
            personaje.debilitamiento.push(Veneno(personaje))
            personaje.debilitamiento.forEach(debilitamiento=>{
              if (debilitamiento.nombre=='Veneno') {
                debilitamiento.Activar(personaje)
                console.info(debilitamiento.nombre,'activado')
              }
            })
          } else {
            personaje.debilitamiento[indiceVeneno].tiempo = 3
            console.info('efecto nuevamente aplicado',personaje.debilitamiento[indiceVeneno].nombre )
          }
        })
      }
    },
    2,
    true,
    false
  )
}

function Veneno(Personaje) { // FUNCIONA
  return new EfectoContinuo(
    "Veneno",
    "marca al enemigo por 3 rondas quitando 10 de vida cada vez",
    (personaje = Personaje) => {
      personaje.vida -= 10;
    },
    3
  );
}

function Congelar() {
  return new Habilidades(
    'Congelar',
    'Mejora',
    'Haces que el enemigo pierda 1 turno',
    (personajeActual ,personaje ) => {
      const indiceStun = personaje.debilitamiento.findIndex(Efecto=> Efecto.nombre == 'Stun')
      if (indiceStun == -1) {
        personaje.debilitamiento.push(Stun(personaje))
        personaje.debilitamiento.forEach(debilitamiento=>{
          if (debilitamiento.nombre=='Stun') {
            debilitamiento.Aplicar(personaje)
            console.info(debilitamiento.nombre,'activado')
          }
        })
      } else {
        personaje.debilitamiento[indiceStun].tiempo = 1
        console.info('efecto nuevamente aplicado',personaje.debilitamiento[indiceStun].nombre )
      }  
    },
    3,
    false,
    false
  )
}

function Stun(Personaje) { 
  return new EfectoFijo(
    "Stun",
    "pierde 1 turno",
    (personaje = Personaje) => {
      
    },
    1,
    (personaje = Personaje) => {
    }
  );
}
function Hades() { // 1
  return new Habilidades(
    'Infierno de hades',
    'Daño',
    'Veneno magico que quita 4 de defensa y 5 de ataque',
    (personajePrincipal,personajeObj) => {
      if(!personajeObj.estaMuerto()) {
        const indiceVenenoInfernal = personajeObj.debilitamiento.findIndex(Efecto=> Efecto.nombre == 'Veneno Infernal')
        if (indiceVenenoInfernal == -1) {
          personajeObj.debilitamiento.push(VenenoInfernal(personajeObj))
          personajeObj.debilitamiento.forEach(debilitamiento=>{
            if (debilitamiento.nombre=='Veneno Infernal') {
              debilitamiento.Activar(personajeObj)
              console.info(debilitamiento.nombre,'activado')
            }
          })
        }else {
          personajeObj.debilitamiento[indiceVenenoInfernal].tiempo = 4
          console.info('efecto nuevamente aplicado',personajeObj.debilitamiento[indiceVenenoInfernal].nombre )
        }
      }
    },
    3,
    false,
    false
  )
}
function VenenoInfernal(Personaje) {
  return new EfectoContinuo(
    'Veneno Infernal',
    'Veneno que quita 4 de defensa y 5 de ataque cada vez',
    (personaje = Personaje) => {
      personaje.defensa -= 4;
      personaje.ataque -= 5

    },
    (personaje = Personaje) => {
      personaje.defensa += 4;
      personaje.ataque += 5
    },
    4
  )
}


function Virus() { // FUNCIONA
  return new Habilidades(
    'Virus',
    'ataque',
    'Envenena al enemigo y reduce el ataque y defensa en 10 puntos',
    (personajePrincipal,personajeObj)=>{
      const indiceVeneno = personajeObj.debilitamiento.findIndex(Efecto=> Efecto.nombre == 'Veneno')
      if (personajeObj.equipo == 1) {
        Juego.equipo1.forEach(personaje=>{
          if (personajeObj==personaje) {
            personaje.ataque -= 10
            personaje.defensa -= 10
            if (indiceVeneno == -1) {
              personaje.debilitamiento.push(Veneno(personaje))
              personaje.debilitamiento.forEach(debilitamiento=>{
                if (debilitamiento.nombre=='Veneno') {
                  debilitamiento.Activar(personaje)
                  console.info(debilitamiento.nombre,'activado')
                }
              })
            } else {
              personaje.debilitamiento[indiceVeneno].tiempo = 3
              console.info('efecto nuevamente aplicado',personaje.debilitamiento[indiceVeneno].nombre)
            }
          }
        })
      }

      if (personajeObj.equipo == 2) {
        Juego.equipo2.forEach(personaje=>{
          if (personajeObj==personaje) {
            personaje.ataque -= 10
            personaje.defensa -= 10
            if (indiceVeneno == -1) {
              personaje.debilitamiento.push(Veneno(personaje))
              personaje.debilitamiento.forEach(debilitamiento=>{
                if (debilitamiento.nombre=='Veneno') {
                  debilitamiento.Activar(personaje)
                  console.info(debilitamiento.nombre,'activado')
                }
              })
            } else {
              personaje.debilitamiento[indiceVeneno].tiempo = 3
              console.info('efecto nuevamente aplicado',personaje.debilitamiento[indiceVeneno].nombre)
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



function Aturdir() {
  return new Habilidades(
    "Sello del Silencio", // Nombre de la habilidad
    "Mejora", // Tipo de habilidad -> NO SE SI ES DEBILITAMIENTO O MEJORA
    "Congela 1 turno al enemigo y quita 20 de vida por el turno que esté congelado", // Descripción
    (personajeActual, personajeObj) => {
      // Función de efecto de la habilidad
      // Reducir 10 puntos de vida al personaje objetivo
      personajeObj.vida -= 20;

      // Buscar si el efecto "Stun" ya está aplicado en el personaje objetivo
      const indiceStun = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === "Stun"
      );

      if (indiceStun === -1) {
        // Si "Stun" no está presente, crear y añadir el efecto
        const efectoStun = Stun(personajeObj);
        personajeObj.debilitamiento.push(efectoStun);

        // Aplicar el efecto de inmediato
        efectoStun.Aplicar(personajeObj);
        console.info(efectoStun.nombre, "activado");
      } else {
        // Si el efecto ya existe, reiniciar su tiempo a 1 turno
        personajeObj.debilitamiento[indiceStun].tiempo = 1;
        console.info(
          "efecto nuevamente aplicado",
          personajeObj.debilitamiento[indiceStun].nombre
        );
      }
    },
    2,
    false,
    false
  );
}

function AbsorcionDePoder() {
  return new Habilidades(
    "Absorción de Poder", // Nombre de la habilidad
    "Debilitamiento", // Tipo de habilidad: se ajusta a "Debilitamiento" porque afecta negativamente al enemigo
    "Congela 1 turno al enemigo y roba el 10 puntos de su ataque", // Descripción
    (personajeActual, personajeObj) => {
      // Función de efecto de la habilidad
      // Robar 10% del ataque del personaje objetivo
      personajeObj.ataque -= 10;
      personajeActual.ataque += 10;

      // Buscar si el efecto "Stun" ya está aplicado en el personaje objetivo
      const indiceStun = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === "Stun"
      );

      if (indiceStun === -1) {
        // Si "Stun" no está presente, crear y añadir el efecto
        const efectoStun = Stun(personajeObj);
        personajeObj.debilitamiento.push(efectoStun);

        // Aplicar el efecto de inmediato
        efectoStun.Aplicar(personajeObj);
        console.info(efectoStun.nombre, "activado");
      } else {
        // Si el efecto ya existe, reiniciar su tiempo a 1 turno
        personajeObj.debilitamiento[indiceStun].tiempo = 1;
        console.info(
          "efecto nuevamente aplicado",
          personajeObj.debilitamiento[indiceStun].nombre
        );
      }
    },
    3,
    false,
    false
  );
}

function VenenoCongelador() {
  return new Habilidades(
    "Veneno Congelador",
    "Debilitamiento",
    "Congela 1 turno del enemigo y envenena al enemigo",
    (personajeActual, personajeObj) => {
      // Verifica si los efectos ya están aplicados
      const indiceVeneno = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === "Veneno"
      );
      const indiceStun = personajeObj.debilitamiento.findIndex(
        (efecto) => efecto.nombre === "Stun"
      );

      // Si el efecto de Veneno no está presente, aplicarlo
      if (indiceVeneno === -1) {
        const efectoVeneno = Veneno(personajeObj);
        personajeObj.debilitamiento.push(efectoVeneno);
        efectoVeneno.Activar(personajeObj);
        console.info(`Se activó el efecto ${efectoVeneno.nombre}`);
      } else {
        // Si el efecto Veneno ya existe, reiniciar su tiempo
        personajeObj.debilitamiento[indiceVeneno].tiempo = 1;
        console.info(
          `Efecto ${personajeObj.debilitamiento[indiceVeneno].nombre} reaplicado`
        );
      }

      // Aplica el efecto de Stun si no está presente
      if (indiceStun === -1) {
        const efectoStun = Stun(personajeObj);
        personajeObj.debilitamiento.push(efectoStun);
        efectoStun.Activar(personajeObj);
        console.info(`Se activó el efecto ${efectoStun.nombre}`);
      } else {
        // Si el efecto Stun ya existe, reiniciar su tiempo
        personajeObj.debilitamiento[indiceStun].tiempo = 1;
        console.info(
          `Efecto ${personajeObj.debilitamiento[indiceStun].nombre} reaplicado`
        );
      }
    },
    3,
    false,
    false

  );
}

function VenenoInfernal(Personaje) {
  return new EfectoContinuo(
    "Veneno Infernal",
    "Veneno que quita 4 de defensa y 5 de ataque cada vez",
    (personaje = Personaje) => {
      personaje.defensa -= 4;
      personaje.ataque -= 5;
    },
    (personaje = Personaje) => {
      personaje.defensa += 4;
      personaje.ataque += 5;
    },
    4
  );
}

function Stun(Personaje) {
  return new EfectoFijo(
    "Stun",
    "pierde 1 turno",
    (personaje = Personaje) => {},
    1,
    (personaje = Personaje) => {}
  );
}

function LlamaMortal() {
  return new Habilidades(
    //EJEMPLO DE HABILIDAD MASA
    "Llama Mortal",
    "Masa",
    "Ataque que quema a todos los enemigos",
    (personajeActual, personajeObj) => {
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
