<?php

$fecha_desde = $_GET['fecha_desde'];
$fecha_hasta = $_GET['fecha_hasta'];

if(empty($fecha_desde) || empty($fecha_desde))
{
  echo 'NO HAY NINGUNA FECHA';
}
else
{
require('../../../conexion.php');
require('PHPExcel.php');
set_time_limit(7200);

$objPHPExcel = new PHPExcel();

$color_titulo = array(
 'font'=>array('bold'=>true,'color'=>array('rgb'=>'FFFFFF'),'size'=>11,'name'=>'Calibri'),
	'borders'=>array('allborders'=>array('style'=>PHPExcel_Style_Border::BORDER_THIN)),
 'fill'=>array('type'=>PHPExcel_Style_Fill::FILL_SOLID,'color'=>array('rgb'=>'FF0000'))
);

$sql = "SELECT A.id_ccosto_actual,A.legajo,B.apellido_nombres,C.descripcion,D.descripcion_causa,E.descripcion_diagnostico,A.fecha_desde,A.fecha_hasta
  FROM novedad A,personal B,ccosto C,causa D,diagnostico E
  WHERE A.id_ccosto_actual = C.id_ccosto
  AND A.legajo = B.legajo
  AND A.id_cod_causa = D.id_causa
  AND D.id_causa = E.id_causa
  AND A.id_cod_diagnostico = E.id_diagnostico
  AND A.fecha_desde >= STR_TO_DATE('$fecha_desde','%d/%m/%Y')
  AND A.fecha_hasta <= STR_TO_DATE('$fecha_hasta','%d/%m/%Y')
  ORDER BY C.descripcion,A.legajo,A.fecha_desde ASC";

$resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));

$u = 0;
$descripcion_area_anterior = '';

while($fila = mysqli_fetch_assoc($resultado))
{
  $descripcion_area = utf8_encode($fila['descripcion']);
  if($descripcion_area_anterior !== $descripcion_area)
  {
    $x = 3;
    $descripcion_area_anterior = $descripcion_area;
    $objPHPExcel->createSheet($u);
    $objPHPExcel->setActiveSheetIndex($u)->setTitle(substr($descripcion_area_anterior,0,31));
    $sheet = $objPHPExcel->getActiveSheet($u);  
    foreach(range('B','J') as $columnID)
    {
      $sheet->getColumnDimension($columnID)->setAutoSize(true);
    }
    $sheet->setCellValue('B2','LEGAJO')
          ->setCellValue('C2','APELLIDO Y NOMBRE')
          ->setCellValue('D2','SECTOR')
          ->setCellValue('E2','CAUSA')
          ->setCellValue('F2','DIAGNOSTICO')
          ->setCellValue('G2','FECHA DESDE')
          ->setCellValue('H2','FECHA HASTA')
          ->setCellValue('I2','CANTIDAD DIAS')
          ->setCellValue('J2','MES');
   
    $sheet->getStyle('B2:J2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    $sheet->getStyle('B2:J2')->applyFromArray($color_titulo);

    $sheet->setCellValue('B'.$x,$fila['legajo']);
    $sheet->setCellValue('C'.$x,utf8_encode($fila['apellido_nombres']));
    $sheet->setCellValue('D'.$x,utf8_encode($fila['descripcion']));
    $sheet->setCellValue('E'.$x,utf8_encode($fila['descripcion_causa']));
    $sheet->setCellValue('F'.$x,utf8_encode($fila['descripcion_diagnostico']));
    $sheet->setCellValue('G'.$x,date('d-m-Y',strtotime(str_replace('/','-',$fila['fecha_desde']))));
    $sheet->setCellValue('H'.$x,date('d-m-Y',strtotime(str_replace('/','-',$fila['fecha_hasta']))));

    $dias	= (strtotime($fila['fecha_desde'])-strtotime($fila['fecha_hasta']))/86400;
    $dias 	= abs($dias); 
    $dias = floor($dias);		
    $dias = $dias + 1;
    $sheet->setCellValue('I'.$x,$dias);

    if((date("m",strtotime($fila['fecha_desde'])) == (date("m",strtotime($fila['fecha_hasta'])))))
    {$mes = date("m",strtotime($fila['fecha_desde']));}
    else
    {$mes = date("m",strtotime($fila['fecha_desde'])).'/'.date("m",strtotime($fila['fecha_hasta']));}
    $sheet->setCellValue('J'.$x,$mes);

    $x++;
    $u++;	
  }
  else
  {
    $descripcion_area_anterior = $descripcion_area;

    $sheet->setCellValue('B'.$x,$fila['legajo']);
    $sheet->setCellValue('C'.$x,utf8_encode($fila['apellido_nombres']));
    $sheet->setCellValue('D'.$x,utf8_encode($fila['descripcion']));
    $sheet->setCellValue('E'.$x,utf8_encode($fila['descripcion_causa']));
    $sheet->setCellValue('F'.$x,utf8_encode($fila['descripcion_diagnostico']));
    $sheet->setCellValue('G'.$x,date('d-m-Y',strtotime(str_replace('/','-',$fila['fecha_desde']))));
    $sheet->setCellValue('H'.$x,date('d-m-Y',strtotime(str_replace('/','-',$fila['fecha_hasta']))));
    $dias	= (strtotime($fila['fecha_desde'])-strtotime($fila['fecha_hasta']))/86400;
    $dias = abs($dias); 
    $dias = floor($dias);		
    $dias = $dias + 1;
    $sheet->setCellValue('I'.$x,$dias);
    if((date("m",strtotime($fila['fecha_desde'])) == (date("m",strtotime($fila['fecha_hasta'])))))
    {$mes = date("m",strtotime($fila['fecha_desde']));}
    else{$mes = date("m",strtotime($fila['fecha_desde'])).'/'.date("m",strtotime($fila['fecha_hasta']));}
    $sheet->setCellValue('J'.$x,$mes);

    $x++;
  }
}
/**************************************************************************************/
$objPHPExcel->setActiveSheetIndex(0);

$archivo = 'excel_pedidos_por_periodo_sector_legajo.xlsx'; 
header('Pragma: public'); 
header('Expires: 0'); 
header('Cache-Control: must-revalidate, post-check=0, pre-check=0'); 
header('Content-Type: application/force-download'); 
header('Content-Type: application/octet-stream'); 
header('Content-Type: application/download'); 
header("Content-Disposition: attachment;filename={$archivo}"); 
header('Content-Transfer-Encoding: binary'); 
$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel); 
$objWriter->setOffice2003Compatibility(true); 
$objWriter->save('php://output'); 
}
exit;
?>