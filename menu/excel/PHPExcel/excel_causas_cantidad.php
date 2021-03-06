<?php
if(empty($_GET['FECHA']))
{
  echo 'NO HAY NINGUNA FECHA';
}
else
{
require('../../../conexion.php');
require('PHPExcel.php');
set_time_limit(7200);

$objPHPExcel = new PHPExcel();

$color_titulo = array('font'=>array('bold'=>true,'color'=>array('rgb'=>'FFFFFF'),'size'=>11,'name'=>'Calibri'),'borders'=>array('allborders'=>array('style'=>PHPExcel_Style_Border::BORDER_THIN)),'fill'=>array('type'=>PHPExcel_Style_Fill::FILL_SOLID,'color'=>array('rgb'=>'FF0000')));
$color_tabla = array('font'=>array('bold'=>true,'color'=>array('rgb'=>'0900FF'),'size'=>9,'name'=>'Calibri',),'borders'=>array('allborders'=>array('style'=>PHPExcel_Style_Border::BORDER_THIN)),'fill'=>array('type'=>PHPExcel_Style_Fill::FILL_SOLID,'color'=>array('rgb'=>'E1E1E1')));

$FECHA = $_GET['FECHA'];
$partes = explode('/',$FECHA);
$mes = $partes[0];
$anio = $partes[1]; 

$sql = "SELECT COUNT(B.descripcion_causa) AS CONTADOR_CAUSA, B.descripcion_causa, A.fecha_desde, A.fecha_hasta FROM novedad A, causa B WHERE A.id_cod_causa = B.id_causa AND month(A.fecha_desde) = '$mes' AND year(A.fecha_desde) = '$anio' GROUP BY A.id_cod_causa ORDER BY CONTADOR_CAUSA";

$resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
 
$sheet = $objPHPExcel->getActiveSheet(0);

$objPHPExcel->setActiveSheetIndex(0)->setTitle('CAUSAS');

$sheet->getStyle('B2:C2')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
$sheet->getStyle('B3:C26')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_LEFT);

$sheet->setCellValue('B2','CAUSAS');
$sheet->setCellValue('C2','CANTIDAD');
$sheet->setCellValue('E2','MES');
$sheet->setCellValue('F2',utf8_encode('A?O'));
$sheet->setCellValue('E3',$mes);
$sheet->setCellValue('F3',$anio);

$sheet->getStyle('B2:C2')->applyFromArray($color_titulo);
$sheet->getStyle('E2:F2')->applyFromArray($color_titulo);
$sheet->getStyle('E3:F3')->applyFromArray($color_tabla);

$sheet->getColumnDimension('B')->setAutoSize(true);
$sheet->getColumnDimension('C')->setAutoSize(true);

$x = 3;
while($fila = mysqli_fetch_assoc($resultado))
{
	 $descripcion_causa = utf8_encode($fila['descripcion_causa']);

	 $celdaB = 'B'.$x;
	 $celdaC = 'C'.$x;
	
	 $objPHPExcel->setActiveSheetIndex(0)->setCellValue($celdaB,$descripcion_causa)->setCellValue($celdaC, $fila['CONTADOR_CAUSA']);	
	 $x++;			
}
$x--;

$dataseriesLabels = array(new PHPExcel_Chart_DataSeriesValues('String','CAUSAS!$C$2',NULL,1));
$xAxisTickValues = array(new PHPExcel_Chart_DataSeriesValues('String','CAUSAS!$B$3:$B'.$x,NULL,24));
$dataSeriesValues = array(new PHPExcel_Chart_DataSeriesValues('Number','CAUSAS!$C$3:$C'.$x,NULL,24));
$objPHPExcel->getActiveSheet()->getStyle('B3:C'.$x)->applyFromArray($color_tabla);

$series = new PHPExcel_Chart_DataSeries(PHPExcel_Chart_DataSeries::TYPE_BARCHART,PHPExcel_Chart_DataSeries::GROUPING_STANDARD,range(0,count($dataSeriesValues)-1),$dataseriesLabels,$xAxisTickValues,$dataSeriesValues);

$series->setPlotDirection(PHPExcel_Chart_DataSeries::DIRECTION_COL);
$plotarea = new PHPExcel_Chart_PlotArea(NULL,array($series));
$legend = new PHPExcel_Chart_Legend(PHPExcel_Chart_Legend::POSITION_RIGHT,NULL,false);
$title = new PHPExcel_Chart_Title('TOTAL CAUSAS - FECHA: '.$mes.' / '.$anio);
$yAxisLabel = new PHPExcel_Chart_Title('VALORES');
/****Crear el gr?fico****/
$chart = new PHPExcel_Chart('chart1',$title,$legend,$plotarea,true,0,NULL,$yAxisLabel);
/****Establecer la posici?n en la tabla, debe aparecer en la hoja de c?lculo****/
$chart->setTopLeftPosition('A1');
$chart->setBottomRightPosition('R26');
/****A?adir el gr?fico a la hoja de c?lculo****/
$objPHPExcel->createSheet(1);
$objPHPExcel->setActiveSheetIndex(1)->setTitle('BARRA')->addChart($chart);
/****Construir las dataseries CIRCULAR****/
$series_circular = new PHPExcel_Chart_DataSeries(PHPExcel_Chart_DataSeries::TYPE_PIECHART,NULL,range(0,count($dataSeriesValues)-1),$dataseriesLabels,$xAxisTickValues,$dataSeriesValues);
$layout1 = new PHPExcel_Chart_Layout();
$layout1->setShowVal(FALSE);
$layout1->setShowPercent(TRUE);
$plotArea1 = new PHPExcel_Chart_PlotArea($layout1,array($series_circular));
$legend1 = new PHPExcel_Chart_Legend(PHPExcel_Chart_Legend::POSITION_TOPRIGHT,NULL,false);
$title1 = new PHPExcel_Chart_Title('TOTAL CAUSAS - FECHA: '.$mes.' / '.$anio);

$chart_circular = new PHPExcel_Chart('chart1',$title1,$legend1,$plotArea1,true,0,NULL,NULL);
/****Establecer la posici?n en la tabla, debe aparecer en la hoja de c?lculo****/
$chart_circular->setTopLeftPosition('A1');
$chart_circular->setBottomRightPosition('R35');
/****A?adir el gr?fico a la hoja de c?lculo****/
$objPHPExcel->createSheet(2);
$objPHPExcel->setActiveSheetIndex(2)->setTitle('CIRCULAR')->addChart($chart_circular);
$objPHPExcel->setActiveSheetIndex(0); /****Seleccionar la pesta?a deseada****/
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel2007');
$objWriter->setIncludeCharts(TRUE);
$objWriter->save(str_replace('.php','.xlsx',__FILE__));

$arch = 'excel_causas_cantidad.xlsx';
header('Content-Description: File Transfer');
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment; filename='.basename($arch));
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: max-age=0');
header('Pragma: no-cache');
header('Content-Length: ' . filesize($arch));
ob_clean();
flush();
readfile($arch);
}
exit;