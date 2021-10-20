let servicioReserva = "";
let cantidadServicio = 0;
let precio = 0;
let dia = "";

class Reserva{
    constructor(servicio, precio, dia, cantidad){
        this.servicio = servicio,
        this.precio = precio,
        this.dia = dia,
        this.cantidad = cantidad,
        this.total = 0
    }

    calcularTotal() {
        this.total = this.precio * this.cantidad;
    }
}


function reservarServicio() {
    while(!servicioReserva || servicioReserva == 0 || servicioReserva > 4) {
        servicioReserva = parseInt(prompt("¿Qué servicio desea reservar?:\n 1: Lifting de pestañas($1500)\n 2:Lash botox($1900)\n 3:Perfilado de cejas($600)\n 4:Uñas gelificadas($2200)"));
    }

    switch(servicioReserva){
        case 1:
            servicioReserva = "Lifting de pestañas";
            precio = 1500;
            break;
        case 2:
            servicioReserva = "Lash botox";
            precio = 1900;
            break;
        case 3:
            servicioReserva = "Perfilado de cejas";
            precio = 600;
            break;
        case 4:
            servicioReserva = "Uñas gelificadas";
            precio = 2200;
            break;
    }

    while(!dia || dia == ""){
        dia = prompt("¿Qué día desear realizarte el servicio?");
    }

    while(!cantidadServicio || cantidadServicio == 0){
        cantidadServicio = parseInt(prompt("Servicio elegido: "+ servicioReserva + " para el día " + dia + "\n Introduzca la cantidad deseada.(sólo números)"));
    }

    return new Reserva(servicioReserva, precio, dia, cantidadServicio)
}


alert("Bienvenida/o a nuestra agenda online");

const reserva = reservarServicio();

reserva.calcularTotal();

alert("Detalle de la reserva:\n"+
    "- " + reserva.servicio + " x " + reserva.cantidad + ": $" + reserva.precio * reserva.cantidad +"\n" +
    /* "- IVA 21%: $" + reserva.calcularIva() + "\n" + */
    "- Día de la reserva: " + reserva.dia + "\n" +
    "Total = $" + reserva.total
);