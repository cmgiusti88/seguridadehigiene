<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  $numdocumento = mysqli_real_escape_string($conexion,$_GET['numdocumento']);

  $sql = "SELECT documento FROM personal WHERE documento = '$numdocumento'";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));

  if(mysqli_num_rows($resultado) == '')
  {
    $lista = '';
  }
  else
  {
    while($fila = mysqli_fetch_assoc($resultado))
    {
      $lista[] = array('estado'=>'error','label'=>'Ya existe el documento');
    }
  }
  mysqli_free_result($resultado);
  echo json_encode($lista);
  mysqli_close($conexion);
  exit;
}
?>