function signin(){
	var sn = $("#username").val().trim();
	var pw = $("#password").val().trim();						
	//Verify username and password
	if(sn==""){ alert("用户名不能为空"); return false; }						
	if(pw==""){ alert("密码不能为空"); return false; }
	$.ajax({
	       url: "doLogin?name=" + sn + "&pw=" + pw,
		async: true,
		success:function(data){
			if(data.result.success==true){
				window.location.href="default";
			}else{
			      alert(data.error.message);
			}
		} 
	});						
	return false;
};
function signkeypress(e){
	var keycode=document.all?event.keyCode:e.which;.
	if(keycode==13) {
		var wd = $("#username").val().trim();
		if(wd==""){ $("#username").focus(); return false; }
		wd = $("#password").val().trim();
		if(wd==""){ $("#password").focus(); return false; }		
		return signin();
	};	
	return true; 
};

// 忘记密码
function forgetpassword(){
	var wjuser=$('#wjuser').val();//用户名
	var wjcompany=$('#wjcompany').val();//公司名
	var wjmobile=$('#wjmobile').val();//手机号
	$.ajax({
		url: "doForgetPassword?name="+wjuser+"&CompanyName="+wjcompany+"&Mobile="+wjmobile,
		type: 'POST',
		success:function(data){
			if(data.result.success==true){
				alert('成功');
				$('.left').css('display','block');
				$('#getpassword').val(data.result.password);
						//window.location.href="/qp/default";
			}else{
				alert('失败\n' + data.error.message);				   
			}
		} 		
	});	
}
//修改密码
function ensureset(){
	var name=$('#user').val();
	var oldpass=$('#oldpass').val();
	var newpass=$('#newpass').val();
	var newpass2=$('#newpass2').val();
	if(newpass!=newpass2){
		 alert("密码不一致,重新输入");
		 return false;
	}
	if(name=="" ){
		alert("用户名不能为空");
		return false;
	}
	if(oldpass=="" ){
		alert("原密码不能为空");
		return false;
	}
	if(newpass=="" ){
		alert("新密码不能为空");
		return false;
	}
	$.ajax({
		url:"doResetPassword?name="+name+"&old="+oldpass+"&new="+newpass,
		type: 'POST',
		success:function(data){
			if(data.result.success==true){
				alert('修改成功');
				window.location.href="Default";
			}else {
				alert('修改失败！\n' + data.error.message);				   
			}
		} 		
	});
}
//退出
function signout(){
	$.ajax({
		url: "doLogout",
		async: true,
		success:function(data){
			if(data.result.success==true){
				window.location="Default";
			}else{
				alert(data.error.message);
			}
		} 
	});
	return false;
};

