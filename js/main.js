// JavaScript Document
$(function(){
	
	/* IE浏览器兼容样式 */
	IsIeBrowser();
	/* 绑定滚动条插件 */
	BindniceScroll();
	/* 主窗口自适应屏幕高度 */
	AutoSize();
	/* 窗口调整事件 */
	window.onresize = AutoSize;
	
	
	/* 点击导航和按钮显示对应的分类列表 */
	$("a").on("click",function(){
		if($(this).attr("data-key")){
			MoudleList.key = $(this).attr("data-key");
			ShowDemoStart();
		}
	})
	
	
	$("a.show-menu").on("click",function(){
		if(MoudleList.turnPage){
			$(".empty").hide();
			$("#menu").fadeIn(300);
			$("#demo-list").fadeOut(300);
		}else{
			$("#diary").find("iframe").attr("src","");
			ShowDemoStart();
		}
		
	})
	/* 上一页 */
	$(".prepage").on("click",function(){
		PreDemoList();
	})
	/* 下一页 */
	$(".nextpage").on("click",function(){
		NextDemoList();
	})
	
	
	
	
})

/* 触发点击事件或者搜索之后调用的函数 */
function ShowDemoStart(){
	if(BaseData[MoudleList.key].length<=0){
		$(".empty").html(MoudleList.key == "search" ? "你是想要搜索些什么呢？" : "该分类下暂无内容");
		ShowEmpty();
	}
	else{
		ShowNotEmpty();
		ShowDemoList();
	}
	MoudleList.turnPage = true;
}


/* 列表为空 */
function  ShowEmpty(){
	$("#menu").fadeOut(300);
	$(".demo-list").hide().empty().removeClass("diary");
	$(".empty").show();
	$("#demo-list").fadeIn(300);
	$("#diary").hide();
}
function ShowNotEmpty(){
	$("#menu").fadeOut(300);
	$("#demo-list").fadeIn(300);
	$(".demo-list").empty().show().removeClass("diary");
	$(".empty").hide();
	$("#diary").hide();
}
/* 分类模块列表显示操作 */
function ShowDemoList(){
	var dialog = ["divcss","game","javascript"],
		mobile = "mobile";
	/*MoudleList.bool = dialog.indexOf(MoudleList.key)>= 0;
	MoudleList.singlePageCount = MoudleList.bool ? 6 : 12;
	MoudleList.currentPage = 0;
	MoudleList.totalPage = Math.ceil(BaseData[MoudleList.key].length/MoudleList.singlePageCount)-1;
	MoudleList.listClass = "";
	MoudleList.handle = MoudleList.bool ? ShowCurrentListDemo : ShowCurrentListDiary;
	MoudleList.handle();*/
	
	
	var type = dialog.indexOf(MoudleList.key)>= 0 ? "demo" : (MoudleList.key==mobile ? mobile : "diary");
	MoudleList.singlePageCount = (type =="demo") ? 6 : (type==mobile)? 3 : 12;
	MoudleList.currentPage = 0;
	MoudleList.totalPage = Math.ceil(BaseData[MoudleList.key].length/MoudleList.singlePageCount)-1;
	MoudleList.listClass = "";
	MoudleList.handle = (type =="demo") ? ShowCurrentListDemo : (type==mobile)? ShowMobileDemo:ShowCurrentListDiary;
	if(type == "mobile"){
		$("#content").addClass("mobile");
	}else{
		$("#content").removeClass("mobile");
	}
	MoudleList.handle();
	
}
/* 显示当前页 mobile分类 */
function ShowMobileDemo(){
	var list_arr = BaseData[MoudleList.key],baseCount = MoudleList.singlePageCount,DomLi = [];
	var before_list_num = MoudleList.currentPage*baseCount;
	count = list_arr.length - before_list_num;
	count = count <= baseCount ? count : baseCount;
	for(var i=before_list_num;i<before_list_num+count;i++){
		var items = list_arr[i],url = "demo/"+ items.key +"/"+ items.id +"/",
			title = items.name,dec = items.desc_s;
		DomLi.push("<li>");
		DomLi.push("<iframe src='"+ items.weblink +"'></iframe>");
		DomLi.push("<a class='viewdemo' target='_blank' href='"+ items.weblink +"'>viewdemo");
		DomLi.push("<a class='download' href='"+ items.id +".rar'>download</a>");
		DomLi.push("</li>");
	}
	setTimeout(function(){
		$(".demo-list").html(DomLi.join("")).hide().fadeIn(300);
	},100)
}
/* 显示当前页 DEMO分类 */
function ShowCurrentListDemo(){
	var list_arr = BaseData[MoudleList.key],baseCount = MoudleList.singlePageCount,DomLi = [];
	var before_list_num = MoudleList.currentPage*baseCount;
	count = list_arr.length - before_list_num;
	count = count <= baseCount ? count : baseCount;
	for(var i=before_list_num;i<before_list_num+count;i++){
		var items = list_arr[i],url = "demo/"+ items.key +"/"+ items.id +"/",
			title = items.name,dec = items.desc_s;
		DomLi.push("<li>");
		DomLi.push("<a target='_blank' href='"+items.weblink +"'>");
		DomLi.push("<img src='"+ items.pic +"' alt='"+ title +"' />");
		DomLi.push("</a>");
		DomLi.push("<div class='info'><h2>"+ title +"</h2><span>"+ dec +"</span></div>");
		DomLi.push("<a class='download' target='_blank' href='"+ url +items.id +".rar'>download</a>");
		DomLi.push("</li>");
	}
	setTimeout(function(){
		
		$(".demo-list").html(DomLi.join("")).hide().fadeIn(300);
	},100)
	
}
/* 显示当前页 Diary分类 */
function ShowCurrentListDiary(){
	var list_arr = BaseData[MoudleList.key],baseCount = MoudleList.singlePageCount,DomLi = [];
	var before_list_num = MoudleList.currentPage*baseCount;
	count = list_arr.length - before_list_num;
	count = count <= baseCount ? count : baseCount;
	
	for(var i=before_list_num;i<before_list_num+count;i++){
		var items = list_arr[i],url = (items.weblink ? "demo/" : "diary/")+ items.key +"/"+ items.id +"/",
			title = items.name,file = items.file;
		DomLi.push("<li>");
		if(items.weblink){
			DomLi.push("<a target='_blank' href='"+ url + items.weblink +"'>"+ title +"");
		}
		else{
			DomLi.push("<a data-path='"+ url + file +"' href='javascript:void(0);'>"+ title +"");
		}
		DomLi.push("</li>");
	}
	setTimeout(function(){
		$(".demo-list").addClass("diary").html(DomLi.join("")).hide().fadeIn(300);
		ShowDiaryList();
	},100)
}
/* 上一页 */
function PreDemoList(){
	if(MoudleList.currentPage>0){
		MoudleList.currentPage--;
		$(".demo-list").fadeOut(300);
		//ShowCurrentList();
		MoudleList.handle();
	}
}
/* 下一页 */
function NextDemoList(){
	if(MoudleList.currentPage<MoudleList.totalPage){
		MoudleList.currentPage++;
		$(".demo-list").fadeOut(300);
		//ShowCurrentList();
		MoudleList.handle();
	}
}

