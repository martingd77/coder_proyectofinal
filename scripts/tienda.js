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
                    `<div style="padding:1em; " id="div${prod.nombre}">
                        <image class="productos__img" src = ${prod.imagen}> </image>
                        <p>${prod.nombre} - $${prod.precio} </p>
                        <div class="prodButtons">
                            <button class="productButton btn btn-warning " id= "btnadd${prod.id}">Agregar</button> 
                            <button class="productButton btn btn-warning " id= "btnquitar${prod.id}">Quitar</button>
                        </div>
                    </div>`
                );
        
                $(`#btnadd${prod.id}`).on('click',function () {
               
                
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
                    localStorage.setItem("Compra Finalizada - " , compraActual);
                });

                $("#btnCerrarModal").on('click', function(){
                    debugger;

                    let modalContent = $("#modalBody");
                    let content = modalContent.text();

                     if(content.includes("Muchas gracias por su compra!")){
                        
                        $("#cantidadProductos").empty();
                        $("#cantidadProductos").css("background-color","");
                        productosAgregados = [];
                        $("#modalBody").empty();
                        cantProd = 0;
                    }                
                });

                console.log(cantactual);
                
                actualizarContadorBolsa(cantProd);
                
                })

                $(`#btnquitar${prod.id}`).on('click',function () {
                    debugger;
                    if(productosAgregados.find( x => x.id === prod.id)){
                    objIndex = productosAgregados.findIndex(x => x.id === prod.id);
                    console.log("Antes del update: ", productosAgregados[objIndex]);

                    if(productosAgregados[objIndex].cantidad > 1){
                        productosAgregados[objIndex].cantidad = productosAgregados[objIndex].cantidad - 1;
                        console.log("Despues del update: ",productosAgregados[objIndex]);
                        cantProd --;
                        actualizarContadorBolsa(cantProd);

                    } else if (productosAgregados[objIndex].cantidad ==1) {
                       
                        productosAgregados.splice(objIndex,1);
                        cantProd --;
                        actualizarContadorBolsa(cantProd);
                    }

                    if(productosAgregados.length == 0){
                        limpiarContadorBolsa();
                        cantProd = 0;
                    }
                   

                }
                
                let compraActual = JSON.stringify(productosAgregados);

                localStorage.setItem("Compra - " , compraActual);

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
                                    ${producto.descripcion} -  $${producto.precio}  &nbsp;  X ${producto.cantidad} &nbsp; 
                                    <button onclick="quitarProducto('${producto.id}','${productos}');" type="button"  style="border-radius: 10%; background-color: #d89ad2;" ><span aria-hidden="true">-</span></button>
                                    <input type="image" value="" class="but-blue" onclick="quitarProducto('${producto.id}','${productos}');" />
                                    </p>` ;                    
                        }

                        function quitarProducto(productoId, productos){
                            debugger;
                            let listaProductos = productos;
                            for (let prod of listaProductos){
                                    if(prod.id == productoId){
                                        productos.splice(prod.id);
                                    }
                                }
                                mostrarCarrito(productos);
                            
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


function actualizarContadorBolsa(contador){
    $("#cantidadProductos").empty();
    $("#cantidadProductos").css("background-color","red");
    $("#cantidadProductos").append(contador);
}


function limpiarContadorBolsa(){
    $("#cantidadProductos").empty();
    $("#cantidadProductos").css("background-color","");
}