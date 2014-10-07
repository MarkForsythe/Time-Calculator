var hourcount;
var paycheckamount;
var hourlyrate = 0;
var hourlyratedisp;
var makingamount = 0;
var makingamountdisp;

var isclockedin = false;
var setupcomplete;

var $madetoday = $('#madetoday');
var $hourstoday = $('#hourstoday');
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



$clockedin.hide();
$clockout.hide();



if (window.localStorage.getItem("SetupIsComplete") === true) {
	$madetoday.html(window.localStorage.getItem("cachedPay"));
	$hourstoday.html(window.localStorage.getItem("cachedHours"));
	$payrate.html(window.localStorage.getItem("Payrate"));
	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();
};

var hour = 0;
var minute = 0;
var second = 0;




$enter.click(function () {
	hourcount = $('#hourcount').val();
	paycheckamount = $('#paycheckamount').val();
	hourlyrate = (paycheckamount / hourcount) * 10000;
	hourlyratedisp = hourlyrate / 10000;
	window.localStorage.setItem("Payrate", hourlyratedisp);
	$payrate.html(window.localStorage.getItem("Payrate"));
	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();	
	setupcomplete = true;
	window.localStorage.setItem("SetupIsComplete", true);
	console.log(hourlyrate);
});

$clockedin.click(function () {
	isclockedin = true;
	$clockedin.hide();
	$clockout.fadeIn();
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
			$thisperiod.html('$' + makingamountdisp.toFixed(2))
		};

	}, 1000);
	

	
});

$clockout.click(function () {
		isclockedin = false;
		//gatheredPosts.push(makingamountdisp);
		$clockout.hide();
		$clockedin.fadeIn();
		window.localStorage.setItem("cachedPay", makingamountdisp.toFixed(2));
		window.localStorage.setItem("cachedHours", hour + 'h ' + minute + 'm ' + second + 's');
		$madetoday.html(window.localStorage.getItem("cachedPay"));
		$hourstoday.html(window.localStorage.getItem("cachedHours"));

});







