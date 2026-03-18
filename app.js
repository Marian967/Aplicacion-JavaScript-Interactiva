// =========================
// CALCULADORA
// =========================

let pantalla = document.getElementById("pantalla")
let resultadoMostrado = false

function agregarNumero(numero){

    if(resultadoMostrado){
        pantalla.value = ""
        resultadoMostrado = false
    }

    pantalla.value += numero
}

function operacion(op){

    pantalla.value += op
    resultadoMostrado = false
}

function calcular(){

    try{

        pantalla.value = eval(pantalla.value)
        resultadoMostrado = true
    }catch{

        pantalla.value = "Error"

    }

}

function limpiar(){

    pantalla.value = ""
    resultadoMostrado = false
}


// =========================
// LISTA DE TAREAS
// =========================

/*let tareas = []*/

let tareas = JSON.parse(localStorage.getItem("tareas")) || []

function agregarTarea(){

    let input = document.getElementById("nuevaTarea")
    let texto = input.value

    if(texto === "") return

    tareas.push({
        texto: texto,
        completada: false
    })

    mostrarTareas()

    input.value = ""

}

function mostrarTareas(){

    let lista = document.getElementById("listaTareas")

    lista.innerHTML = ""

    tareas.forEach((tarea,index)=>{

        let li = document.createElement("li")

        li.innerHTML = `
        <input type="checkbox" onchange="toggleTarea(${index})" ${tarea.completada ? "checked" : ""}>

        <span class="${tarea.completada ? "completada" : ""}">
            ${tarea.texto}
        </span>

        <button onclick="eliminarTarea(${index})">X</button>
            `

        lista.appendChild(li)

    })
    

    localStorage.setItem("tareas", JSON.stringify(tareas))

    actualizarContador()
}


function eliminarTarea(indice){

    tareas.splice(indice,1)

    mostrarTareas()

}

function toggleTarea(indice){

    tareas[indice].completada = !tareas[indice].completada

    mostrarTareas()

}

function actualizarContador(){

let pendientes = tareas.filter(t => !t.completada).length

document.getElementById("contadorTareas").textContent =
"Tareas pendientes: " + pendientes

}


// =========================
// GALERIA DE IMAGENES
// =========================

function cambiarImagen(imagen){

    let principal = document.getElementById("imagenPrincipal")

    /*principal.src = imagen.src.replace("100/70","600/400")*/
    principal.src = imagen.src

}

// =========================
// AGREGAR TAREA CON ENTER
// =========================

document.getElementById("nuevaTarea").addEventListener("keydown", function(event){

    if(event.key === "Enter"){

    agregarTarea()

    }
})

// =========================
// CARGAR TAREAS GUARDADAS
// =========================

mostrarTareas()