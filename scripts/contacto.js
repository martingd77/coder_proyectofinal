$("#emailInput").focusout(function(){
    if(!validateEmail(this.value)){
      $("#emailInput").css('border-color', 'red');
    }
    else
    {
      $("#emailInput").css('border-color', 'green');
    }
});

$("#apellidoInput").focusout(function(){
    if(!validateOnlyLetters(this.value)){
        $("#apellidoInput").css('border-color', 'red');
    }
    else{
        $("#apellidoInput").css('border-color', 'green');
    }
});

$("#nombreInput").focusout(function(){
    if(!validateOnlyLetters(this.value)){
        $("#nombreInput").css('border-color', 'red');
    }
    else{
        $("#nombreInput").css('border-color', 'green');
    }
});

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const validateOnlyLetters = (campo) => {
    return String(campo)
    .match(/^[a-zA-Z]+$/);
};

debugger;
let formContacto = document.getElementById("formContacto"); 
formContacto.addEventListener("submit", enviarFormulario);

function validarFormulario(e){

    let nombre = document.forms["formContacto"]["nombreInput"].value;
    let apellido = document.forms["formContacto"]["apellidoInput"].value;
    let email = document.forms["formContacto"]["emailInput"].value;
   
    if (!validateOnlyLetters(nombre)) {
        $("#errorNombreInput").append(`<p> Es necesario ingresar el nombre  </p>`);
        return false;
    }

    if (!validateOnlyLetters(apellido)) {
        $("#errorApellidoInput").append(`<p> Es necesario ingresar el apellido  </p>`);
        return false;
    }

    if (!validateEmail(email)) {
        $("#errorEmailInput").append(`<p> El correo electrónico ingresado no es válido  </p>`);
        return false;
    }
    

    $("#errorNombreInput").empty();
    $("#errorApellidoInput").empty();
    $("#errorEmailInput").empty();
    
    return true;

}


function enviarFormulario(e){
    e.preventDefault();
    if(validarFormulario()){
        let newsletter = $("#checkNewsletter").val();
        let nombre = $("#nombreInput").val();
        let apellido = $("#apellidoInput").val();
        let email = $("#emailInput").val();
        if(newsletter == "true"){
            $("#exampleContactModalBody").empty();
            $("#exampleContactModalBody").append(`<div class="container">
                                <p> Gracias ${nombre}  ${apellido} ! </p>
                                <p> En breve nos comunicaremos para responder tu consulta a ${email} </p>
                               
                                <p style="font-weight: bold;"> Y gracias ademas por suscribirte a nuestro newsletter</p>
                                <p> Te vamos a enviar todas las novedades y promociones disponibles una vez a la semana</p>
                            </div>`
            );
            
            $(function(){
                $("#exampleContactModal").modal("show");
            });
        }
        else{
            $("#exampleContactModalBody").empty();
            $("#exampleContactModalBody").append(`<div class="container">
                                <p> Gracias ${nombre}  ${apellido} ! </p>
                                <p> En breve nos comunicaremos para responder tu consulta a ${email} </p>
                               
                            </div>`
            );
            
            $(function(){
                $("#exampleContactModal").modal("show");
            });
        }

    }
    else{
        alert("Hubo un problema al enviar la consulta. Revisa bien todos los campos e intentalo nuevamente.")
    }
}


$("#btnCerrar").on('click', function(){
    $("#exampleContactModalBody").empty();
    $("#exampleContactModal").modal("hide");
    location.reload();
});