$(document).ready(function()
{
  'use strict';

  $('#fecha_desde').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({
    maxDate:'0D',
    closeText:'<i class="bi bi-check"></i>',
    onSelect:function(selectedDate)
    {
      $('#fecha_hasta').datepicker('option','minDate',selectedDate).prop('disabled',false);
      setTimeout(function(){$('#fecha_hasta').focus();},10);
    }
  });

  $('#fecha_hasta').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();}).datepicker();

  Array.prototype.slice.call(document.querySelectorAll('#formulario_buscar')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {        
      event.preventDefault();
      event.stopPropagation();

      $('#fecha_desde,#fecha_hasta').prop('readonly',false);

      if(form.checkValidity())
      {
        window.open('menu/excel/PHPExcel/excel_pedidos_por_periodo_sector_legajo.php?fecha_desde='+$('#fecha_desde').val()+'&fecha_hasta='+$('#fecha_hasta').val());
        window.location.replace('menu.html');
      }
      form.classList.add('was-validated');
    },false);
  });
});