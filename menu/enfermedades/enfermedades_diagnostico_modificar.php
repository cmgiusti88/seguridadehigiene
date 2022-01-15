<?php
if(empty($_POST['id_causa']))
{
  echo 'No existe ninguna causa';
}
else
{
  require_once('../../conexion.php');

  $id_causa = $_POST['id_causa'];
  $id_diagnostico = $_POST['id_diagnostico'];
  $descripcion_diagnostico = strtoupper(utf8_decode($_POST['descripcion_diagnostico']));
	
  $modificar_diagnostico = "UPDATE diagnostico SET descripcion_diagnostico = '$descripcion_diagnostico' WHERE id_causa= '$id_causa' AND id_diagnostico = '$id_diagnostico'";
  mysqli_query($conexion,$modificar_diagnostico)or die(mysql_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>