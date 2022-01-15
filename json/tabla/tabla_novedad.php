<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../../conexion.php');

  if(empty($_GET['legajo']))
  {
    $legajo = "AND A.legajo LIKE '%%'";
  }
  else
  {
    $legajo = "AND A.legajo = ".$_GET['legajo']."";
  }

  if(empty($_GET['fecha_desde']))
  {
    $entre_fechas = "AND A.fecha_desde LIKE '%%'";
  }
  else
  {
    $entre_fechas = "AND A.fecha_desde >= '".$_GET['fecha_desde']."' AND A.fecha_hasta <= '".$_GET['fecha_hasta']."'";
  }

  if(empty($_GET['id_ccosto']))
  {
    $id_ccosto = "AND A.id_ccosto_actual LIKE '%%'";
  }
  else
  {
    $id_ccosto = "AND A.id_ccosto_actual = ".$_GET['id_ccosto']."";
  }

  if(empty($_GET['articulo']))
  {
    $articulo = "AND A.articulo LIKE '%%'";
  }
  else
  {
    $articulo = "AND A.articulo = 'SI'";
  }

  if(!empty($legajo))
  { 
    $table = 'novedad';
    $primaryKey = 'id_codigo_novedad';
    $columns = array(
      array('db'=>'A.id_codigo_novedad','dt'=>0,'field'=>'id_codigo_novedad'),
      array('db'=>'A.legajo','dt'=>1,'field'=>'legajo'),
      array('db'=>'B.apellido_nombres','dt'=>2,'field'=>'apellido_nombres'),
      array('db'=>'A.id_ccosto_actual','dt'=>3,'field'=>'id_ccosto_actual'),
      array('db'=>'E.descripcion','dt'=>4,'field'=>'descripcion_oficina','as'=>'descripcion_oficina'),
      array('db'=>'A.id_funcion_actual','dt'=>5,'field'=>'id_funcion_actual'),
      array('db'=>'F.descripcion_funcion','dt'=>6,'field'=>'descripcion_funcion'),
      array('db'=>'B.fechabaja','dt'=>7,'field'=>'fechabaja','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}}),
      array('db'=>'A.fecha_desde','dt'=>8,'field'=>'fecha_desde','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}}),
      array('db'=>'A.fecha_desde','dt'=>9,'field'=>'fecha_desde'),
      array('db'=>'A.fecha_hasta','dt'=>10,'field'=>'fecha_hasta','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}}),
      array('db'=>'A.fecha_hasta','dt'=>11,'field'=>'fecha_hasta'),
      array('db'=>'A.id_cod_causa','dt'=>12,'field'=>'id_cod_causa'),
      array('db'=>'C.descripcion_causa','dt'=>13,'field'=>'descripcion_causa'),
      array('db'=>'A.id_cod_diagnostico','dt'=>14,'field'=>'id_cod_diagnostico'),
      array('db'=>'D.descripcion_diagnostico','dt'=>15,'field'=>'descripcion_diagnostico'),
      array('db'=>'A.fecha_novedad','dt'=>16,'field'=>'fecha_novedad','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}}),
      array('db'=>'A.medico_o_domicilio','dt'=>17,'field'=>'medico_o_domicilio'),
      array('db'=>'A.articulo','dt'=>18,'field'=>'articulo'),
      array('db'=>'A.fecha_desde','dt'=>19,'field'=>'fecha_desde','formatter'=>function($d,$row){return strtotime($d);}),
      array('db'=>'A.fecha_hasta','dt'=>20,'field'=>'fecha_hasta','formatter'=>function($d,$row){return strtotime($d);})
    );
    $sql_details = array('user'=>$usuario,'pass'=>$contraseña,'db'=>$base_datos,'host'=>$host,'charset'=>'utf8');
    require('ssp.customized.class.php');
    $joinQuery = "FROM novedad A,personal B,causa C,diagnostico D,ccosto E, funcion F";
    $extraWhere = "A.legajo = B.legajo AND A.id_ccosto_actual = E.id_ccosto AND A.id_funcion_actual = F.id_funcion AND A.id_cod_causa = C.id_causa AND C.id_causa = D.id_causa AND A.id_cod_diagnostico = D.id_diagnostico $legajo $entre_fechas $id_ccosto $articulo";
  }
  echo json_encode(SSP::simple($_GET,$sql_details,$table,$primaryKey,$columns,$joinQuery,$extraWhere));
  exit;
}
?>