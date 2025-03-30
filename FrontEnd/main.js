// Selecciona el elemento <body> del documento para poder agregarle elementos nuevos.
const body = document.querySelector("body");

// Crea un nuevo <div> con la clase "escenario" y lo agrega al body.
const escenario = document.createElement("div");
escenario.classList.add("escenario");
body.appendChild(escenario);

// Crea otro <div> con la clase "fondo" y lo agrega dentro del "escenario".
const fondo = document.createElement("div");
fondo.classList.add("fondo");
escenario.appendChild(fondo);

const video = document.querySelector(".video");
escenario.appendChild(video);

const video2 = document.querySelector('.video2')
escenario.appendChild(video2)

// Crea un <div> para el equipo 1, le asigna la clase "escenario_equipo1" y lo agrega al "escenario".
const escenario_equipo1 = document.createElement("div");
escenario_equipo1.classList.add("escenario_equipo1");
escenario.appendChild(escenario_equipo1);

// Crea un <div> para el equipo 2, le asigna la clase "escenario_equipo2" y lo agrega al "escenario".
const escenario_equipo2 = document.createElement("div");
escenario_equipo2.classList.add("escenario_equipo2");
escenario.appendChild(escenario_equipo2);

const contenedor_habilidades1 = document.createElement("div");
contenedor_habilidades1.classList.add("contenedor_habilidades1");
escenario_equipo1.appendChild(contenedor_habilidades1);

const habilidades1 = document.createElement("div");
habilidades1.classList.add("habilidades1");
contenedor_habilidades1.appendChild(habilidades1);

const botonAtacar1 = document.createElement("button");
botonAtacar1.classList.add("botonAtacar1");
const botonHabilidad1 = document.createElement("button");
botonHabilidad1.classList.add("botonHabilidad1");
const botonHabilidad11 = document.createElement("button");
botonHabilidad11.classList.add("botonHabilidad11");

habilidades1.appendChild(botonAtacar1);
habilidades1.appendChild(botonHabilidad1);
habilidades1.appendChild(botonHabilidad11);

const imagenAtacar1 = document.createElement("img");
imagenAtacar1.classList.add("imagenAtacar1");
imagenAtacar1.src = "./FrontEnd/Assets/img/atacar.png";

const imagenHabilidad1 = document.createElement("img");
imagenHabilidad1.classList.add("imagenHabilidad1");
const imagenHabilidad11 = document.createElement("img");
imagenHabilidad11.classList.add("imagenHabilidad11");

botonAtacar1.appendChild(imagenAtacar1);
botonHabilidad1.appendChild(imagenHabilidad1);
botonHabilidad11.appendChild(imagenHabilidad11);

const contenedor_habilidades2 = document.createElement("div");
contenedor_habilidades2.classList.add("contenedor_habilidades2");
escenario_equipo2.appendChild(contenedor_habilidades2);

const habilidades2 = document.createElement("div");
habilidades2.classList.add("habilidades2");
contenedor_habilidades2.appendChild(habilidades2);

const botonAtacar2 = document.createElement("button");
botonAtacar2.classList.add("botonAtacar2");
const botonHabilidad2 = document.createElement("button");
botonHabilidad2.classList.add("botonHabilidad2");
const botonHabilidad22 = document.createElement("button");
botonHabilidad22.classList.add("botonHabilidad22");

habilidades2.appendChild(botonAtacar2);
habilidades2.appendChild(botonHabilidad2);
habilidades2.appendChild(botonHabilidad22);

const imagenAtacar2 = document.createElement("img");
imagenAtacar2.classList.add("imagenAtacar2");
imagenAtacar2.src = "./FrontEnd/Assets/img/atacar.png";

const imagenHabilidad2 = document.createElement("img");
imagenHabilidad2.classList.add("imagenHabilidad2");
const imagenHabilidad22 = document.createElement("img");
imagenHabilidad22.classList.add("imagenHabilidad22");

botonAtacar2.appendChild(imagenAtacar2);
botonHabilidad2.appendChild(imagenHabilidad2);
botonHabilidad22.appendChild(imagenHabilidad22);

const informacionHabilidad = document.createElement('div')
const nombreHabilidad = document.createElement('h1')
const descripcionHabilidad = document.createElement('p')
const cooldownHabilidad1 = document.createElement('div')
const cooldownHabilidad11 = document.createElement('div')
const numeroCooldown1 = document.createElement('label')
const numeroCooldown11 = document.createElement('label')

