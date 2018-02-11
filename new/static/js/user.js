	var infoone=15;//一页显示的信息数
	function selUsers(){
		var html= "";
		var _url="/price/Users/json";
        $.ajax({
		    url:_url,
			type:"post",
			async:false,
			cache:false,
			dataType:"json",
			success:function(json){
			    if(json.main.data==null){
				    alert("暂时没有账户，去增加一个吧");
				}else{
					var yeshu="";				 	 		 
					yeshu+="<span>第 <b style='color:red'><em id='page_1'> 1 </em> / <em id='count'>  </em></b> 页 </span>  <a id='first' > 首页 </a><a id='previous'> 上一页 </a><a id='next'> 下一页 </a><a id='last' > 尾页 </a>";
					$('.basicpage').html(yeshu);
					for(var j=0; j < json.main.data.length;  j++){
						if(json.main.data[j].UserName=="Operator"){
							json.main.data.splice(j, 1);
							j--;
						}
						if(json.main.data[j].UserName=="Guest"){
							json.main.data.splice(j, 1);
							j--;
						}
					}
					paging(0,infoone,json.main.data);
					getPage(infoone,json.main.data);
				}
			}
		});
	}
function paging(page,length,arr){
	var sstatus="",html="",mhtml="",createtime,rolename;
	var end = page+infoone;
	var pageone = end>arr.length?arr.length:end;
		for(var i=page;i<pageone;i++){	
			createtime=arr[i].CreateTime.substr(0,10);
			if(arr[i].Roles=="[\"Operator\"]"){
				rolename="系统维护员";
			}else if(arr[i].Roles=="[\"Administrator\"]"){
				rolename="系统管理员";
			}else if(arr[i].Roles=="[\"Staff\"]"){
				rolename="员工";
			}else if(arr[i].Roles=="[\"Enterprise\"]"){
				rolename="客户";
			}else if(arr[i].Roles=="[\"Guest\"]"){
				rolename="来宾";
			}else{
				rolename = "其他";
			}
			if(arr[i].Status==true ){
				sstatus="有效";

				  html+="<tr style='height:40px;color:black'><td ><input type='checkbox'  name='chkSon' class='doublek' value='"+arr[i].id+"'/></td><td>"+arr[i].UserName+"</td><td >"+createtime+"</td><td>"+sstatus+"</td><td>"+arr[i].CompanyName+"</td><td>"+arr[i].Email+"</td> <td>"+arr[i].Mobile+"</td><td>"+arr[i].Attn+"</td><td>"+rolename+"</td><td>"+arr[i].StrProp3+"</td><td>系数:"+arr[i].IntProp1+"</br>浮动金额:"+arr[i].IntProp2+"</td><td><input class='modify' type='button' value='修改' style='margin-right:5%'/><input class='del' type='button' value='删除' style='margin-right:5%'/><input value="+arr[i].id+" type='hidden'/></td></tr>";
			   
			}else{
				if(rolename=="待审客户"){
					sstatus="待审核";
				}else{
					sstatus="冻结";					
				}				
				html+="<tr style='height:40px;color:#666'><td ><input type='checkbox'  name='chkSon' class='doublek' value='"+arr[i].id+"'/></td><td>"+arr[i].UserName+"</td><td >"+createtime+"</td><td>"+sstatus+"</td><td>"+arr[i].CompanyName+"</td><td>"+arr[i].Email+"</td> <td>"+arr[i].Mobile+"</td><td>"+arr[i].Attn+"</td><td>"+rolename+"</td><td>"+arr[i].StrProp3+"</td><td>系数:"+arr[i].IntProp1+"</br>浮动金额:"+arr[i].IntProp2+"</td><td><input class='modify' type='button' value='修改' style='margin-right:5%'/><input class='del' type='button' value='删除' style='margin-right:5%'/><input value="+arr[i].id+" type='hidden'/></td></tr>";	
			}				 	
		}		
		$("#addUser_tbl1_tbody").empty();
		$("#addUser_tbl1_tbody").append(html);	
}	
function getPage(infoone,arr){
	$('.basicpage>a').click(function(){
		 $(this).css('color','white');
		 $(this).css('background','#0A89E4');
		 $(this).siblings().css('color','black');
		 $(this).siblings().css('background','none');
	});
	var infonum=arr.length;//信息总数
	var pagenum=parseInt(Math.ceil(infonum/infoone));//显示的页数
	$('#count').html(pagenum);
	   //alert(infonum);
	//点击 首页
	$("#first").on("click",function(){
		 page=1;
		 $('#page_1').html(page);
		 paging((page-1)*infoone,infoone,arr);
	});
	//点击 尾页
	$("#last").on("click",function(){  
		 page = pagenum ;
		 $('#page_1').html(pagenum);
		 paging((page-1)*infoone,infoone,arr);
	});
	//上一页
	$("#previous").on("click",function(){
		 page = $("#page_1").text();
		 if(page <= 1){//点击到首页时
			alert("已经是第一页！");
		 }else if(page == pagenum){//点击到尾页时
			$('#page_1').html(pagenum-1);
			paging((page-2)*infoone,infoone,arr);
		 }else{
			paging((page-2)*infoone,infoone,arr);
			page--;
			$('#page_1').html(page);
		 }
	});
	//下一页
	$("#next").on("click",function(){
		 page = $("#page_1").text();
		 if(page >= pagenum){//点击到尾页时
			alert("已经是最后一页");
		 }else{
			paging(page*infoone,infoone,arr);
			page++;
			$('#page_1').html(page);
		 }
		});
	}
