<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  $id_causa = $_GET['id_causa'];
  $sql = "SELECT id_diagnostico,descripcion_diagnostico FROM diagnostico WHERE id_causa = '$id_causa' ORDER BY descripcion_diagnostico";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
  if(mysqli_num_rows($resultado) == '')
  {
    $lista[] = array();
  }
  else
  {
    while($fila = mysqli_fetch_assoc($resultado))
    {
      $lista[] = array('id_diagnostico'=>$fila['id_diagnostico'],'descripcion_diagnostico'=>utf8_encode($fila['descripcion_diagnostico'])); 
    }
  }
  echo json_encode($lista);
  mysqli_free_result($resultado);
  mysqli_close($conexion);
  exit;
}
?>