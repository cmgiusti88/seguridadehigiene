$(document).ready(function()
{
  'use strict';

  $('#descripcion_causa').focus();

  Array.prototype.slice.call(document.querySelectorAll('#formulario_alta')).forEach(function(form)
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
          dataType:'text',
          beforeSend:function()
          {
            $('#formulario_alta :input').prop('disabled',true);
            $('#icono_boton_aceptar').removeClass('bi bi-check').addClass('spinner-border spinner-border-sm');
          }
        })
        .always(function()
        {
          $('#icono_boton_aceptar').removeClass('spinner-border spinner-border-sm').addClass('bi bi-check');
        })
        .done(function(datos)
        {
          if(datos !== 'GRABAR')
          {
            $('#ventana_error').modal('show');
            $('#ventana_error-modal-body').html('Ocurrio un error al guardar los datos. ' + datos);  
          }
          else
          {
            $('#ventana_exito-modal-body').html('<h4><i class="bi bi-check-circle"></i> Se creo un nuevo registro</h4>');
            $('#ventana_exito').modal('show');
            setTimeout(function()
            {
              $('#ventana_exito').modal('hide');
              $("#formulario_alta").removeClass('was-validated')[0].reset();
              $('#formulario_alta :input').prop('disabled',false);
              $('#descripcion_causa').focus();
            },2500);
          }
        });
       }
       form.classList.add('was-validated');
    },false);
  });
});