numeroCooldown1.classList.add('numeroCooldown1')
numeroCooldown11.classList.add('numeroCooldown11')
cooldownHabilidad1.classList.add('cooldownHabilidad1')
cooldownHabilidad11.classList.add('cooldownHabilidad11')
informacionHabilidad.classList.add('informacionHabilidad')
nombreHabilidad.classList.add('nombreHabilidad')
descripcionHabilidad.classList.add('descripcionHabilidad')

const informacionHabilidad2 = document.createElement('div')
const nombreHabilidad2 = document.createElement('h1')
const descripcionHabilidad2 = document.createElement('p')
const cooldownHabilidad2 = document.createElement('div')
const cooldownHabilidad22 = document.createElement('div')
const numeroCooldown2 = document.createElement('label')
const numeroCooldown22 = document.createElement('label')


numeroCooldown2.classList.add('numeroCooldown2')
numeroCooldown22.classList.add('numeroCooldown22')
cooldownHabilidad2.classList.add('cooldownHabilidad2')
cooldownHabilidad22.classList.add('cooldownHabilidad22')
informacionHabilidad2.classList.add('informacionHabilidad2')
nombreHabilidad2.classList.add('nombreHabilidad2')
descripcionHabilidad2.classList.add('descripcionHabilidad2')

escenario_equipo1.appendChild(informacionHabilidad)
informacionHabilidad.appendChild(nombreHabilidad)
informacionHabilidad.appendChild(descripcionHabilidad)
escenario_equipo1.appendChild(cooldownHabilidad1)
escenario_equipo1.appendChild(cooldownHabilidad11)
cooldownHabilidad1.appendChild(numeroCooldown1)
cooldownHabilidad11.appendChild(numeroCooldown11)

escenario_equipo2.appendChild(informacionHabilidad2)
informacionHabilidad2.appendChild(nombreHabilidad2)
informacionHabilidad2.appendChild(descripcionHabilidad2)
escenario_equipo2.appendChild(cooldownHabilidad2)
escenario_equipo2.appendChild(cooldownHabilidad22)
cooldownHabilidad2.appendChild(numeroCooldown2)
cooldownHabilidad22.appendChild(numeroCooldown22)

