// JavaScript Document
$(function(){
	require(["music"],function(config){
		var data = config.config;
		$(".music-box").empty();
		var dom = "";
		for(var i=0;i<data.length;i++){
			dom += "<div links='"+ data[i].link +"'><span>"+ data[i].name +"</span>"+
					"<span class='icon'><em></em><em></em><em></em><em></em></span></div>";
		};
		$(".music-box").html(dom);
		var $first= $(".music-box > div").first();
		 	$first.addClass("cur");
			PlayMusic.call($first);
		
		$(".music-box > div").on("click",function(){
			if($(this).hasClass("cur")){ return;};
			$(this).addClass("cur").siblings().removeClass("cur");
			PlayMusic.call(this);
		})
		
	});
	var myaudio = document.getElementById("myaudio");

	myaudio.addEventListener("ended",function(){
		var obj = $(".music-box > div.cur")
		var next = obj.next();
		if(obj.nextAll().length<1){
			next =  obj.siblings().first();
		}
		PlayMusic.call(next);
		next.addClass("cur").siblings().removeClass("cur");
	},false);

	function PlayMusic(){
		var links = $(this).attr("links");
		myaudio.src = "music/"+links+".mp3";
		myaudio.play();
	}
})
