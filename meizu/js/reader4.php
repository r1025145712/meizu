<?php
/*
php代码的推荐语法格式:<?php coding ?>，以尖括号问号php开头，问号尖括号结束，coding表示php代码区。
*/
header("content-type:text/html;charset=utf-8");         //设置编码解决中文乱码问题
header('Access-Control-Allow-Origin:*');
function main(){
    session_start();
    $pageLimt = 3;
    $start = isset($_GET['page']) ? $_GET['page'] : 1;
     $start = ($start-1)*$pageLimt;
    $connection=new mysqli("127.0.0.1","root","xiaosena","stu1918");//实例化一个MySQL链接
    if($connection->error){//判断链接是否成功
        die("connect error!");//如果失败，结束并输出一个提示信息
    }else{//如果成功执行一下信息 recordset
        if($rs=$connection->query("select * from phone_copy;")){//$connection->query("select * from students;") 返回记录集
            //query方法可用于查询更新数据库信息
            echo "{code:2000,list:[";
            while($row=$rs->fetch_assoc()){//循环遍历数据库中表内的数据，每次循环读出一条数据并赋值给$row变量，一条信息就是表中的一行信息
                echo "{ID:".$row["ID"].",name:'".$row["p_name"]."',image:'".$row["p_image"]."',
                    image1:'".$row["p_image1"]."',money:'".$row["p_money"]."',
                    money1:'".$row["p_money1"]."',price:'".$row["p_price"]."',size:'".$row["p_size"]."',color:'".$row["p_color"]."'
                    ,volume:'".$row["p_volume"]."'},";
            }
            echo "]}";
            
        }
        $connection->close();//读取完毕以后，关闭数据库链接。目的节省数据库开销，否则数据库容易崩溃
    }
}
// /******获取数据的方法**********/
// function getOneData($link){
//     // 获取js传递的id
//     $id = $_GET['id'];
//     $sql = "select * from problem where id=$id";
//     $res = select($link,$sql);
//     //print_r($res);
//     echo json_encode($res);
// }
// function getData($link){
//     /*******分页的实现*****/
//     //1 设置每页显示的条数
//      $pageLimt = 3;
//     // 2 获取总的记录数
//      $countSql = 'select count(*) dataCount from problem';
//      $count =   select($link,$countSql);
//     // print_r($count);die;
//     $count = $count[0]['dataCount'];
//     //print_r($count);die;
//     // 3 计算显示的页数
//      $pageCount  = ceil($count/$pageLimt);
//      //print_r($pageCount);die;
//     //4 计算起始位置
//     // isset() 判断一个变量是否存在
//      $start = isset($_GET['page']) ? $_GET['page'] : 1;
//      $start = ($start-1)*$pageLimt;
//     // 5 拼接sql语句
//     $sql = "select * from problem order by id asc limit $start,$pageLimt";
   
//     $res = select($link,$sql);
//     $resInfo = array(
//          'res'=>$res,
//           'count'=>$pageCount //向js中传递总的页数
//     );
//    //  print_r($resInfo);die;
//     echo json_encode( $resInfo);
// }
main();
?>