// Itera sobre cada personaje del equipo 1 para crear sus elementos en la interfaz.
Juego.equipo1.forEach((personajes, i) => {
  // Crea un <div> para cada personaje y lo posiciona en la interfaz según su lugar.
  const personaje = document.createElement("div");
  personaje.classList.add("personaje", `lugar${i + 1}`);
  escenario_equipo1.appendChild(personaje);
  personaje.setAttribute("id", `${personajes.id}`);

  const turnoCirculo = document.createElement('div',`turno${i + 1}`)
  turnoCirculo.classList.add('seccionTurnoCirculo')
  personaje.appendChild(turnoCirculo)

  const turno = document.createElement("img");
  turno.classList.add("marcadorTurnos");
  turnoCirculo.appendChild(turno);
  turno.src = './FrontEnd/Assets/img/Turno.gif'

  // Crea un contenedor para las condiciones del personaje y lo agrega al personaje.
  const condicion = document.createElement("div");
  condicion.classList.add("condicion");
  personaje.appendChild(condicion);

  // Crea una sección de "debilitar" con íconos representando una condición negativa.
  const debilitar = document.createElement("div");
  debilitar.classList.add("debilitar");
  condicion.appendChild(debilitar);

  const efectoVeneno = document.createElement('div')
  efectoVeneno.classList.add('efectoVeneno')
  personaje.appendChild(efectoVeneno)
  
  const animacionVeneno = document.createElement('img')
  animacionVeneno.classList.add('animacionVeneno',`posicionVeneno${personajes.id}`)
  efectoVeneno.appendChild(animacionVeneno)

  animacionVeneno.src = './FrontEnd/Assets/efectos/veneno.gif'

  const efectoQuemado = document.createElement('div')
  efectoQuemado.classList.add('efectoQuemado')
  personaje.appendChild(efectoQuemado)

  const animacionQuemado = document.createElement('img')
  animacionQuemado.classList.add('animacionQuemado',`posicionQuemado${personajes.id}`)
  efectoQuemado.appendChild(animacionQuemado)

  animacionQuemado.src = './FrontEnd/Assets/efectos/fuego.gif'

  // Crea una sección de "potenciar" con íconos para representar buffs.
  const potenciar = document.createElement("div");
  potenciar.classList.add("potenciar");
  condicion.appendChild(potenciar);


  // Sección para la vida del personaje, mostrando su vida actual.
  const vida = document.createElement("div");
  vida.classList.add("vida");
  personaje.appendChild(vida);

  const parrafo1 = document.createElement("p");
  parrafo1.classList.add("parrafo1");
  parrafo1.textContent = `${personajes.vida}/100`; // Vida del personaje.
  const span = document.createElement("span");
  span.setAttribute('style',`width:${personajes.vida}%`)
  vida.appendChild(parrafo1);
  vida.appendChild(span);

  // Crea una sección para las estadísticas del personaje (ataque y defensa).
  const estadisticas = document.createElement("div");
  estadisticas.classList.add("estadisticas");
  personaje.appendChild(estadisticas);

  // Sección para el ataque del personaje.
  const ataque = document.createElement("div");
  ataque.classList.add("numeroAtaque");
  estadisticas.appendChild(ataque);
  const icono7 = document.createElement("i");
  icono7.classList.add("fa-solid", "fa-hand-back-fist",'estadisticaAtaque'); // Ícono de ataque.
  ataque.appendChild(icono7);
  const parrafo2 = document.createElement("p");
  parrafo2.textContent = personajes.ataque; // Valor del ataque.
  parrafo2.classList.add("parrafo2");
  ataque.appendChild(parrafo2);

  // Sección para la defensa del personaje.
  const defensa = document.createElement("div");
  defensa.classList.add("numeroDefensa");
  estadisticas.appendChild(defensa);
  const icono8 = document.createElement("i");
  icono8.classList.add("fa-solid", "fa-shield",'estadisticaDefensa'); // Ícono de defensa.
  defensa.appendChild(icono8);
  const parrafo3 = document.createElement("p");
  parrafo3.textContent = personajes.defensa; // Valor de defensa.
  parrafo3.classList.add("parrafo3");
  defensa.appendChild(parrafo3);

  // Sección para mostrar la ubicación del personaje con una imagen.
  const ubicacion = document.createElement("div");
  ubicacion.classList.add("ubicacion");
  personaje.appendChild(ubicacion);

  const imagen1 = document.createElement("img");
  imagen1.classList.add("imagen1");
  ubicacion.appendChild(imagen1);
  imagen1.src = `./FrontEnd/Assets/img/personajes/${personajes.id}/Quieto.gif`; // Imagen del personaje.

  // Sección para mostrar al enemigo con su imagen.
  const enemigo = document.createElement("div");
  enemigo.classList.add("enemigo");
  personaje.appendChild(enemigo);

  const imagen2 = document.createElement("img");
  imagen2.classList.add("imagen2");
  enemigo.appendChild(imagen2);
  
  if (personajes == Juego.personajeActual) {
    const contenedorHabilidades1 = document.querySelector(
      ".contenedor_habilidades1"
    );
    const contenedorHabilidades2 = document.querySelector(
      ".contenedor_habilidades2"
    );
    
    contenedorHabilidades1.style.display = "block";
    contenedorHabilidades2.style.display = "none";
    
    imagenHabilidad1.src = `./FrontEnd/Assets/img/personajes/${personajes.id}/poder1.png`;
    imagenHabilidad11.src = `./FrontEnd/Assets/img/personajes/${personajes.id}/poder2.png`;
  }

  imagen1.addEventListener('click',function(){
    let personaje = personajes
    const personajeActual = Juego.personajeActual
    
    console.log(habilidadSeleccionada)

    if (habilidadSeleccionada=='Atacar') {
      if(Juego.personajeActual.Atacar(personaje)){
        Juego.personajeActual.Atacar(personaje)
        animacion(personajeActual,personaje)
      }
      
    }else{

      if (Juego.personajeActual.usarHabilidad(habilidadSeleccionada,personaje)) {
        Juego.personajeActual.usarHabilidad(habilidadSeleccionada,personaje)
        console.log(habilidadSeleccionada)
        animacion(personajeActual,personaje)
      }
    }

  })
});


