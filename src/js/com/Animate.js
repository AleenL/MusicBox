

define(['jquery'], function($){
	
	function _Animate($ct){
		this.$ct = $ct
		this.init()
		this.bind()

	}
	_Animate.prototype.init = function(){

		this.$bearLoc = this.$ct.find(".bear")
		this.$moonLoc = this.$ct.find(".moon")
		this.$webFont = this.$ct.find(".web-font")
		
		
	}
	_Animate.prototype.bind = function(){
		console.log(this.$moonLoc)
		this.$bearLoc.animate({left:'48%'},10000)
		this.$moonLoc.animate({left:"-200px"},100000)
		this.$webFont.animate({opacity:1},3000)
	}
	var Animate = (function(){
		return {
			init:function($ct){
				$ct.each(function(index,node){
					new _Animate($(node))
				})
			}
		}
	})()
	return Animate	
})
