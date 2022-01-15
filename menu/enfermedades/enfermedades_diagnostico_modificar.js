$(document).ready(function()
{
  'use strict';

  $.ajax
  ({
    url:'json/select/select_causa.php'
  })
  .done(function(datos)
  {
    $('#id_causa option').remove();
    $('#id_causa').focus().append($('<option selected disabled value="">').text('Seleccionar una causa'));
    $.each(datos,function(event,datos)
    {
      $('#id_causa').append($('<option>').text(datos.descripcion_causa).attr('value',datos.id_causa));
    });
  });

  $('#id_diagnostico').append($('<option selected disabled value="">').text('Primero seleccionar una causa'));

  $('#id_causa').change(function()
  {
    $.ajax
    ({
      data:{id_causa:$(this).val()},
      url:'json/select/select_causa_diagnostico.php'
    })
    .done(function(datos)
    {
      $('#id_diagnostico option').remove();
      $('#id_diagnostico').append($('<option selected disabled value="">').text('Seleccionar un diagnostico'));

      $.each(datos,function(event,datos)
      {
        $('#id_diagnostico').append($('<option>').text(datos.descripcion_diagnostico).attr('value',datos.id_diagnostico));
      });
    });
  });

  $('#id_diagnostico').change(function()
  {
    $('#descripcion_diagnostico').focus();
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_modificar')).forEach(function(form)
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
            $('#formulario_modificar :input').prop('disabled',true);
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
            $('#ventana_exito-modal-body').html('<h4><i class="bi bi-check-circle"></i> Se modifico el registro</h4>');
            $('#ventana_exito').modal('show');
            setTimeout(function()
            {
              $('#ventana_exito').modal('hide');
              $("#formulario_modificar").removeClass('was-validated')[0].reset(); 
              $('#formulario_modificar :input').prop('disabled',false);
              $('#id_causa').focus();
            },2500);
            }
         });
       }
       form.classList.add('was-validated');
    },false);
  });
});