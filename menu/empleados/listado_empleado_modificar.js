$(document).ready(function()
{
  'use strict';

  $('#legajo_modificar').val(sessionStorage.legajo_modificar);
  $('#apellido_nombres_modificar').val(sessionStorage.apellido_nombres_modificar);
  $('#id_ccosto_anterior').val(sessionStorage.id_ccosto_modificar);
  $('#id_funcion_anterior').val(sessionStorage.id_funcion_modificar);
 
  $.ajax
  ({
    url:'json/select/select_oficina.php'
  })
  .done(function(datos)
  {
    $.each(datos,function(event,datos)
    {
      if($('#id_ccosto_anterior').val() === datos.id_ccosto)
      {
        $('#id_ccosto_modificar').append($('<option selected>').text(datos.descripcion_ccosto).attr('value',datos.id_ccosto));
      }
      else
      {
        $('#id_ccosto_modificar').append($('<option>').text(datos.descripcion_ccosto).attr('value',datos.id_ccosto));
      }
    });
  });

  $.ajax
  ({
    url:'json/select/select_funcion.php'
  })
  .done(function(datos)
  {
    $.each(datos,function(event,datos)
    {
      if($('#id_funcion_anterior').val() === datos.id_funcion)
      {
        $('#id_funcion_modificar').append($('<option selected>').text(datos.descripcion_funcion).attr('value',datos.id_funcion));
      }
      else
      {
        $('#id_funcion_modificar').append($('<option>').text(datos.descripcion_funcion).attr('value',datos.id_funcion));
      }
    });
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_modificar')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();
      if(form.checkValidity())
      {
        $('#ventana_formulario_modificar').modal('hide');
        $('#ventana_confirmacion-modal-body').html('Se modificara el registro');
        $('#ventana_confirmacion').modal('show').on('shown.bs.modal',function()
        {
          $('#ventana_confirmacion-boton-no').click(function()
          {
            $('#ventana_formulario_modificar').modal('show');
          });

          $('#ventana_confirmacion-boton-si').off().click(function()
          {
            $("#ventana_confirmacion").modal('hide');

            $.ajax
            ({
              data:$('#formulario_modificar').serialize(),
              url:'menu/empleados/listado_empleado_modificar.php',
              type:'post',
              dataType:'text',
              beforeSend:function(){$('#ventana_cargando').modal('show');}
            })
            .always(function(){$("#ventana_cargando").modal('hide');}) 
            .done(function(datos) 
            {
              if(datos !== 'GRABAR')
              {
                $('#ventana_error-modal-body').html(datos);  
                $('#ventana_error').modal('show');
              }
              else
              {
                $('#ventana_exito-modal-body').html('<h4><i class="bi bi-check-circle"></i> Se modifico el registro</h4>');
                $('#ventana_exito').modal('show');
                setTimeout(function()
                {
                  $('#ventana_exito').modal('hide');
                  $('#tabla').DataTable().ajax.reload(); 			
                },2500);
              }
            });
          });
        });
      }
      form.classList.add('was-validated');
    },false);
  });


});