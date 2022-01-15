$(document).ready(function()
{
  'use strict';

  var bloqueado = sessionStorage.url;
  sessionStorage.clear();
  $.ajax({url:'header.html'}).done(function(datos){$('header').html(datos);});
  $.ajax({url:'footer.html'}).done(function(datos){$('footer').html(datos);});
  $.ajax({url:'ventanas_boostrap.html'}).done(function(datos){$('#ventanas_boostrap').html(datos);if(bloqueado === 'acceso_bloqueado'){$('#ventana_error1-modal-body').html('<h4><i class="bi bi-exclamation-octagon"></i> Necesita ingresar con su usuario</h4>');$('#ventana_error1').modal('show');setTimeout(function(){$('#ventana_error1').modal('hide');},3000);}});

  $('#formulario_acceso').keydown(function()
  {
    $('#mensaje_error').empty().removeClass('alert alert-danger');
  });
 
  Array.prototype.slice.call(document.querySelectorAll('#formulario_acceso')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();
      if(form.checkValidity())
      {  
        $.ajax
        ({
          data:$(this).serialize(),
          url:$(this).attr('action'),
          type:'post',
          beforeSend:function()
          {
            $('#formulario_acceso :input').prop('disabled',true);
            $('#icono_boton_ingresar').removeClass('bi bi-arrow-right-square').addClass('spinner-border');
          }
        })
        .always(function()
        {
          $('#icono_boton_ingresar').removeClass('spinner-border').addClass('bi bi-arrow-right-square');
          $('#formulario_acceso :input').prop('disabled',false);
        })
        .done(function(datos)
        {
          if(datos.estado === 'error' || datos.estado === 'error1')
          {
            $('#mensaje_error').html('<i class="bi bi-exclamation-octagon"></i> '+datos.motivo).addClass('alert alert-danger');
            if(datos.estado === 'error')
            {
              $('#usuario').focus();
            }
            else
            {
              $('#contrasena').focus();
            }
          }
          else
          {
            sessionStorage.usuario_ingresar = datos.usuario_ingresar;
            sessionStorage.nombre_usuario_ingresar = datos.nombre_usuario_ingresar;
            sessionStorage.url = '';
            window.location.replace('menu.html');
          }
        });
      }
      form.classList.add('was-validated');
    },false);
  });
  /****PARA MOSTRAR ERROR A TODOS LOS AJAX****/
  $.ajaxSetup
  ({
    timeout:15000,
    error:function(jqXHR,textStatus,errorThrown)
    {
      if(jqXHR.status === 0)
      { 
        $('#ventana_error-modal-body').html('El servidor esta caido');
        $('#ventana_error').modal('show').css('z-index','999999');
        setTimeout(function()
        {
          if(localStorage.id !== undefined){localStorage.clear();}
          else{sessionStorage.clear();}
          window.location.replace('index.html');
        },5000);
      }
      else if(jqXHR.status === 404){alert('Página solicitada no encontrada [404]');}
      else if(jqXHR.status === 500){alert('Error de servidor interno [500]');}
      else if(textStatus === 'parsererror'){alert('Error al analizar JSON solicitado');}
      else if(textStatus === 'timeout'){alert('Error de tiempo de espera');}
      else if(textStatus === 'abort'){alert('Petición de Ajax cancelada');}
      else{alert('Error sin capturar: \n' + errorThrown);}
    }
  });
});