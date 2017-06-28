<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$username = $_POST['username'];
echo "欢迎你的xx，用户名：{$username}";