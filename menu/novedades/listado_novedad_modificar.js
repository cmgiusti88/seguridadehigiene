$(document).ready(function()
{
  'use strict';

  $('#id_codigo_novedad_modificar').val(sessionStorage.id_codigo_novedad_modificar);
  $('#legajo_modificar').val(sessionStorage.legajo_modificar);
  $('#id_ccosto_actual_modificar').val(sessionStorage.id_ccosto_actual_modificar);
  $('#descripcion_ccosto_modificar').val(sessionStorage.descripcion_ccosto_modificar);
  $('#id_funcion_actual_modificar').val(sessionStorage.id_funcion_actual_modificar);
  $('#descripcion_funcion_modificar').val(sessionStorage.descripcion_funcion_modificar);
  $('#fecha_desde_modificar').val(sessionStorage.fecha_desde_modificar);
  $('#fecha_desde_formato_modificar').val(sessionStorage.fecha_desde_formato_modificar);
  $('#fecha_hasta_modificar').val(sessionStorage.fecha_hasta_modificar);
  $('#fecha_hasta_formato_modificar').val(sessionStorage.fecha_hasta_formato_modificar);
  $('#id_causa_anterior').val(sessionStorage.id_cod_causa_modificar);
  $('#id_diagnostico_anterior').val(sessionStorage.id_cod_diagnostico_modificar);
  $('#fecha_novedad_modificar').val(sessionStorage.fecha_novedad_modificar);
  $('#medico_o_domicilio_modificar').val(sessionStorage.medico_o_domicilio_modificar);
  $('#articulo_modificar').val(sessionStorage.articulo_modificar);
 
  if($('#medico_o_domicilio_modificar').val() === 'SM')
  {
    $('input[name=eligir_sm_o_sd_modificar][value="SM"]').prop('checked',true);
  }
  else
  {
    $('input[name=eligir_sm_o_sd_modificar][value="SD"]').prop('checked',true);
  }

  if($('#articulo_modificar').val() === 'SI')
  {
    $('input[name=eligir_articulo_modificar][value="SI"]').prop('checked',true);
  }
  else
  {
    $('input[name=eligir_articulo_modificar][value="NO"]').prop('checked',true);
  }
 
  $.ajax
  ({
    url:'json/select/select_causa.php'
  })
  .done(function(datos)
  {
    $('#id_causa_modificar option').remove();
    $('#id_causa_modificar').append($('<option selected disabled value="">').text('Seleccionar una causa'));
    $.each(datos,function(event,datos)
    {
      if($('#id_causa_anterior').val() === datos.id_causa)
      {
        $('#id_causa_modificar').append($('<option selected>').text(datos.descripcion_causa).attr('value',datos.id_causa));
      }
      else
      {
        $('#id_causa_modificar').append($('<option>').text(datos.descripcion_causa).attr('value',datos.id_causa));
      }
    });
  });

  $.ajax
  ({
    data:{id_causa:$('#id_causa_anterior').val()},
    url:'json/select/select_causa_diagnostico.php'
  })
  .done(function(datos)
  {
    $('#id_diagnostico_modificar option').remove();
    $('#id_diagnostico_modificar').append($('<option selected disabled value="">').text('Seleccionar un diagnostico'));

    $.each(datos,function(event,datos)
    {
      if($('#id_diagnostico_anterior').val() === datos.id_diagnostico)
      {
        $('#id_diagnostico_modificar').append($('<option selected value="">').text(datos.descripcion_diagnostico).attr('value',datos.id_diagnostico));
      }
      else
      {
        $('#id_diagnostico_modificar').append($('<option>').text(datos.descripcion_diagnostico).attr('value',datos.id_diagnostico));
      }
    });
  });

  $('#id_causa_modificar').change(function()
  {
    $.ajax
    ({
      data:{id_causa:$(this).val()},
      url:'json/select/select_causa_diagnostico.php'
    })
    .done(function(datos)
    {
      $('#id_diagnostico_modificar option').remove();
      $('#id_diagnostico_modificar').append($('<option disabled selected value="">').text('Seleccionar un diagnostico'));

      $.each(datos,function(event,datos)
      {
        $('#id_diagnostico_modificar').append($('<option>').text(datos.descripcion_diagnostico).attr('value',datos.id_diagnostico));
      });
    });
  });
 
  $('#fecha_desde_modificar').on({keydown:function(event){event.preventDefault();},'cut copy paste':function(event){event.preventDefault();}})
  .datepicker
  ({
    altField:'#fecha_desde_formato_modificar',
    onSelect:function(selectedDate)
    {
      setTimeout(function(){$('#fecha_hasta_modificar').datepicker('option','minDate',selectedDate).attr('placeholder','').prop('disabled',false).focus();},10);
    }
  });

  $('#fecha_hasta_modificar').on({keydown:function(event){event.preventDefault();},'cut copy paste':function(event){event.preventDefault();}})
  .datepicker
  ({
    altField:'#fecha_hasta_formato_modificar'
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
        $('#ventana_confirmacion-modal-body').html("Se modificara el registro");
        $('#ventana_confirmacion').removeData().modal('show').on('shown.bs.modal',function()
        {     
          $('#ventana_confirmacion-boton-no').click(function()
          {
            $('#ventana_formulario_modificar').modal('show');
          });

          $('#ventana_confirmacion-boton-si').off().click(function()
          {
            $('#ventana_confirmacion').modal('hide');

            $.ajax
            ({
              data:$('#formulario_modificar').serialize(),
              url:'menu/novedades/listado_novedad_modificar.php',
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
                  $('#tabla1').DataTable().ajax.reload();
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