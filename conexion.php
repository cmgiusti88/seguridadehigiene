<?php
$host = 'localhost';
$usuario = 'root';
$contraseña = 'soporte';
$base_datos = 'mapaderiesgo';
$conexion = mysqli_connect($host,$usuario,$contraseña,$base_datos);
if(!$conexion){die('La conexión con el servidor de base de datos falló: %s\n: ' . mysqli_connect_error($conexion));}
?>