<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  $legajo = mysqli_real_escape_string($conexion,$_GET['legajo']);

  if(is_numeric($legajo))
  {
    $legajo_o_apellido = "legajo = '$legajo'";
  }
  else
  {
    $legajo_o_apellido = "apellido_nombres LIKE '%".$legajo."%'";
  }

  $sql = "SELECT legajo,apellido_nombres,id_ccosto,id_funcion,fechabaja FROM personal WHERE $legajo_o_apellido";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));

  if(mysqli_num_rows($resultado) == '')
  {
    if(is_numeric($legajo))
    {
      $lista[] = array('label'=>'No existe el legajo '.$legajo);
    }
    else
    {
      $lista[] = array('label'=>'No existe el empleado '.$legajo);
    }
  }
  else
  {
    while($fila = mysqli_fetch_array($resultado))
    {
      $legajo = $fila['legajo'];
      $apellido_nombres = utf8_encode($fila['apellido_nombres']);
      $id_ccosto = $fila['id_ccosto'];
      $id_funcion = $fila['id_funcion'];
      $fecha_baja = $fila['fechabaja'];
      $lista[] = array('estado'=>'exito','label'=>$fila['legajo'].' - '.utf8_encode($fila['apellido_nombres']),'id_ccosto'=>$id_ccosto,'id_funcion'=>$id_funcion,'fecha_baja'=>$fecha_baja);
    }
  }
  mysqli_free_result($resultado);
  echo json_encode($lista);
  mysqli_close($conexion);
  exit;
}
?>