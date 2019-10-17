<?php
//引入mysql.php文件
include('./mysql.php');

$link =  connect();
//print_r($link);

//接受请求的方法
$fn = $_GET['fn'];
// 调用请求的方法
$fn($link); // addData($link)
/******数据修改的方法********/
function updateData($link){
    $title = $_POST['title'];
    $pos  = $_POST['pos'];
    $idea = $_POST['idea'];
    //获取需要修改的数据的id
    $id = $_GET['id'];
    $sql = "update phone_copy set title='$title',pos='$pos',idea='$idea' where id=$id";
    echo query($link,$sql);
}
/**********删除数据的方法***********/
function delData($link){
     // 获取删除数据的id
     $id = $_GET['id'];
     $sql = "delete from phone_copy where id = $id";
     echo query($link,$sql);
}

/******获取数据的方法**********/
function getOneData($link){
    // 获取js传递的id
    $id = $_GET['id'];
    $sql = "select * from phone_copy where id=$id";
    $res = select($link,$sql);
    //print_r($res);
    echo json_encode($res);
}
function getData($link){
    /******排序的实现*****/
    $field = isset($_GET['field']) ?  $_GET['field'] : 'id';
    $sort  = isset($_GET['sort']) ? $_GET['sort'] : 'asc';
    $tmpSql = "order by $field $sort";
    /*******分页的实现*****/
    //1 设置每页显示的条数
     $pageLimt = 4;
    // 2 获取总的记录数
     $countSql = 'select count(*) dataCount from phone_copy';
     $count =   select($link,$countSql);
    // print_r($count);die;
    $count = $count[0]['dataCount'];
    //print_r($count);die;
    // 3 计算显示的页数
     $pageCount  = ceil($count/$pageLimt);
     //print_r($pageCount);die;
    //4 计算起始位置
    // isset() 判断一个变量是否存在
     $start = isset($_GET['page']) ? $_GET['page'] : 1;
     $start = ($start-1)*$pageLimt;
    // 5 拼接sql语句
    $sql = "select * from phone_copy $tmpSql limit $start,$pageLimt";
   
    $res = select($link,$sql);
    $resInfo = array(
         'res'=>$res,
          'count'=>$pageCount //向js中传递总的页数
    );
   //  print_r($resInfo);die;
    echo json_encode( $resInfo);
}
/*********添加数据的方法******/
function addData($link){
  // 接受表单数据
    $title = $_POST['title'];
    $pos  = $_POST['pos'];
    $idea = $_POST['idea'];
    // print_r($idea);
    // print_r($title);
    // print_r($pos);
    // 将数据插入数据库,变量要加单引号
    $sql = "insert into phone_copy values(null,'$title','$pos','$idea')";
    $result = query($link,$sql);
    print_r($result);
}

?>