$(document).ready(function()
{
  'use strict';

  $('#legajo_eliminar').val(sessionStorage.legajo_eliminar);

  $('#fecha_baja_eliminar').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({
    maxDate:'0D',
    altField:'#fecha_baja_formato_eliminar'
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_eliminar')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();
      if(form.checkValidity())
      {
        $('#ventana_formulario_eliminar').modal('hide');
        $('#ventana_confirmacion-modal-body').html('Dar de baja');
        $('#ventana_confirmacion').modal('show').on('shown.bs.modal',function()
        {
          $('#ventana_confirmacion-boton-no').click(function()
          {
            $('#ventana_formulario_eliminar').modal('show');
          });

          $('#ventana_confirmacion-boton-si').off().click(function()
          {
            $('#ventana_confirmacion').modal('hide');

            $.ajax
            ({
              data:$('#formulario_eliminar').serialize(),
              url:'menu/empleados/listado_empleado_eliminar.php',
              type:'post',
              dataType:'text',
              beforeSend:function(){$('#ventana_cargando').modal('hide');}
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
                $('#ventana_exito-modal-body').html('<h4><i class="bi bi-check-circle"></i> Se dio de baja al empleado</h4>');
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