define(['jquery'],function($){
	function _Musicbox($ct){
		this.$ct = $ct
		this.init()
		this.bind()
	}

	_Musicbox.prototype.init = function(){
		this.$playBtn = this.$ct.find('.fa-play')
		this.$setVolume = this.$ct.find('.vidio')
		this.$setLike = this.$ct.find('.like')
		this.$styleBtn = this.$ct.find('.pre-style')
		this.$progressBarNode = this.$ct.find('.progress .bar')
		this.$musicBtn = this.$ct.parent().find('.musicbtn')
	}

	_Musicbox.prototype.bind = function(){
		var color = false, style = false			
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

		this.$musicBtn.on("click",function(){
			var _this = this;
			var musicbox =$(_this).prev()
			musicbox.css('display','block')
			$(_this).css('display','none')
		})
	}

	var Musicbox = (function(){
		return{
			init: function($ct){
				$ct.each(function(index,node){
					new _Musicbox($(node))
				})
			}
		}
	})()
	return Musicbox
})