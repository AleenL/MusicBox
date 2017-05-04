define(['jquery'],function($){
	function _Musicstyle($ct){
		this.$ct = $ct;
		this.init();
	}

	_Musicstyle.prototype.init = function(){
	  	this.$musicCover = this.$ct.find('.Musicstyle')
		this.$getLrc = this.$ct.find('.next-style')
		this.$backBtn = this.$ct.find('.goback')
		this.$playBtn = this.$ct.find('.fa-play')
		this.$Pic = this.$ct.find('.covers')
		this.$setVolume = this.$ct.find('.vidio')
		this.$setLike = this.$ct.find('.like')
		this.$volumeBarNode = this.$ct.find('.volume .volume-bar')
		this.$volumeBar = this.$ct.find('.volume')
		this.$styleList = this.$ct.find('.style-choose')
		this.$styleBtn = this.$ct.find('.pre-style')
		this.$progressBarNode = this.$ct.find('.progress .bar')
		this.$progressNowNode = this.$ct.find('.progress-now')
		this.$musicBtn = this.$ct.parent().find('.musicbtn')
		this.bolumeNowNode = this.$ct.find('.volume-now')
		this.bind()
	}

	_Musicstyle.prototype.bind = function(){
		var	color = false,
			musicvolume = false,
			style = false,
			lrcstyle=false

		this.$setVolume.on('mouseover',function(e){
			var _this = this,
				voulmeBar = $(_this).prev()
			$(_this).css('right','110px')
  			voulmeBar.animate({width:'100px'})
		})

		this.$setLike.on('click',function(e){
  			if(!color){
    			$(this).css('color','pink')
    			color = true
  			}else{
    			$(this).css('color','#fff')
    			color = false
  			}
  		})

		this.$styleBtn.on('click',function(){
			var _this =this
			var stylelist = $(_this).parent().parent().find('.style-choose')
        	if(style){
            	stylelist.css('display','block')
            	style = false
        	}else{
            	stylelist.css('display','none')
            	style = true
        	}
    	})
		this.$musicBtn.on("click",function(e){
			var _this = this,
			Musicstyle =$(_this).parent().parent().find(".music-box")
			Musicstyle.css('display','block')			
		})
	}
	var Musicstyle = (function(){
		return{
			init: function($ct){
				$ct.each(function(index,node){
					new _Musicstyle($(node))
				})
			}
		}
	})()
	return Musicstyle
})