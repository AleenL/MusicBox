define(['jquery'],function($){
	function _Playmusic($ct){
		this.$ct = $ct;
		this.init();
		this.bind();	
	}
	_Playmusic.prototype.init = function(){
		this.$backBtn = this.$ct.find('.goback'),
		this.$forwardBtn = this.$ct.find('.forward'),
		this.$titleNode = this.$ct.find('.title'),
		this.$authorNode = this.$ct.find('.auther'),
		this.$timeNode = this.$ct.find('.time'),
		this.$progressBarNode = this.$ct.find('.progress .bar'),
		this.$setLike = this.$ct.find('.like'),
		this.$progressNowNode = this.$ct.find('.progress-now'),
		this.$setPic = this.$ct.find('.covers'),
		this.$setVolume = this.$ct.find('.vidio'),
		this.$volumeBarNode = this.$ct.find('.volume .volume-bar'),
		this.$playBtn = this.$ct.find('.fa-play'),
		this.$cateCt = this.$ct.find('.style-items')
		this.musicIndex = 0;
		this.music = new Audio()
		this.music.autoplay = true;
		this.shouldUpdate = true;
		this.$musicList = [];
		this.ontimeupdate()
	}

	_Playmusic.prototype.ontimeupdate = function(){
		var _this = this;
		_this.music.ontimeupdate = function(){
  			if(_this.shouldUpdate) { 
     			_this.updateProgress()
     			_this.shouldUpdate = false
    			setTimeout(function(){
      			_this.shouldUpdate = true
    			}, 1000)
  			}
		}
	}
	_Playmusic.prototype.bind = function(){
		var _this = this,musicicon=false,musicvolume=false

		this.$progressBarNode.on('click', function(e){
  		  var percent = e.offsetX/parseInt(getComputedStyle(this).width),
  			  progressNowNode = $(this).find('.progress-now')
  			_this.music.currentTime = percent * _this.music.duration
  			progressNowNode.css('width', percent*100+"%")
		})

		this.$volumeBarNode.on('click', function(e){
			percent = e.offsetX/parseInt(getComputedStyle(this).width),
			volumeNowNode = $(this).find('.volume-now')
			_this.music.volume = percent;
  			volumeNowNode.css('width',percent*100+'%')
		})

		this.$setVolume.on('click', function(e){
 			if(!musicvolume){
  				_this.music.muted=true
   				this.innerHTML="&#xe602;"
   				musicvolume = true
 			}else{
   				_this.music.muted=false
   				this.innerHTML = "&#xe6be;"
   				musicvolume=false
 			}
		})

		this.$playBtn.on('click',function(e){
			Pic = $(this).parent().prev()
 			if(!musicicon){
 				_this.music.pause()
   				this.innerHTML="&#xe609;"
   				Pic.css("animationPlayState",'paused')
   				musicicon=true;
 			}else{
 				_this.music.play()
   				this.innerHTML = "&#xe600;"
   				Pic.css("animationPlayState",'running')
   				musicicon=false
 			}
		})

		this.$forwardBtn.on('click',function(){
			if(_this.musicIndex<9){
				_this.musicIndex++
				_this.loadMusic(_this.$musicList[_this.musicIndex])
				$('#gc ul').empty()
				
			}else{
				alert("已经到最后了")
				_this.musicIndex=9
			}
		})

		this.$backBtn.on('click',function(){
			if(_this.musicIndex==0){
				_this.loadMusic(_this.$musicList[_this.musicIndex])
				
			}else{
				_this.musicIndex --
				_this.loadMusic(_this.$musicList[_this.musicIndex])
				$('#gc ul').empty()
				
			}
		})
		_this.styleList()
		_this.getList()
		_this.updateProgress()
	}

	_Playmusic.prototype.getLrc  = function(sid){
		var _this = this;
		this.get('https://jirenguapi.applinzi.com/fm/getLyric.php',{sid:sid},function(ret){
			_this.parseLyric(ret.lyric)
    		})
		}
	_Playmusic.prototype.parseLyric = function(lyric){
		var lines = lyric.split('\n'),
	        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
	        result = []
	    while (!pattern.test(lines[0])) {
	        lines = lines.slice(1);
	    }
	    console.log(lines)
	    lines[lines.length - 1].length === 0 && lines.pop()
	    lines.forEach(function(v,i,a){
	    	var time = v.match(pattern),
	    		value = v.replace(pattern,'')
	    	if(time == null) return;
	    	time.forEach(function(v1,i1,a1){
	    		var t = v1.slice(1,-1).split(':')
	    		result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
	    	})
	    })

	    result.sort(function(a, b) {
	        return a[0] - b[0];
	    })

    	this.Lrcpush(result)
	}

	_Playmusic.prototype.Lrcpush = function(str){
		for(var i=0;i<str.length;i++){
			li = $('<li>'+str[i][1]+'</li>')
			$('#gc ul').append(li)
		}
		var _this = this
		this.music.ontimeupdate = function(){
			for (var i = 0, l = str.length; i < l; i++){
				if(_this.music.currentTime>str[i][0]){
					$('#gc ul').css('top',-i*40+10+'px')   
					$('#gc ul li').css('color','#fff')   
					$('#gc ul li:nth-child('+(i+1)+')').css('color','red')
				}
			}
			if(_this.shouldUpdate) { 
     			_this.updateProgress()
     			_this.shouldUpdate = false
    			setTimeout(function(){
      			_this.shouldUpdate = true
    			}, 1000)
  			}
		}
	}

	_Playmusic.prototype.getList = function(){
		var _this =this;
		this.$cateCt.on('click',function(e){
			if(e.target.tagName.toLowerCase()!=='li') return;
			var channelId = ($(e.target).attr('data-channel-id'))
			_this.getmusic(channelId)
			_this.musicIndex=0;
		})
	}

	_Playmusic.prototype.getmusic = function(channels){
		var _this = this
			_this.$musicList = []
		for(var i=0;i<10;i++){	
			this.get('https://jirenguapi.applinzi.com/fm/getSong.php',{channel:channels},function(ret){
				var addmusic = [{'sid':ret.song[0].sid,'src':ret.song[0].url,'title':ret.song[0].title,'auther':ret.song[0].artist,'pic':ret.song[0].picture,'lrc':ret.song[0].lrc}]
				_this.$musicList.push(addmusic[0])	
			})
		}
		setTimeout(function(){
			_this.loadMusic(_this.$musicList[0])
			$('#gc ul').empty()
			if(_this.$musicList.length!==10){
				laod()
			}
		} ,2000)
		function laod(){
			setTimeout(function(){
					
				},5000)
		}
	}

	_Playmusic.prototype.get = function(url,data,callback,dataType){
		url += "?" +Object.keys(data).map(function(key){
            return key + '=' + data[key]
        }).join('&')
        var xhr = new XMLHttpRequest()
        xhr.responseType = dataType || "json"
        xhr.onload = function(){
            callback(xhr.response)
        }
        xhr.open('GET',url,true)
        xhr.send()
	}

	_Playmusic.prototype.loadMusic = function(songObj){
		this.getLrc(songObj.sid)
		this.music.src = songObj.src
		this.$titleNode.text(songObj.title)
		this.$authorNode.text(songObj.auther)
		this.$setPic.css('background-image','url('+songObj.pic+')')
	}

	_Playmusic.prototype.renderSet = function(channels){	
		var html = channels.map(function(channel){
			return '<li data-channel-id="' + channel.channel_id + '">' + channel.name + '</li>'
		})
		this.$cateCt.append(html)
	}

	_Playmusic.prototype.updateProgress = function(){
		var _this = this;
		var percent = (_this.music.currentTime/_this.music.duration)*100+'%'
  		 	_this.$progressNowNode.css('width',percent)
  		var minutes = parseInt(_this.music.currentTime/60)
  		var seconds = parseInt(_this.music.currentTime%60)+''
  		seconds = seconds.length == 2? seconds : '0'+seconds
  		this.$timeNode.text(minutes + ':' + seconds)
	}

	_Playmusic.prototype.styleList = function(){
		var _this = this;
		this.get('https://jirenguapi.applinzi.com/fm/getChannels.php', {}, function(ret){
      		_this.renderSet(ret.channels)
    	})
	}
	var Playmusic = (function(){
		return{
			init:function($ct){
				$ct.each(function(index,node){
					new _Playmusic($(node))
				})
			}
		}
	})()		
	return Playmusic
})