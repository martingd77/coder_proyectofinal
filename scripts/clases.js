
class Reserva{
    constructor(servicio, precio, profesional, dia, cantidad){
        this.servicio = servicio;
        this.precio = precio;
        this.profesional = profesional;
        this.dia = dia;
        this.cantidad = cantidad;
        this.subTotal = 0;
        this.total = 0;
    }

    calcularSubTotal() {
        this.subTotal = this.precio * this.cantidad;
    }

    calcularTotal() {
        this.total = this.subTotal;
    }
}