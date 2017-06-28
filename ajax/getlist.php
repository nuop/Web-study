<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$list = array(
	array('title'=>'f','time'=>'1'),
	array('title'=>'f','time'=>'1'),
	array('title'=>'fdf','time'=>'132'),
	array('title'=>'gg','time'=>'15'),
	array('title'=>'升水','time'=>'14'),
	array('title'=>'fdf','time'=>'16'),
);

echo json_encode($list);