$(function(){
	selUsers();
	$("#userquery").click(function(){
	   var username=$("#username").val();//用户名
	   var companyname=$("#companyname").val();//公司名
	   var Status=$("#userstatus").val();//状态
	   var Roles=$("#userrole").val();//角色
	   var StrProp3=$("#usergrade").val();//等级 
	   var searchtml="",createtime,sstatus;
	   var _url="/Price/Users/json?UserName="+username+"&CompanyName="+companyname+"&Status="+Status+"&Roles="+Roles+"&StrProp3="+StrProp3;
		jQuery.ajax({
            url:_url,
            dataType: 'json',  
            type: "Get",
			cache:false,
			async:false,
            success: function(json){ 			
				 if(json.main.data==null){
				    alert("没有符合查询条件的用户");
				}else{
					var yeshu="";				 	 		 
					yeshu+="<span>第 <b style='color:red'><em id='page_1'> 1 </em> / <em id='count'>  </em></b> 页 </span>  <a id='first' > 首页 </a><a id='previous'> 上一页 </a><a id='next'> 下一页 </a><a id='last' > 尾页 </a>";
					$('.basicpage').html(yeshu);			  
					paging(0,infoone,json.main.data);
					getPage(infoone,json.main.data);
				}
            },         
        });	
	})		
})	

  //新增用户
	function add(){
	  $("#MyDiv").css("display","block");
	  $("#fade").css("display","block");
	  $("#SignerName").val("");
	  $("#Password").val("");
	  $("#CompanyName").val("");
	  $("#Email").val("");
	  $("#TelePhone").val("");
	  $("#Attn").val("");
	  $("#dengji").val("");	 
	  $("#Dept").val("");
	  $("#Company").val("");
	}
	function insert_sure(){
		var SignerName=$("#SignerName").val();//登录名	
		var Password=$("#Password").val();//密码
		var Status=$("#status").val();//状态
		var CompanyName=$("#CompanyName").val();//公司名
		var Email=$("#Email").val();//邮箱
		var Mobile=$("#TelePhone").val();//电话		
		var Attn=$("#Attn").val();//联系人
		var StrProp3=$("#dengji").val();//等级	
		var Roles=$("#role").val();//角色
		var Intprop1=$("#Rate").val();//系数整柜
		var Intprop2=$("#Floatamt").val();//浮动金额整柜
		var Intprop3=$("#IntProp1").val();//系数拼箱
		var Intprop4=$("#IntProp2").val();//浮动金额拼箱
		//var StrProp1=$("#Dept").val();//所属部门		
		//var StrProp2=$("#Company").val();//所属分公司
		if(SignerName=="" || Password==""){
			alert("请输入登录名和密码");
			return false;			
		}	
		if(CompanyName==""){
			alert("请输入公司名");
			return false;			
		}
		
		if(Email==""){
			alert("请输入邮箱");
			return false;
		}
		//邮箱格式					
		/*var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(email)) {
            alert("邮箱格式不正确");
			return false;
        }*/		
		jQuery.ajax({
			url:"doAddUser?UserName="+SignerName+"&password="+Password+"&Attn="+Attn+"&Mobile="+Mobile+"&CompanyName="+CompanyName+"&Email="+Email+"&Status=1&Roles="+Roles+"&Intprop1="+Intprop1+"&Intprop2="+Intprop2+"&Intprop3="+Intprop3+"&Intprop4="+Intprop4+"&StrProp3="+StrProp3,
			type:"POST",
			cache:false,
			async:false,
			success:function(data){
				if(data.result.success==true){
                   alert('添加成功');
				    selUsers();
				   $("#MyDiv").css("display","none");
				   $("#fade").css("display","none");
				}else {
					alert('失败！\n' + data.error.message);
				}
			} 
		});			
	}
	delall();
