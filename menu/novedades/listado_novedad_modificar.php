<?php
if(empty($_POST['id_codigo_novedad_modificar']))
{
  echo 'No existe ninguna novedad';
}
else
{
  require_once('../../conexion.php');

  $id_codigo_novedad = $_POST['id_codigo_novedad_modificar'];
  $medico_o_domicilio = strtoupper($_POST['eligir_sm_o_sd_modificar']);
  $articulo = strtoupper($_POST['eligir_articulo_modificar']);
  $id_cod_causa = $_POST['id_causa_modificar'];
  $id_cod_diagnostico = $_POST['id_diagnostico_modificar'];
  $fecha_desde = $_POST['fecha_desde_formato_modificar'];
  $fecha_hasta = $_POST['fecha_hasta_formato_modificar'];

  $modificar_novedad = "UPDATE novedad SET medico_o_domicilio = '$medico_o_domicilio',articulo = '$articulo',id_cod_causa = '$id_cod_causa',id_cod_diagnostico = '$id_cod_diagnostico',fecha_desde = '$fecha_desde',fecha_hasta = '$fecha_hasta' WHERE id_codigo_novedad = '$id_codigo_novedad'";
  mysqli_query($conexion,$modificar_novedad)or die(mysqli_error($conexion));
  echo 'GRABAR';
  mysqli_close($conexion);
}
exit;
?>