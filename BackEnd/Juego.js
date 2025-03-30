//CLASE PRINCIPAL DEL JUEGO
class Juego {
  //ATRIBUTOS PRINCIPALES DEL JUEGO
  static equipo1 = [];
  static equipo2 = [];
  static turnoActualEquipo1 = 0;
  static turnoActualEquipo2 = 0;
  static turnoInicial = 0;
  static personajeActual = null;
  static campoEfectos = [];
  static equipoGanador = undefined

  static agregarPersonaje(equipo, personaje) {
    // Método que recibe:
    // - equipo: indica a qué equipo se va a agregar el personaje (1 o 2).
    // - personaje: el objeto del personaje que se va a agregar.
    // Agrega el personaje al equipo especificado si hay espacio disponible (máximo 3 personajes).

    if (equipo != 1 && equipo != 2) return; // Verifica si el equipo existe

    const equipoSeleccionado = equipo === 1 ? this.equipo1 : this.equipo2; //Equipo seleccionado del personaje

    if (equipoSeleccionado.length < 3) {
      //Añade el personaje al equipo
      equipoSeleccionado.push(personaje);
      console.info(`El personaje ${personaje.nombre} ha sido agregado`);
      personaje.equipo = equipo;
    } else {
      console.warn(`Limite excedido de 3 personajes`);
    }
  }

  static iniciarJuego() {
    // Método que no recibe parámetros.
    // Inicializa el juego eligiendo aleatoriamente qué equipo comienza el turno.
    // Establece el personaje actual según el equipo que inicia.
    let equipoInicial = Math.floor(Math.random() * 2) + 1; //Elegir Aleatoriamente que equipo comienza si el 1 o 2
    this.turnoInicial = equipoInicial; //Turno inicial
    this.personajeActual = equipoInicial == 1 ? this.equipo1[0] : this.equipo2[0]; //Personaje que empezara del equipo inicial
    console.info(
      `Inicia el equipo ${equipoInicial} con el personaje ${this.personajeActual.nombre}`
    );
    Personaje.validarExcesos()
  }

