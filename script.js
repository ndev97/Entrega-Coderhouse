//variables DOM
const btnIngresar = document.getElementById(`btn`)
const btnPromediar = document.getElementById(`btn-promediar`)
const btnBuscar = document.getElementById(`btn-buscar`)
const btnMostrarAlumnos = document.getElementById(`mostrarAlumno`)
let list = document.getElementById(`list`)
let resultContainer = document.getElementById(`cont-resultado`)
let busquedaPromedio = document.getElementById(`busquedaPromedio`).value
//variables
let nombreInput
let materiaInput
let cantidadNotas
let nota
let contadorNotas = 0;
let promedioTotal
let ultimoAlumno
let ultimaMateria
let ultimaCantidadNotas
let ultimoContadorNotas
let inputSearch
let importLocalStorage
let checkAlumno

let baseDatos = []

//verificar existencia de datos en localStorage
importLocalStorage = JSON.parse(localStorage.getItem(`alumnoIndiv`))
if(importLocalStorage !== null){
    baseDatos = importLocalStorage
}

class Alumno{
    constructor(nombre, materia, cantidad, sumaNotas){
        this.nombre = nombre
        this.materia = materia
        this.cantidad = cantidad
        this.sumaNotas = sumaNotas
    }
}

//crear inputs de los elementos 'select'
list.addEventListener(`change`, ()=>{
    let cantidadDeNotas = document.getElementById(`list`)
    let notas = cantidadDeNotas.value
    const inputCont = document.getElementById(`input-cont`)
    //validacion
    if(notas === ``){
        let inputs = document.querySelectorAll(`.input-switcher`)
        for (let element of inputs) {
            element.remove()
        }
    }
    if(notas === `uno`){
        let inputs = document.querySelectorAll(`.input-switcher`)
        for (let element of inputs) {
            element.remove()
        }
        for (let i=0; i<=0; i++) {
            let newInput = document.createElement(`input`)
            newInput.classList.add(`input-switcher`)
            newInput.setAttribute(`type`, `number`)
            newInput.setAttribute(`placeholder`, `Nota ${[i+1]}`)
            newInput.setAttribute(`id`, `nota${[i+1]}`)
            inputCont.appendChild(newInput)
        }
    }
    if(notas === `dos`){
        let inputs = document.querySelectorAll(`.input-switcher`);
        for (let element of inputs) {
            element.remove()
        }
        for (let i=0; i<2; i++) {
            let newInput = document.createElement(`input`)
            newInput.classList.add(`input-switcher`)
            newInput.setAttribute(`type`, `number`)
            newInput.setAttribute(`placeholder`, `Nota ${[i+1]}`)
            newInput.setAttribute(`id`, `nota${[i+1]}`)
            inputCont.appendChild(newInput)
        }
    }
    if(notas === `tres`){
        let inputs = document.querySelectorAll(`.input-switcher`)
        for (let element of inputs) {
            element.remove()
        }
        for (let i=0; i<3; i++) {
            let newInput = document.createElement(`input`)
            newInput.classList.add(`input-switcher`)
            newInput.setAttribute(`type`, `number`)
            newInput.setAttribute(`placeholder`, `Nota ${[i+1]}`)
            newInput.setAttribute(`id`, `nota${[i+1]}`)
            inputCont.appendChild(newInput)
        }
    }
    if(notas === `cuatro`){
        let inputs = document.querySelectorAll(`.input-switcher`)
        for (let element of inputs) {
            element.remove()
        }
        for (let i=0; i<4; i++) {
            let newInput = document.createElement(`input`)
            newInput.classList.add(`input-switcher`)
            newInput.setAttribute(`type`, `number`)
            newInput.setAttribute(`placeholder`, `Nota ${[i+1]}`)
            newInput.setAttribute(`id`, `nota${[i+1]}`)
            inputCont.appendChild(newInput)
        }
    }
    if(notas === `cinco`){
        let inputs = document.querySelectorAll(`.input-switcher`)
        for (let element of inputs) {
            element.remove()
        }
        for (let i=0; i<5; i++) {
            let newInput = document.createElement(`input`)
            newInput.classList.add(`input-switcher`)
            newInput.setAttribute(`type`, `number`)
            newInput.setAttribute(`placeholder`, `Nota ${[i+1]}`)
            newInput.setAttribute(`id`, `nota${[i+1]}`)
            inputCont.appendChild(newInput)
        }
    }
})

