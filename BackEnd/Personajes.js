// CLASE DE PERSONAJES DE VIDEOJUEGO
class Personaje {
  static contadorId = 1;
  constructor(nombre, ataque, defensa, velocidad) {
    // ATRIBUTOS BÁSICOS DEL PERSONAJE
    this.id = Personaje.contadorId++;
    this.vida = 100;
    this.nombre = nombre;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.fortalecimiento = [];
    this.debilitamiento = [];
    this.habilidades = [];
    this.equipo = null;
    this.imagen = "Quieto";
    this.imagen2 = "Atacando";
  }

estaMuerto() {
  // Devuelve true si el personaje está muerto (su vida es 0 o menos)
  return this.vida <= 0;
}

validarNegativos() {
  // Asegura que los atributos de vida, defensa y ataque no sean negativos
  if (this.vida < 0) this.vida = 0;
  if (this.ataque < 0) this.ataque = 0;
  if (this.defensa < 0) this.defensa = 0;
}

validarPositivos() {
  // Valida que los atributos no superen ciertos límites
  // Por ejemplo, la vida no puede exceder 100, y la defensa no puede ser mayor a 60
  if (this.vida > 100) this.vida = 100;
  if (this.defensa > 40) this.defensa = 40;
}

static validarExcesos() {
  // Valida tanto los valores negativos como los positivos de ambos personajes.

  Juego.equipo1.forEach(personaje=>{
    personaje.validarNegativos()
    personaje.validarPositivos()
  })

  Juego.equipo2.forEach(personaje=>{
    personaje.validarNegativos()
    personaje.validarPositivos()
  })

}

Atacar(objetivo) {
  // Método que recibe:
  // - objetivo: el personaje que recibirá el ataque.
  // Define las condiciones bajo las cuales el ataque será exitoso.
  // Considera si el objetivo está muerto, si es un aliado, o si su defensa es mayor que el ataque.
  //SI EL OBJETIVO ESTA VIVO SON DE DIFERENTE EQUIPO Y LA DEFENSA ES MENOR QUE EL ATAQUE

  if (objetivo.estaMuerto())
    return console.warn("El personaje", objetivo.nombre, "esta muerto");
  if (Juego.personajeActual != this) return console.warn("es el turno de", Juego.personajeActual); // si el personaje con el turno actual no es el que acciona la habilidad no se efectua la habilidad
  if(this.equipo === objetivo.equipo) return console.warn('No puedes atacar a tu compañero!');
  const Daño = this.ataque - objetivo.defensa;
  if (Daño <= 0){ // mostrara un mensaje dependiendo si hace daño o no
    console.info("no has hecho daño"); 
  }else{
    console.info("has hecho", Daño ,"puntos de daño al enemigo"); 
  }
  objetivo.vida -= Daño; // Verifica que el daño no sea negativo
  this.habilidades.forEach((habilidad) => {
    habilidad.reducirEspera();
  });

  Personaje.validarExcesos()
  Juego.obtenerSiguientePersonaje();
  ActualizarInterfaz()
  return true
}

usarHabilidad(nombreHabilidad, objetivo) {
  // Método que recibe:
  // - nombreHabilidad: el nombre de la habilidad que se quiere usar.
  // - objetivo: el personaje sobre el que se va a aplicar la habilidad.
  // Define qué pasa cuando se usa una habilidad, si está en cooldown,
  // si el objetivo es aliado o enemigo, y si el objetivo está vivo o muerto.

  if (objetivo.estaMuerto()) return console.warn("El personaje", objetivo.nombre, "esta muerto");; // si el objetivo esta muerto no se podra aplicar la habilidad
  if (Juego.personajeActual != this) return console.warn("Es el turno de", Juego.personajeActual); // si el personaje con el turno actual no es el que acciona la habilidad no se efectua la habilidad

  const habilidadUsarIndex = this.habilidades.findIndex(
    (habilidad) => habilidad.nombre == nombreHabilidad
  ); //Encuentra el indice de la habilidad

  if (habilidadUsarIndex === -1) return console.warn("Habilidad no encontrada") ; // si la habilidad no es encontrada no se podra usar
  const habilidadUsar = this.habilidades[habilidadUsarIndex]; // La habilidad a usar
  if (habilidadUsar.Espera != 0) return console.warn("la habilidad esta en espera por",habilidadUsar.Espera,"turnos");; // en caso de que la habilidad este en cooldown no se podra usar 

    

  if (habilidadUsar.Masa == true) {
    if (habilidadUsar.Mejora == true) {
      if (habilidadUsar.Tipo == 'propio') {
        if (objetivo != this) {
          console.log('solo puedes usar esta habilidad contigo!!')
          return false
        } else {
          habilidadUsar.Activar( this,objetivo );
          this.habilidades.forEach((habilidad, index) => {
          if (index != habilidadUsarIndex) habilidad.reducirEspera();
          }); // se recorren las habilidades y se les reduce el cooldown, saltando la habilidad
          Juego.obtenerSiguientePersonaje(); //Obtencion del siguiente personaje
          Personaje.validarExcesos(this, objetivo); // Validadcion de excesos del personaje principal y el enemigo
          ActualizarInterfaz()
        }
      } else {
        if (objetivo.equipo != this.equipo || objetivo == this) {
          console.log('solo puedes usar esta habilidad con tus compañeros!!')
          return false
        } else {
          habilidadUsar.Activar( this,objetivo );
          this.habilidades.forEach((habilidad, index) => {
          if (index != habilidadUsarIndex) habilidad.reducirEspera();
          }); // se recorren las habilidades y se les reduce el cooldown, saltando la habilidad
          Juego.obtenerSiguientePersonaje(); //Obtencion del siguiente personaje
          Personaje.validarExcesos(this, objetivo); // Validadcion de excesos del personaje principal y el enemigo
          ActualizarInterfaz()
        }
      }
      
    } else {
      if (objetivo.equipo == this.equipo || objetivo == this) {
        console.log('solo puedes usar esta habilidad con tus enemigos!!')
        return false
      } else {
        habilidadUsar.Activar( this,objetivo );
        this.habilidades.forEach((habilidad, index) => {
        if (index != habilidadUsarIndex) habilidad.reducirEspera();
        }); // se recorren las habilidades y se les reduce el cooldown, saltando la habilidad
        Juego.obtenerSiguientePersonaje(); //Obtencion del siguiente personaje
        Personaje.validarExcesos(this, objetivo); // Validadcion de excesos del personaje principal y el enemigo
        ActualizarInterfaz()
      }
    }
  } else {
    if (habilidadUsar.Mejora == true) {

    if (habilidadUsar.Tipo == 'propio') {
        if (objetivo != this) {
          console.log('solo puedes usar esta habilidad contigo!!')
          return false
        } else {
          habilidadUsar.Activar( this,objetivo );
          this.habilidades.forEach((habilidad, index) => {
            if (index != habilidadUsarIndex) habilidad.reducirEspera();
          }); // se recorren las habilidades y se les reduce el cooldown, saltando la habilidad
          Juego.obtenerSiguientePersonaje(); //Obtencion del siguiente personaje
          Personaje.validarExcesos(this, objetivo); // Validadcion de excesos del personaje principal y el enemigo
          ActualizarInterfaz()
        }
      } else {
        if (objetivo.equipo != this.equipo || objetivo == this) {
          console.log('solo puedes usar esta habilidad con tus compañeros!!')
          return false
        } else {
          habilidadUsar.Activar( this,objetivo );
          this.habilidades.forEach((habilidad, index) => {
            if (index != habilidadUsarIndex) habilidad.reducirEspera();
          }); // se recorren las habilidades y se les reduce el cooldown, saltando la habilidad
          Juego.obtenerSiguientePersonaje(); //Obtencion del siguiente personaje
          Personaje.validarExcesos(this, objetivo); // Validadcion de excesos del personaje principal y el enemigo
          ActualizarInterfaz()
        }
      }      

      
    }else{
      if (objetivo.equipo == this.equipo || objetivo == this) {
        console.log('solo puedes usar esta habilidad con tus enemigos!!')
        return false
      } else {
        habilidadUsar.Activar( this,objetivo );
        this.habilidades.forEach((habilidad, index) => {
          if (index != habilidadUsarIndex) habilidad.reducirEspera();
        }); // se recorren las habilidades y se les reduce el cooldown, saltando la habilidad
        Juego.obtenerSiguientePersonaje(); //Obtencion del siguiente personaje
        Personaje.validarExcesos(this, objetivo); // Validadcion de excesos del personaje principal y el enemigo
        ActualizarInterfaz()
      }
    }
  } 
  return true
}

  
}

