
define(['jquery','com/Animate','com/Btnstyle','com/playmusic'],function($,Animate,Btnstyle,playmusic){
	Animate.init($('.back'))
	Btnstyle.init($('.music-box'))
	playmusic.init($('.music-box'))
})