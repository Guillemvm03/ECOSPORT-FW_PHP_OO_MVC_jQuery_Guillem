// ------------------- LOGIN ------------------------ //

    function login() {
   
        if (validate_login() != 0) {
            
            var redirect_like = localStorage.getItem('redirect_like');
            var data = $('#login__form').serialize();

            ajaxPromise(friendlyURL("?module=login&op=login"), 'POST', 'JSON', data)
                .then(function(result) {
                    console.log(result);
                    if (result == "error_user") {
                        document.getElementById('error_username_log').innerHTML = "El usario no existe,asegurase de que lo a escrito correctamente"
                    } else if (result == "error_passwd") {
                        document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                    
                    } else if (result == "activate_error") {

                        toastr.warning("Revisa tu email y verifica la cuenta");

                    } else if (result == "error") {

                        toastr.warning("Error ");
                    }else if (redirect_like){
                        localStorage.setItem("token", result);
                        toastr.success("Loged succesfully");
                        setTimeout('  window.location.href = friendlyURL("?module=shop"); ', 1000);
                    }else {
                        localStorage.setItem("token", result);
                        toastr.success("Loged succesfully");
    
                            setTimeout(' window.location.href = friendlyURL("?module=home") ', 1000);
                            
                          
                    }

                    
                }).catch(function(textStatus) {
                    if (console && console.log) {
                        console.log("La solicitud ha fallado: " + textStatus);
                    }
                });
        }
    }

    function key_login() {
        $("#login").keypress(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                e.preventDefault();
                login();
            }
        });
    }
    
    function buttons() {

        $(".forget_html").hide();

        $('#login').on('click', function(e) {
            e.preventDefault();
            login();
        });


        $('#linkrecover').on('click', function(e) {
            e.preventDefault();
            load_form_recover_password();
        }); 

    }
    
    function validate_login() {
        var error = false;
    
        if (document.getElementById('username_log').value.length === 0) {
            document.getElementById('error_username_log').innerHTML = "Tienes que escribir el usuario";
            error = true;
        } else {
            if (document.getElementById('username_log').value.length < 5) {
                document.getElementById('error_username_log').innerHTML = "El usuario tiene que tener 5 caracteres como minimo";
                error = true;
            } else {
                document.getElementById('error_username_log').innerHTML = "";
            }
        }
    
        if (document.getElementById('passwd_log').value.length === 0) {
            document.getElementById('error_passwd_log').innerHTML = "Tienes que escribir la contraseña";
            error = true;
        } else {
            document.getElementById('error_passwd_log').innerHTML = "";
        }
    
        if (error == true) {
            return 0;
        }
    }
    
    
    function clicks() {
    

        $('.div_search').hide();

        $(document).on("click", '#linkregister', function() {
      
            setTimeout(function() {
                // window.location.href = "?module=login&op=view_register";
              window.location.href = friendlyURL("?module=login&op=view_register");
          }, 300);
            
          });



          $(document).on("click", '#linkbacklogin', function() {
      
            setTimeout(function() {
                // window.location.href = "?module=login&op=view_register";
              window.location.href = friendlyURL("?module=login");
          }, 300);
            
          });
          

          $(document).on("click", '#linkbackloginregister', function() {
      
            setTimeout(function() {
                // window.location.href = "?module=login&op=view_register";
              window.location.href = friendlyURL("?module=login");
          }, 300);
            
          });
    
    }