// Itera sobre cada personaje del equipo 2 para crear sus elementos en la interfaz.
Juego.equipo2.forEach((personajes, i) => {
  const personaje = document.createElement("div");
  personaje.classList.add("personaje2", `lugar${i + 4}`);
  escenario_equipo2.appendChild(personaje);
  personaje.setAttribute("id", `${personajes.id}`);
  
  const turnoCirculo = document.createElement('div',`turno${i + 1}`)
  turnoCirculo.classList.add('seccionTurnoCirculo')
  personaje.appendChild(turnoCirculo)

  const turno = document.createElement("img");
  turno.classList.add("marcadorTurnos");
  turnoCirculo.appendChild(turno);
  turno.src = './FrontEnd/Assets/img/Turno.gif'
  
  
  // Sección para mostrar la ubicación del personaje 2.
  const ubicacion2 = document.createElement("div");
  ubicacion2.classList.add("ubicacion");
  personaje.appendChild(ubicacion2);
  
  const imagen3 = document.createElement("img");
  imagen3.classList.add("imagen1");
  ubicacion2.appendChild(imagen3);
  imagen3.src = `./FrontEnd/Assets/img/personajes/${personajes.id}/Quieto.gif`; // Imagen del personaje 2.
  
  // Sección para mostrar al enemigo del equipo 2.
  const enemigo2 = document.createElement("div");
  enemigo2.classList.add("enemigo");
  personaje.appendChild(enemigo2);
  
  const imagen4 = document.createElement("img");
  imagen4.classList.add("imagen2");
  enemigo2.appendChild(imagen4);
  
  // Sección para las estadísticas del equipo 2.
  const estadisticas2 = document.createElement("div");
  estadisticas2.classList.add("estadisticas");
  personaje.appendChild(estadisticas2);
  
  // Sección para el ataque del equipo 2.
  const ataque2 = document.createElement("div");
  ataque2.classList.add("numeroAtaque");
  estadisticas2.appendChild(ataque2);
  const icono7 = document.createElement("i");
  icono7.classList.add("fa-solid", "fa-hand-back-fist",'estadisticaAtaque'); // Ícono de ataque.
  ataque2.appendChild(icono7);
  const parrafo2 = document.createElement("p");
  parrafo2.textContent = personajes.ataque; // Valor del ataque.
  parrafo2.classList.add("parrafo2");
  ataque2.appendChild(parrafo2);
  
  // Sección para la defensa del equipo 2.
  const defensa2 = document.createElement("div");
  defensa2.classList.add("numeroDefensa");
  estadisticas2.appendChild(defensa2);
  const icono8 = document.createElement("i");
  icono8.classList.add("fa-solid", "fa-shield",'estadisticaDefensa'); // Ícono de defensa.
  defensa2.appendChild(icono8);
  const parrafo3 = document.createElement("p");
  parrafo3.textContent = personajes.defensa; // Valor de defensa.
  parrafo3.classList.add("parrafo3");
  defensa2.appendChild(parrafo3);
  
  // Sección para la vida del equipo 2.
  const vida2 = document.createElement("div");
  vida2.classList.add("vida");
  personaje.appendChild(vida2);
  
  const parrafo6 = document.createElement("p");
  parrafo6.classList.add("parrafo1");
  parrafo6.textContent = `${personajes.vida}/100`; // Vida del personaje.
  const span = document.createElement("span");
  span.setAttribute('style',`width:${personajes.vida}%`)
  vida2.appendChild(parrafo6);
  vida2.appendChild(span);
  
  // Sección para mostrar condiciones (debuffs y buffs) del equipo 2.
  // ATAQUE "fa-regular fa-shield , condAtaque"
  // DEFENSA "fa-regular fa-shield , condDefensa"
  const condicion2 = document.createElement("div");
  condicion2.classList.add("condicion");
  personaje.appendChild(condicion2);
  
  const debilitar2 = document.createElement("div");
  debilitar2.classList.add("debilitar");
  condicion2.appendChild(debilitar2);
  
  const efectoVeneno = document.createElement('div')
  efectoVeneno.classList.add('efectoVeneno')
  personaje.appendChild(efectoVeneno)
  
  const animacionVeneno = document.createElement('img')
  animacionVeneno.classList.add('animacionVeneno',`posicionVeneno${personajes.id}`)
  efectoVeneno.appendChild(animacionVeneno)

  animacionVeneno.src = './FrontEnd/Assets/efectos/veneno.gif'

  const efectoQuemado = document.createElement('div')
  efectoQuemado.classList.add('efectoQuemado')
  personaje.appendChild(efectoQuemado)

  const animacionQuemado = document.createElement('img')
  animacionQuemado.classList.add('animacionQuemado',`posicionQuemado${personajes.id}`)
  efectoQuemado.appendChild(animacionQuemado)

  animacionQuemado.src = './FrontEnd/Assets/efectos/fuego.gif'
  
  const potenciar2 = document.createElement("div");
  potenciar2.classList.add("potenciar");
  condicion2.appendChild(potenciar2);
  
  if (personajes == Juego.personajeActual) {
    const contenedorHabilidades1 = document.querySelector(
      ".contenedor_habilidades1"
    );
    const contenedorHabilidades2 = document.querySelector(
      ".contenedor_habilidades2"
    );
    
    contenedorHabilidades1.style.display = "none";
    contenedorHabilidades2.style.display = "block";
    
    imagenHabilidad2.src = `./FrontEnd/Assets/img/personajes/${personajes.id}/poder1.png`;
    imagenHabilidad22.src = `./FrontEnd/Assets/img/personajes/${personajes.id}/poder2.png`;
  }
  imagen3.addEventListener('click',function(){
    let personaje = personajes
    const personajeActual = Juego.personajeActual
    
    console.log(habilidadSeleccionada)
    if (habilidadSeleccionada=='Atacar') {
      if(Juego.personajeActual.Atacar(personaje)){
        Juego.personajeActual.Atacar(personaje)
        animacion(personajeActual,personaje)
      }
      
    }else{
      
      if (Juego.personajeActual.usarHabilidad(habilidadSeleccionada,personaje)) {
        Juego.personajeActual.usarHabilidad(habilidadSeleccionada,personaje)
        console.log(habilidadSeleccionada)
        animacion(personajeActual,personaje)
      }
    }
  })

  imagen3.addEventListener('mouseenter',function() {
    
   
  
  })

});

