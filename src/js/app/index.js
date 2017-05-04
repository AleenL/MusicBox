
define(['jquery','com/Animate','com/Btnstyle','com/musicbox','com/playmusic'],function($,Animate,Btnstyle,musicbox,playmusic){
	Animate.init($('.back'))
	Btnstyle.init($('.music-box'))
	musicbox.init($('.music-box'))
	playmusic.init($('.music-box'))
})