$(function(){

	// ===== 比赛时间 =====
	if (document.getElementById('date_start')) {
		//获得下个小时时间戳,刻度为千分之一秒
	    var nexthour= new Date((new Date()).getTime()+60*60*1000).getTime();

	    //标记(8小时时间差)：时间戳为0: input是从晚上0:00开始记，js alert出是从8:00开始记
	    var onehournum = 60*60*1000;
	    var basehournum = Math.floor((nexthour + onehournum*8)/600000)*600000;//精度为分钟的时间戳


	    //elements
	    var date_start = document.getElementById('date_start');
	    var time_start = document.getElementById('time_start');
	    var date_sign = document.getElementById('date_sign');
	    var time_sign = document.getElementById('time_sign');
	    var date_end = document.getElementById('date_end');
	    var time_end = document.getElementById('time_end');

	    //set time
	    date_start.valueAsDate = new Date(basehournum);
	    time_start.valueAsDate = new Date(basehournum);

	    date_sign.valueAsDate = new Date(basehournum + onehournum);
	    time_sign.valueAsDate = new Date(basehournum + onehournum);

	    date_end.valueAsDate = new Date(basehournum + onehournum*2);
	    time_end.valueAsDate = new Date(basehournum + onehournum*2);


	    //检测(return 1 时表示时间顺序不合理)
	    function isTimeOrderWrong(){

	        var num_start = date_start.valueAsDate + time_start.valueAsDate;
	        var num_sign = date_sign.valueAsDate + time_sign.valueAsDate;
	        var num_end = date_end.valueAsDate + time_end.valueAsDate;
	        if( (num_start > num_sign) || (num_sign > num_end) ){
	            return 1;
	        }else{
	            return 0;
	        }
	    }

	    
	    function timeCheck(){
	    	// console.log(document.getElementById('date_start').valueAsDate + document.getElementById('time_start').valueAsDate);
	    	if ( (date_start.valueAsDate.getTime() + time_start.valueAsDate.getTime()) <= (new Date().getTime() + 60*60*1000*8) ) { alert('截止 时间有误,截止时间>=当前时间~'); return false; }
	        if ( isTimeOrderWrong() ){ alert('开始-签到-截止 时间有误,开始时间>=签到时间>=截止时间~'); return false; };
	    }

	    $('#time_start').blur(function(){
	    	timeCheck();
	    });
    };

    // ======= agree_in_frm =======
    function checkIfEnable(){
    	if ($('#agree_in_frm input[type=checkbox]:checked').size()) {
	    	$('.golf_btn_wrap').css('opacity','1');
	    	$('.golf_btn_wrap').click(function(){
	    		return true;
	    	})
	    } else {
	    	$('.golf_btn_wrap').css('opacity','0.6');
	    	$('.golf_btn_wrap').click(function(){
	    		return false;
	    	})
	    }
    }

    if ($('#agree_in_frm input[type=checkbox]').size()) {
    	checkIfEnable();
    	$('#agree_in_frm input[type=checkbox]').change(function(){
    		checkIfEnable();
    	});
    }
    

});