const personajesObjetos = [...Juego.equipo1, ...Juego.equipo2];
const personajesHTML = [
  ...document.querySelectorAll(".personaje"),
  ...document.querySelectorAll(".personaje2"),
];

function ActualizarVida() {
  personajesObjetos.forEach(pOBJ => {
    personajesHTML.find(pHTML => {
      if(pOBJ.id == pHTML.id){
        pHTML.querySelector('.parrafo1').textContent = `${pOBJ.vida}/100`
        pHTML.querySelector('.vida').lastElementChild.style = `width: ${pOBJ.vida}%`
      }
    })
  })
}

function EfectoMuerto() {
  personajesObjetos.forEach(pOBJ => {
    personajesHTML.find(pHTML => {
      if(pOBJ.id == pHTML.id){
        if (pOBJ.vida == 0) {
          pHTML.querySelector('.imagen1').classList.add('efectoFantasma')
        }
      }
    })
  })
}

function ActualizarAtaque() {
  personajesObjetos.forEach(pOBJ => {
    personajesHTML.find(pHTML => {
      if(pOBJ.id == pHTML.id){
        pHTML.querySelector('.parrafo2').textContent = pOBJ.ataque
      }
    })
  })
}

function ActualizarDefensa() {
  personajesObjetos.forEach(pOBJ => {
    personajesHTML.find(pHTML => {
      if(pOBJ.id == pHTML.id){
        pHTML.querySelector('.parrafo3').textContent = pOBJ.defensa
      }
    })
  })
}

function LimpiarEfectos(){

  personajesObjetos.forEach(pOBJ => {
    personajesHTML.find(pHTML => {
      if(pOBJ.id == pHTML.id){
        if (pOBJ.vida == 0) {
          pOBJ.debilitamiento = []
          pOBJ.fortalecimiento = []
          pHTML.querySelector('.efectoVeneno').style.display = 'none'
          pHTML.querySelector('.efectoQuemado').style.display = 'none'
        }
      }
    })
  })
}

