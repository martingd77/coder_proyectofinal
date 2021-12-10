let servicioReserva = "";
let cantidadServicio = 0;
let profesional = "";
let precio = 0;
let dia;
let hora;
let email;

let contenedorReserva = document.createElement("div");

document.getElementById("agendaInput").addEventListener("blur", function() {
    var input = this.value;
    dia = input;
    console.log(input);
    console.log(dia);
}); 

function crearReserva(e){
    e.preventDefault();
    if(validarFormulario()){
       
        if(contenedorReserva.innerHTML != ""){
            contenedorReserva.innerHTML = "";
        }
        let form = e.target;
       
        const reserva = reservarServicio();
        reserva.calcularSubTotal();
        reserva.calcularTotal();
    
        //jQuery
        $("#exampleModalBody").empty();
        $("#exampleModalBody").append(`<div class="container">
                            <p> -${reserva.servicio} x ${reserva.cantidad} : $ ${reserva.subTotal} </p>
                            <p> -Profesional: ${reserva.profesional} </p>
                            <p> -Día de la reserva: ${reserva.dia} a las ${reserva.hora}</p>
                            <p style="font-weight: bold;"> -Total = $ ${reserva.total}</p>
                            <p> Se enviará un correo electrónico de confirmacion a : ${email}</p>
                        </div>`
        );
        
        $(function(){
            $("#exampleModal").modal("show");
        });

        let reservaJson = JSON.stringify(reserva);
    
        localStorage.setItem("Reserva - " + reserva.servicio + " - " + reserva.profesional, reservaJson);
    }
    else{
        alert("Hubo un problema al guardar la reserva. Revisa bien todos los campos e intentalo nuevamente.")
    }
    
}

let miForm = document.getElementById("formReserva"); 
miForm.addEventListener("submit", crearReserva);

function reservarServicio(){
    servicioReserva = $("#servicioInput").val();
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

    profesional = $("#profesionalInput").val();

    hora = $("#horarioInput").val();

    email = $("#emailInput").val();

    return new Reserva(servicioReserva, precio, profesional, dia, hora, cantidadServicio);
}

//boton mostrar turnos
$('#btnMostrarTurnos').on('click', function(){
    let reservas = getReservas();
    console.log(reservas);
    for(const reserva of reservas)
    {
        alert("Reserva guardada: " + reserva.servicio + " - " + reserva.profesional + " - " + reserva.dia);
    }  
});

//efecto logo hover
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

$(function () {
    var $prof = $('select[id=profesionalInput]');
    var $serv = $('select[id=servicioInput]');

    var $servList = $serv.find('option').clone();

    var profesionalServicio = {
        Alejandra: ["Lifting de pestañas", "Lash botox", "Perfilado de cejas"],
        Mayra: ["Uñas - Semi-permanente", "Uñas - Kapping gel", "Uñas - Gelificadas", "Uñas - Acrilicas"],
        "Selecciona una profesional": ["Selecciona un servicio"] 

    }
    
    $prof.change(function () {
        var $profesionalSeleccionado = $(this).find('option:selected').text();
        $serv.html($servList.filter(function () {
            return $.inArray($(this).text(), profesionalServicio[$profesionalSeleccionado]) >= 0;
        }));
    });

});

function validarFormulario(){
    
    let profesionalSeleccionado = document.forms["formReserva"]["profesionalInput"].value;
    let servicioSeleccionado = document.forms["formReserva"]["servicioInput"].value;
    let email = document.forms["formReserva"]["emailInput"].value;
   
    if (profesionalSeleccionado == "Selecciona una profesional") {
        $("#errorProfesionalInput").append(`<p> Para reservar es necesario seleccionar una profesional  </p>`);
        return false;
    }

    if (servicioSeleccionado == "Selecciona un servicio" || servicioSeleccionado == "") {
        $("#errorServicioInput").append(`<p> Para reservar es necesario seleccionar una servicio  </p>`);
        return false;
    }
    
    if(dia == "" || dia == undefined){
        $("#errorAgendaInput").append(`<p> Para reservar es necesario elegir una fecha  </p>`);
        return false;
    }

    if (!validateEmail(email)) {
        $("#errorEmailInput").append(`<p> El correo electrónico ingresado no es válido  </p>`);
        return false;
    }
    

    $("#errorProfesionalInput").empty();
    $("#errorServicioInput").empty();
    $("#errorAgendaInput").empty();
    
    return true;

}

$("#btnCerrar").on('click', function(){
    $("#exampleModalBody").empty();
    $("#exampleModal").modal("hide");
    location.reload();

});


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  $("#emailInput").focusout(function(){
      if(!validateEmail(this.value)){
        $("#emailInput").css('border-color', 'red');
      }
      else
      {
        $("#emailInput").css('border-color', 'green');
      }
  });


  $("#profesionalInput").focusout(function(){
    if((this.value == "Selecciona una profesional")){
      $("#profesionalInput").css('border-color', 'red');
    }
    else
    {
      $("#profesionalInput").css('border-color', 'green');
    }
});

$("#servicioInput").focusout(function(){
    if((this.value == "Selecciona un servicio")){
      $("#servicioInput").css('border-color', 'red');
    }
    else
    {
      $("#servicioInput").css('border-color', 'green');
    }
});

$("#agendaInput").focusout(function(){

    let fechaElegida = this.value;
    let fechaHoy = new Date();

    if((fechaElegida == "" || fechaElegida == undefined)){
      $("#agendaInput").css('border-color', 'red');
    }
    else if (new Date(fechaElegida) <= fechaHoy){
        $("#errorAgendaInput").append(`<p> Para reservar es necesario elegir una fecha posterior a hoy  </p>`);
        $("#agendaInput").css('border-color', 'red');
    }
    else
    {
      $("#errorAgendaInput").empty();
      $("#agendaInput").css('border-color', 'green');
    }
});