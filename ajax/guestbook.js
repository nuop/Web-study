window.onload = function(){
	//初始化
	var oUser = document.getElementById('user');
	var oReg = document.getElementById('reg');
	var oLogin = document.getElementById('login');
	var oUserinfo = document.getElementById('userinfo');
	var oShowMore = document.getElementById('showMore');
	var oDiv = document.getElementById('list');
	var iPage = 1;

	//更新用户状态
	updateUserStatus();
	updateContent();
	function updateUserStatus(){
		var uid = getCookie('uid');
		var username = getCookie('username');
		if(uid){
			oUser.style.display = 'block';
			oUserinfo.innerHTML = username;
			oReg.style.display = 'none';
			oLogin.style.display = 'none';
		} else{
			oUser.style.display = 'none';
			oUserinfo.innerHTML = '';
			oReg.style.display = 'block';
			oLogin.style.display = 'block';
		}
	}
	//更新留言内容
	oShowMore.onclick = function(){
		iPage++;
		updateContent();
	}
	function updateContent(){
		ajax('get','guestbook/index.php','m=index&a=getList&n=20&page='+iPage,function(data){
			var mes = JSON.parse(data);
			var arr = mes.data;
			if(arr){
				for(var i=0;i<arr.list.length;i++){
					Loadmes(arr.list[i]);
				}
			} 
			else {
				if(iPage == 1){
					oDiv.innerHTML = '现在还没有留言..';
				}
				oShowMore.style.display = 'none';
			}
			

		})
	}
	var uid = getCookie('uid');
	var username = getCookie('username');
	if(uid){
		oUserinfo.innerHTML = username;
		oReg.style.display = 'none';
		oLogin.style.display = 'none';
	} else{
		oUser.style.display = 'none';
	}
	//验证用户名
	var oUsername1 = document.getElementById('username1');
	var oPassword1 = document.getElementById('password1');
	var oUsername2 = document.getElementById('username2');
	var oPassword2 = document.getElementById('password2');
	var oVerifyuserNameMsg = document.getElementById('verifyUserNameMsg');

	oUsername1.onblur = function(){
		ajax('get','guestbook/index.php','m=index&a=verifyUserName&username='+this.value,function(data){
			var mes = JSON.parse(data);
			oVerifyuserNameMsg.innerHTML = mes.message;
			if(mes.code){
				oVerifyuserNameMsg.style.color = 'red';
			}else{
				oVerifyuserNameMsg.style.color = 'green';
			}
		})
	}
	//注册
	var oRegBtn = document.getElementById('btnReg');
	oRegBtn.onclick = function(){
		ajax('post','guestbook/index.php','m=index&a=reg&username='+encodeURI(oUsername1.value)+'&password='+oPassword1.value,function(data){
			var mes = JSON.parse(data);
			alert(mes.message);
		});
	}
	//登陆
	var oLoginBtn = document.getElementById('btnLogin');
	oLoginBtn.onclick = function(){
		ajax('post','guestbook/index.php','m=index&a=login&username='+encodeURI(oUsername2.value)+'&password='+oPassword2.value,function(data){
			var mes = JSON.parse(data);
			alert(mes.message);
			if(!mes.code){
				updateUserStatus();
			}
		});
	}
	//退出
	var oLogout = document.getElementById('logout');
	oLogout.onclick = function(){
		ajax('get','guestbook/index.php','m=index&a=logout',function(data){
			var mes = JSON.parse(data);
			alert(mes.message);
			if(!mes.code){
				updateUserStatus();
			}
		});
		return false;
	}
	//留言
	var oSubmit = document.getElementById('btnPost');
	var oCon = document.getElementById('content');
	oSubmit.onclick = function(){
		ajax('post','guestbook/index.php','m=index&a=send&content='+encodeURI(oCon.value),function(data){
			var mes = JSON.parse(data);
			alert(mes.message);
			if(!mes.code){
				Loadmes(mes.data,true);
			}
		});
	}
	//顶
	
	// alert(oSupport);
	// oSupport[0].onclick = function(){
	// 	alert(1);
	// 	ajax('get','guestbook/index.php','m=index&a=doSupport',function(data){
	// 		var mes = JSON.parse(data);
	// 		alert(mes.message);
	// 	})
	// }
	//踩
}

//加载留言
function Loadmes(data,insert){
	var oDiv = document.getElementById('list');
	var oDl = document.createElement('dl');
	var oDt = document.createElement('dt');
	var oStrong = document.createElement('strong');
	oStrong.innerHTML = data.username;
	oDt.appendChild(oStrong);
	var oDd1 = document.createElement('dd');
	oDd1.innerHTML = data.content;
	var oDd2 = document.createElement('dd');
	oDd2.className = 't';
	var oA1 = document.createElement('a');
	oA1.href = 'javascript:;';
	oA1.setAttribute("id","support");
	oA1.innerHTML = '顶(<span>'+data.support+'</span>)';
	var oA2 = document.createElement('a');
	oA2.href = '';
	oA2.setAttribute("id","oppose");
	oA2.innerHTML = '踩(<span>'+data.oppose+'</span>)';
	
	oDl.appendChild(oDt);
	oDl.appendChild(oDd1);
	oDl.appendChild(oDd2);
	oDd2.appendChild(oA1);
	oDd2.appendChild(oA2);

	if(insert && oDiv.children[0]){
		oDiv.insertBefore(oDl,oDiv.children[0]);
	} else{
		oDiv.appendChild(oDl);
	}
}
//获取cookie
function getCookie(key) {
	var arr1 = document.cookie.split('; ');
	for(var i=0; i<arr1.length; i++){
		var arr2 = arr1[i].split('=');
		if(arr2[0] == key){
			return arr2[1];
		}
	}
}