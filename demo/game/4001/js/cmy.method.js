// JavaScript Document

var CMY = {	
	PhyTimerScore : "", //  分数递减效果定时器
	PhyTimer: "",		//  旋转效果定时器
    PhyProName: '', 	//	当前项目名称
    PhyProArr: [], 		//	项目列表
    PhyClassicArr: [], 	//	类别列表
	PhySpesArr:	[],		//  不知道怎么形容它的用处  
    PhyProJy: [], 		//	项目建议列表
    PhyProResult: [], 	//	检查结果列表
	PhyChildArr: [], 	//	类别列表
	CarInfo	:[],        //  汽车检测结果
	PhyCatid : [],		
	PhyScore : [],		//  分数集合
	PhyStatus:[], 		//  
    GoingOn: true, 		//	是否正在进行体检
    Phyfinish: true, 	//	是否完成体检
	Deg		 : 0,		//  旋转度
	AutoCheckFinish : false, //自动检测是否完成
	AfterCheckFinish : false,//自动检测完成状态下是否可以进行特定操作
	PhySpeed		: 300,//速度设定
	//计数设置
	PhyCount : function(classicIndex){
		var arr = CMY.PhySpesArr;
		var bool = false;
		for(var i = 0; i<arr.length; i++){
			if(classicIndex == arr[i]){
				bool = true;
				}
			}
		return bool;
		},
	//初始化配置
	PhyConfig: function() {
        clearTimeout(CMY.PhyTimer);
		clearTimeout(CMY.PhyTimerScore);
        $(".phy_result_title_bottom").html("");
        CMY.PhyProArr = [];
        CMY.PhyClassicArr = [];
        CMY.PhyProJy = [];
		CMY.PhyProResult = [];
		CMY.PhyChildArr =[];
		CMY.CarInfo = [];
		CMY.PhyScore =[];
		CMY.PhyCatid = [];
		CMY.PhyStatus = [];
        CMY.PhyRecord.level1 = 0;
        CMY.PhyRecord.level2 = 0;
        CMY.PhyRecord.level3 = 0;
		CMY.AutoCheckFinish = false;
		CMY.AfterCheckFinish = false;
        CMY.GoingOn = true;
        CMY.Phyfinish = false;
    },
	//开始检测
	PhysicalExam: function() {
        $(".control_score_num").find("b").html(100);
        $(".control_score").removeClass("level2").removeClass("level3").removeClass("stop").addClass("level1");
        $(".progress_bar_animate").removeClass("lv2").removeClass("lv3").addClass("lv1");
        $(".phy_result_info_row").hide();
        $(".progress_bar_line").css("width", "0px");
		$(".progress_bar_line").find("span").removeClass('lv_orange');
        $(".phy_result_info_list").html('');
        CMY.PhyConfig();//调用配置
        CMY.PhyAjax();//调用AJAX
    },
	// 通过AJAX 获取 json数据
	GetJsonDate	: function(){
		var json = {
			"testresult" : [
				{
					"name":"发动机检测",
					"classic":[
						{
							"name":"机油机滤",
							"advice":"每10000KM/12个月更换。",
							"percent":10,
							"score": parseInt(Math.random()*10)
							},
						{
							"name":"防冻液",
							"advice":"每10000KM/12个月更换。",
							"percent":20,
							"score": parseInt(Math.random()*10)
							},
						{
							"name":"火花塞",
							"advice":"每10000KM/12个月更换。",
							"percent":30,
							"score": parseInt(Math.random()*10)
							},
						{
							"name":"正时皮带(链条)",
							"advice":"每10000KM/12个月更换。",
							"percent":40,
							"score": parseInt(Math.random()*10)
							}
						]
					},
				{
					"name":"燃油系统",
					"classic":[
						{
							"name":"燃油滤芯",
							"advice":"每10000KM/12个月更换。",
							"percent":50,
							"score": parseInt(Math.random()*10)
							},
						{
							"name":"空气滤清器",
							"advice":"每10000KM/12个月更换。",
							"percent":60,
							"score": parseInt(Math.random()*10)
							}
						]
					},
				{
					"name":"制动系统",
					"classic":[
						{
							"name":"刹车油",
							"advice":"每10000KM/12个月更换。",
							"percent":0,
							"score": parseInt(Math.random()*10)
							
							
							},
						{
							"name":"刹车片",
							"advice":"每10000KM/12个月更换。",
							"percent":80,
							"score": parseInt(Math.random()*10)
							}
						]
					},
				{
					"name":"变速箱系统",
					"classic":[
						{
							"name":"变速箱油",
							"advice":"每10000KM/12个月更换。",
							"percent":90,
							"score": parseInt(Math.random()*10)
							}
						]
					},
				{
					"name":"空调系统",
					"classic":[
						{
							"name":"空调滤清器",
							"advice":"每10000KM/12个月更换。",
							"percent":99,
							"score": parseInt(Math.random()*10)
							}
						]
					}
			],	
			"carinfo" :["很好","大保养","您的爱车保养周期：首保3000公里（3个月）二保2000公里（5个月）保养间隔3333公里（9个月）根据您的行驶里程，您已经超过保养里程1000公里30天"]
		};
			return json;
		},
	//JsonData : {},
	// 将获得的json数据进行处理
	PhyAjax: function() {
		var jsonReturn = CMY.GetJsonDate();
		//var jsonReturn = CMY.JsonData;
		CMY.CarInfo = jsonReturn["carinfo"];
		jsonReturn = jsonReturn["testresult"];
		$(".physical_short").html("");
		$(".physical_math").html("");
		for(var i = 0; i<jsonReturn.length ;i++){
			CMY.PhyProArr.push(jsonReturn[i]["name"]);
			var classic = jsonReturn[i]["classic"];
			CMY.PhyChildArr.push(classic.length);
			for(var j = 0; j<classic.length;j++){
				CMY.PhyClassicArr.push(classic[j]["name"]);
				CMY.PhyProJy.push(classic[j]["advice"]); 
				CMY.PhyProResult.push(classic[j]["percent"]);
				CMY.PhyScore.push(classic[j]["score"]);
				CMY.PhyCatid.push(classic[j]["catid"]);
				CMY.PhyStatus.push(classic[j]["status"]);
				}
			}
		for(var i = 0 ; i<CMY.PhyChildArr.length;i++){
			var res = -1;
			for(var k = 0;k<=i;k++){
				res += CMY.PhyChildArr[k];
				}
			CMY.PhySpesArr.push(res);
			}
		
		//console.log(CMY.PhyProResult);
		//开启自动检测动画效果
		CMY.PhyAnimate(0,0);
		//开启检测旋转效果
		//CMY.ScoreTurn();
        $(".phy_result_info").show();
    },
	// 显示进度 和 分数递减效果
	MathScore: function(proIndex,classicIndex,score) {
            $(".control_progress_top").html("正在检测<" + CMY.PhyProArr[proIndex] + ">" + CMY.PhyClassicArr[classicIndex] + "...");
			var s = parseInt($(".control_score_num").find("b").html());
			var _end = s - score ;
			if(score==0){
				if(CMY.PhyCount(classicIndex)){
					  proIndex++;
				  }
				classicIndex++;	
				setTimeout(function(){
					CMY.PhyAnimate(proIndex, classicIndex);
					},300);
				}
				else{
					CMY.PhyTimerScore = setInterval(function(){
							if(s == _end){
									clearInterval(CMY.PhyTimerScore);CMY.PhyTimerScore=null;
									if(CMY.PhyCount(classicIndex)){
										proIndex++;
									}
									classicIndex++;	
									CMY.PhyAnimate(proIndex, classicIndex);
									return;
								}else{
									s--;
									$(".control_score_num").find("b").html(s);
									CMY.ProgressBarColor(s);
								}
						},CMY.PhySpeed/score);		
					}
			
    },
	// 进度条和旋转背景颜色控制
	ProgressBarColor : function(score){
		$(".progress_bar_animate").removeClass("lv1").removeClass("lv2").removeClass("lv3");
		$(".control_score").removeClass("level1").removeClass("level2").removeClass("level3");
		$(".progress_bar_animate").addClass(score>=80?"lv1" : score>=40 ? "lv2":"lv3");
		$(".control_score").addClass(score>=80?"level1" : score>=40 ? "level2":"level3");
		},
	// 显示检测进度条
	ShowProgress : function(proIndex,classicIndex,score){
		var arr = [64,84,88,85,96];
		//console.log(proIndex + " :"+arr[proIndex]/len[proIndex]);
		var wid = parseInt($(".progress_bar_line").width()) + (arr[proIndex]/CMY.PhyChildArr[proIndex]);
        $(".progress_bar_line").stop().animate({"width": wid+"px"}, 280);
        $(".progress_bar_line").find("span").eq(proIndex).addClass("lv_orange");
		},
	//自动检测动画效果
	PhyAnimate: function(proIndex, classicIndex){
		if(classicIndex==CMY.PhyClassicArr.length){
			clearTimeout(CMY.PhyTimer);
			CMY.ShowResultText();
			$(".control_score").addClass("stop");
			CMY.Phyfinish = true;
			CMY.TheEnd();
			return false; 
			}
		//console.log(proIndex +" @ "+  classicIndex);
        //var score = Math.round(CMY.PhyProResult[classicIndex]/14);
		var score = parseInt(CMY.PhyScore[classicIndex]); 
        //开启进度条效果
		CMY.ShowProgress(proIndex,classicIndex,score);
		//开启分数递减效果
		CMY.MathScore(proIndex,classicIndex,score);
		//开启检测结果显示(分步)
		CMY.ShowPhyResultInfo(proIndex,classicIndex);
		//显示检测计数统计
		//CMY.ShowResultCount(classicIndex,score);
		
    },
	// 最终检测评分
	ShowResultText : function(){
			var score = parseInt($(".control_score_num").find("b").html());
			var resulttext = score > 80 ? "<span style='color:#66cf00;'>诊断结果: 健康，如有异常，请视情况而定</span>" : score>60 ? "<span style='color:#f05825;'>诊断结果: 良好，建议进行检查</span>":"<span style='color:#f00;'>诊断结果: 严重，请立即进行保养和维护</span>";
			$(".control_progress_top").html(resulttext);
		},
	// 统计结果
	ShowResultCount	:function(classicIndex){
		var score = CMY.PhyProResult[classicIndex];
			score  >= 80 ? CMY.PhyRecord.level3++ : score>= 40 ? CMY.PhyRecord.level2++ : CMY.PhyRecord.level1++;
			var str = "";
        	str = "共检查了" + (classicIndex + 1) + "项，<span class='col_cd0200'>";
        	str = str + CMY.PhyRecord.level3 + "</span>项必须更换，<span class='col_ff6e00'>";
        	str = str + CMY.PhyRecord.level2 + "</span>项建议更换，<span class='col_29961e'>";
        	str = str + CMY.PhyRecord.level1 + "项视情况而定";
        	$(".phy_result_title_bottom").html(str);
		},
	//旋转效果
    ScoreTurn: function() {
		CMY.PhyTimer = setInterval(function() {
				$(".control_score_turn").css("transform", "rotate(" + (CMY.Deg++) % 360 + "deg)");
			}, 1000 / 360);
    },
	// 三种结果记录
    PhyRecord: {
        level1: 0, //	建议维持
        level2: 0, //	建议更换
        level3: 0  //	必须更换
    },
	//显示检查信息和结果
	ShowPhyResultInfo: function(proIndex, classicIndex) {
		var score = CMY.PhyScore[classicIndex];
		score =  (score > 8 ? 3 : (score>4 ? 2 : 1));
		var div =
                "<div style='"+ (CMY.PhyProJy[classicIndex].indexOf("无该数据")>=0? "display:none;":"") +"' class='phy_result_info_row  "+ ( checkifnodata(proIndex,classicIndex) ? "bottomline":"") +"' id="+ CMY.PhyCatid[classicIndex] +" >" +
                "<span class='test_pro'>" + 
				(checkifnodata(proIndex,classicIndex) ?  "<" + CMY.PhyProArr[proIndex] + ">" :"") + "</span>" +
                "<span class='replace_pro'>" +
                "<span class='replace_level'>" +
                "<img src='images/l" + score + ".jpg' />" +
                "</span>" +
                "<span class='replace_info'>" +
                "<div class='replace_info_name'>" + CMY.PhyClassicArr[classicIndex] + "</div>" +
                "<div class='replace_info_sm'>" + CMY.PhyProJy[classicIndex] + "</div>" +
                "</span>" +
                "</span>" +
                "<span class='replace_percent'>" + (CMY.PhyProResult[classicIndex]==0?"":(CMY.PhyProResult[classicIndex])+"%") + "</span>" +
                "<span class='state_now'><b class='level" + score + "'>"+
					(score==1?"维持现状":(score==4?"视情况而定":(score==3?"必须更换":"建议检查")))+ 
				"</b></span>" +
                "</div>";
        CMY.PhyProName = CMY.PhyProArr[proIndex];
        $(".phy_result_info_list").append(div);
    }
	
};

function checkifnodata(proIndex,classicIndex){
	if(CMY.PhyProName != CMY.PhyProArr[proIndex]){
		return true;
		}
	if(CMY.PhyProName == CMY.PhyProArr[proIndex]){
		if(CMY.PhyProJy[classicIndex-1].indexOf("无该数据")>=0 && $(".phy_result_info_row:last").hasClass("bottomline")){
			return true;
			}
		}
	return false;	
}
