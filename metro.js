function drawStation(line,x,y,name){
	//var lineContext = document.getElementById(line).getContext('2d');
		
		line.save();
		line.beginPath();
		line.arc(x,y,6,0,Math.PI*2,true);
		line.closePath();
		line.fillStyle='#fff';
		line.fill();
		line.lineWidth=2;
		line.stroke();
		line.restore();
		
}

function setStationInfo(lineCanvas,name,x,y){
	//var $div = $('#' + lineCanvas).parent('div');
	var $div = $('#stations');
	var Info = '<div>' + name + '</div>';	
	var	stationName = '<div class="stationName" style="left:' + (x- name.length*6) + 'px; top:' + (y-24) + 'px">' + name +'</div>',
		stationInfo = '<div class="stationInfo" style="left:' + (x-6) + 'px; top:' + (y-6) + 'px">' + Info +'</div>';
	$div.append(stationName,stationInfo);
}

function drawLine(lineCanvas,metroObj){

	var lineContext = document.getElementById(lineCanvas).getContext('2d'),
	position,
	P = metroObj.nameposition;
	
	lineContext.strokeStyle= metroObj.color;
	lineContext.fillStyle= metroObj.color;
	
	$('#lines').append('<label class="lineName" style="color:' + metroObj.color + ';left:' + P.x +'px;top:' + P.y +'px">' + metroObj.name +'</label>');
	
	
	for(var i in metroObj.station){
		position = metroObj.station[i].position;
		var j= i-0+1;
		
		if(metroObj.station[j]){
			var positionNext = metroObj.station[j].position;
			lineContext.beginPath();
			
			if(metroObj.station[i].rc == true){
				lineContext.moveTo(positionNext.x,positionNext.y);
			}else{
				lineContext.save();
				lineContext.arc(position.x,position.y,0.2,0,Math.PI*2,true);
				lineContext.fill();
				lineContext.restore();
			
				lineContext.moveTo(position.x,position.y);}
			
			if(metroObj.station[j].rc == true){
			
				var n = j-0+1;
				var curve = metroObj.station[n].position;
				
				lineContext.quadraticCurveTo(positionNext.x,positionNext.y,curve.x,curve.y);
				//lineContext.moveTo(curve.x,curve.y);
				//console.log(positionNext);			
				//console.log(curve);			
			}else{
				//lineContext.quadraticCurveTo(1200,500,positionNext.x,positionNext.y);
				lineContext.lineTo(positionNext.x,positionNext.y);
			}
			
			lineContext.save();
			lineContext.lineWidth=7;
			lineContext.stroke();
			lineContext.restore();
			
		}else{
			if(metroObj.loop == true){
				lineContext.lineTo(metroObj.station[0].position.x,metroObj.station[0].position.y);
				lineContext.save();
				lineContext.lineWidth=7;
				lineContext.stroke();
				lineContext.restore();
				drawStation(lineContext,metroObj.station[0].position.x,metroObj.station[0].position.y,metroObj.station[0].name);
			}
		}
		
		
			
		//drawStation(lineContext,position.x,position.y,metroObj.station[i].name);
		if(metroObj.station[i].st == true){
			drawStation(lineContext,position.x,position.y,metroObj.station[i].name);
			}else{
			
			}
		if(metroObj.station[i].slb == true){	
			setStationInfo(lineCanvas,metroObj.station[i].name,position.x,position.y);
		}	
	}
	
	
}



$(document).ready(function(){

var sw= [],stations = [],metroSH = {},x=0,y=0;
/*680,680*/
$.ajax({
	url: 'sw_shanghai.xml',
	error: function(error){console.log(error)},
	success: function(metro){
		//$(metro).find('l[slb=2]').each(function(i,e){
		$(metro).find('l').each(function(i,e){
			stations = [];
			$(e).find('p').each(function(j,p){
				x = $(p).attr('x') - 0 + 900;
				y = $(p).attr('y') - 0 + 700;
				var slb = false;
				if ($(p).attr('slb') == ''){slb = false;}else{slb = $(p).attr('slb');}
				stations.push(j + ':{name:"' + $(p).attr('sid') + '",position:{x:' + x + ',y:' + y + '},st:' + $(p).attr('st') + ',rc:' + $(p).attr('rc') + ',slb:' + slb + '}');
				
			});
			
			x = $(e).attr('lbx') - 0 + 900;
			y = $(e).attr('lby') - 0 + 700;
			var id = 'line' + $(e).attr('slb');
			//sw.push($(e).attr('lid') + ':{id:"' + id + '",name:"' + $(e).attr('lid') + '",nameposition:{x:' + x + ',y:' + y + '},loop:' + $(e).attr('loop') + ',color:"' + $(e).attr('lc').replace('0x','#') +'",station:{' + stations.join(',') + '}}');
			sw.push('{id:"' + id + '",name:"' + $(e).attr('lid') + '",nameposition:{x:' + x + ',y:' + y + '},loop:' + $(e).attr('loop') + ',color:"' + $(e).attr('lc').replace('0x','#') +'",station:{' + stations.join(',') + '}}');
			
			$('#lines').append('<canvas id="line'+ $(e).attr('slb') + '"  width="2400" height="2400"></canvas>');
			
			metroSH = eval('(' + sw[i] + ')');
			
			drawLine(id,metroSH);
			
		});
		
		//metroSH = eval('({' + sw.join(',') + '})');
		
		/*
		for(var line in metroSH){
			$('#lines').append('<canvas id="'+ metroSH[line].id + '"  width="2400" height="2400"></canvas>');
			drawLine(metroSH[line].id,metroSH[line]);
		}*/

	}
});

	
		
	$('.stationInfo').hover(function(){$(this).children('div').fadeIn()},function(){$(this).children('div').fadeOut()});
})	