function ActualizarHabilidades() {
  // selecciona los contenedores de habilidades de los dos equipos
  const contenedorHabilidades1 = document.querySelector(".contenedor_habilidades1");
  const contenedorHabilidades2 = document.querySelector(".contenedor_habilidades2");
  
  // cambia el estilo de los contenedores a "none" para que sean invisibles por defecto
  contenedorHabilidades1.style.display = "none";
  contenedorHabilidades2.style.display = "none";


  // guarda en un array los personajes de los dos equipos y su representacion en el html
  const personajesObjetos = [...Juego.equipo1, ...Juego.equipo2];
  const personajesHTML = [
    ...document.querySelectorAll(".personaje"),
    ...document.querySelectorAll(".personaje2"),
  ];

  // recorre los objetos de los personajes
  personajesObjetos.forEach(pOBJ => {
    // usa el metodo find para encontrar similitudes entre los dos arrays
    personajesHTML.find(pHTML => {

      // condicion que verifica si el id del objeto es igual al id del personaje en el html
      if(pHTML.id == pOBJ.id){

        // condicion que verifica si se encontró el personaje y es igual al personaje actual
        if (pHTML && pOBJ == Juego.personajeActual){

          // usa el metodo includes para verificar si el personaje esta en el equipo 1
          if (Juego.equipo1.includes(pOBJ)) {

            // cambia el estilo del contenedor1 a block
            contenedorHabilidades1.style.display = "block";

            // ruta a los archivos con sus respectivas imagenes
            imagenHabilidad1.src = `./FrontEnd/Assets/img/personajes/${pOBJ.id}/poder1.png`;
            imagenHabilidad11.src = `./FrontEnd/Assets/img/personajes/${pOBJ.id}/poder2.png`;
            

            
          } else{

            // si no está en el equipo1, verifica si esta en el 2
            if(Juego.equipo2.includes(pOBJ)) {

              // cambia el estilo del contenedor2 a block
              contenedorHabilidades2.style.display = "block";

              // ruta a los archivos con sus respectivas imagenes
              imagenHabilidad2.src = `./FrontEnd/Assets/img/personajes/${pOBJ.id}/poder1.png`;
              imagenHabilidad22.src = `./FrontEnd/Assets/img/personajes/${pOBJ.id}/poder2.png`;
              
            }
          }
        }
      }
    })
  });
}


function ActualizarCooldown(params) { 
  
  cooldownHabilidad1.style.display = 'none';
  cooldownHabilidad11.style.display = 'none';
  cooldownHabilidad2.style.display = 'none';
  cooldownHabilidad22.style.display = 'none';

}


function ActualizarTurno() {
  const personajesObjetos = [...Juego.equipo1, ...Juego.equipo2];
  const personajesHTML = [
    ...document.querySelectorAll(".personaje"),
    ...document.querySelectorAll(".personaje2"),
  ];

  personajesObjetos.forEach((pOBJ) => {
    personajesHTML.find(pHTML => {

      if (pHTML.id == pOBJ.id) {
        if (pOBJ === Juego.personajeActual) {
          pHTML.firstElementChild.style.display = "block";
        } else {
          pHTML.firstElementChild.style.display = "none";
        }
      }
    });
  });
}


function ActualizarInterfaz() {
  ActualizarVida();
  ActualizarDefensa();
  ActualizarAtaque();
  ActualizarCooldown();
  // ActualizarFortalecimientos()
  ActualizarTurno();
  ActualizarHabilidades();
  actCool()
  
  habilidadSeleccionada = undefined
}

let habilidadSeleccionada = false

imagenAtacar1.addEventListener("click", function() {
  habilidadSeleccionada = "Atacar";
  console.log(habilidadSeleccionada);

  const seleccionados = document.querySelectorAll('.seleccionHabilidad')
  seleccionados.forEach(habilidadesSeleccionadas => {
    habilidadesSeleccionadas.classList.remove('seleccionHabilidad')
  })

  imagenAtacar1.classList.add('seleccionHabilidad')

});

imagenAtacar1.addEventListener("mouseenter", function() {
  nombreHabilidad.textContent = 'Atacar'
  descripcionHabilidad.textContent = 'Atacas a un enemigo con tu daño actual'
  informacionHabilidad.style.display = 'block'
});


imagenHabilidad1.addEventListener("click", function() {
  habilidadSeleccionada = Juego.personajeActual.habilidades[0].nombre;
  console.log(habilidadSeleccionada);

  const seleccionados = document.querySelectorAll('.seleccionHabilidad')
  seleccionados.forEach(habilidadesSeleccionadas => {
    habilidadesSeleccionadas.classList.remove('seleccionHabilidad')
  })
  imagenHabilidad1.classList.add('seleccionHabilidad')

  
});

imagenHabilidad1.addEventListener("mouseenter", function() {


  if (Juego.personajeActual.habilidades[0].Espera != 0) {
    cooldownHabilidad1.style.display = 'flex'
    numeroCooldown1.textContent = Juego.personajeActual.habilidades[0].Espera 
  }else{
    nombreHabilidad.textContent = Juego.personajeActual.habilidades[0].nombre
    descripcionHabilidad.textContent = Juego.personajeActual.habilidades[0].Descripcion
    informacionHabilidad.style.display = 'block'
    cooldownHabilidad1.style.display = 'none'
  }
});

