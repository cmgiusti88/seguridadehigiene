<?php
if(empty($_POST['id_causa']))
{
  echo 'No existe ninguna causa';
}
else
{
  require_once('../../conexion.php');

  $id_causa = $_POST['id_causa'];
  $descripcion_causa = strtoupper(utf8_decode($_POST['descripcion_causa']));

  $modificar_causa = "UPDATE causa SET descripcion_causa = '$descripcion_causa' WHERE id_causa= '$id_causa'";
  $resultado = mysqli_query($conexion,$modificar_causa)or die(mysqli_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>