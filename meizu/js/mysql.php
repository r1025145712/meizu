<?php
function connect(){
    $link = mysqli_connect('127.0.0.1','root','xiaosena','stu1918',3306);
    if(!$link){
        echo '连接失败';
        die;
    }
    return $link;
}
// 执行删除,添加,修改
function query($link,$sql){
    $res = mysqli_query($link,$sql);
    return $res;
}
// 执行查询的方法
function select($link,$sql){
    $res=mysqli_query($link,$sql);
    if(!$res){
        echo '失败';
        die;
    }
    // 处理结果集
    $arr = [];
    while($tmp = mysqli_fetch_assoc($res)){
        $arr[] = $tmp;
    }
    return $arr;
}


?>