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

  $table = 'personal';
  $primaryKey = 'legajo';
  $columns = array(
    array('db'=>'A.legajo','dt'=>0,'field'=>'legajo'),
    array('db'=>'A.apellido_nombres','dt'=>1,'field'=>'apellido_nombres'),
    array('db'=>'B.desctipodoc','dt'=>2,'field'=>'desctipodoc'),
    array('db'=>'A.documento','dt'=>3,'field'=>'documento'),
    array('db'=>'A.fechanac','dt'=>4,'field'=>'fechanac','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}}),
    array('db'=>'A.genero','dt'=>5,'field'=>'genero','formatter'=>function($d,$row){if($d == null || $d == 'M'){return $d = 'MASCULINO';}else{return 'FEMENINO';}}),
    array('db'=>'A.id_ccosto','dt'=>6,'field'=>'id_ccosto'),
    array('db'=>'C.descripcion','dt'=>7,'field'=>'descripcion_oficina','as'=>'descripcion_oficina'),
    array('db'=>'A.id_funcion','dt'=>8,'field'=>'id_funcion'),
    array('db'=>'D.descripcion_funcion','dt'=>9,'field'=>'descripcion_funcion'),
    array('db'=>'A.fechaalta','dt'=>10,'field'=>'fechaalta','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}}),
    array('db'=>'A.fechabaja','dt'=>11,'field'=>'fechabaja','formatter'=>function($d,$row){if($d == null || $d == '0000-00-00 00:00:00'){return $d = '';}else{return date('d/m/Y',strtotime($d));}})
  );
  $sql_details = array('user'=>$usuario,'pass'=>$contraseña,'db'=>$base_datos,'host'=>$host,'charset'=>'utf8');
  require('ssp.customized.class.php');
  $joinQuery = "FROM personal A,tiposdedocumento B,ccosto C,funcion D";
  $extraWhere = "A.id_tipo_documento = B.id_tipodoc AND A.id_ccosto = C.id_ccosto AND A.id_funcion = D.id_funcion $legajo";   
  echo json_encode(SSP::simple($_GET,$sql_details,$table,$primaryKey,$columns,$joinQuery,$extraWhere));
  exit;
}
?>