$(document).ready(function()
{
  'use strict';

  $('#fecha').on({'cut copy paste':function(event){event.preventDefault();}}).keydown(function(event){event.preventDefault();})
  .datepicker
  ({
    dateFormat:'mm/yy',
    closeText:'<i class="bi bi-check"></i>',
  })
  .focus(function()
  {
    $(this).prop('readonly',true);

    var thisCalendar = $(this);
    $('.ui-datepicker-calendar').detach();
    $('.ui-datepicker-close').click(function()
    {
      var month = $('#ui-datepicker-div .ui-datepicker-month :selected').val();
      var year = $('#ui-datepicker-div .ui-datepicker-year :selected').val();
      thisCalendar.datepicker('setDate',new Date(year,month,1));
    });
  });

  Array.prototype.slice.call(document.querySelectorAll('#formulario_buscar')).forEach(function(form)
  {
    form.addEventListener('submit',function(event)
    {
      event.preventDefault();
      event.stopPropagation();

      $('#fecha').prop('readonly',false);

      if(form.checkValidity())
      {
        window.open('menu/excel/PhpSpreadsheet/excel_causas_cantidad.php?FECHA='+$('#fecha').val());
        window.location.replace('menu.html');
      }
      form.classList.add('was-validated');
    },false);
  });
});