// Creación de clases de personajes

class Guerrero extends Personaje {
  constructor(
    nombre,
    ataque,
    defensa,
    velocidad
  ) {
    super(nombre, ataque, defensa, velocidad);
    
    this.habilidades.push(EscudoBendito(),Pandemia());
  }
}

class Mago extends Personaje {
  constructor(nombre, ataque, defensa, velocidad) {
    super(nombre, ataque, defensa, velocidad);
    this.habilidades.push(Incinerar());
    this.habilidades.push(LlamadoSagrado());
  }
}

class Necromante extends Personaje {
  constructor(nombre, ataque, defensa, velocidad) {
    super(nombre, ataque, defensa, velocidad);
    this.habilidades.push(Guerra());
    this.habilidades.push(LlamaMortal());
  }
}

class Elfo extends Personaje {
  constructor(nombre, ataque, defensa, velocidad) {
    super(nombre, ataque, defensa, velocidad);
    this.habilidades.push(Blindar(),Virus());
  }
}

class Sprinter extends Personaje {
  constructor(nombre, ataque, defensa, velocidad) {
    super(nombre, ataque, defensa, velocidad);
    this.habilidades.push(Aturdir());
    this.habilidades.push(TempestadEterea());
  }
}

class Dragon extends Personaje {
  constructor(nombre, ataque, defensa, velocidad) {
    super(nombre, ataque, defensa, velocidad);
    this.habilidades.push(Incinerar());
    this.habilidades.push(TempestadEterea());
  }
}

//Guerreros
const Valeri1 = new Guerrero("Valeri1", 30, 40, 30);
const Valeri2 = new Guerrero("Valeri2", 60, 40, 30);

// Magos
const Anderson1 = new Mago("Anderson1", 70, 10, 40);
const Anderson2 = new Mago("Anderson2", 50, 40, 30);

//Necromantes
const Brandon1 = new Necromante("Brandon1", 40, 40, 50);
const Brandon2 = new Necromante("Brandon2", 50, 40, 40);

//Elfos
const Mateo1 = new Elfo("Mateo1", 60, 40, 30);
const Mateo2 = new Elfo("Mateo2", 40, 40, 30);

//Dragon
const Steven1 = new Dragon("Steven1", 70, 30, 40);
const Steven2 = new Dragon("Steven2", 70, 30, 40);

//Sprinter
const Yeffer1 = new Sprinter("Yeffer1", 50, 40, 0);
const Yeffer2 = new Sprinter("Yeffer2", 50, 40, 0);