  static obtenerSiguientePersonaje() {
    // Verifica si hay un ganador
    if (this.verificarVictoria()) return;

    // Almacena el personaje actual y el equipo correspondiente
    const personajeActual = this.personajeActual;
    const equipoActual = personajeActual.equipo;

    // Cambia el personaje actual al siguiente en su equipo opuesto
    this.personajeActual =
      equipoActual === 1
        ? this.equipo2[this.turnoActualEquipo2]
        : this.equipo1[this.turnoActualEquipo1];

    let eqAct = this.personajeActual.equipo

    const debilitamiento = this.personajeActual.debilitamiento.find(debilitar=>debilitar.nombre == 'Stun')
    console.log(debilitamiento)
    if (debilitamiento) {
      console.warn(`El personaje ${this.personajeActual.nombre} salta turno`);
      if (eqAct === 1) { 
        if (this.turnoActualEquipo1 === 2) {
          if (this.equipo1[0].estaMuerto()) {
            this.turnoActualEquipo1 = 1
            Juego.aplicarEfectos(this.personajeActual)
            this.personajeActual = this.equipo1[this.turnoActualEquipo1]
          } else {
            this.turnoActualEquipo1 = 0
            Juego.aplicarEfectos(this.personajeActual)
            this.personajeActual = this.equipo1[this.turnoActualEquipo1]
          }
        } else {
          if (this.turnoActualEquipo1 === 1) {
            if (this.equipo1[2].estaMuerto()) {
              this.turnoActualEquipo1 = 0
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo1[this.turnoActualEquipo1]
            } else {
              this.turnoActualEquipo1 = 2
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo1[this.turnoActualEquipo1]
            }
          } else {
            if (this.equipo1[1].estaMuerto()) {
              this.turnoActualEquipo1 = 2
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo1[this.turnoActualEquipo1]
            } else {
              this.turnoActualEquipo1 = 1
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo1[this.turnoActualEquipo1]
            }
          }
        }
      } else {
        console.log('adios')
        if (this.turnoActualEquipo2 === 2) {
          if (this.equipo2[0].estaMuerto()) {
            this.turnoActualEquipo2 = 1
            Juego.aplicarEfectos(this.personajeActual)
            this.personajeActual = this.equipo2[this.turnoActualEquipo2]
          } else {
            this.turnoActualEquipo2 = 0
            Juego.aplicarEfectos(this.personajeActual)
            this.personajeActual = this.equipo2[this.turnoActualEquipo2]
          }
        } else {
          if (this.turnoActualEquipo2 === 1) {
            if (this.equipo2[2].estaMuerto()) {
              this.turnoActualEquipo2 = 0
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo2[this.turnoActualEquipo2]
            } else {
              this.turnoActualEquipo2 = 2
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo2[this.turnoActualEquipo2]
            }
          } else {
            if (this.equipo2[1].estaMuerto()) {
              this.turnoActualEquipo2 = 2
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo2[this.turnoActualEquipo2]
            } else {
              this.turnoActualEquipo2 = 1
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo2[this.turnoActualEquipo2]
            }
          }
        }
      }

      // Actualiza el turno del equipo correspondiente
      const turnoActual =
      equipoActual === 1 ? this.turnoActualEquipo1 : this.turnoActualEquipo2;
      const nuevoTurno = turnoActual === 2 ? 0 : turnoActual + 1;
 
      console.log(this.turnoActualEquipo1)
 
      if (equipoActual === 1) {
        //INFORMACION DE QUE PERSONAJE JUGO Y EL TURNO 
        console.info("Jugo el personaje", personajeActual.nombre);
        console.log("past", this.turnoActualEquipo1);
        this.turnoActualEquipo1 = nuevoTurno;
        console.log("present", this.turnoActualEquipo1);
      } else {
        //INFORMACION DE QUE PERSONAJE JUGO Y EL TURNO 
        console.log("Jugo el personaje", personajeActual.nombre);
        console.log("past", this.turnoActualEquipo2);
        this.turnoActualEquipo2 = nuevoTurno;
        console.log("present", this.turnoActualEquipo2);
      }
      console.log("juega el", this.personajeActual.nombre);
    }else{
      if(this.personajeActual.estaMuerto()) {
        //VERIFICA SI EL PERSONAJE ESTA MUERTO Y SI ESTA MUERTO SALTA DE TURNO
        console.warn(`El personaje ${this.personajeActual.nombre} esta muerto salta de turno`);
        if (eqAct === 1) { console.log('ola')
          if (this.turnoActualEquipo1 === 2) {
            if (this.equipo1[0].estaMuerto()) {
              this.turnoActualEquipo1 = 1
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo1[this.turnoActualEquipo1]
            } else {
              this.turnoActualEquipo1 = 0
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo1[this.turnoActualEquipo1]
            }
          } else {
            if (this.turnoActualEquipo1 === 1) {
              if (this.equipo1[2].estaMuerto()) {
                this.turnoActualEquipo1 = 0
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo1[this.turnoActualEquipo1]
              } else {
                this.turnoActualEquipo1 = 2
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo1[this.turnoActualEquipo1]
              }
            } else {
              if (this.equipo1[1].estaMuerto()) {
                this.turnoActualEquipo1 = 2
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo1[this.turnoActualEquipo1]
              } else {
                this.turnoActualEquipo1 = 1
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo1[this.turnoActualEquipo1]
              }
            }
          }
        } else {
          console.log('adios')
          if (this.turnoActualEquipo2 === 2) {
            if (this.equipo2[0].estaMuerto()) {
              this.turnoActualEquipo2 = 1
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo2[this.turnoActualEquipo2]
            } else {
              this.turnoActualEquipo2 = 0
              Juego.aplicarEfectos(this.personajeActual)
              this.personajeActual = this.equipo2[this.turnoActualEquipo2]
            }
          } else {
            if (this.turnoActualEquipo2 === 1) {
              if (this.equipo2[2].estaMuerto()) {
                this.turnoActualEquipo2 = 0
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo2[this.turnoActualEquipo2]
              } else {
                this.turnoActualEquipo2 = 2
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo2[this.turnoActualEquipo2]
              }
            } else {
              if (this.equipo2[1].estaMuerto()) {
                this.turnoActualEquipo2 = 2
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo2[this.turnoActualEquipo2]
              } else {
                this.turnoActualEquipo2 = 1
                Juego.aplicarEfectos(this.personajeActual)
                this.personajeActual = this.equipo2[this.turnoActualEquipo2]
              }
            }
          }
        }
  
        // Actualiza el turno del equipo correspondiente
        const turnoActual =
        equipoActual === 1 ? this.turnoActualEquipo1 : this.turnoActualEquipo2;
        const nuevoTurno = turnoActual === 2 ? 0 : turnoActual + 1;
   
        console.log(this.turnoActualEquipo1)
   
      if (equipoActual === 1) {
        //INFORMACION DE QUE PERSONAJE JUGO Y EL TURNO 
        console.info("Jugo el personaje", personajeActual.nombre);
        console.log("past", this.turnoActualEquipo1);
        this.turnoActualEquipo1 = nuevoTurno;
        console.log("present", this.turnoActualEquipo1);
      } else {
        //INFORMACION DE QUE PERSONAJE JUGO Y EL TURNO 
        console.log("Jugo el personaje", personajeActual.nombre);
        console.log("past", this.turnoActualEquipo2);
        this.turnoActualEquipo2 = nuevoTurno;
        console.log("present", this.turnoActualEquipo2);
      }
      console.log("juega el", this.personajeActual.nombre);
  
  
      }else{
           // Aplica los debilitamientos
        this.aplicarEfectos(this.personajeActual)
  
        // Actualiza el turno del equipo correspondiente
         const turnoActual =
        equipoActual === 1 ? this.turnoActualEquipo1 : this.turnoActualEquipo2;
       const nuevoTurno = turnoActual === 2 ? 0 : turnoActual + 1;
  
       console.log(this.turnoActualEquipo1)
  
     if (equipoActual === 1) {
       //INFORMACION DE QUE PERSONAJE JUGO Y EL TURNO 
       console.info("Jugo el personaje", personajeActual.nombre);
       console.log("past", this.turnoActualEquipo1);
       this.turnoActualEquipo1 = nuevoTurno;
       console.log("present", this.turnoActualEquipo1);
     } else {
       //INFORMACION DE QUE PERSONAJE JUGO Y EL TURNO 
       console.log("Jugo el personaje", personajeActual.nombre);
       console.log("past", this.turnoActualEquipo2);
       this.turnoActualEquipo2 = nuevoTurno;
       console.log("present", this.turnoActualEquipo2);
     }
     console.log("juega el", this.personajeActual.nombre);
      }  
    }

      
}