//boton 'Ingresar y Calcular Notas'
btnIngresar.addEventListener(`click`, ()=>{
    nombreInput = document.getElementById(`nombre`).value
    materiaInput = document.getElementById(`materia`).value
    let cantidadDeNotas = document.getElementById(`list`)
    if(cantidadDeNotas.value === ``){
        return Swal.fire({
            icon: 'info',
            title: 'Faltan notas', 
            text: 'Seleccionar la cantidad de notas a calcular!',
            background: '#636363',
            color: '#fff',
            confirmButtonColor: '#3E35C0'
        })
    }
    //resetear contadores para calcular el ultimo alumno
    if(contadorNotas > 0){
        contadorNotas = 0
        sumaNotas = 0
    }
    if(!isNaN(nombreInput) || !isNaN(materiaInput)){
        return Swal.fire({
            icon: 'error',
            title: 'No se ingresaron datos', 
            text: 'Rellenar los campos vacios. Solo se aceptan letras.',
            background: '#636363',
            color: '#fff',
            confirmButtonColor: '#3E35C0'
        }),
        document.getElementById(`nombre`).value = ``,
        document.getElementById(`materia`).value = ``
    }
    //funcion principal
    calcularNotas()
    //guardo en localStorage
    guardarLocalS()
})


function mostrarIngresadoToastify(){
    Toastify({
        text: `'${nombreInput}' ingresado.`,
        duration: 4000,
        backgroundColor: '#3E7DED',
        position: 'center',
        gravity: 'bottom'
    }).showToast()
}
function errFaltaDatos(){
    Swal.fire({
        icon: 'error',
        title: 'Incompleto', 
        text: 'Falta ingresar dato/s de una o mas calificaciones en sus campos.',
        background: '#636363',
        color: '#fff',
        confirmButtonColor: '#3E35C0'
    })
}
function errNotas0to10(){
    Swal.fire({
        icon: 'error',
        title: 'Solo numeros', 
        text: 'Las notas deben ser numeros entre 0 y 10.',
        background: '#636363',
        color: '#fff',
        confirmButtonColor: '#3E35C0'
    })
}
function errNotasNumeros(){
    Swal.fire({
        icon: 'error',
        title: 'Solo numeros', 
        text: 'Las notas ingresadas no son numeros.',
        background: '#636363',
        color: '#fff',
        confirmButtonColor: '#3E35C0'
    })
}

