let servicioReserva = "";
let cantidadServicio = 0;
let profesional = "";
let precio = 0;
let dia;

class Reserva{
    constructor(servicio, precio, profesional, dia, cantidad){
        this.servicio = servicio,
        this.precio = precio,
        this.profesional = profesional,
        this.dia = dia,
        this.cantidad = cantidad,
        this.subTotal = 0,
        this.total = 0
    }

    calcularSubTotal() {
        this.subTotal = this.precio * this.cantidad;
    }

    calcularTotal() {
        this.total = this.subTotal;
    }
}

document.getElementById("agendaInput").addEventListener("blur", function() {
    var input = this.value;
    dia = new Date(input);
    console.log(input);
    console.log(dia);
}); 


crearReserva = function(dia){
    debugger;
    const reserva = reservarServicio(dia);
    reserva.calcularSubTotal();
    reserva.calcularTotal();

    let contenedorReserva = document.createElement("div");

    contenedorReserva.innerHTML = `<div class="container">
                                 <h3> Detalle de la reserva: \n </h3>
                                    <p> -${reserva.servicio} x ${reserva.cantidad} : $ ${reserva.subTotal} </p>
                                    <p> -Profesional: ${reserva.profesional} </p>
                                    <p> -Día de la reserva: ${reserva.dia} </p>
                                    <p> -Total = $ ${reserva.total}</p>
                                </div>`;

    document.body.appendChild(contenedorReserva);
}

let miForm = document.getElementById("formReserva");
miForm.addEventListener("submit", crearReserva(dia));

function reservarServicio(){
    let servicio = document.getElementById("servicioInput");
    servicioReserva = servicio.value;
    switch(servicioReserva){
        case "Lifting de pestañas":
            precio = 1500;
            break;
        case "Lash botox":
            precio = 1900;
            break;
        case "Perfilado de cejas":
            precio = 600;
            break;
        case "Uñas - Semi-permanente":
            precio = 1500;
            break;
        case "Uñas - Kapping gel":
            precio = 1800;
            break;    
        case "Uñas - Gelificadas":
            precio = 2000;
            break;
        case "Uñas - Acrilicas":
            precio = 2200;
            break;
    }
    cantidadServicio = 1;
       
    /* let fechaSeleccionada = document.querySelector('input[type="date"]');
    dia = fechaSeleccionada.value;
    console.log(dia); */

    let profesionalSeleccionada = document.getElementById("profesionalInput");
    profesional = profesionalSeleccionada.value;

    return new Reserva(servicioReserva, precio, profesional, dia, cantidadServicio);
    
}






