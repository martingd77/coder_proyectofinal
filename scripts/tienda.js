/* let producto1 = new Producto(1, "Labial Mac - Coral", 1500, "../images/labial-mac-oscuro.jpg");
let producto2 = new Producto(2, "Labial Mac - Rojo", 1500, "../images/labial-mac-rojo.png");
let producto3 = new Producto(3, "Labial Mac - Nude", 1500, "../images/labial-mac-nude.jpg");
let producto4 = new Producto(4, "Labial Ricosti - Beijo Doce", 1500, "../images/ricosti-rosa.png");
let producto5 = new Producto(5, "Labial Ricosti - Bem me quer", 1500, "../images/labial-mac-nude.jpg");
let producto6 = new Producto(6, "Labial Ricosti - Violeta matte", 1500, "../images/ricosti-violeta.jpg");
let producto7 = new Producto(7, "Labial Ricosti - Violeta", 1500, "../images/labial-mac-oscuro.jpg");
let producto8 = new Producto(8, "Labial Ricosti - Nude", 1500, "../images/labial-mac-nude.jpg");
let producto9 = new Producto(9, "Labial Ricosti - Rojo", 1500, "../images/labial-mac-rojo.png");

arrayProds.push(producto1);
arrayProds.push(producto2);
arrayProds.push(producto3);
arrayProds.push(producto4);
arrayProds.push(producto5);
arrayProds.push(producto6);
arrayProds.push(producto7);
arrayProds.push(producto8);
arrayProds.push(producto9); */


const URLJSON = "productos.json";

/* let arrayProds = new Array(); */

$(document).ready(() => {
    let cantProd = 0;
  
    $.getJSON(URLJSON, function (respuesta, estado){
        debugger;
        console.log(estado);
          if(estado === "success"){
            debugger;
            let productos = respuesta;
            for (const prod of productos) {
                $("#contProductos").append(

                    `<div style="padding:1.2em;" id="div${prod.nombre}">
                        <image class="productos__img" src = ${prod.imagen}> </image>
                        <p>${prod.nombre} - $${prod.precio} </p>
                        <button class="productButton btn btn-warning btn-sm" id= "btn${prod.id}">Agregar a la bolsa</button>
                    </div>            
                    `
                );
        
                $(`#btn${prod.id}`).on('click',function () {
        
                //alert(`Agregaste: ${objeto_producto.getDescripcion()}`);
                cantProd ++;
                let cantactual = $("#cantidadProductos").text();
                
                console.log(cantactual);
        
                $("#cantidadProductos").empty();
                $("#cantidadProductos").css("background-color","red");
                $("#cantidadProductos").append(cantProd);
        
                })
            }  
          }else{
            console.log(estado);
          }
    });

  
/*     for (let i = 0 ; i < arrayProds.length ; i++){
        let objeto_producto = arrayProds[i];
        $("#contProductos").append(

            `<div style="padding:1.2em;" id="div${objeto_producto.getDescripcion()}">
                <image class="productos__img" src = ${objeto_producto.getSrcImage()}> </image>
                <p>${objeto_producto.getDescripcion()} - $${objeto_producto.getPrecio()} </p>
                <button class="productButton btn btn-warning btn-sm" id= "btn${objeto_producto.getId()}">Agregar a la bolsa</button>
            </div>            
            `
        );

        $(`#btn${objeto_producto.getId()}`).on('click',function () {

        //alert(`Agregaste: ${objeto_producto.getDescripcion()}`);
        cantProd ++;
        let cantactual = $("#cantidadProductos").text();
        
        console.log(cantactual);

        $("#cantidadProductos").empty();
        $("#cantidadProductos").css("background-color","red");
        $("#cantidadProductos").append(cantProd);

        })
    } */

});