//修改
	$("#addUser_tbl1_tbody").on("click",".modify",function(){
		$("#MyDiv").css("display","block");
		$("#fade").css("display","block");
		$("#Password").val("");
		$("#Dept").val("");
		$("#Company").val("");		
		var userid=$(this).nextAll("[type=hidden]").val();
		$("#userid").val(userid);//id
		$.ajax({
		    type:'GET',
			url:'/Price/Users/json?id='+userid,
			datatype:'json',
			async:false,
			cache:false,
			success:function(json){
				var data=json.main.data;
				$("#SignerName").val(data[0].UserName);	//登录名	
				$("#status").val(data[0].Status);//状态
				$("#CompanyName").val(data[0].CompanyName);//公司名
				$("#Email").val(data[0].Email);			//邮箱
				$("#TelePhone").val(data[0].Mobile);//电话							
				$("#Attn").val(data[0].Attn);//联系人
				$("#dengji").val(data[0].StrProp3);//等级			
				$("#role").val(data[0].Roles);//角色				
				$("#Rate").html(data[0].Intprop1);//系数整柜				
				$("#Floatamt").html(data[0].Intprop2);//浮动金额整柜
				$("#IntProp1").html(data[0].Intprop3);//系数拼箱				
				$("#IntProp2").html(data[0].Intprop4);//浮动金额拼箱	
				// $("#Dept_1").val(data[0].DeptID);//部门
				// $("#Company_1").val(data[0].CompanyID);//分公司				
			},
		});		
	})
	function update_sure(){
		var userid=$("#userid").val();//id
		var SignerName=$("#SignerName").val();//登录名	
		var Password=$("#Password").val();//密码
		var Status=$("#status").val();//状态
		var CompanyName=$("#CompanyName").val();//公司名
		var Email=$("#Email").val();//邮箱
		var Mobile=$("#TelePhone").val();//电话		
		var Attn=$("#Attn").val();//联系人
		var StrProp3=$("#dengji").val();//等级	
		var Roles=$("#role").val();//角色
		var Intprop1=$("#Rate").val();//系数整柜
		var Intprop2=$("#Floatamt").val();//浮动金额整柜
		var Intprop3=$("#IntProp1").val();//系数拼箱
		var Intprop4=$("#IntProp2").val();//浮动金额拼箱
		// var depart_1=$("#Dept_1").val();//所属部门		
		// var company_1=$("#Company_1").val();//所属分公司
		var urlx="/Users?";	
		if(CompanyName==""){
			alert("请输入公司名");
			return false;			
		}		
		if(Email==""){
			alert("请输入邮箱");
			return false;
		}
		//邮箱格式					
		var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
       /* if (!reg.test(email1)) {
            alert("邮箱格式不正确");
			return false;
        }  */
        if(!userid){
        	var urlx="doAddUser?UserName="+SignerName+"&password="+Password+"&Attn="+Attn+"&Mobile="+Mobile+"&CompanyName="+CompanyName+"&Email="+Email+"&Status=1&Roles="+Roles+"&Intprop1="+Intprop1+"&Intprop2="+Intprop2+"&Intprop3="+Intprop3+"&Intprop4="+Intprop4+"&StrProp3="+StrProp3;
        	jQuery.ajax({
			url:"doAddUser?UserName="+SignerName+"&password="+Password+"&Attn="+Attn+"&Mobile="+Mobile+"&CompanyName="+CompanyName+"&Email="+Email+"&Status=1&Roles="+Roles+"&Intprop1="+Intprop1+"&Intprop2="+Intprop2+"&Intprop3="+Intprop3+"&Intprop4="+Intprop4+"&StrProp3="+StrProp3,
			type:"POST",
			cache:false,
			async:false,
			success:function(data){
				if(data.result.success==true){
                   alert('添加成功');
				    selUsers();
				   $("#MyDiv").css("display","none");
				   $("#fade").css("display","none");
				}else {
					alert('失败！\n' + data.error.message);
				}
			} 
		});
        }else{
        	if(Password==""){	
				var urlx="doModifyUser?id="+userid+"&UserName="+SignerName+"&Attn="+Attn+"&Mobile="+Mobile+"&CompanyName="+CompanyName+"&Email="+Email+"&Status="+Status+"&Roles="+Roles+"&Intprop1="+Intprop1+"&Intprop2="+Intprop2+"&Intprop3="+Intprop3+"&Intprop4="+Intprop4+"&StrProp3="+StrProp3;
			}else{
				var urlx="doModifyUser?id="+userid+"&UserName="+SignerName+"&password="+Password+"&Attn="+Attn+"&Mobile="+Mobile+"&CompanyName="+CompanyName+"&Email="+Email+"&Status="+Status+"&Roles="+Roles+"&Intprop1="+Intprop1+"&Intprop2="+Intprop2+"&Intprop3="+Intprop3+"&Intprop4="+Intprop4+"&StrProp3="+StrProp3;
			}
			jQuery.ajax({
				url:urlx,
				type:"POST",
				cache:false,
				async:false,
				success:function(data){
					if(data.result.success==true){
	                   alert('修改成功');
					   selUsers();
					   $("#MyDiv").css("display","none");
					   $("#fade").css("display","none");
					}else {
						alert('失败！\n' + data.error.message);
					}
				} 
			});	
        }
		
		
	}

