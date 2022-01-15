$(document).ready(function()
{
  'use strict';

  $('#formulario_buscar').focusin(function()
  {
    $('#mostrar_tabla').prop('hidden',true);
  });
 
  $.ajax
  ({
    url:'json/select/select_oficina.php'
  })
  .done(function(datos)
  {
    $.each(datos,function(event,datos)
    {
      $('#id_ccosto').append($('<option>').text(datos.descripcion_ccosto).attr('value',datos.id_ccosto));
    });
  });

  $('#fecha_desde').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({ 
    altField:'#fecha_desde_formato',
    onSelect:function(selectedDate)
    {
      setTimeout(function(){$('#fecha_hasta').datepicker('option','minDate',selectedDate).attr('placeholder','').prop('disabled',false).focus();},10);
    }
  });

  $('#fecha_hasta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({ 
    altField:'#fecha_hasta_formato',
    onSelect:function()
    {
      $('#id_ccosto').focus();
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
              datos.id_ccosto = $('#id_ccosto').val();
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