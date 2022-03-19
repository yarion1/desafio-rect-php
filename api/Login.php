<?php
    
    
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    
    class Login {
         
        
        public function validaLogin($param){
            require './Conexao.php';
            

            // esse $param é as informaçoes passadas via post
            $usuario = $param['Usuario'];
            $senha   = $param['Senha'];
           
               if ( empty($usuario) ){header('erro');}  
               if ( empty($senha) )  {header('erro');}   
                
            $sql = "SELECT  * from loginsession where user_name = :usuario and user_pass = :senha ";
            $sql = $pdo->prepare($sql);
            $sql->bindValue(':usuario',$usuario);
            $sql->bindValue(':senha',$senha);
            $result=$sql->execute();
            echo json_encode($sql->rowCount()>0);
            
                if ($sql->rowCount() > 0){
                    
                    session_start();
                     $_SESSION['usuario'] = $usuario;
                     $_SESSION['autenticado'] = true;
                   
                     return('location:http://localhost:3000/viewFilms');
                }else{
                     
                     header('error');
                }
        }

    }
