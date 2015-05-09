// JavaScript Document
$(function(){
	$("input.search").on("change",function(){
		var val = $(this).val();
		if(!val){ return ;}
		MoudleList.key = "search";
		delete BaseData[MoudleList.key];
		var arr = [];
		for(var i in BaseData){
			if(Object.prototype.toString.call(BaseData[i])=="[object Array]"){
				BaseData[i].map(function(items){
					if(items.name.toLowerCase().indexOf(val.toLowerCase())>=0){
						arr.push(items);
					}
				})
			}
		}
		$(".empty").html("你这是要搜索些什么呢？");
		BaseData[MoudleList.key] = arr;
		ShowDemoStart();
		if(arr.length==0){
			$(this).val("");
		}
	})
})