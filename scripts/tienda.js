const URLJSON = "/data/productos.json";

$(document).ready(() => {
    let cantProd = 0;
    let productosAgregados = new Array();

    $.getJSON(URLJSON, function (respuesta, estado){
        /* debugger; */
        console.log(estado);
          if(estado === "success"){
            /* debugger; */
            let productos = respuesta;
            for (const prod of productos) {
                $("#contProductos").append(
                    `<div style="padding:1.2em;" id="div${prod.nombre}">
                        <image class="productos__img" src = ${prod.imagen}> </image>
                        <p>${prod.nombre} - $${prod.precio} </p>
                        <button class="productButton btn btn-warning btn-sm" id= "btn${prod.id}">Agregar a la bolsa</button>
                    </div>`
                );
        
                $(`#btn${prod.id}`).on('click',function () {
                debugger;
                

                if(productosAgregados.find( x => x.id === prod.id))
                {
                    objIndex = productosAgregados.findIndex(x => x.id === prod.id);
                    console.log("Antes del update: ", productosAgregados[objIndex]);
                    productosAgregados[objIndex].cantidad = productosAgregados[objIndex].cantidad + 1;
                    console.log("Despues del update: ",productosAgregados[objIndex]);
                    
                }
                else{
                    let productoAgregado = new Producto(prod.id, prod.nombre, prod.precio, prod.imagen);
                    productoAgregado.agregarAlCarrito();
                    productosAgregados.push(productoAgregado);
                }
                
                console.log(productosAgregados);
                //alert(`Agregaste: ${objeto_producto.getDescripcion()}`);
                cantProd ++;
                let cantactual = $("#cantidadProductos").text();
                
                $("#bolsaCompras").on('click', function(){
                    debugger; 
                    $("#modalBody").empty();
                    $("#modalBody").append(
                        `<p> ${mostrarCarrito(productosAgregados)}</p>`
                       
                    );                   
                });

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

});


function mostrarCarrito(productos){
    let carrito = "";
    debugger;
    for(let producto of productos){
        carrito = carrito + `<p>   ${producto.descripcion} -  $${producto.precio}  &nbsp;  X ${producto.cantidad} </p>`;                    
    }
    return carrito;
}