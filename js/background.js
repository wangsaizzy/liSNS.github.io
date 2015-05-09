// JavaScript Document

$(function(){
	LoadLocalBackground();
	/* 工具栏菜单点击 */
	$("#tools li").on("click",function(e){
		e.stopPropagation();
		$(this).toggleClass("cur").siblings().removeClass("cur");
	});
	/* 选择背景图片 */
	$(".change-bgimg span").on("click",function(){
		var url = $(this).find("img").attr("src");
		$(this).parents(".cur").removeClass("cur");
		$(this).addClass("cur").siblings().removeClass("cur");
		SetLocalBackground(url);
	})
	
	$(document).on("click",function(e){
		$("#tools li").removeClass("cur");
		/*e= e || event;
		var obj = $(e.target).parents(".set-background");
		if(obj.length<=0){
			$("#tools li").removeClass("cur");
		}
		if($(e.target).hasClass("set-background")){
			$("#tools .set-background").toggleClass("cur");
		}*/
	})
})


/* 读取设置的背景图片 */
function LoadLocalBackground(){
	if(localStorage.siyonBackground){
		var background = localStorage.siyonBackground;
		$("body").css("background-image","url("+background+")");
		$(".change-bgimg span").each(function(index, element) {
			$(this).removeClass("cur");
            if($(this).find("img").attr("src")==background){
				$(this).addClass("cur");
			}
        });
	}else{
		var date = new Date(),
			hour = date.getHours();
		var nBgsrc = 1;
		if(hour>=22 || hour<6){
			nBgsrc = 7;
		}
		if(hour>=6 && hour<12){
			nBgsrc = 1;
		}
		if(hour>=12 && hour<18){
			nBgsrc = 4;
		}
		if(hour>=18 && hour<22){
			nBgsrc = 6;
		}	
		$("body").css("background-image","url(images/background/bg_0"+ nBgsrc +".jpg)");
	}
}

/* 设置的背景图片 */
function SetLocalBackground(url){
	localStorage.siyonBackground = url;
	$("body").css("background-image","url("+url+")");
}