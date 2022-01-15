$(document).ready(function()
{
  'use strict';

  var table = $('#tabla').DataTable
  ({
    buttons:
    [
      {
        extend:'selectedSingle',
        className:'btn-lg boton_modificar_tabla',
        text:"<i class='bi bi-pencil-square'></i>",
        titleAttr:'Modificar el registro seleccionado',
        action:function()
        {
          var data = table.row(table.cell('.selected',0).index().row).data();
          sessionStorage.legajo_modificar = data[0];
          sessionStorage.apellido_nombres_modificar = data[1];
          sessionStorage.id_ccosto_modificar = data[6];
          sessionStorage.id_funcion_modificar = data[8];
          sessionStorage.fecha_baja_modificar = data[11];

          if(data[11] !== '')
          {
            $('#ventana_error-modal-body').html(data[1]+' esta de baja');
            $('#ventana_error').modal('show');
          }
          else
          {
            $.ajax
            ({
              url:'menu/empleados/listado_empleado_modificar.html'
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
        titleAttr:'Dar de baja al empleado seleccionado',
        action:function()
        {
          var data = table.row(table.cell('.selected',0).index().row).data();
          sessionStorage.legajo_eliminar = data[0];

          if(data[11] !== '')
          {
            $('#ventana_error-modal-body').html(data[1]+' esta de baja');
            $('#ventana_error').modal('show');
          }
          else
          {
            $.ajax
            ({
              url:'menu/empleados/listado_empleado_eliminar.html'
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
          $.ajax
          ({
            url:'menu/empleados/listado_empleado_alta.html'
          })
          .done(function(datos)
          {
            $('#mostrar_ventana').html(datos);
            $('#ventana_formulario_alta').modal('show').on('shown.bs.modal',function()
            {
              $('#legajo_alta').focus();
            });
          });
        }
      }
    ],
    ajax:
    {
      url:'json/tabla/tabla_legajo.php'
    },
    columns:
    [
      {data:0,orderable:true},
      {data:1},
      {
        data:null,
        render:function(data)
        {
          return data[2]+" - "+data[3];
        }
      },
      {data:4},
      {data:5},
      {data:6},
      {data:7},
      {data:8},
      {data:9},
      {data:10},
      {data:11}
    ],
    columnDefs:
    [
      {visible:false,targets:[5,7]},
    ]
  });
  /****CAMPO PARA PONER CADA COLUMNA****/
  $('#tabla tfoot th').not(':eq(3),:eq(4),:eq(5),:eq(6),:eq(7),:eq(8)').each(function()
  {
    var title = $('#tabla thead th').eq($(this).index()).text();
    if(title !== '')
    {
      $(this).html("<input type='text' style='font-size:10px;' class='form-control form-control-sm' placeholder='Buscar' title='Enter para buscar'/>");
    }
  });
  /****CAMPO PARA BUSCAR CADA COLUMNA*****/
  table.columns().every(function(colIdx)
  {
    $('input',table.column(colIdx).footer()).on('keyup change',function(event)
    {
      if(event.keyCode === 9)
      {
        event.preventDefault();
      }
      else if(event.keyCode === 13 || this.value === '')
      {
        table.column(colIdx).search(this.value).draw();
        $(this).focus();
      }
    });
  });
});