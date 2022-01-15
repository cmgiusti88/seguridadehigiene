<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  $sql = 'SELECT id_funcion,descripcion_funcion FROM funcion ORDER BY descripcion_funcion';
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
  while($fila = mysqli_fetch_assoc($resultado))
  {
    $lista[] = array('id_funcion'=>$fila['id_funcion'],'descripcion_funcion'=>utf8_encode($fila['descripcion_funcion']));
  }
  echo json_encode($lista);
  mysqli_free_result($resultado);
  mysqli_close($conexion);
  exit;
}
?>