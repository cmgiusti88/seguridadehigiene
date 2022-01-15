<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
  header('Content-type:application/json;charset=utf-8');
  require_once('../conexion.php');

  $usuario = mysqli_real_escape_string($conexion,$_POST['usuario']);
  $contrasena = mysqli_real_escape_string($conexion,$_POST['contrasena']);

  $sql = "SELECT login_usuario FROM acceso WHERE login_usuario = '$usuario'";
  $resultado = mysqli_query($conexion,$sql)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
  $fila = mysqli_fetch_assoc($resultado);

  if($fila['login_usuario'] != $usuario)
  {
    $lista = array('estado'=>'error','motivo'=>'No existe el usuario');
  }
  else
  {
    $sql1 = "SELECT A.login_usuario,A.login_clave,B.descripcion,A.nombre,A.apellido 
    FROM acceso A, ccosto B 
    WHERE A.id_oficina = B.id_ccosto 
    AND (A.login_usuario = '$usuario' AND A.login_clave = '$contrasena')";
    $resultado1 = mysqli_query($conexion,$sql1)or die('no se ha podido realizar la consulta -> '. mysqli_error($conexion));
    $fila1 = mysqli_fetch_assoc($resultado1);

    if($fila1['login_clave'] != $contrasena)
    {
      $lista = array('estado'=>'error1','motivo'=>'La contraseña es incorrecta');
    }
    else
    {
      $usuario_ingresar = utf8_encode($fila1['login_usuario']);
      $nombre_usuario_ingresar = utf8_encode($fila1['nombre']).' '.utf8_encode($fila1['apellido']);
      $oficina_usuario_ingresar = utf8_encode($fila1['descripcion']);
      $lista = array('usuario_ingresar'=>$usuario_ingresar,'nombre_usuario_ingresar'=>$nombre_usuario_ingresar,'oficina_usuario_ingresar'=>$oficina_usuario_ingresar);
    }
    mysqli_free_result($resultado1);
  }
  mysqli_free_result($resultado);
  echo json_encode($lista);
  mysqli_close($conexion);
  exit;
}
?>