  static aplicarEfectos(personaje) {
    // Activa debilitamientos 
    personaje.debilitamiento.forEach((efecto) => {
      if (efecto.constructor.name === "EfectoContinuo") {
        efecto.Activar(personaje);
        console.info(`Se activó debilitamiento: ${efecto.nombre}`);
        if(efecto.tiempo == 0) {
          //ACA SI SE ELIMINA EL EFECTO CONTINUO
          efecto.removerEfectos(personaje)
        }
      }
      if (efecto.constructor.name === "EfectoFijo") {
        if (efecto.tiempo === 0) {
          efecto.removerEfectos(personaje);
          console.info(`Debilitamiento fijo desaplicado: ${efecto.nombre}`);
        } else {
          efecto.tiempo--; // Reduce el tiempo
        }
      }
    });

    // Activa fortalecimientos
    personaje.fortalecimiento.forEach((efecto) => {
      if (efecto.constructor.name === "EfectoContinuo") {
        efecto.Activar(personaje);
        console.info(`Se activó fortalecimiento: ${efecto.nombre}`);
      }
      if (efecto.constructor.name === "EfectoFijo") {
        if (efecto.tiempo === 0) {
          console.log('entro en tiempo 0 el efecto')
          efecto.removerEfectos(personaje);
          console.info(`Fortalecimiento fijo desaplicado: ${efecto.nombre}`);
        } else {
          efecto.tiempo--; // Reduce el tiempo
        }
      }
    });
  }

  // static aplicarDebiliamiento(personaje) {
  //   // Activa los debilitamientos del personaje
  //   if (this.personajeActual.debilitamiento.length != 0) { // verifica si existen debilitamientos
  //     personaje.debilitamiento.forEach((efecto) => {
  //       if (efecto.constructor.name === "EfectoContinuo") { // verifica y hace activacion de los efectos continuos
  //         efecto.Activar(personaje);
  //         console.info("Se activó", efecto.nombre);
          
  //       }
  //       if (efecto.constructor.name === "EfectoFijo") { // verifica y desactiva los efectos fijos en caso de que se hayan acabado
  //         if (efecto.tiempo === 0 && efecto.activo) {
  //           efecto.desAplicar(personaje);
  //           console.info('efecto desaplicado')
  //         }else{
  //           efecto.tiempo -= 1
  //         }
  //       }
  //     })
  //   }
  // }