function delall(){
	$("#addUser_tbl1_tbody").on("click",".del",function(){
		var yes= window.confirm("确定删除选中的吗？");
		if(yes){
			var userid=$(this).nextAll("[type=hidden]").val();
			var _this = $(this).parent().parent();
			var username=_this.children("td").eq(1).text();
			if(username == "Admin"){
				alert("无法删除！");
			}else{
				$.ajax({
					url:"doDeleteUser?id="+userid+"&UserName="+username,
					type:"post",
					cache:false,
					async:false,
					success:function(data){
						if(data.result.success==true){
							_this.remove();				
						}else {
							alert('失败！\n' + data.error.message);
							falg=false;	
							console.log(data);	
						}
					} 	   					
				});
			}
			
		}
	
	})
}
	//全选
function ChkAllClick(sonName, cbAllId){
     var arrSon = document.getElementsByName(sonName);
	 var cbAll = document.getElementById(cbAllId);
	 var tempState=cbAll.checked;
	 for(i=0;i<arrSon.length;i++) {
	  if(arrSon[i].checked!=tempState)
			arrSon[i].click();
	 }
}

	


var falg=false;
function freeze(){ 
	$("#addUser_tbl1_tbody tr").each(function(){	
		if($(this).children().children(".doublek").is(":checked")){			
			var checked=$(this).children().children(".doublek").val();
			var singername=$(this).children("td").eq(1).text();
			var wuxiao=$(this).children("td").eq(3);
			$.ajax({
				type:'POST',
				url:'doModifyUser?id='+checked+'&UserName='+singername+'&Status=0',
				async:false,
				success:function(json){
					console.log(checked, singername)
					if(json.result.success==true){
						wuxiao.text("冻结");
						falg= true;
						wuxiao.parent("tr").css("color","#666");
					}else{
						alert("用户状态修改失败！"+json.error.message);
						flag= false;            
					}
				}
			});				
		}			
	})
	 if(falg==true){
		alert('冻结成功！');
	 }
	if($("input[class='doublek']:checked").length==0){
		alert("请至少选择一位客户！");
	}
}
//解冻
function thaw(){
	$("#addUser_tbl1_tbody tr").each(function(){			
		if($(this).children().children(".doublek").is(":checked")){				
			var checked=$(this).children().children(".doublek").val();
			var singername=$(this).children("td").eq(1).text();
			var wuxiao=$(this).children("td").eq(3);
			$.ajax({
				type:'POST',
				url:'doModifyUser?id='+checked+'&UserName='+singername+'&Status=1',
				async:false,
				success:function(json){
					console.log(checked, singername)
					if(json.result.success==true){
						wuxiao.text("有效");
						falg=true;
						wuxiao.parent("tr").css("color","black");							
					}else{
						alert("用户状态修改失败！"+json.error.message);
						falg= false;  
					}
				}
			});				
		}			
	})
	if(falg==true){
		alert('解冻成功！');			
	}
	if($("input[class='doublek']:checked").length==0){
		alert("请至少选择一位客户！");
	}		
}