// ------------------- RECOVER PASSWORD ------------------------ //

    function load_form_recover_password(){
        // console.log('hola');

        $(".login-form").hide();
        $(".forget_html").show();
        $('html, body').animate({scrollTop: $(".forget_html")});
        click_recover_password();
    }

    function click_recover_password(){
        

        // $(".forget_html").keypress(function(e) {
        //     var code = (e.keyCode ? e.keyCode : e.which);
        //     if(code==13){
        //         e.preventDefault();
        //         send_recover_password();
        //     }
        // });

        $('#button_recover_email').on('click', function(e) {
            e.preventDefault();
            send_recover_password();
          
        }); 
    }

    function validate_recover_password(){
        var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
        var error = false;

        if(document.getElementById('email_reg_recover').value.length === 0){
            document.getElementById('error_email_reg_recover').innerHTML = "Tienes que escribir un correo";
            error = true;
        }else{
            if(!mail_exp.test(document.getElementById('email_reg_recover').value)){
                document.getElementById('error_email_reg_recover').innerHTML = "El formato del mail es invalido"; 
                error = true;
            }else{
                document.getElementById('error_email_reg_recover').innerHTML = "";
            }
        }
        
        if(error == true){
            return 0;
        }
    }

    function send_recover_password(){
        if(validate_recover_password() != 0){
            var data = $('#email_recover_form').serialize();
            // console.log(data);
            $.ajax({
                url: friendlyURL('?module=login&op=send_recover_email'),
                dataType: 'json',
                type: "POST",
                data: data,
            }).done(function(data) {
                console.log(data);
                if(data == "error"){		
                    $("#error_email_reg_recover").html("The email doesn't exist");
                } else{
                    toastr.options.timeOut = 3000;
                    toastr.success("Email sended");
                    setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
                }
            }).fail(function( textStatus ) {
                console.log('Error: Recover password error');
            });    
        }
    }

    function load_form_new_password(){
       
        token_email = localStorage.getItem('token_email');
        localStorage.removeItem('token_email');
        $.ajax({
            url: friendlyURL('?module=login&op=verify_token'),
            dataType: 'json',
            type: "POST",
            data: {token_email: token_email},
        }).done(function(data) {
            // console.log(data);
            if(data == "verify"){
                console.log('verified');
                click_new_password(token_email); 
            }else {
                console.log("error");
            }
        }).fail(function( textStatus ) {
            console.log("Error: Verify token error");
        });    
    }

    function click_new_password(token_email){
    
        $(".recover_html").keypress(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                e.preventDefault();
                send_new_password(token_email);
            }
        });

        $('#recover_btton').on('click', function(e) {
            e.preventDefault();
            send_new_password(token_email);
        }); 
    }

    function validate_new_password(){

        var error = false;

        if(document.getElementById('passwd1_rec').value.length === 0){
            document.getElementById('error_passwd1_rec').innerHTML = "You have to write a password";
            error = true;
        }else{
            if(document.getElementById('passwd1_rec').value.length < 8){
                document.getElementById('error_passwd1_rec').innerHTML = "The password must be longer than 8 characters";
                error = true;
            }else{
                document.getElementById('passwd1_rec').innerHTML = "";
            }
        }

        if(document.getElementById('passwd1_rec_2').value != document.getElementById('passwd1_rec').value){
            document.getElementById('error_passwd1_rec_2').innerHTML = "Passwords don't match";
            error = true;
        }else{
            document.getElementById('error_passwd1_rec_2').innerHTML = "";
        }

        if(error == true){
            return 0;
        }
    }

    function send_new_password(token_email){
        if(validate_new_password() != 0){
            var data = {token_email: token_email, password : $('#passwd1_rec').val()};
            console.log(data);
            $.ajax({
                url: friendlyURL("?module=login&op=new_password"),
                type: "POST",
                dataType: "JSON",
                data: data,
            }).done(function(data) {
                if(data == "done"){
                    toastr.options.timeOut = 3000;
                    toastr.success('New password changed');
                    setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
                } else {
                    toastr.options.timeOut = 3000;
                    toastr.error('Error seting new password');
                }
            }).fail(function(textStatus) {
                console.log("Error: New password error");
            });    
        }
    }


// ------------------- LOAD CONTENT ------------------------ //

function load_content() {
    let path = window.location.pathname.split('/');
    // console.log(path);
    if(path[4] === 'recover'){
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[5]);
    }else if (path[4] === 'verify') {
        ajaxPromise(friendlyURL("?module=login&op=verify_email"), 'POST', 'JSON', {token_email: path[5]})
        .then(function(data) {
            // console.log(data);
            toastr.options.timeOut = 3000;
            toastr.success('Email verified');
            setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
        })
        .catch(function() {
          console.log('Error: verify email error');
        });
    }else if (path[3] === 'view') {
        // console.log('hola');
        $(".login-wrap").show();
        $(".forget_html").hide();
    }else if (path[3] === 'recover_view') {
        load_form_new_password();
        
    }
}

$(document).ready(function(){
 
    buttons();
    key_login();
    load_content();
    clicks();

  
});