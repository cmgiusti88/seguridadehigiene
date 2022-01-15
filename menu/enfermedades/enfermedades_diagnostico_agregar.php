<?php
if(empty($_POST['id_causa']))
{
  echo 'No existe ninguna causa';
}
else
{
  require_once('../../conexion.php');

  $id_causa = $_POST['id_causa'];
  $descripcion_diagnostico = strtoupper(utf8_decode($_POST['descripcion_diagnostico']));

  $sql = "SELECT MAX(id_diagnostico) AS maximo_id_diagnostico FROM diagnostico WHERE id_causa = '$id_causa'";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));

  if($fila = mysqli_fetch_assoc($resultado))
  {
    $ultimo_id_diagnostico = $fila['maximo_id_diagnostico'] + 1;
  }

  $agregar_diagnostico = "INSERT INTO diagnostico(id_causa,id_diagnostico,descripcion_diagnostico) VALUES ('$id_causa','$ultimo_id_diagnostico','$descripcion_diagnostico')";
  mysqli_query($conexion,$agregar_diagnostico)or die(mysqli_error($conexion));	
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>