function AutoSize(){
	if($(window).height()<=670){
		$("#content").css({"margin-top":"0px","top":"80px"});
	}else{
		$("#content").removeAttr("style");
	}
}

function IsIeBrowser(){
	var browser=navigator.appName;
	var list = ["Netscape","Microsoft Internet Explorer"];
	if(list.indexOf(browser)>=0){
		$("head").append("<link href='css/index_ie.css' type='text/css' rel='stylesheet'>");
	}
}

function BindniceScroll(){
	$("#diary iframe").niceScroll();
	$(".mobile .demo-list li iframe").niceScroll();
}

function ShowDiaryList(){
	$(".demo-list.diary li a").on("click",function(){
		if($(this).attr("data-path")){
			MoudleList.turnPage = false;
			ShowNotEmpty();
			$("#diary").show().find("iframe").attr("src",$(this).attr("data-path"));
		}
	})
}
/* 检测链接 */
function CheckLocation(){
	var href = window.location.href,
		params = href.split("?")[1];
		if(!params) return;
	var paramArr = params.split("&");
	var paramObj = {};
		paramArr.map(function(items){
			var obj = items.split("=");
			paramObj[obj[0]] = obj[1];
		})
	var Timer = null;
	Timer = setInterval(function(){
		if(BaseData[paramObj.key] && BaseData[paramObj.key].length>0){
			MoudleList.key = paramObj.key;
			var file = BaseData[paramObj.key].filter(function(items){
				return items.key == paramObj.key;
			})[0].file;
			var href = "diary/"+paramObj.key+"/"+paramObj.id+"/"+file;

			clearInterval(Timer);
			Timer = null;

			var dialog = ["divcss","game","javascript","mobile"];
			if(dialog.indexOf(paramObj.key)>=0){
				ShowDemoStart();
			}else{
				MoudleList.turnPage = false;
				ShowNotEmpty();
				$("#diary").show().find("iframe").attr("src",href);
			}
			
		}
	})

}
















