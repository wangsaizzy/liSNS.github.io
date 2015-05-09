// JavaScript Document

/* 动态设置font-size */
function FontSize(){
	var cw = $(window).width()/16;
	if(cw<20){cw=20} //最小宽度
	if(cw>40){cw=40} //最大宽度
	$("html").css("font-size",cw+"px");
}
/* 空函数 */
function emptyFun(){
	
}
/* 音乐准备好 */
function MusicReady(obj,callback){
	obj.addEventListener("canplaythrough",function(){
		obj.play();
		callback();
	},false);
}
//加载音乐
function loadMusic(){ console.log("开始加载背景音乐");
	var audio = new Audio();
	var android = (/android/i.test(navigator.userAgent.toLowerCase()));
	var src = android ? "sound/wheretime.ogg" : "sound/wheretime.mp3";
	audio.src = src;
	audio.controls="controls";
	audio.id = "myaudio";
	audio.autoplay = "true";
	audio.loop="loop";
	audio.volume = 0.3;
			
	audio.addEventListener("canplay",function(){
		console.log("背景音乐已加载 可以播放");
		$(".sound").append(audio);
		var radio = document.getElementById("myaudio");
			radio.play();
		console.log("播放背景音乐");
	},false);
}

/* 大背景图 横向百分百适应 纵向垂直居中 */
function AutoBackground(){
	$(".slide-box").height($(window).height());
	/*$(".slide-content").each(function(index, element) {
        var width = $("body").width(),height = $(window).height();
		var clientHeight = width*1136/640;
		$(this).css({"height":clientHeight+"px","margin-top":(height-clientHeight)*0.5+"px"});
    });*/
}

/* 打字效果 */
function PrintAnimate(printtext,cursor,posArray,callback){
	var index = 0;
		posArray = posArray || ["16"];
	
	var timer = setInterval(function(){
		if(index==posArray.length){
			clearInterval(timer);
			timer = null;
			cursor.hide();
			callback();
			return ;
		}
		printtext.css({"width":posArray[index]+"rem"});
		if(index < posArray.length){
			cursor.css({"left":posArray[index]+"rem"});
		}else{
			cursor.css({"left":"16rem"});
		}
		index++;
	},2000/posArray.length);
}

/* 根据滚动的位置 显示对应效果 */
function setSlideAnimation(index){
	$(".text").removeClass("action");
	$(".slide8 .pic").removeClass("center").removeClass("action");
	if(index==0){
		//document.getElementById("printAudio").play();
		console.log("开始首屏打字效果");
		var arr = [1.2,2.7,4.25,5.75,7.25,8.75,10.3,11.8,13.3,14.8];
		PrintAnimate($(".slide1 .text1"),$(".slide1 .cursor"),arr,function(){
			$(".slide1 .text2").addClass("action");
		});
		
		return ;
		
	}
	if(index==7){
		$(".slide8 .pic").each(function(index, element) {
            var self = $(this);
			setTimeout(function(){
				//self.show();
				//self.css({"left":"50%","top":"50%"});
				self.addClass("center");
				setTimeout(function(){
					self.addClass("action");
				},800);
			},index*1600);
        });
		return;
	}
	if(index==8){
		console.log("开始第九屏打字效果");
		var arr8 = [1.5,3.05,4.55,6.05,7.6,9.05,10.6,12.1,13.65,14.85];
		var player = document.getElementById("printAudio");
		player.play();
		PrintAnimate($(".slide9 .text20"),$(".slide9 .cursor"),arr8,function(){});
		return ;
	}
	if(index==9){
		console.log("播放汽车启动声音");
		document.getElementById("carAudio").play();
	}
	$(".slide"+(index+1)).find(".text").each(function(index, element) {
		var self = $(this);
        setTimeout(function(){
			self.addClass("action");	
		},800*index)
    });
}

