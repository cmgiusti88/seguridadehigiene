$(document).ready(function()
{
  'use strict';

  $('#formulario_buscar').focusin(function()
  {
    $('#mostrar_tabla').prop('hidden',true);
  });

  $('#fecha_desde').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({
    altField:'#fecha_desde_formato',
    onSelect:function(selectedDate)
    {
      setTimeout(function(){$('#fecha_hasta').datepicker('option','minDate',selectedDate).attr('placeholder','DD/MM/YYYY').prop('disabled',false).focus();},10);
    }
  });

  $('#fecha_hasta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({ 
    altField:'#fecha_hasta_formato',
    onSelect:function()
    {
      $('#legajo').focus();
    }
  });
 
  $('#legajo').autocomplete
  ({
    autoFocus:true,
    delay:1,
    minLength:2,
    source:function(request,response)
    {
      $.ajax
      ({     
        data:{legajo:request.term},
        url:'json/autocompletar/autocompletar_legajo.php'
      })
      .done(function(datos)
      {
        response(datos);
      });
    },
    focus:function(event){event.preventDefault();},
    select:function(event,datos)
    {
      event.preventDefault();

      $(this).blur();

      if(datos.item.estado !== 'exito')
      {
        $('#ventana_error1-modal-body').html('<h5><i class="bi bi-exclamation-octagon"></i> <strong>'+datos.item.label+'</strong></h5>');
        $('#ventana_error1').modal('show');
        setTimeout(function()
        {
          $('#ventana_error1').modal('hide');
          $('#legajo').focus();			
        },3000);
      }
      else
      {
        $(this).val($.trim(datos.item.label.split("-",1)));
        $('#boton_buscar').click();
      }
    }
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_buscar')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();
      if(form.checkValidity())
      {
        $('#mostrar_tabla').prop('hidden',false);
        $('#mensaje_tutorial').prop('hidden',true);
        $('#legajo').blur();

        $('#tabla').DataTable
        ({
          destroy:true,
          dom:'ltip',
          select:false,
          ajax:
          {
            url:'json/tabla/tabla_novedad.php',
            data:function(datos)
            {
              datos.fecha_desde = $('#fecha_desde_formato').val();
              datos.fecha_hasta = $('#fecha_hasta_formato').val();
              datos.legajo = $('#legajo').val();
            }
          },
          order:[[8,'asc']],
          columns:
          [
            {data:0},
            {data:1},
            {data:2},
            {data:3},
            {data:4},
            {data:5},
            {data:6},
            {data:7},
            {data:8},
            {data:9},
            {data:10},
            {data:11},
            {data:12},
            {data:13},
            {data:14},
            {data:15},
            {
              data:null,
              render:function(data)
              {
                var diferencia_dias = data[20] - data[19] ;
                var cantidad_dias = Math.ceil((((diferencia_dias/60)/60)/24+1));
                return cantidad_dias;
              }
            },
            {data:16},
            {data:17},
            {data:18}
          ],
          columnDefs:
          [
            {visible:false,searchable:false,targets:[0,1,2,3,4,5,6,7,9,11,12,14]}        
          ]
        });
      }
      form.classList.add('was-validated');
    },false);
  });
});