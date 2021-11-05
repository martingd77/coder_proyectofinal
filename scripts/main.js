let servicioReserva = "";
let cantidadServicio = 0;
let profesional = "";
let precio = 0;
let dia;

let contenedorReserva = document.createElement("div");

document.getElementById("agendaInput").addEventListener("blur", function() {
    var input = this.value;
    dia = input;
    console.log(input);
    console.log(dia);
}); 

function crearReserva(e){

    if(contenedorReserva.innerHTML != ""){
        contenedorReserva.innerHTML = "";
    }
    
    e.preventDefault();
    let form = e.target;
   
    const reserva = reservarServicio();
    reserva.calcularSubTotal();
    reserva.calcularTotal();

    //jQuery
    $("body").append(`<div class="container">
                        <h3> Detalle de la reserva: \n </h3>
                        <p> -${reserva.servicio} x ${reserva.cantidad} : $ ${reserva.subTotal} </p>
                        <p> -Profesional: ${reserva.profesional} </p>
                        <p> -Día de la reserva: ${reserva.dia} </p>
                        <p> -Total = $ ${reserva.total}</p>
                    </div>`
    );

    let reservaJson = JSON.stringify(reserva);

    localStorage.setItem("Reserva - " + reserva.servicio + " - " + reserva.profesional, reservaJson);
}

let miForm = document.getElementById("formReserva");
miForm.addEventListener("submit", crearReserva);

function reservarServicio(){
    /* console.log(); */ 
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

    let profesionalSeleccionada = document.getElementById("profesionalInput");
    profesional = profesionalSeleccionada.value;

    return new Reserva(servicioReserva, precio, profesional, dia, cantidadServicio);
    
}

//con jQuery
$('#btnMostrarTurnos').on('click', function(){
    let reservas = getReservas();
    console.log(reservas);
    debugger;
    for(const reserva of reservas)
    {
        alert("Reserva guardada: " + reserva.servicio + " - " + reserva.profesional + " - " + reserva.dia);
    }  
});

$('#logo').hover(function(){
    $(this).fadeOut(600);
    $(this).fadeIn(600);
});

function getReservas(){
    var reservas = [];
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push(localStorage.getItem(keys[i]));
    }

    for(const value of values){
        if(value.includes("servicio")){
            reservas.push(JSON.parse(value));
        }

    }

    return reservas;
}


