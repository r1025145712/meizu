<?php
    header("content-type:text/html;charset=utf-8");//解决中文乱码问题
    //session_start();//开启服务器session
    $req=$_GET;
    if(isset($_SESSION["user"]) && $_SESSION["user"]==$req["account"]){
        echo "{code:2000,comment:'您已经登录成功'}";
    }else{
        $connect=new mysqli("localhost","root","xiaosena","stu1918");
        if(!$connect->error){
            //echo "select * from s1918 where name='".$_GET["account"]."' and pwd='".$_GET["pwd"]."';";
            $rs=$connect->query("select * from login where id='".$req["id"]."' and pwd='".$req["pwd"]."';");
            if($row=$rs->fetch_assoc()){
                $_SESSION["user"]=$req["id"];//保存用户信息20分钟
                echo "{code:2000,comment:'首次登录成功'}";
            }else{
                echo "{code:1000,comment:'用户信息错误'}";
            }
            $connect->close();
        }
    }
?>