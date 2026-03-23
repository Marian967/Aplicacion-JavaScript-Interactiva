// =========================
// CALCULADORA
// =========================

class Calculadora{
    constructor(id){
        this.pantalla = document.getElementById(id)
        this.resultadoMostrado = false
    }

    agregarNumero(num){
        if(this.resultadoMostrado){
            this.pantalla.value = ""
            this.resultadoMostrado = false
        }
        this.pantalla.value += num
    }

    operacion(op){
        this.pantalla.value += op
        this.resultadoMostrado = false
    }

    calcular(){
        try{
            this.pantalla.value = eval(this.pantalla.value)
            this.resultadoMostrado = true
        }catch{
            this.pantalla.value = "Error"
        }
    }

    limpiar(){
        this.pantalla.value = ""
        this.resultadoMostrado = false
    }
}

// =========================
// TAREAS
// =========================

class Tarea{
    constructor(texto, completada = false){
        this.texto = texto
        this.completada = completada
    }
}

class ListaTareas{
    constructor(){
        this.tareas = JSON.parse(localStorage.getItem("tareas")) || []
        this.lista = document.getElementById("listaTareas")
        this.input = document.getElementById("nuevaTarea")
        this.contador = document.getElementById("contadorTareas")

        this.input.addEventListener("keydown",(e)=>{
            if(e.key === "Enter"){
                this.agregarTarea()
            }
        })

        this.mostrarTareas()
    }

    guardar(){
        localStorage.setItem("tareas", JSON.stringify(this.tareas))
    }

    agregarTarea(){
        let texto = this.input.value
        if(texto === "") return

        this.tareas.push(new Tarea(texto))
        this.input.value = ""
        this.mostrarTareas()
    }

    eliminarTarea(index){
        if(confirm("¿Eliminar tarea?")){
            this.tareas.splice(index,1)
            this.mostrarTareas()
        }
    }

    toggleTarea(index){
        this.tareas[index].completada = !this.tareas[index].completada
        this.mostrarTareas()
    }

    actualizarContador(){
        let pendientes = this.tareas.filter(t => !t.completada).length
        this.contador.textContent = "Tareas pendientes: " + pendientes
    }

    mostrarTareas(){
        this.lista.innerHTML = ""

        this.tareas.forEach((tarea,index)=>{

            let li = document.createElement("li")

            li.innerHTML = `
            <input type="checkbox" ${tarea.completada ? "checked" : ""}>
            <span class="${tarea.completada ? "completada" : ""}">
                ${tarea.texto}
            </span>
            <button class="btn-eliminar">Eliminar</button>
            `

            li.querySelector("input").addEventListener("change",()=>{
                this.toggleTarea(index)
            })

            li.querySelector("button").addEventListener("click",()=>{
                this.eliminarTarea(index)
            })

            this.lista.appendChild(li)
        })

        this.guardar()
        this.actualizarContador()
    }
}

// =========================
// GALERIA
// =========================

class Galeria{
    constructor(){
        this.principal = document.getElementById("imagenPrincipal")
    }

    cambiarImagen(img){
        this.principal.src = img.src
    }
}

// =========================
// INICIALIZAR
// =========================

const calc = new Calculadora("pantalla")
const lista = new ListaTareas()
const galeria = new Galeria()
