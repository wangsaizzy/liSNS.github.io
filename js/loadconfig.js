// JavaScript Document
BaseData = {
	divcss : [],
	javascript : [],
	mobile : [],
	technology : [],
	fun : [],
	spit : [],
	game : []
}
MoudleList = {
	key : "",
	dataArr : [],
	totalPage : 0,
	currentPage : 0,
	singlePageCount : 6,
	turnPage : true
}
/* 模块名称集合 */
MoudleArray = ["divcss","javascript","mobile","technology","fun","spit","game","recommend"];
/* Require 路径配置 */
require.config({
    paths: {
        divcss: 'js/divcss.config.js?'+new Date().getTime(),
		javascript: 'js/javascript.config.js?'+new Date().getTime(),
		technology: 'js/technology.config.js?'+new Date().getTime(),
		mobile: 'js/mobile.config.js?'+new Date().getTime(),
		fun: 'js/fun.config.js?'+new Date().getTime(),
		spit: 'js/spit.config.js?'+new Date().getTime(),
		game: 'js/game.config.js?'+new Date().getTime(),
		recommend: 'js/recommend.config.js?'+new Date().getTime(),
		music : 'music/config.js?'+new Date().getTime()
    }
});
/* 模块调用主入口 */
function LoadConfig(key){
	var dialog = ["technology","fun","spit","recommend"];
	require([key],function(data){
		BaseData[key] = data.config;
	})
}

$(function(){
	/* 加载所有分类模块列表至本地 */
	MoudleArray.map(function(items){
		LoadConfig(items);
		/* 检测当前链接 */
		CheckLocation();
	})
})
