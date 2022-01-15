$(document).ready(function()
{
  'use strict';

  $('#legajo').focus()
  .focusin(function()
  {
    $("#formulario_buscar")[0].reset();
    $('#mostrar_tabla').prop('hidden',true);
    $('#mensaje_tutorial').prop('hidden',false);
  })
  .keypress(function()
  {
    if(event.keyCode === 13)
    {
      event.preventDefault();
    }
  })
  .autocomplete
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
      .done(function(datos){response(datos);});
    },
    focus:function(event){event.preventDefault();},
    select:function(event,datos)
    {
      event.preventDefault();

      $(this).blur();

      if(datos.item.estado !== 'exito')
      {
        $('#ventana_error1-modal-body').html('<h4><i class="bi bi-exclamation-octagon"></i> '+datos.item.label+'</h4>');
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
        $('#id_ccosto').val(datos.item.id_ccosto);
        $('#id_funcion').val(datos.item.id_funcion);
        $('#fecha_baja').val(datos.item.fecha_baja);
        $('#mensaje_tutorial').prop('hidden',true);
        $('#mostrar_tabla').prop('hidden',false);

        $('#tabla').DataTable
        ({
          destroy:true,
          dom:'',
          ajax:
          {
            url:'json/tabla/tabla_legajo.php',
            data:function(datos)
            {
              datos.legajo = $('#legajo').val();
            }
          },
          columns:
          [
            {data:1,orderable:true},
            {
              data:null,
              render:function(data)
              {
                return data[2]+' - '+data[3];
              }
            },
            {data:4},
            {data:5},
            {data:7},
            {data:9},
            {data:10},
            {data:11}
          ]
        });

        var tabla1 = $('#tabla1').DataTable
        ({
          destroy:true,
          buttons:
          [
            {
              extend:'selectedSingle',
              className:'btn-lg boton_modificar_tabla',
              text:"<i class='bi bi-pencil-square'></i>",
              titleAttr:'Modificar el registro seleccionado',
              action:function()
              {
                var data = tabla1.row(tabla1.cell('.selected',0).index().row).data(); 

                if(data[7] !== '')
                {
                  $('#ventana_error-modal-body').html(data[2]+' esta de baja');
                  $('#ventana_error').modal('show');
                }
                else
                {
                  sessionStorage.id_codigo_novedad_modificar = data[0];
                  sessionStorage.legajo_modificar = data[1];
                  sessionStorage.id_ccosto_actual_modificar = data[3];
                  sessionStorage.descripcion_ccosto_modificar = data[4];
                  sessionStorage.id_funcion_actual_modificar = data[5];
                  sessionStorage.descripcion_funcion_modificar = data[6];
                  sessionStorage.fecha_desde_modificar = data[8];
                  sessionStorage.fecha_desde_formato_modificar = data[9];
                  sessionStorage.fecha_hasta_modificar = data[10]; 
                  sessionStorage.fecha_hasta_formato_modificar = data[11];
                  sessionStorage.id_cod_causa_modificar = data[12];
                  sessionStorage.id_cod_diagnostico_modificar = data[14];
                  sessionStorage.fecha_novedad_modificar = data[16];
                  sessionStorage.medico_o_domicilio_modificar = data[17];
                  sessionStorage.articulo_modificar = data[18];

                  $.ajax
                  ({
                    url:'menu/novedades/listado_novedad_modificar.html'
                  })
                  .done(function(datos)
                  {
                    $('#mostrar_ventana').html(datos);
                    $('#ventana_formulario_modificar').modal('show');
                  });
                }
              }
            },
            {
              extend:'selectedSingle',
              className:'btn-lg boton_eliminar_tabla',
              text:"<i class='bi bi-clipboard-x'></i>",
              titleAttr:'Eliminar el registro seleccionado',
              action:function()
              {
                var data = tabla1.row(tabla1.cell('.selected',0).index().row).data();

                if(data[7] !== '')
                {
                  $('#ventana_error-modal-body').html(data[2]+' esta de baja');
                  $('#ventana_error').modal('show');
                }
                else
                {
                  sessionStorage.id_codigo_novedad_eliminar = data[0];

                  $.ajax
                  ({
                    url:'menu/novedades/listado_novedad_eliminar.html'
                  })
                  .done(function(datos)
                  {
                    $('#mostrar_ventana').html(datos);
                    $('#ventana_formulario_eliminar').modal('show');
                  });
                }
              }
            },
            {
              className:'btn-lg boton_alta_tabla',
              text:'<i class="bi bi-plus-circle"></i>',
              titleAttr:'Agregar un nuevo registro',
              action:function()
              {
                if($('#fecha_baja').val() !== '')
                {
                  $('#ventana_error-modal-body').html($('#legajo').val()+' esta de baja');
                  $('#ventana_error').modal('show');
                }
                else
                {
                  sessionStorage.legajo_alta = $('#legajo').val();
                  sessionStorage.id_ccosto_alta = $('#id_ccosto').val();
                  sessionStorage.id_funcion_alta = $('#id_funcion').val();

                  $.ajax
                  ({
                    url:'menu/novedades/listado_novedad_alta.html'
                  })
                  .done(function(datos)
                  {
                    $('#mostrar_ventana').html(datos);
                    $('#ventana_formulario_alta').modal('show');
                  });
                }
              }
            }
          ],
          ajax:
          {
            url:'json/tabla/tabla_novedad.php',
            data:function(datos)
            {
              datos.legajo = $('#legajo').val();
            }
          },
          order:[[8,'desc']],
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
    }
  });
});