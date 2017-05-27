(function($){
	var opation ={
		oD:['-','-'],
		dir:['←','→']
	}
	var setting = {};
	var parent = null;
	var week =['MON','TUE','WED','THU','FRI','SAT','SUN'];
	var weekie =['日','一','二','三','四','五','六'];
	var num =0;
	function calender(obj){
		var obj = obj||{};
		setting = $.fn.extend(opation,obj);
		parent = $(this);
		createIndex();
		nowtime();
		gettime();
		dirs();
		presentTime();
		getweek();
		calGetDay();
		aClick();
	}
	function presentTime(){
		var preTime = $('#date p');
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth();
		var dates = date.getDate();
		var weeks = date.getDay();
		var str = year+setting.oD[0]+double(month+1)+setting.oD[1]+double(dates)+',  '+week[weeks];
        preTime.html(str);
		
	}
    function dirs(){
    	var as = $('#switch a');
    	as.eq(0).html(setting.dir[0]);
    	as.eq(1).html(setting.dir[1]);
    }
	function gettime(){
		setInterval(nowtime,1000)
	}
	function nowtime(){
		var h1 = $('#nowtime h1');
		var date = new Date();
		var hours = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var str = double(hours)+':'+double(min)+':'+double(sec);
		h1.html(str);
	}
	function double(n){
		return n>=10?''+n:'0'+n;
	}
	function getweek(){
		var ul = $('#week')
		for(var i =0;i<weekie.length;i++){
			var lis = $('<li>'+weekie[i]+'</li>');
			ul.append(lis);
		}
		
	}
	function calGetDay(){
		var nowday = $('#day');
		nowday.html('')
		
		
		var date = new Date();
		date.setMonth(date.getMonth());
		date.setDate(0);
		var prevDate = date.getDate()
		var prevDay = date.getDay();
//		console.log(prevDate)
		
		
		
		var date = new Date()
		date.setMonth(date.getMonth()+num)
		date.setDate(1);
		var nowDay =date.getDay();
//		 console.log(nowDay);
		 for(var i = 0;i<(nowDay-prevDay);i++){
        	var lis = $('<li>'+(prevDate-i)+'</li>');
        	lis.addClass('prev')
        	nowday.append(lis);
        }
		 
		 
		
		var date = new Date();//获取当前月份的日子数量；
		var onDate = date.getDate()
		date.setMonth(date.getMonth()+1+num)//先设置当前的月份数，获取现在的月份数，因为月份从0开始所以+1；
		date.setDate(0);
        var nowDate = date.getDate();
        var year = date.getFullYear();
        var onMonth = date.getMonth()+1;
         //这是生成当前这个月的；
        for(var i = 0;i<nowDate;i++){
//      	console.log(onDate)
        	var lis = $('<li>'+(1+i)+'</li>');
        	if(i==onDate-1&&num==0){
        		lis.addClass('selected')
        	}
        	nowday.append(lis)
        }
		var sP = $('#switch p');
		var str = year+'年'+double(onMonth)+'月';
		sP.html(str)
		
		
		//这是生成下个月的天数；
		var date = new Date();
		date.setMonth(date.getMonth()+1+num)
		date.setDate(0);
		var nextDay = date.getDay()+1
		var nextDate = date.getDate();
		var length = 42;
		var oLi = nowday.find('li').length;
		for(var i=0;i<(42-oLi);i++){
			
			var lis = $('<li>'+(i+1)+'</li>');
			lis.addClass('prev')
        	nowday.append(lis)
		}
		
		//console.log(nextDay,nextDate)
		
	}
	
	function createIndex(){
		var str ='<div id="warp">'+
			'<div id="box">'+
				'<div id="nowtime"><h1></h1></div>'+
				'<div id="date"><p></p></div>'+
				'<div id="switch">'+
					'<p></p>'+
					'<ul>'+
						'<li><a href="javascript:;"></a></li>'+
						'<li><a href="javascript:;"></a></li>'+
					'</ul>'+
				'</div>'+
				'<div id="dates">'+
					'<ul id="week">'+
					'</ul>'+
					'<ul id="day">'+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</div>';
		parent.append(str);
		
		
	}
	function aClick(){
		var as = $('#switch a')
		as.eq(0).on('click',function(){
			num--;
			calGetDay();
		})
        as.eq(1).on('click',function(){
			num++;
			calGetDay();
		})
		
	}

	
	$.fn.extend({
		cal:calender
	})
})(jQuery)
