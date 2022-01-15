$(document).ready(function()
{
  'use strict';
 
  $('#usuario_ingresar').html(sessionStorage.usuario_ingresar);

  if(sessionStorage.url !== ''){$.get(sessionStorage.url,function(datos){$('#modulo').html(datos);});}

  $('.boton_nav > a').click(function(event)
  {
    event.preventDefault();
    if(sessionStorage.url !== $(this).prop('href'))
    {
      sessionStorage.url = $(this).prop('href');
      $.ajax({url:sessionStorage.url}).done(function(datos){$('#modulo').html(datos);});
      $('.dropdown-menu').slideUp(200);
      $('.nav-item').removeClass('active');
      if($(this).parent().hasClass('active'))
      {
        $(this).parent().removeClass('active');
      }
      else
      {
        $(this).next('.dropdown-menu').slideDown(200);
        $(this).parent().addClass('active');
      }
    }
  });

  $('.boton_nav1 > a').click(function(event)
  {
    event.preventDefault();
    $('.dropdown-menu').slideUp(200);
    if($(this).parent().hasClass('active'))
    {
      $('.nav-item').removeClass('active');
      $(this).parent().removeClass('active');
    }
    else
    {
      $('.nav-item').removeClass('active');
      $(this).next('.dropdown-menu').slideDown(200);
      $(this).parent().addClass('active');
    }
  });

  $('.boton_nav1 .dropdown-menu a').click(function(event)
  {
    event.preventDefault();
    if(sessionStorage.url !== $(this).prop('href'))
    {
      sessionStorage.url = $(this).prop('href');
      $.ajax({url:sessionStorage.url}).done(function(datos){$('#modulo').html(datos);});
      $('.dropdown-menu').slideUp(200);
      $('.nav-item').removeClass('active');
      if($(this).parent().hasClass('active'))
      {
        $(this).parent().removeClass('active');
      }
      else
      {
        $(this).next('.dropdown-menu').slideDown(200);
        $(this).parent().addClass('active');
      }
    }
  });

  $('#cerrar_sesion').click(function()
  {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('index.html');
  });
});