imagenHabilidad1.addEventListener('mouseleave',function() {
  informacionHabilidad.style.display = 'none'
  cooldownHabilidad1.style.display = 'none'
})

cooldownHabilidad1.addEventListener('mouseleave',function() {
  cooldownHabilidad1.style.display = 'none'
})



imagenHabilidad11.addEventListener("click", function() {
  habilidadSeleccionada = Juego.personajeActual.habilidades[1].nombre;
  console.log(habilidadSeleccionada);
  const seleccionados = document.querySelectorAll('.seleccionHabilidad')
  seleccionados.forEach(habilidadesSeleccionadas => {
    habilidadesSeleccionadas.classList.remove('seleccionHabilidad')
  })
  
  imagenHabilidad11.classList.add('seleccionHabilidad')

});

imagenHabilidad11.addEventListener("mouseenter", function() {
  console.log('yef ')


  // imagenHabilidad11.classList.add('seleccionHabilidad')
  if (Juego.personajeActual.habilidades[1].Espera != 0) {
    cooldownHabilidad11.style.display = 'flex'
    numeroCooldown11.textContent = Juego.personajeActual.habilidades[1].Espera 
    
  }else{
    nombreHabilidad.textContent = Juego.personajeActual.habilidades[1].nombre
    descripcionHabilidad.textContent = Juego.personajeActual.habilidades[1].Descripcion
    informacionHabilidad.style.display = 'block'
    cooldownHabilidad11.style.display = 'none'
  }
});

imagenHabilidad11.addEventListener('mouseleave',function() {
  informacionHabilidad.style.display = 'none'

})

cooldownHabilidad11.addEventListener('mouseleave',function() {
  cooldownHabilidad11.style.display = 'none'
})


imagenAtacar2.addEventListener("click", function() {
  habilidadSeleccionada = "Atacar";
  console.log(habilidadSeleccionada);
  const seleccionados = document.querySelectorAll('.seleccionHabilidad')
  seleccionados.forEach(habilidadesSeleccionadas => {
    habilidadesSeleccionadas.classList.remove('seleccionHabilidad')
  })

  imagenAtacar2.classList.add('seleccionHabilidad')

});

imagenAtacar2.addEventListener("mouseenter", function() {
  nombreHabilidad2.textContent = 'Atacar'
  descripcionHabilidad2.textContent = 'Atacas a un enemigo con tu daño actual'
  informacionHabilidad2.style.display = 'block'
});

imagenAtacar2.addEventListener('mouseleave',function() {
  informacionHabilidad2.style.display = 'none'
})

imagenHabilidad2.addEventListener("click", function() {
  habilidadSeleccionada = Juego.personajeActual.habilidades[0].nombre;
  console.log(habilidadSeleccionada);
  const seleccionados = document.querySelectorAll('.seleccionHabilidad')
  seleccionados.forEach(habilidadesSeleccionadas => {
    habilidadesSeleccionadas.classList.remove('seleccionHabilidad')
  })

  imagenHabilidad2.classList.add('seleccionHabilidad')
});

imagenHabilidad2.addEventListener("mouseenter", function() {
  

  if (Juego.personajeActual.habilidades[0].Espera != 0) {
    cooldownHabilidad2.style.display = 'flex'
    numeroCooldown2.textContent = Juego.personajeActual.habilidades[0].Espera
  }else{
    
    nombreHabilidad2.textContent = Juego.personajeActual.habilidades[0].nombre
    descripcionHabilidad2.textContent = Juego.personajeActual.habilidades[0].Descripcion
    informacionHabilidad2.style.display = 'block'
    cooldownHabilidad2.style.display = 'none'
  }
});

imagenHabilidad2.addEventListener('mouseleave',function() {
  informacionHabilidad2.style.display = 'none'
  cooldownHabilidad2.style.display = 'none'
})

cooldownHabilidad2.addEventListener('mouseleave',function() {
  cooldownHabilidad2.style.display = 'none'
})


imagenHabilidad22.addEventListener("click", function() {
  habilidadSeleccionada = Juego.personajeActual.habilidades[1].nombre;
  console.log(habilidadSeleccionada);
  const seleccionados = document.querySelectorAll('.seleccionHabilidad')
  seleccionados.forEach(habilidadesSeleccionadas => {
    habilidadesSeleccionadas.classList.remove('seleccionHabilidad')
  })

  imagenHabilidad22.classList.add('seleccionHabilidad')

});

