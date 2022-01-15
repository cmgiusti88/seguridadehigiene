<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  $sql = 'SELECT id_tipodoc,desctipodoc FROM mapaderiesgo.tiposdedocumento ORDER BY id_tipodoc';
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
  while($fila = mysqli_fetch_assoc($resultado))
  {
    $lista[] = array('id_tipodoc'=>$fila['id_tipodoc'],'desctipodoc'=>utf8_encode($fila['desctipodoc']));
  }
  echo json_encode($lista);
  mysqli_free_result($resultado);
  mysqli_close($conexion);
  exit;
}
?>