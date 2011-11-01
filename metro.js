/*var metroSH= {
	//line1:{},
	line2:{
		station : {
			0:{name:'������',position:{x:50,y:100}},
			1:{name:'���Ż�վ',position:{x:100,y:100}},
			2:{name:'����2�ź�վ¥',position:{x:180,y:100}},
			3:{name:'����·',position:{x:250,y:100}},
			4:{name:'������',position:{x:300,y:100}},
			5:{name:'����·',position:{x:350,y:100}},
			6:{name:'¦ɽ��·',position:{x:400,y:100}},
			7:{name:'��ɽ��԰',position:{x:450,y:100}},
			8:{name:'����·',position:{x:550,y:100}},
			9:{name:'������',position:{x:630,y:100}},
			10:{name:'�Ͼ���·',position:{x:670,y:100}},
			11:{name:'����㳡',position:{x:800,y:100}},
			12:{name:'�Ͼ���·',position:{x:880,y:100}},
			13:{name:'½����',position:{x:930,y:100}},
			14:{name:'����·',position:{x:970,y:140}},
			15:{name:'���ʹ��',position:{x:1010,y:180}},
			16:{name:'�Ϻ��Ƽ���',position:{x:1080,y:250}},
			17:{name:'���͹�԰',position:{x:1080,y:300}},
			18:{name:'����·',position:{x:1200,y:350},curve:true},
			19:{name:'�Ž��߿�',position:{x:1240,y:350}},
			20:{name:'���·',position:{x:1280,y:350}},
			21:{name:'����·',position:{x:1320,y:350}},
			22:{name:'����',position:{x:1360,y:350}},
			23:{name:'������·',position:{x:1400,y:400},curve:true},
			24:{name:'���Ķ�·',position:{x:1400,y:440}},
			25:{name:'��ɳ',position:{x:1400,y:480}},
			26:{name:'���·',position:{x:1400,y:520}},
			27:{name:'Զ�����',position:{x:1400,y:560}},
			28:{name:'������·',position:{x:1400,y:600}},
			29:{name:'�ֶ����ʻ���',position:{x:1400,y:640}}
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

