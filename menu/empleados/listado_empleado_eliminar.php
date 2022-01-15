<?php
if(empty($_POST['legajo_eliminar']))
{
  echo 'OCURRIO UN ERROR AL ELIMINAR';
}
else
{
  require_once('../../conexion.php');

  $legajo = $_POST['legajo_eliminar']; 
  $fecha_baja = $_POST['fecha_baja_formato_eliminar'];

  $baja_legajo = "UPDATE personal SET fechabaja = '$fecha_baja' WHERE legajo = '$legajo'";

  $resultado = mysqli_query($conexion,$baja_legajo)or die(mysql_error());
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>