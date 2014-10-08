var hourcount;
var paycheckamount;
var hourlyrate = localStorage.hourlyrate;
var hourlyratedisp;
var makingamount = 0;
var makingamountdisp;

var isclockedin = false;

var hour = 0;
var minute = 0;
var second = 0;


//var worktime = [];
//var worktimecount;

//var setupcheck = localStorage.setupcomplete;

var $moneyprogression = $('#moneyprogression');
var $timeprogression = $('#timeprogression');
var $payrate = $('#payrate');
var $setup = $('#setup');
var $setuphide1 = $('#hourcount');
var $setuphide2 = $('#paycheckamount');
var $setuphide3 = $('#setup');
var $setuphide4 = $('#setup2');
var $clockedin = $('#clockedin');
var $clockout = $('#clockout');
var $thisperiod = $('#thisperiod');
var $enter = $('#enter');
var $changerate = $('#changerate');
var $clearbtn = $('#clearbtn');



//$hourstoday = localStorage.cachedHours;

// $madetoday.html(localStorage.cachedPay);
// $hourstoday.html(localStorage.cachedHours);
$clockedin.hide();
$clockout.hide();



if (localStorage.Payrate !== undefined) {
	$payrate.html(localStorage.Payrate);
	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		console.log('Inside for loop')
		$('#loggedpay').prepend('<li>' + localStorage.getItem('cachedPay'+incr) + ' ' + localStorage['cachedHours'+incr] + '</li>');
	};
}
else {
	localStorage.paycount = 0;
};

//Change your payrate
$changerate.click(function () {
		$('#enter').show();
		$clockedin.fadeOut();
		$setuphide1.fadeIn();
		$setuphide2.fadeIn();
		$setuphide3.fadeIn();
		$setuphide4.fadeIn();
		$changerate.hide();

});

$clearbtn.click(function () {
	$('#loggedpay').empty();
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		localStorage.removeItem('cachedPay'+incr);
		localStorage.removeItem('cachedHours'+incr);
	};
	localStorage.paycount = 0;

});




$enter.click(function () {
	
	hourcount = $('#hourcount').val();
	paycheckamount = $('#paycheckamount').val();
	hourlyrate = (paycheckamount / hourcount) * 10000;
	hourlyratedisp = '$' + (hourlyrate / 10000).toFixed(2) + '/hr';
	$payrate.fadeIn();
	if(typeof(Storage) !== "undefined") {
	    localStorage.Payrate = hourlyratedisp;
	    localStorage.hourlyrate = hourlyrate;
		$payrate.html(localStorage.Payrate);
		localStorage.setupcomplete = true;
		console.log(localStorage.setupcomplete);
	};

	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();	
	$payrate.html(localStorage.Payrate);
	$changerate.show();
	//sessionStorage.islogged = true;
	//window.localStorage.setItem("SetupIsComplete", true);
	console.log(hourlyrate);
});

$clockedin.click(function () {
	isclockedin = true;
	$clockedin.hide();
	$clockout.fadeIn();
});
setInterval(function () {
		if (isclockedin === true) {
	
			makingamount += (hourlyrate / 3600);
			makingamountdisp = makingamount / 10000;
			
			second += 1;
			if (second > 59) {
				minute += 1;
				second = 0;
			};
			if (minute > 59) {
				hour += 1;
				minute = 0;
			};
			$timeprogression.html(hour + 'h ' + minute + 'm ' + second + 's');
			$moneyprogression.html('$' + makingamountdisp.toFixed(3));
		};
	}, 1000);


var parsedpaycount;
$clockout.click(function () {
		isclockedin = false;
		$clockout.hide();
		$clockedin.fadeIn();
		
		parsedpaycount = parseInt(localStorage.getItem('paycount')) + 1;
		localStorage.paycount = parsedpaycount;
		console.log(localStorage.paycount);
	

		if(typeof(Storage) !== "undefined") {
		    localStorage.setItem('cachedPay'+localStorage.paycount, makingamountdisp.toFixed(2));
			localStorage['cachedHours'+localStorage.paycount] = hour + 'h ' + minute + 'm';
			
			$('#loggedpay').prepend('<li>' + localStorage.getItem('cachedPay' + localStorage.paycount) + ' ' + localStorage['cachedHours'+localStorage.paycount] + '</li>');
		};
		makingamount = 0;
		minute = 0;
		second = 0;
		hour = 0;
});