//Ingresar y calcular notas. Funcion calculo principal
function calcularNotas(){
    let switcher = document.getElementById(`list`)
    let switcherValue = switcher.value

    //calcular segun 'value'
    if(switcherValue === `uno`){
        cantidadNotas = 1
        let nota1 = parseFloat(document.getElementById(`nota1`).value)

        let inputs = document.querySelectorAll(`.input-switcher`)
        for(const nota of inputs){
            if(nota.value === ``){
                return errFaltaDatos()
            } else if(nota.value>10 || nota.value<0){
                return errNotas0to10()
            }
        }
        contadorNotas = nota1
        //se crea el objeto, se agrega al array
        const alumno = new Alumno(nombreInput, materiaInput, cantidadNotas, contadorNotas)
        baseDatos.push(alumno)
        //reiniciar valores de los input
        inputs.forEach(nota => {
            nota.value = ``
        })
        document.getElementById(`nombre`).value = ``
        document.getElementById(`materia`).value = ``
        //Ingresado con exito.
        mostrarIngresadoToastify()
    }
    if(switcherValue === `dos`){
        cantidadNotas = 2
        let nota1 = parseFloat(document.getElementById(`nota1`).value)
        let nota2 = parseFloat(document.getElementById(`nota2`).value)

        let inputs = document.querySelectorAll(`.input-switcher`)
        for(const nota of inputs){
            if(nota.value === ``){
                return errFaltaDatos()
            } else if(nota.value>10 || nota.value<0){
                return errNotas0to10()
            }
        }
        contadorNotas = (nota1+nota2)/2
        const alumno = new Alumno(nombreInput, materiaInput, cantidadNotas, contadorNotas)
        baseDatos.push(alumno)

        inputs.forEach(nota => {
            nota.value = ``
        })
        document.getElementById(`nombre`).value = ``
        document.getElementById(`materia`).value = ``
        mostrarIngresadoToastify()
    }
    if(switcherValue === `tres`){
        cantidadNotas = 3
        let nota1 = parseFloat(document.getElementById(`nota1`).value)
        let nota2 = parseFloat(document.getElementById(`nota2`).value)
        let nota3 = parseFloat(document.getElementById(`nota3`).value)

        let inputs = document.querySelectorAll(`.input-switcher`)
        for(const nota of inputs){
            if(nota.value === ``){
                return errFaltaDatos()
            } else if(nota.value>10 || nota.value<0){
                return errNotas0to10()
            }
        }
        contadorNotas = (nota1+nota2+nota3)/3
        const alumno = new Alumno(nombreInput, materiaInput, cantidadNotas, contadorNotas)
        baseDatos.push(alumno)
        
        inputs.forEach(nota => {
            nota.value = ``
        })
        document.getElementById(`nombre`).value = ``
        document.getElementById(`materia`).value = ``
        mostrarIngresadoToastify()
    }
    if(switcherValue === `cuatro`){
        cantidadNotas = 4
        let nota1 = parseFloat(document.getElementById(`nota1`).value)
        let nota2 = parseFloat(document.getElementById(`nota2`).value)
        let nota3 = parseFloat(document.getElementById(`nota3`).value)
        let nota4 = parseFloat(document.getElementById(`nota4`).value)

        let inputs = document.querySelectorAll(`.input-switcher`)
        for(const nota of inputs){
            if(nota.value === ``){
                return errFaltaDatos()
            } else if(nota.value>10 || nota.value<0){
                return errNotas0to10()
            }
        }
        contadorNotas = (nota1+nota2+nota3+nota4)/4
        const alumno = new Alumno(nombreInput, materiaInput, cantidadNotas, contadorNotas)
        baseDatos.push(alumno)
        
        inputs.forEach(nota => {
            nota.value = ``
        })
        document.getElementById(`nombre`).value = ``
        document.getElementById(`materia`).value = ``
        mostrarIngresadoToastify()
    }
    if(switcherValue === `cinco`){
        cantidadNotas = 5
        let nota1 = parseFloat(document.getElementById(`nota1`).value)
        let nota2 = parseFloat(document.getElementById(`nota2`).value)
        let nota3 = parseFloat(document.getElementById(`nota3`).value)
        let nota4 = parseFloat(document.getElementById(`nota4`).value)
        let nota5 = parseFloat(document.getElementById(`nota5`).value)

        let inputs = document.querySelectorAll(`.input-switcher`)
        for(const nota of inputs){
            if(nota.value === ``){
                return errFaltaDatos()
            } else if(nota.value>10 || nota.value<0){
                return errNotas0to10()
            }
        }
        contadorNotas = (nota1+nota2+nota3+nota4+nota5)/5
        const alumno = new Alumno(nombreInput, materiaInput, cantidadNotas, contadorNotas)
        baseDatos.push(alumno)
        
        inputs.forEach(nota => {
            nota.value = ``
        })
        document.getElementById(`nombre`).value = ``
        document.getElementById(`materia`).value = ``
        mostrarIngresadoToastify()
    }
}

function guardarLocalS() {
    localStorage.setItem(`alumnoIndiv`, JSON.stringify(baseDatos))
}

