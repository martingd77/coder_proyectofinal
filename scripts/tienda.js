const URLJSON = "/data/productos.json";

$(document).ready(() => {
    let cantProd = 0;
    let productosAgregados = new Array();

    $.getJSON(URLJSON, function (respuesta, estado){
        
        console.log(estado);
          if(estado === "success"){
            
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
                cantProd ++;
                let cantactual = $("#cantidadProductos").text();
                
                let compraActual = JSON.stringify(productosAgregados);

                localStorage.setItem("Compra - " , compraActual);

                $("#bolsaCompras").on('click', function(){
                    $("#modalBody").empty();
                    $("#modalBody").append(
                        `<p> ${mostrarCarrito(productosAgregados)}</p>`
                       
                    );                   
                });

                $("#btnFinalizarCompra").on('click', function(){
 
                    $("#modalBody").empty();
                    $("#modalBody").append(

                        `<div class="container-fluid">
                            <h3 style="text-align: center;"> Muchas gracias por su compra!</h3>
                            <p> ${mostrarCarrito(productosAgregados)}</p>
                            <h4 style="color:#b771f8; text-align: right;"> Total a pagar: $ ${calcularTotal(productosAgregados)}</h4>
                        </div>
                        `
                       
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
    for(let producto of productos){
        carrito = carrito + `   <p>
                                    <img class="imgLogo" src= ${producto.imagen} />   
                                    ${producto.descripcion} -  $${producto.precio}  &nbsp;  X ${producto.cantidad} 
                                </p>` ;                    
    }
    return carrito;
}


function calcularTotal(productos){
    let total = 0;
    for(let producto of productos){
        
        total = total + producto.precio * producto.cantidad;
                  
    }
    
    return total;
}