var sw= [],stations = [],metroSH = {},x=0,y=0;
/*680,680*/
$.ajax({
	url: 'sw_shanghai.xml',
	error: function(error){console.log(error)},
	success: function(metro){
		console.log('ajax success');
		$(metro).find('l[slb=2]').each(function(i,e){
	//	$(metro).find('l').each(function(i,e){
			stations = [];
			$(e).find('p').each(function(j,p){
				x = $(p).attr('x') - 0 + 900;
				y = $(p).attr('y') - 0 + 700;
				var slb = false;
				if ($(p).attr('slb') == ''){slb = false;}else{slb = $(p).attr('slb');}
				stations[j] = j + ':{name:"' + $(p).attr('sid') + '",position:{x:' + x + ',y:' + y + '},st:' + $(p).attr('st') + ',rc:' + $(p).attr('rc') + ',slb:' + slb + '}';
				//console.log($(p).attr('slb'));
			});
			sw[i] = $(e).attr('lid') + ':{id:"line' + $(e).attr('slb') +'",color:"' + $(e).attr('lc').replace('0x','#') +'",station:{' + stations.join(',') + '}}';
			//console.log(sw[i]);
		});
		//console.log(sw.join(','));
		metroSH = eval('({' + sw.join(',') + '})');
		console.log(metroSH);
	}
});