//boton Promediar ultimo ingresado
btnPromediar.addEventListener(`click`, ()=>{
    if(baseDatos[0] === undefined){
        return Swal.fire({
            icon: 'error',
            title: 'Error', 
            text: 'No se encuentran datos del ultimo alumno ingresado. Error!',
            background: '#636363',
            color: '#fff',
            confirmButtonColor: '#3E35C0'
        })
    }
    //redefinir variable al ultimo ingresado
    for(const alumno of baseDatos){
        ultimoAlumno = alumno.nombre
        ultimaMateria = alumno.materia
        ultimoContadorNotas = alumno.sumaNotas
        ultimaCantidadNotas = alumno.cantidad
    }
    promedioTotal = ultimoContadorNotas

    if(document.querySelector(`.ultimo-ingresado`)){
        let parrafo = document.querySelector(`.ultimo-ingresado`)
        parrafo.remove()
    }
    
    function promedioPerfecto(){
        let newElement = document.createElement(`div`)
        newElement.classList.add(`ultimo-ingresado`)
        newElement.innerHTML = `
        <p>El ultimo alumno ingresado es: ${ultimoAlumno}</p>
        <p>El promedio de '${ultimaMateria}' es de: ${promedioTotal.toFixed(1)}</p>
        <p>APROBADO con promedio perfecto.</p>
        `
        resultContainer.appendChild(newElement)
        setTimeout(function(){
            document.querySelector(".ultimo-ingresado").remove();
        }, 5000);
    }
    function aprobado(){
        let newElement = document.createElement(`div`)
        newElement.classList.add(`ultimo-ingresado`)
        newElement.innerHTML = `
        <p>El ultimo alumno ingresado es: ${ultimoAlumno}</p>
        <p>El promedio de '${ultimaMateria}' es de: ${promedioTotal.toFixed(1)}</p>
        <p>APROBADO.</p>
        `
        resultContainer.appendChild(newElement)
        setTimeout(function(){
            document.querySelector(".ultimo-ingresado").remove();
        }, 5000);
    }
    function desaprobado(){
        let newElement = document.createElement(`div`)
        newElement.classList.add(`ultimo-ingresado`)
        newElement.innerHTML = `
        <p>El ultimo alumno ingresado es: ${ultimoAlumno}</p>
        <p>El promedio de '${ultimaMateria}' es de: ${promedioTotal.toFixed(1)}</p>
        <p>DESAPROBADO.</p>
        `
        resultContainer.appendChild(newElement)
        setTimeout(function(){
            document.querySelector(".ultimo-ingresado").remove();
        }, 5000);
    }

    if(promedioTotal === 10){
        promedioPerfecto()
    } else if(promedioTotal >= 7){
        aprobado()
    } else{
        desaprobado()
    }
})


//btn Buscar alumno en localStorage
btnBuscar.addEventListener(`click`, ()=>{
    let inputSearch = document.getElementById('input-search').value
    if(inputSearch === ``){
        return Swal.fire({
            icon: 'error',
            title: 'Dato incompleto', 
            text: 'No se ha ingresado un nombre.',
            background: '#636363',
            color: '#fff',
            confirmButtonColor: '#3E35C0'
        })
    }
    importLocalStorage = JSON.parse(localStorage.getItem(`alumnoIndiv`))

    //uso de fetch con localStorage
    fetch(`/data.json`)
    .then(response => response.json())
    .then(data => {
        let alumnoEncontrado
        //si ILS esta vacio y me busca.
        if(importLocalStorage === null && inputSearch.toLowerCase() === data.nombre.toLowerCase()){
            busquedaPromedio = document.getElementById(`busquedaPromedio`).value = `${data.sumaNotas}`
        }
        //si ILS esta vacio y NO me busca.
        else if(importLocalStorage === null && inputSearch.toLowerCase() !== data.nombre.toLowerCase()){
            Swal.fire({
                icon: 'info',
                title: 'Error!', 
                text: `Base de datos vacia. No existe el alumno ${inputSearch}`,
                background: '#636363',
                color: '#fff',
                confirmButtonColor: '#3E35C0'
            })
        }

        //si ILS tiene datos
        if(importLocalStorage != null){
            alumnoEncontrado = importLocalStorage.filter(alumno => alumno.nombre.toLowerCase() === inputSearch.toLowerCase())

            //si ILS tiene datos, me busca y estoy.
            if(inputSearch.toLowerCase()===data.nombre.toLowerCase() && alumnoEncontrado.length>0){
                let promedioNota = alumnoEncontrado.reduce((acumulador, nota) =>{
                    return acumulador += nota.sumaNotas
                }, 0)

                let notaFinal = (promedioNota+data.sumaNotas)/ (alumnoEncontrado.length+1)
                busquedaPromedio = document.getElementById(`busquedaPromedio`).value=`${notaFinal}`
            }
            //si ILS tiene datos, me busca y no estoy.
            if(inputSearch.toLowerCase()===data.nombre.toLowerCase() && alumnoEncontrado.length===0){
                busquedaPromedio = document.getElementById(`busquedaPromedio`).value = `${data.sumaNotas}`
            }

            //si ILS tiene datos, NO me busca y encuentra otro alumno.
            if(alumnoEncontrado.length>0 && inputSearch.toLowerCase()!==data.nombre.toLowerCase()){
                let promedioNota = alumnoEncontrado.reduce((acumulador, nota) =>{
                    return acumulador += nota.sumaNotas
                }, 0)
        
                let notaFinal = promedioNota/alumnoEncontrado.length
                busquedaPromedio = document.getElementById(`busquedaPromedio`).value = `${notaFinal}`
            }
            //si ILS tiene datos, y no encuentra a alguien existente
            else if(alumnoEncontrado.length===0 && inputSearch.toLowerCase()!==data.nombre.toLowerCase()){
                Swal.fire({
                    icon: 'info',
                    title: 'Error!', 
                    text: `No existe el alumno ${inputSearch}`,
                    background: '#636363',
                    color: '#fff',
                    confirmButtonColor: '#3E35C0'
                })
            }
        }
    })
})