imagenHabilidad22.addEventListener("mouseenter", function() {
  
  if (Juego.personajeActual.habilidades[1].Espera != 0) {
    cooldownHabilidad22.style.display = 'flex'
    numeroCooldown22.textContent = Juego.personajeActual.habilidades[1].Espera
  }else{
    nombreHabilidad2.textContent = Juego.personajeActual.habilidades[1].nombre
    descripcionHabilidad2.textContent = Juego.personajeActual.habilidades[1].Descripcion
    informacionHabilidad2.style.display = 'block'
    cooldownHabilidad22.style.display = 'none'
  }

});

imagenHabilidad22.addEventListener('mouseleave',function() {
  informacionHabilidad2.style.display = 'none'
  cooldownHabilidad2.style.display = 'none'
})

cooldownHabilidad22.addEventListener('mouseleave',function() {
  cooldownHabilidad22.style.display = 'none'
})


function animacion(personajeActual,personaje) {

  const ubicacionPersonajeObj = document.getElementById(personaje.id)
  const ubicacionObj = ubicacionPersonajeObj.querySelector('.imagen2')

  const Personaje = document.getElementById(personajeActual.id)
  const ubicacionPersonaje = Personaje.querySelector('.imagen1')

  const personajeDañado = ubicacionPersonajeObj.querySelector('.imagen1')

  ubicacionPersonaje.style.display = 'none'
  ubicacionObj.src = `./FrontEnd/Assets/img/personajes/${personajeActual.id}/Atacando.gif`
  ubicacionObj.style.display = 'block'
  setTimeout(() => {
    personajeDañado.classList.add('efectoDaño')
    setTimeout(() => {
    ubicacionPersonaje.style.display = 'block'
      setTimeout(() => {
      ubicacionObj.style.display = 'none'
        setTimeout(() => {
          personajeDañado.classList.remove('efectoDaño')
          EfectoMuerto()
          ActualizarDebilitamientos()
          LimpiarEfectos()
        }, 200);
      }, 1);
    }, 900);
    setTimeout(() => {
      ubicacionObj.src = ''
    }, 900);
  }, 850);
}

// function ActualizarDebilitamientos() {
//   const equipo1 = document.querySelectorAll(".debilitar")
//   const equipo2 = document.querySelectorAll(".debilitar2")
//   equipo1.forEach((contenedor,posicionContenedor)=>{
//     Juego.equipo1.forEach((Personaje,posicionPersonaje)=>{
//       if (posicionContenedor == posicionPersonaje) {
//         contenedor.firstElementChild.textContent = Personaje.debilitamiento.length
//       }
//     })
//   })

//   equipo2.forEach((contenedor,posicionContenedor)=>{
//     Juego.equipo2.forEach((Personaje,posicionPersonaje)=>{
//       if (posicionContenedor == posicionPersonaje) {
//         contenedor.firstElementChild.textContent = Personaje.debilitamiento.length
//       }
//     })
//   })
// }

function ActualizarDebilitamientos(){
  personajesObjetos.forEach(pOBJ => {
    personajesHTML.find(pHTML => {
      if(pOBJ.id == pHTML.id){
        const Veneno = pOBJ.debilitamiento.find(efecto => efecto.nombre == 'Veneno')
        console.log()
        if (Veneno) {
          pHTML.querySelector('.efectoVeneno').style.display = 'block'
        }else{
          pHTML.querySelector('.efectoVeneno').style.display = 'none'
        }
        const Quemado = pOBJ.debilitamiento.find(efecto => efecto.nombre == 'Quemar')
        if (Quemado) {
          pHTML.querySelector('.efectoQuemado').style.display = 'block'
        }else{
          pHTML.querySelector('.efectoQuemado').style.display = 'none'
        }

      }
    })
  })
}



function actCool() {
  console.warn(Juego.personajeActual.nombre)
  console.log(Juego.personajeActual.habilidades[0].Espera)
  console.log(Juego.personajeActual.habilidades[1].Espera)

}

actCool()

// VENENO "fa-regular fa-droplet , condVeneno"
// FUEGO "fa-regular fa-fire , condFuego"
// ATAQUE "fa-regular fa-shield , condAtaque"
// DEFENSA "fa-regular fa-shield , condDefensa"