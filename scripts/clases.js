
class Reserva{
    constructor(servicio, precio, profesional, dia, hora, cantidad){
        this.servicio = servicio;
        this.precio = precio;
        this.profesional = profesional;
        this.dia = dia;
        this.hora = hora;
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

class Producto{
    constructor(id, descripcion, precio, imagen){
        this.id = id;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 0;
    }

    agregarAlCarrito(){
        this.cantidad = this.cantidad + 1;
    }

    quitarDelCarrito(){
        this.cantidad = this.cantidad - 1;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getSrcImage(){
        return this.imagen;
    }

    getPrecio(){

        return this.precio;
    }

    getId(){
        return this.id;
    }
}