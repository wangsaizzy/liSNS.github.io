
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="UTF-8">
<title>2014，谢谢你</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<script type="text/javascript" src="js/jquery.min.js"></script>
<link type="text/css" rel="stylesheet" href="./css/idangerous.swiper.css">
<link type="text/css" href="./css/style.css" rel="stylesheet">
<link type="text/css" href="./css/animate.css" rel="stylesheet">
</head>
<body>

<div class="swiper-container">
    <div class="swiper-wrapper" >
    	<!-- slide 1 -->
        <div class="swiper-slide">
            <div class="slide-content slide1">
            	<div class="text animation text1"></div>
                <div class="logo"></div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 1 end -->
        <!-- slide 2 -->
        <div class="swiper-slide">
            <div class="slide-content slide2">
            	<div class="text animation text2_1"></div>
                <div class="text animation text2_2"></div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 2 end -->
        <!-- slide 3 -->
        <div class="swiper-slide">
            <div class="slide-content slide3">
            	<div id="horizontal-content" class="horizontal-content">
                	<div class="horizontal-slide hslide1" style="z-index:5;"></div>
                    <div class="horizontal-slide hslide2" style="z-index:4;"></div>
                    <div class="horizontal-slide hslide3" style="z-index:3;"></div>
                    <div class="horizontal-slide hslide4" style="z-index:2;"></div>
                    <div class="horizontal-slide hslide5" style="z-index:1;"></div>
                </div>
                <div class="leftbtn"></div>
                <div class="rightbtn"></div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 3 end -->
        <!-- slide 4 -->
        <div class="swiper-slide">
            <div class="slide-content slide4">
            	<div class="text animation text4_1"></div>
                <div class="text animation text4_2"></div>
                <div class="text animation text4_3"></div>
                <div class="text animation text4_4"></div>
                <div class="text animation text4_5"></div>
                <div class="text animation text4_6"></div>
                <div class="logo"></div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 4 end -->
        <!-- slide 5 -->
        <div class="swiper-slide">
            <div class="slide-content slide5">
            	<div class="slide5-title"></div>
            	<div id="scroll">
                    <div><img pos="1" src="images/number.png"></div>
                    <div><img pos="1" src="images/number.png"></div>
                    <div><img pos="6" src="images/number.png"></div>
                    <div><img pos="0" src="images/number.png"></div>
                    <div><img pos="3" src="images/number.png"></div>
                    <div><img pos="7" src="images/number.png"></div>
                    <div><img pos="9" src="images/number.png"></div>
                    <span class="num"><img  pos="7" src="images/number.png"></span>
                </div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 5 end -->
        <!-- slide 6 -->
        <div class="swiper-slide">
            <div class="slide-content slide6">
            	<div class="text animation text6_1"></div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 6 end -->
        <!-- slide 7 -->
        <div class="swiper-slide">
            <div class="slide-content slide7">
            	<div class="text animation text7_1"></div>
                <div class="text animation text7_2"></div>
                <div class="speed">
                	<div class="pointer animation pointer1"></div>
                    <div class="pointer animation2 pointer2"></div>
                </div>
            </div>
            <div class="arrow"></div>
        </div>
        <!-- slide 7 end -->
        <!-- slide 8 -->
        <div class="swiper-slide">
            <div class="slide-content slide8">
            	<div class="text animation text8_1"></div>
                <div class="text animation text8_2"></div>
                <div class="logo1"></div>
            </div>
        </div>
        <!-- slide 8 end -->
        
    </div>
</div>

<!--<div class="loading">
    <div class="loadingbox">
        <div class="loading-img"><img src="images/loading1.png"></div>
    </div>
	<div class="loading-text"><img src="images/loading3.png"></div>
</div>-->
<div class="loading">
    <div class="spinner8">
        <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
    </div>
</div>
<div id="audio-content" class="off">
	<audio id="myaudio" loop autoplay="autoplay" preload="auto" src="rose.mp3"></audio>
</div>

<script type="text/javascript" src="js/idangerous.swiper.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="/res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
$(function(){
	wx.config({
		  debug: false,
		  appId: 'wxbfa2a6b67ba5c4f9',
		  timestamp: 1423622912,
		  nonceStr: 'YoasOy9vs3sHyuYq',
		  signature: '5266692997ab4a93c872a8a930e052a62c7428ff',
		  jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo'
		  ]
	  });
	wx.ready(function(){
		wx.onMenuShareTimeline({
			title: '2014，谢谢你。', // 分享标题
			desc: '因为有你，感谢有你。  ——车蚂蚁',
			link: location.href, // 分享链接
			imgUrl: '/wap.chemayi.com/game/thanks/logo.jpg', // 分享图标
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
		wx.onMenuShareAppMessage({
			title: '2014，谢谢你。', // 分享标题
			desc: '因为有你，感谢有你。  ——车蚂蚁', // 分享描述
			link: location.href, // 分享链接
			imgUrl: '/wap.chemayi.com/game/thanks/logo.jpg', // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () { 
				// 用户确认分享后执行的回调函数
			},
			cancel: function () { 
				// 用户取消分享后执行的回调函数
			}
		});
	})
})
  
</script>


</body>
</html>
