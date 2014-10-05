var hourcount;
var paycheckamount;
var hourlyrate;
var makingamount = 0;
var paychecks = {};
var ispaychecktrue;
var daylog = [];
var gatheredPay;

var $moneyprogression = $('#moneyprogression');
var $payrate = $('#payrate');
var $setup = $('#setup');
var $setuphide1 = $('#hourcount');
var $setuphide2 = $('#paycheckamount');
var $setuphide3 = $('#setup');
var $setuphide4 = $('#setup2');
var $clockedin = $('#clockedin');
var $clockout = $('#clockout');
var gatheredPay = new Array();
var gatheredPaydisp;
$clockedin.hide();
$clockout.hide();
var $thisperiod = $('#thisperiod');
var $enter = $('#enter');
var daycount = 0;
var isclockedin = false;
$clockedin.hide();



$clockedin.click(function () {
	isclockedin = true;
	$clockedin.hide();
	$clockout.fadeIn();
});



$enter.click(function () {
	hourcount = $('#hourcount').val();
	paycheckamount = $('#paycheckamount').val();
	hourlyrate = (paycheckamount / hourcount) * 10000;
	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();	

	console.log(hourlyrate);
});

setInterval(function () {
	if (isclockedin === true) {

		makingamount += (hourlyrate / 7200);
		var makingamountdisp = makingamount / 10000;
		var hourlyratedisp = hourlyrate / 10000;
		$moneyprogression.html('$' + makingamountdisp.toFixed(3));
		$payrate.html('$' + hourlyratedisp.toFixed(2));
		$thisperiod.html('$' + makingamountdisp.toFixed(2));
		
		$clockout.click(function () {
			isclockedin = false;
			gatheredPosts.push(makingamountdisp);
			$clockout.hide();
			$clockedin.fadeIn();
			window.localStorage.setItem("cachedPay", gatheredPay);
			gatheredPaydisp = window.localStorage.getArray("cachedPay");
			$today.html(gatheredPaydisp);

		});
	};
	
	
}, 500);
