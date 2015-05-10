// JavaScript Document
Resources = {
	Pc		: {
		path	: "images/background",
		filenames	: ["bg_01.jpg","bg_02.jpg","bg_03.jpg","bg_04.jpg","bg_05.jpg","bg_06.jpg","bg_07.jpg"]
	},
	Mobile	: {
		path	: "images/mobile",
		filenames	: [
			"bg_01.png","bg_02.png","bg_03.png","bg_04.png","bg_05.png","bg_06.png","bg_07.png",
			"bg_08.png","bg_09.png","bg_10.png","bg_11.png","bg_12.png","bg_13.png","bg_14.png","bg_15.png"
			]
	},
	Demo	: [
			{
			path	: "demo/divcss",
			filenames	: [
				"2001/20140707105934.jpg","2002/20140707120022.jpg","2003/20140808114305.jpg"
				]
			},
			{
			path	: "demo/javascript",
			filenames	: [
				"3001/20140707174225.jpg","3002/20140708142409.jpg","3003/20140714143454.jpg","3004/20140823015628.jpg"
				]
			},
			{
			path	: "demo/game",
			filenames	: [
				"4001/12172522_ilZ5.jpg","4002/18154922_vkDE.jpg","4003/20140710163925.jpg","4004/20140731105238.jpg",
				"4005/20140815162348.jpg"
				]
			}
			
	]
}
$(function(){
	$(".loading-resources").not("isloading").on("click",function(){
		$(this).addClass("isloading");
		for(var i in Resources){
			var data = Resources[i], type = Object.prototype.toString.call(data);
			if(type =="[object Object]"){
				for(var j=0;j<data.filenames.length;j++){
					loader.loadImage(data.path+"/"+data.filenames[j]);
				}
			}
			
			if(type =="[object Array]"){
				for(var m=0;m<data.length;m++){
					var obj = data[m];
					for(var k=0;k<obj.filenames;k++){
						loader.loadImage(obj.path+"/"+obj.filenames[k]);
					}
				}
			}
			
		}
	})
})
function ShowLoadProgress(percent){
	$("#tools .progress").css({"width":percent*100+"%"});
}
function ResourcesLoaded(){
	setTimeout(function(){
		$("#tools .progress").fadeOut();
	},10000)
}

var loader = {
	loader : true,
	loadedCount : 0, //目前已被加载的资源数
	totalCount : 0,// 需要加载的资源总数
	init : function(){
		var mp3Support,oggSupport;
		var audio = document.createElement("audio");
		if(audio.canPlayType){
			// 目前canPlayType()方法返回："","maybe" 或probably
			mp3Support = "" !== audio.canPlayType("audio/mpeg");
			oggSupport = "" !== audio.canPlayType("audio/ogg; codecs='vorbis'");
		}else{
			mp3Support = false;
			oggSupport = false;
		}
		loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
	},
	loadImage : function(url){
		this.totalCount++;
		this.loaded = false;
		var image = new Image();
			image.src = url;
			image.onload = loader.itemLoaded;
			return image;
	},
	soundFileExtn : ".ogg",
	loadCound : function(url){
		this.totalCount++;
		this.loaded = false;
		var audio = new Audio();
			audio.src = url+loader.soundFileExtn;
			audio.addEventListener("canplaythrough",loader.itemLoaded,false);
			return audio;
	},
	itemLoaded : function(){
		loader.loadedCount++;
		//$("#loadingmessage").html("资源加载中 "+ parseInt(loader.loadedCount/loader.totalCount*100)+"%");
		
		ShowLoadProgress(loader.loadedCount/loader.totalCount);
		
		if(loader.loadedCount === loader.totalCount){
			loader.loaded = true;
			
			ResourcesLoaded();
			
			if(loader.onload){
				loader.onload();
				loader.onload = undefined;
				
			}
		}
	}
}