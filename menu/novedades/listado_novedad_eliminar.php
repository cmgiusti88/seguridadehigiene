<?php
if(empty($_POST['id_codigo_novedad_eliminar']))
{
  echo 'CAMPO VACIO';
}
else
{
  require_once('../../conexion.php');

  $id_codigo_novedad = $_POST['id_codigo_novedad_eliminar'];
  $eliminar = "DELETE FROM novedad WHERE id_codigo_novedad = '$id_codigo_novedad'";
  mysqli_query($conexion,$eliminar)or die(mysqli_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>