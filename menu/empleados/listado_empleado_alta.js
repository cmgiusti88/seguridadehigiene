$(document).ready(function()
{
  'use strict';

  $('#legajo_alta').autocomplete
  ({
    autoFocus:true,
    delay:1,
    minLength:1,
    source:function(request,response)
    {
      $.ajax
      ({
        data:{legajo:request.term},
        url:'json/autocompletar/autocompletar_legajo_existente.php'
      })
      .done(function(datos){response(datos);});
    },
    focus:function(event){event.preventDefault();},
    select:function(event){event.preventDefault();}
  });

  $('#numdocumento_alta').autocomplete
  ({
    autoFocus:true,
    delay:1,
    minLength:1,
    source:function(request,response)
    {
      $.ajax
      ({
        data:{numdocumento:request.term},
        url:'json/autocompletar/autocompletar_documento_existente.php'
      })
      .done(function(datos){response(datos);});
    },
    focus:function(event){event.preventDefault();},
    select:function(event){event.preventDefault();}
  });
                  
  $.ajax
  ({
    url:'json/select/select_documento.php'
  })
  .done(function(datos)
  {
    $.each(datos,function(event,datos)
    {
      $('#id_tipodoc_alta').append($('<option>').html(datos.desctipodoc).attr('value',datos.id_tipodoc));
    });
  });

  $('#fechanac_alta').on({keydown:function(event){event.preventDefault();},'cut copy paste':function(event){event.preventDefault();}})
  .datepicker
  ({ 
    maxDate:'0D',
    altField:'#fechanac_formato_alta'
  });

  $('#fechaalta_alta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({ 
    maxDate:'0D',
    altField:'#fechaalta_formato_alta'
  });

  $.ajax
  ({
    url:'json/select/select_oficina.php'
  })
  .done(function(datos)
  {
    $.each(datos,function(event,datos)
    {
      $('#id_ccosto_alta').append($('<option>').text(datos.descripcion_ccosto).attr('value',datos.id_ccosto));
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
      $('#id_funcion_alta').append($('<option>').text(datos.descripcion_funcion).attr('value',datos.id_funcion));
    });
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_alta')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();
      if(form.checkValidity())
      {
        $("#ventana_formulario_alta").modal('hide');
        $('#ventana_confirmacion-modal-body').html('Se creara un nuevo registro');
        $('#ventana_confirmacion').modal('show').on('shown.bs.modal',function()
        {
          $('#ventana_confirmacion-boton-no').click(function()
          {
            $('#ventana_formulario_alta').modal('show');
          });

          $('#ventana_confirmacion-boton-si').off().click(function()
          {
            $("#ventana_confirmacion").modal('hide');

            $.ajax
            ({
              data:$('#formulario_alta').serialize(),
              url:'menu/empleados/listado_empleado_alta.php',
              type:'post',
              dataType:'text',
              beforeSend:function(){$('#ventana_cargando').modal('show');}
            })
            .always(function(){$('#ventana_cargando').modal('hide');}) 
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