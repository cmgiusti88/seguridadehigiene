$(document).ready(function()
{
  'use strict';

  $('#id_codigo_novedad_eliminar').val(sessionStorage.id_codigo_novedad_eliminar);

  $('#boton_eliminar').click(function()
  {
    $('#ventana_formulario_eliminar').modal('hide');

    $.ajax
    ({
      data:$('#formulario_eliminar').serialize(),
      url:'menu/novedades/listado_novedad_eliminar.php',
      type:'post',
      dataType:'text',
      beforeSend:function(){$('#ventana_cargando').modal('show');}
    })
    .always(function(){$('#ventana_cargando').modal('hide');})
    .done(function(datos) 
    {
      if(datos !== 'GRABAR')
      {
        $('#ventana_error-modal-body').html('Ocurrio un error al guardar los datos. ' + datos);  
        $('#ventana_error').modal('show');
      }
      else
      {
        $('#ventana_exito-modal-body').html('<h4><i class="bi bi-check-circle"></i> Se elimino el registro</h4>');
        $('#ventana_exito').modal('show');
        setTimeout(function()
        {
          $('#ventana_exito').modal('hide');
          $('#tabla1').DataTable().ajax.reload(); 			
        },2500); 			
      }
    });
  });
});