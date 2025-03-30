class Efecto {
  
  //CLASE PRINCIPAL DEL EFECTO QUE CONTENDRA  LOS METODOS PRINCIPALES DE LOS EFECTOS

  constructor(nombre, descripcion, efecto, tiempo) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.efecto = efecto;
    this.tiempo = tiempo;
  }

  Activar(personaje) {
    if (this.tiempo > 0) {
      if (personaje.estaMuerto()) {
        console.log(`${personaje.nombre} está muerto`);
        return;
      }
      
      this.efecto(personaje); // ACTIVACION
      Personaje.validarExcesos(personaje); // VALIDACION DE EXCESOS
      console.log(`Efecto activado: ${this.nombre}, Tiempo restante: ${this.tiempo}`);
      this.reducirEspera();

    } else {
      this.removerEfectos(personaje);
    }
  }

  removerEfectos(personaje) {
    if (!personaje) {
      console.warn("El personaje no existe");
      return;
    }

    if (Array.isArray(personaje.debilitamiento)) {
      personaje.debilitamiento = personaje.debilitamiento.filter(
        (debil) => debil.nombre !== this.nombre
      );
    }

    if (Array.isArray(personaje.fortalecimiento)) {
      personaje.fortalecimiento = personaje.fortalecimiento.filter(
        (fortaleza) => fortaleza.nombre !== this.nombre
      );
    }
    console.log(`Efectos eliminados: ${this.nombre}`);
  }

  reducirEspera() {
    this.tiempo = Math.max(0, this.tiempo - 1); // Se asegura de no reducir por debajo de 0
  }
}

class EfectoContinuo extends Efecto {
  constructor(nombre, descripcion, efecto, tiempo) {
    super(nombre, descripcion, efecto, tiempo);
  }
}

class EfectoFijo extends Efecto {
  constructor(nombre, descripcion, efecto, tiempo) {
    super(nombre, descripcion, efecto, tiempo);
    this.activo = false; // Inicialmente no activo
  }

  Aplicar(personaje) {
    if (this.tiempo > 0) {
      this.efecto(personaje); // Aplica el efecto
      this.activo = true; // Marca el efecto como activo
      console.log(`Efecto fijo activado: ${this.nombre}`);
      this.reducirEspera(); // Reduce el tiempo
    } else {
      super.removerEfectos(personaje)// Remover si el tiempo es 0
    }
  }

  removerEfectos(personaje) {
    if (this.activo) {
      super.removerEfectos(personaje); // Llama a la implementación de la clase base
      this.activo = false; // Marca como inactivo
      console.log(`Efecto fijo desactivado: ${this.nombre}`);
    }
  }
}


// class EfectoContinuo {
//   //CLASE CREADORA DE LOS EFECTOS CONTINUOS
//   constructor(nombre, descripcion, efecto, tiempo,eliminarEfecto) {
//     //this.tipo ELIMINADO DE PRUEBA
//     this.nombre = nombre;
//     this.descripcion = descripcion;
//     this.efecto = efecto;
//     this.tiempo = tiempo;
//     this.eliminarEfecto = eliminarEfecto;
//   }

//   Activar(personaje) {
//     //ACTIVACION DE LA HABILIDAD
//     if (this.tiempo === 0) {
//       this.removerEfectos(personaje);
//       console.log('efecto eliminado')
//     }else{

//       if (personaje.estaMuerto()) {
//         console.log(`El personaje ${personaje.nombre} está muerto`);
//         return false;
//       }

//       this.efecto(personaje); //SE ACTIVA EL EFECTO
//       Personaje.validarExcesos(personaje); // se validan excesos después de accionarse la habilidad
//       this.reducirEspera();

//     }
//   }

//   removerEfectos(personaje) {
//     if (!personaje) {
//       console.warn('El personaje no existe');
//       return;
//     }

//     if (Array.isArray(personaje.debilitamiento)) {
//       personaje.debilitamiento = personaje.debilitamiento.filter(debil => debil.nombre !== this.nombre);

//     }

//     if (Array.isArray(personaje.fortalecimiento)) {
//       personaje.fortalecimiento = personaje.fortalecimiento.filter((fortaleza) => fortaleza.nombre !== this.nombre);
//     }
//   }

//   reducirEspera() {
//     this.tiempo = Math.max(0, this.tiempo - 1); // Se asegura de no reducir por debajo de 0
//   }
// }

// class EfectoFijo extends EfectoContinuo {
//   constructor(nombre, descripcion, efecto, tiempo, tipo, eliminarEfecto) {
//     super(nombre, descripcion, efecto, tiempo, tipo, eliminarEfecto);
//     this.activo = false; // Inicialmente el efecto no está activo
//   }

//   Aplicar(personaje) {
//     if (!this.activo) {
//       this.efecto(personaje); // Aplica el efecto si no está activo
//       this.activo = true; // Marca el efecto como activo
//     }
//   }

//   desAplicar(personaje) {
//     if (this.activo) {
//       this.removerEfectos(personaje); // Elimina el efecto solo si estaba activo
//       this.activo = false; // Marca el efecto como inactivo
//     }
//   }
// }