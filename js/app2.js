// variables
const formulario=document.querySelector('#ElementoForm')
var myCarousel = document.querySelector('#carouselExampleControls')
const inputNombre=document.querySelector('#nombre')
const inputCorreo=document.querySelector('#correo')
const inputAsunto=document.querySelector('#mensaje')
const inputMensaje=document.querySelector('#txtarea')
const btnEnviar=document.querySelector('#btn-enviar')


// documento listo
document.addEventListener('DOMContentLoaded',()=>{
    console.log('listo')
    ui.carrusel()
    eventlisteners()
    var touchDevice = ('ontouchstart' in document.documentElement);
    formulario.reset()
    

    if(detectMob()){
        document.querySelector('#particles-js').classList.add('d-none')
    }
})


// eventlisteners
function eventlisteners(){
    formulario.addEventListener('submit',handleSubmit)
    inputNombre.addEventListener('blur', validacionFormulario)
    inputCorreo.addEventListener('blur', validacionFormulario)
    inputAsunto.addEventListener('blur', validacionFormulario)
    inputMensaje.addEventListener('blur', validacionFormulario)
}


//clases


class UI{
    constructor(){

    }
    carrusel(){
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: 3000,
            pause:'hover'
             })

    }

    mostrarMensaje(mensaje, tipo){
        const activo=document.querySelector('.activo')
        if(!activo){
        const mensajeHtml=document.createElement('div')
        mensajeHtml.classList.add('text-white', 'text-center','activo','p-2','w-50')

        mensajeHtml.textContent=mensaje
        if (tipo=="error") {
            mensajeHtml.classList.add('bg-danger')
        }
        else{
            mensajeHtml.classList.add('bg-success')
        }

        formulario.appendChild(mensajeHtml)


        setTimeout(() => {
            mensajeHtml.remove()
        }, 2000);

    }
    }   
    

}

//instancias
const ui=new UI()



//funciones
function activar(e){
    ui.activarCarrusel(e)

}
function desactivar(e){
    ui.desactivarCarrusel(e)

}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

async function handleSubmit(e){
    e.preventDefault();

    if (inputNombre.value==""||inputCorreo.value==""||inputAsunto.value==""||inputMensaje.value=="") {
        ui.mostrarMensaje('Todos los campos deben ser llenados','error')
        return;
    }
    


    const form=new FormData(this)

    const response=await fetch(this.action,{
        method:this.method,
        body:form,
        headers:{
            'Accept': 'aplication/json'
        }
    })
    if (response.ok) {
        formulario.reset()
        ui.mostrarMensaje('Mensaje enviado correctamente','succes')
    }
}

function validacionFormulario(e){
    console.log(e.target.value)

    console.log(e.target)

    if(e.target.value==""){
        e.target.classList.add('border','border-danger')
        e.target.classList.remove('border-primary')
    }
    else{
        e.target.classList.add('border','border-primary')
        e.target.classList.remove('border-danger')
    }


}