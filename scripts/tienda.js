let producto1 = new Producto(1, "Labial Mac - Coral", 1500, "../images/labial-mac-oscuro.jpg");
let producto2 = new Producto(2, "Labial Mac - Rojo", 1500, "../images/labial-mac-rojo.png");
let producto3 = new Producto(3, "Labial Mac - Nude", 1500, "../images/labial-mac-nude.jpg");
let producto4 = new Producto(4, "Labial Ricosti - Beijo Doce", 1500, "../images/ricosti-rosa.png");
let producto5 = new Producto(5, "Labial Ricosti - Bem me quer", 1500, "../images/labial-mac-nude.jpg");
let producto6 = new Producto(6, "Labial Ricosti - Negro", 1500, "../images/ricosti-violeta.jpg");
let producto7 = new Producto(7, "Labial Ricosti - Violeta", 1500, "../images/labial-mac-oscuro.jpg");
let producto8 = new Producto(8, "Labial Ricosti - Nude", 1500, "../images/labial-mac-nude.jpg");
let producto9 = new Producto(9, "Labial Ricosti - Rojo", 1500, "../images/labial-mac-rojo.png");

let arrayProds = new Array();

arrayProds.push(producto1);
arrayProds.push(producto2);
arrayProds.push(producto3);
arrayProds.push(producto4);
arrayProds.push(producto5);
arrayProds.push(producto6);
arrayProds.push(producto7);
arrayProds.push(producto8);
arrayProds.push(producto9);


$(document).ready(() => {
    for (let i = 0 ; i < arrayProds.length ; i++){
        let objeto_producto = arrayProds[i];
        $("#contProductos").append(

            `<div style="padding:1em;" id="div${objeto_producto.getDescripcion()}">
                <image class="productos__img" src = ${objeto_producto.getSrcImage()}> </image>
                <p>${objeto_producto.getDescripcion()} - $${objeto_producto.getPrecio()} </p>
                <button id= "btn${objeto_producto.getId()}">Agregar al carrito</button>
            </div>            
            `
        );

        $(`#btn${objeto_producto.getId()}`).on('click',function () {

            alert(`Agregaste: ${objeto_producto.getDescripcion()}`);
         /*    $(`#div${objeto_pokemon.getId()}`).fadeOut(1000); */

        })
    }

});