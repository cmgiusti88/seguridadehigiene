<?php
if(empty($_POST['legajo_alta']) || empty($_POST['fecha_novedad_formato_alta']) ||  empty($_POST['id_causa_alta']) || empty($_POST['id_diagnostico_alta']) || empty($_POST['eligir_servicio_alta']) || empty($_POST['eligir_articulo_alta']) || empty($_POST['fecha_desde_formato_alta']) || empty($_POST['fecha_hasta_formato_alta']))
{
  echo 'HAY UN PROBLEMA, HAY CAMPOS VACIOS';
}
else
{
  require_once('../../conexion.php');

  $legajo = $_POST['legajo_alta'];
  $id_ccosto_actual = $_POST['id_ccosto_alta'];
  $id_funcion_actual = $_POST['id_funcion_alta'];
  $fecha_novedad = $_POST['fecha_novedad_formato_alta'];
  date_default_timezone_set('America/Argentina/Buenos_Aires'); 
  $fecha_carga = date('Y/m/d');
  $medico_o_domicilio = $_POST['eligir_servicio_alta'];
  $articulo = $_POST['eligir_articulo_alta'];
  $id_cod_causa = $_POST['id_causa_alta'];
  $id_cod_diagnostico = $_POST['id_diagnostico_alta'];
  $fecha_desde = $_POST['fecha_desde_formato_alta'];
  $fecha_hasta = $_POST['fecha_hasta_formato_alta'];

  $agregar_novedad = "INSERT INTO novedad 
  (legajo,id_ccosto_actual,id_funcion_actual,fecha_novedad,fecha_carga,medico_o_domicilio,articulo,id_cod_causa,id_cod_diagnostico,fecha_desde,fecha_hasta) 

  VALUES
  ('$legajo','$id_ccosto_actual','$id_funcion_actual','$fecha_novedad','$fecha_carga','$medico_o_domicilio','$articulo','$id_cod_causa','$id_cod_diagnostico','$fecha_desde','$fecha_hasta')";

  mysqli_query($conexion,$agregar_novedad)or die(mysqli_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>