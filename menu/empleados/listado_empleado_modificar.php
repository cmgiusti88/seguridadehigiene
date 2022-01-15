<?php
if(empty($_POST['legajo_modificar']))
{
  echo 'No existe ningun legajo';
}
else
{
  require_once('../../conexion.php');

  $legajo = $_POST['legajo_modificar'];
  $apellido_nombres = strtoupper(utf8_decode($_POST['apellido_nombres_modificar']));
  $id_ccosto = $_POST['id_ccosto_modificar'];
  $id_funcion = $_POST['id_funcion_modificar'];

  $modificar_legajo = "UPDATE personal SET apellido_nombres = '$apellido_nombres',id_ccosto = '$id_ccosto',id_funcion = '$id_funcion' WHERE legajo = '$legajo'";
  mysqli_query($conexion,$modificar_legajo)or die(mysql_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>