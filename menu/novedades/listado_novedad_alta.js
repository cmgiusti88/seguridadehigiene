$(document).ready(function()
{
  'use strict';
 
  $('#id_ccosto_alta').val(sessionStorage.id_ccosto_alta);
  $('#id_funcion_alta').val(sessionStorage.id_funcion_alta);
  $('#legajo_alta').val(sessionStorage.legajo_alta);

  $('#fecha_novedad_alta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({
    maxDate:'0D',
    altField:'#fecha_novedad_formato_alta'
  });

  $.ajax
  ({
    url:'json/select/select_causa.php'
  })
  .done(function(datos)
  {
    $.each(datos,function(event,datos)
    {
      $('#id_causa_alta').append($('<option>').text(datos.descripcion_causa).attr('value',datos.id_causa));
    });
  });

  $('#id_causa_alta').change(function()
  {
    $.ajax
    ({
      data:{id_causa:$(this).val()},
      url:'json/select/select_causa_diagnostico.php'
    })
    .done(function(datos)
    {
      $('#id_diagnostico_alta option').remove();
      $('#id_diagnostico_alta').append($('<option selected disabled value="">').text('Seleccionar un diagnostico'));
      $.each(datos,function(event,datos)
      {
        $('#id_diagnostico_alta').append($('<option>').text(datos.descripcion_diagnostico).attr('value',datos.id_diagnostico));
      });
    });
  });

  $('#fecha_desde_alta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({ 
    maxDate:'0D',
    altField:'#fecha_desde_formato_alta',
    onSelect:function(selectedDate)
    {
      setTimeout(function(){$('#fecha_hasta_alta').datepicker('option','minDate',selectedDate).attr('placeholder','DD/MM/YYYY').prop('disabled',false).focus();},10);
    }
  });

  $('#fecha_hasta_alta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({
    altField:'#fecha_hasta_formato_alta'
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_alta')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();
      if(form.checkValidity())
      {
        $('#ventana_formulario_alta').modal('hide');
        $('#ventana_confirmacion-modal-body').html("Se creara un nuevo registro");
        $('#ventana_confirmacion').modal('show').on('shown.bs.modal',function()
        {
          $('#ventana_confirmacion-boton-no').click(function()
          {
            $('#ventana_formulario_alta').modal('show');
          });

          $('#ventana_confirmacion-boton-si').off().click(function()
          {
            $('#ventana_confirmacion').modal('hide');

            $.ajax
            ({
              data:$('#formulario_alta').serialize(),
              url:'menu/novedades/listado_novedad_alta.php',
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
                $('#ventana_exito-modal-body').html('<h4><i class="bi bi-check-circle"></i> Se creo un nuevo registro</h4>');
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