  // static aplicarFortalecimiento(personaje) {
  //   // Activa los fortalecimientos del personaje
  //   if (this.personajeActual.fortalecimiento.length != 0) { // verifica si existen fortalecimientos
  //     personaje.fortalecimiento.forEach((efecto) => {
  //       if (efecto.constructor.name === "EfectoContinuo") { // verifica y hace activacion de los efectos continuos
  //         console.log('EFECTOOOO CONTINUOOOOOOOOOOOOOOOOOO')
  //         efecto.Activar(personaje);
  //         console.info("Se activó", efecto.nombre);
  //       }
  //       if (efecto.constructor.name === "EfectoFijo") { // verifica y desactiva los efectos fijos en caso de que se hayan acabado
  //         console.log('EFECTO FIJO ENTROOOOOOOOOOOOOOO')
  //         if (efecto.tiempo === 0 && efecto.activo) { // ERROR CORREGIDO
  //           efecto.desAplicar(personaje); 
  //           console.info('efecto desaplicado')
  //         }else{
  //           efecto.tiempo -= 1 // YA BAJA EL TIEMPO
  //         }
  //       }
  //     })
  //   }
  // }

  static verificarVictoria() {
    // Método que no recibe parámetros.
    // Verifica si algún equipo ha ganado.
    // Devuelve true si un equipo ha ganado y muestra el mensaje correspondiente.

    if (this.equipo1.every((personaje) => personaje.estaMuerto())) {
      console.log("El equipo 1 ha ganado fin de la partida");
      this.equipoGanador = this.equipo1
      return true; // Si todos los de el equipo 1 estan muertos retorna true
    }
    if (this.equipo2.every((personaje) => personaje.estaMuerto())) {
      console.log("El equipo 2 ha ganado fin de la partida");
      this.equipoGanador = this.equipo2
      return true; // Si todos los de el equipo 2 estan muertos retorna true
    }

    return false; // Si ningun equipo ha ganado retona falso
  }
}

// EQUIPO 1
Juego.agregarPersonaje(1, Mateo1);
Juego.agregarPersonaje(1, Steven1);
Juego.agregarPersonaje(1, Yeffer1);

//2
Juego.agregarPersonaje(2, Valeri2);
Juego.agregarPersonaje(2, Anderson2);
Juego.agregarPersonaje(2, Brandon2);

Juego.iniciarJuego();

setTimeout(() => {
  ActualizarTurno()
}, 100);



// const Drakonar = {
//   Nombre: 'Drakonar',
//   Debilitamiento: ['Quemar','Desanimo'],
//   Fortalecimiento: ['Endurecimiento','Furia'],
//   Habilidades: ['Cuchillo Feroz','Tormenta Area'],
//   Ataque: 30,
//   Defensa: 20,
//   Velocidad: 40,
//   Equipo: 1,
//   Vida: 100

// }

// const Therian = {
//   Nombre: 'Therian',
//   Debilitamiento: ['Bostezo Infernal','Veneno'],
//   Fortalecimiento: ['Furia'],
//   Habilidades: ['Cruz Bendita'],
//   Ataque: 40,
//   Defensa: 30,
//   Velocidad: 40,
//   Equipo: 1,
//   Vida: 100
// }

// const Alexirim = {
//   Nombre: 'Alexirim',
//   Debilitamiento: [],
//   Fortalecimiento: [],
//   Habilidades: ['Sombra Infernal','Disparo Sonico'],
//   Ataque: 30,
//   Defensa: 20,
//   Velocidad: 40,
//   Equipo: 1,
//   Vida: 100
// }

// //---------------

// const Igor = {
//   Nombre: 'Igor',
//   Debilitamiento: ['Quemar','Desanimo','Maleficio','Nauseas'],
//   Fortalecimiento: ['Endurecimiento','Furia'],
//   Habilidades: ['Tormenta Mortal','Terremoto'],
//   Ataque: 50,
//   Defensa: 30,
//   Velocidad: 30,
//   Equipo: 2,
//   Vida: 100
// }

// const Morthazar = {
//   Nombre: 'Morthazar',
//   Debilitamiento: ['Depresion','Desanimo'],
//   Fortalecimiento: ['Endurecimiento','Furia'],
//   Habilidades: ['Furia Silvestre','Agua Bendita'],
//   Ataque: 50,
//   Defensa: 30,
//   Velocidad: 30,
//   Equipo: 2,
//   Vida: 100
// }

// const Obsidian = {
//   Nombre: 'Obsidian',
//   Debilitamiento: [],
//   Fortalecimiento: ['Endurecimiento','Furia','Voluntad','Bendicion de la naturaleza'],
//   Habilidades: ['Patada Mortal','Grito Santo'],
//   Ataque: 30,
//   Defensa: 40,
//   Velocidad: 30,
//   Equipo: 2,
//   Vida: 100
// }

// //EQUIPO 1

// const Equipo1 = [Drakonar,Therian,Alexirim];

// // EQUIPO 2

// const Equipo2 = [Igor,Morthazar,Obsidian];