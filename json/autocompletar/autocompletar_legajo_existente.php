<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  $legajo = mysqli_real_escape_string($conexion,$_GET['legajo']);

  $sql = "SELECT legajo FROM personal WHERE legajo = '$legajo'";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));

  if(mysqli_num_rows($resultado) == '')
  {
    $lista = '';
  }
  else
  {
    while($fila = mysqli_fetch_array($resultado))
    {
      $lista[] = array('estado'=>'error','label'=>'Ya existe el legajo');
    }
  }
  mysqli_free_result($resultado);
  echo json_encode($lista);
  mysqli_close($conexion);
  exit;
}
?>