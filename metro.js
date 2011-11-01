/*var metroSH= {
	//line1:{},
	line2:{
		station : {
			0:{name:'徐泾东',position:{x:50,y:100}},
			1:{name:'虹桥火车站',position:{x:100,y:100}},
			2:{name:'虹桥2号航站楼',position:{x:180,y:100}},
			3:{name:'淞虹路',position:{x:250,y:100}},
			4:{name:'北新泾',position:{x:300,y:100}},
			5:{name:'威宁路',position:{x:350,y:100}},
			6:{name:'娄山关路',position:{x:400,y:100}},
			7:{name:'中山公园',position:{x:450,y:100}},
			8:{name:'江苏路',position:{x:550,y:100}},
			9:{name:'静安寺',position:{x:630,y:100}},
			10:{name:'南京西路',position:{x:670,y:100}},
			11:{name:'人民广场',position:{x:800,y:100}},
			12:{name:'南京东路',position:{x:880,y:100}},
			13:{name:'陆家嘴',position:{x:930,y:100}},
			14:{name:'东昌路',position:{x:970,y:140}},
			15:{name:'世纪大道',position:{x:1010,y:180}},
			16:{name:'上海科技馆',position:{x:1080,y:250}},
			17:{name:'世纪公园',position:{x:1080,y:300}},
			18:{name:'龙阳路',position:{x:1200,y:350},curve:true},
			19:{name:'张江高科',position:{x:1240,y:350}},
			20:{name:'金科路',position:{x:1280,y:350}},
			21:{name:'广兰路',position:{x:1320,y:350}},
			22:{name:'唐镇',position:{x:1360,y:350}},
			23:{name:'创新中路',position:{x:1400,y:400},curve:true},
			24:{name:'华夏东路',position:{x:1400,y:440}},
			25:{name:'川沙',position:{x:1400,y:480}},
			26:{name:'凌空路',position:{x:1400,y:520}},
			27:{name:'远东大道',position:{x:1400,y:560}},
			28:{name:'海天三路',position:{x:1400,y:600}},
			29:{name:'浦东国际机场',position:{x:1400,y:640}}
			},
		color : '#0ab029'	
	}
};*/

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
				stations[j] = j + ':{name:"' + $(p).attr('sid') + '",position:{x:' + x + ',y:' + y + '},st:' + $(p).attr('st') + ',rc:' + $(p).attr('rc') + ',slb:' + slb + '}';
				//console.log($(p).attr('slb'));
			});
			sw[i] = $(e).attr('lid') + ':{id:"line' + $(e).attr('slb') +'",color:"' + $(e).attr('lc').replace('0x','#') +'",station:{' + stations.join(',') + '}}';
			//console.log(sw[i]);
		});
		//console.log(sw.join(','));
		metroSH = eval('({' + sw.join(',') + '})');
		//console.log(metroSH);
	}
});

