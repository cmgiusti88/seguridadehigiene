<?php
if(empty($_POST['legajo_alta']))
{
  echo 'No se encuentra el legajo';
}
else
{
  require_once('../../conexion.php');

  $legajo = $_POST['legajo_alta'];
  $apellido_nombres = strtoupper(utf8_decode($_POST['apellido_nombres_alta']));
  $id_tipodoc = $_POST['id_tipodoc_alta'];
  $numdocumento = $_POST['numdocumento_alta'];
  $fechanac = $_POST['fechanac_formato_alta'];
  $id_ccosto_actual = $_POST['id_ccosto_alta'];
  $genero = $_POST['eligir_m_o_f_alta'];
  $id_funcion_actual = $_POST['id_funcion_alta'];
  $fechaalta = $_POST['fechaalta_formato_alta'];

  /****NO DAR DE ALTA SI HAY UN LEGAJO IGUAL O DOCUMENTO IGUAL****/
  $sql = "SELECT legajo,documento FROM personal WHERE legajo = '$legajo' or documento = '$numdocumento'";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
  $fila = mysqli_fetch_assoc($resultado);

  if($fila['legajo'] == $legajo)
  {
    echo 'No se puede hacer una alta <br><br> Ya hay otro empleado/a con el mismo legajo';
  }
  else if($fila['documento'] == $numdocumento)
  {
    echo 'No se puede hacer una alta <br><br> Ya hay otro empleado/a con el mismo documento';
  }
  else
  {
    $agregar_empleado = "INSERT INTO personal (legajo,apellido_nombres,id_tipo_documento,documento,fechanac,id_ccosto,genero,id_funcion,fechaalta) 
     VALUES ('$legajo','$apellido_nombres','$id_tipodoc','$numdocumento','$fechanac','$id_ccosto_actual','$genero','$id_funcion_actual','$fechaalta')";

     mysqli_query($conexion,$agregar_empleado)or die(mysqli_error($conexion));
     echo 'GRABAR';
  }
  mysqli_free_result($resultado);
  mysqli_close($conexion);
}
exit;
?>