//btn Mostrar y modificar lista de alumnos
let clk = 0
btnMostrarAlumnos.addEventListener(`click`, ()=>{
    clk++
    const containerSearch = document.querySelector(`#container3`)
    //importar localStorage
    importLocalStorage = JSON.parse(localStorage.getItem(`alumnoIndiv`))

    if(document.querySelector(`.alumnos-list`)){
        let alumnosBox = document.querySelector(`.alumnos-list`)
        alumnosBox.remove()
    }
    const newAlumnosBox = document.createElement(`div`)
    newAlumnosBox.classList.add(`alumnos-list`)
    newAlumnosBox.setAttribute(`id`, `alumnosList`)
    containerSearch.appendChild(newAlumnosBox)

    //fetch de alumno en data.json inmodificable
    fetch('/data.json')
    .then(response => response.json())
    .then(data => {
        const newAlumno = document.createElement(`div`)
        newAlumno.classList.add(`alumno-info-box`)
        newAlumno.innerHTML = `
        <div class="alumno-info-box-name">
            <p>"${data.nombre}" (permanente)</p>
        </div>
        <div class="info-alumno-box">
            <p>${data.materia}</p>
            <div class="nota-btn">
                <p>${data.sumaNotas}</p>
            </div>
        </div>
        `
        newAlumnosBox.appendChild(newAlumno)
    })
    
    //traer alumnos desde localStorage y mostrarlos en el DOM
    if(importLocalStorage != null){
        importLocalStorage.forEach(alumno => {
            const newAlumno = document.createElement(`div`)
            newAlumno.classList.add(`alumno-info-box`)
            newAlumno.innerHTML = `
            <div class="alumno-info-box-name">
                <p>"${alumno.nombre}"</p>
            </div>
            <div class="info-alumno-box">
                <p>${alumno.materia}</p>
                <div class="nota-btn">
                    <p>${alumno.sumaNotas.toFixed(1)}</p>
                    <button class="btn-eliminar" id="btnEliminar" >X</button>
                </div>
            </div>
            `
            newAlumnosBox.appendChild(newAlumno)
        })
    }

    //una vez creados los elementos, asigno una funcion a los botones
    let item = document.querySelectorAll(`.btn-eliminar`)
    for(const alumno of item){
        alumno.addEventListener(`click`, actualizarAlumno)
    }
})
//actualizar alumnos de localstorage
function actualizarAlumno(nombre, materia){
    let infoAlumno = this.parentElement.parentElement.parentElement
    infoAlumno.remove()
    
    //tomo el textContent para poder comparar posteriormente
    nombre = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent
    materia = this.parentElement.parentElement.firstElementChild.textContent

    //creo nuevo array sin elemento borrado
    let nuevoArray = importLocalStorage.filter((alumno) => {
        return alumno.nombre != nombre, alumno.materia != materia
    })
    importLocalStorage = nuevoArray

    function eliminarLocalStorage(){
        //elimino datos de localStorage y actualizo baseDatos
        localStorage.removeItem(`alumnoIndiv`)
        baseDatos = []
    }
    function actualizar(){
        //push actualizacion de localStorage
        localStorage.setItem(`alumnoIndiv`, JSON.stringify(nuevoArray))
    }

    importLocalStorage.length === 0 ? eliminarLocalStorage() : actualizar()
}

