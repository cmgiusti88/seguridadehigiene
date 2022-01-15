$(document).ready(function()
{
  'use strict';
  if(sessionStorage.usuario_ingresar === undefined)
  {
    sessionStorage.url = 'acceso_bloqueado';
    window.location.replace('index.html');
  }
  else
  {
    $.ajax({url:'header.html'}).done(function(datos){$('header').html(datos);});
    $.ajax({url:'navegador.html'}).done(function(datos){$('#menu').html(datos);});
    $.ajax({url:'ventanas_boostrap.html'}).done(function(datos){$('#ventanas_boostrap').html(datos);});
    $.ajax({url:'footer.html'}).done(function(datos){$('footer').html(datos);});
    /****AGREGAR Y SACAR MENSAJE INVALIDAR****/
    $(document).focusin(function()
    {
      $('.invalid-tooltip').html('Este campo es obligatorio');
    })
    .keydown(function()
    {
      $('#mensaje_error').empty().removeClass('alert alert-danger');
    });
    /****PARA MOSTRAR ERROR A TODOS LOS AJAX****/
    $.ajaxSetup
    ({
      timeout:15000,
      error:function(jqXHR,textStatus,errorThrown)
      {
        if(jqXHR.status === 0)
        {
          $('#ventana_error-modal-body').html('El servidor esta caido');
          $('#ventana_error').modal('show').css('z-index','999999');
          setTimeout(function()
          {
            if(localStorage.id !== undefined){localStorage.clear();}
            else{sessionStorage.clear();}window.location.replace('index.html');
          },5000);
        }
        else if(jqXHR.status === 404){alert('Página solicitada no encontrada [404]');}
        else if(jqXHR.status === 500){alert('Error de servidor interno [500]');}
        else if(textStatus === 'parsererror'){alert('Error al analizar JSON solicitado');}
        else if(textStatus === 'timeout'){alert('Error de tiempo de espera');}
        else if(textStatus === 'abort'){alert('Petición de Ajax cancelada');}
        else{alert('Error sin capturar: \n' + errorThrown);}
      }
    });
    /****JQUERY FECHA ESPAÑOL****/
    $.datepicker.setDefaults
    (
      $.datepicker.regional[''] = 
      {
        altFormat:'yy/mm/dd',
        changeMonth:true,
        changeYear:true,
        closeText:'Cerrar',
        currentText:'Hoy',
        dateFormat:'dd/mm/yy',
        dayNames:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesMin:['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        dayNamesShort:['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre', 'Noviembre','Diciembre'],
        monthNamesShort:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre', 'Noviembre','Diciembre'],
        prevText:'<-- Anterior',
        nextText:'Siguiente -->',
        showButtonPanel:true,
        yearRange:'-100:+100'
      }
    );
    /****DATATABLE ESPAÑOL****/
    $.extend($.fn.dataTable.defaults,
    {
      language:
      {
        info:'Del _START_ al _END_ de _TOTAL_ registros',
        infoEmpty:'',
        infoFiltered:'',
        lengthMenu:'_MENU_',
        zeroRecords:'No se han encontrado ningun datos',
        paginate:{first:'Primera',last:'Última',next:'Siguiente',previous:'Anterior'},
        buttons:{pageLength:{_:'Mostrar %d registros','-1':'Mostrar todo'}},
        select:{rows:{_:'Has seleccionado %d filas.',0:'',1:'| Una fila seleccionada'}}
      },
      lengthMenu:[[5,10,20,25,50,100,500,1000,5000,10000],['5 registros','10 registros','20 registros','25 registros','50 registros','100 registros','500 registros','1.000 registros','5.000 registros','10.000 registros']],
      iDisplayLength:5,
      pagingType:'full_numbers',
      dom:'Bltip',
      serverSide:true,
      deferRender:true,
      responsive:true,
      select:true,
      ajax:
      {
        beforeSend:function()
        {
          $('#ventana_cargando').modal('show');
        },
        complete:function()
        {
          $('#ventana_cargando').modal('hide');
        }
      }
    });
  }
});