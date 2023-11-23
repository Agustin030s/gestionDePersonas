class Persona{
    #nombre;
    #edad;
    #dni;
    #sexo;
    #peso;
    #altura;
    #fechNac;

    constructor(nombre, edad, dni, sexo, peso, altura, fechaNac){
        this.#nombre = nombre;
        this.#edad = edad;
        this.#dni = dni;
        this.#sexo = sexo;
        this.#peso = peso;
        this.#altura = altura;
        this.#fechNac = fechaNac;
    }

    get nombre(){
        return this.#nombre;
    }

    set nombre(nom){
        this.#nombre = nom;
    }

    get edad(){
        return this.#edad;
    }

    set edad(edadNuev){
        if(!isNaN(edadNuev) && edadNuev >= 0){
            this.#edad = edadNuev;
        }else{
            alert('Ingrese una edad válida');
        }
    }

    get dni(){
        return this.#dni;
    }

    set dni(dniNuev){
        if(!isNaN(dniNuev) && dniNuev <= 99999999 && dniNuev > 0){
            this.#dni = dniNuev;
        }else{
            alert('Ingrese un número de DNI válido');
        }
    }

    get sexo(){
        return this.#sexo;
    }

    set sexo(sexoNuev){
        if(sexoNuev === 'M' || sexoNuev === 'H'){
            this.#sexo = sexoNuev;
        }else{
            alert('Ingrese un sexo válido (M - mujer, H - hombre)');
        }
    }

    get peso(){
        return this.#peso;
    }

    set peso(pesoNuev){
        if(!isNaN(pesoNuev) && pesoNuev > 0){
            this.#peso = pesoNuev;
        }else{
            alert('Ingrese un peso válido');
        }
    }

    get altura(){
        return this.#altura;
    }

    set altura(altNuev){
        if(!isNaN(altNuev) && altNuev > 0){
            this.#altura = altNuev;
        }else{
            alert('Ingrese una altura válida');
        }
    }

    get fechNac(){
        return this.#fechNac;
    }

    set fechNac(fechNuev){
        this.#fechNac = fechNuev;
    }

    obtenerFecha(){
        const day = this.#fechNac.getDay();
        const month = this.#fechNac.getMonth();
        const year = this.#fechNac.getFullYear();

        const fechaNacimiento = `${day}/${month}/${year}`;
        return fechaNacimiento;
    }

    mostrarDatos(){
        const fechNacimiento = this.obtenerFecha();
    }
    
    mostrarGeneracion(){
        const añoDeNacimiento = this.#fechNac.getFullYear();
        let generacion = '';
        let rasgoCaracteristico = '';

        if(añoDeNacimiento >= 1994 && añoDeNacimiento <= 2010){
            generacion = 'Generación Z';
            rasgoCaracteristico = 'Irreverencia';
        }else if(añoDeNacimiento >= 1981 && añoDeNacimiento <= 1993){
            generacion = 'Generación Y: Millenials';
            rasgoCaracteristico = 'Frustración';
        }else if(añoDeNacimiento >= 1969 && añoDeNacimiento <= 1980){
            generacion = 'Generación X';
            rasgoCaracteristico = 'Obsesión por el éxito';
        }else if(añoDeNacimiento >= 1949 && añoDeNacimiento <= 1968){
            generacion = 'Baby Boom';
            rasgoCaracteristico = 'Ambición';
        }else if(añoDeNacimiento >= 1930 && añoDeNacimiento <= 1948){
            generacion = 'Silent Generation';
            rasgoCaracteristico = 'Auteridad';
        }else{
            generacion = 'Sin generación';
            rasgoCaracteristico = 'No tiene rasgo caracteristico';
        }

        alert(`La generación de ${this.#nombre} es ${generacion} y su rasgo caracteristico es: ${rasgoCaracteristico}`);
    }

    esMayorDeEdad(){
        if(this.#edad >= 18){
            alert(`${this.#nombre} es mayor de edad`);
        }else{
            alert(`${this.#nombre} es menor de edad`);
        }
    }
}

const listaDePersonas = [];
const tablaPersonas = document.getElementById('bodyTabla');
const formPersonas = document.getElementById('formPersonas');

const agregarPersonaATabla = (persona) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${persona.nombre}</td>
        <td>${persona.edad}</td>
        <td>${persona.dni}</td>
        <td>${persona.obtenerFecha()}</td>
        <td>${persona.peso} Kg</td>
        <td>${persona.altura} mts</td>
        <td>
            <button class="btn btn-info my-2" onclick="mostrarGeneracion('${persona.dni}')">Mostrar Generación</button>
            <button class="btn btn-info" onclick="esMayorDeEdad('${persona.dni}')">Es mayor de edad?</button>
        </td>
    `;
    tablaPersonas.appendChild(newRow);
}

const mostrarGeneracion = (dni) =>{
    const persona = listaDePersonas.find(p => p.dni === dni);
    persona.mostrarGeneracion();
}

const esMayorDeEdad = (dni) =>{
    const persona = listaDePersonas.find(p => p.dni === dni);
    persona.esMayorDeEdad();
}

formPersonas.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const dni = document.getElementById('dni').value;
    const fechNac = new Date(document.getElementById('fechNac').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    const nuevaPersona = new Persona(nombre, edad, dni, '', peso, altura, fechNac);
    listaDePersonas.push(nuevaPersona);

    agregarPersonaATabla(nuevaPersona);

    // Limpiar los campos del formulario
    formPersonas.reset();
});