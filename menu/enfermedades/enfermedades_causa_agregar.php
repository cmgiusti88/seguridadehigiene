<?php
if(empty($_POST['descripcion_causa']))
{
  echo 'No existe ninguna causa';
}
else
{
  require_once('../../conexion.php');

  $descripcion_causa = strtoupper(utf8_decode($_POST['descripcion_causa']));
  $sql = "SELECT MAX(id_causa) AS maximo_id_causa FROM causa";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));

  if($fila = mysqli_fetch_assoc($resultado))
  {
    $ultimo_id_causa = $fila['maximo_id_causa'] + 1;
  }

  $insertar_causa = "INSERT INTO causa (id_causa,descripcion_causa) VALUES ('$ultimo_id_causa','$descripcion_causa')";
  mysqli_query($conexion,$insertar_causa)or die(mysqli_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>