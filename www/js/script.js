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

var $totals = $('#totals');
var $setupalert = $('#setupalert');

var totalsparse = 0;


$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">Please get a pay-stub and enter...</p></div>');




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
	$setupalert.hide();

	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		totalsparse += parseFloat(localStorage.getItem('cachedPay'+incr));
		console.log(totalsparse);
		$totals.html('<h3>' + totalsparse.toFixed(2) + ' ' + localStorage.totalhour + 'h ' + localStorage.totalminute + 'm</h3>');
	};

	
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		console.log('Inside for loop')
		$('#loggedpay').prepend('<li class="list-group-item">' + localStorage.getItem('cachedPay'+incr) + ' ' + localStorage['cachedHours'+incr] + '</li>');
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
		$payrate.hide();
		$setupalert.show();


});

$clearbtn.click(function () {
	$('#loggedpay').empty();
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		localStorage.removeItem('cachedPay'+incr);
		localStorage.removeItem('cachedHours'+incr);
	};
	localStorage.paycount = 0;
	totalsparse = 0;
	localStorage.totalhour = 0;
	localStorage.totalminute = 0;
	$totals.html(totalsparse + ' ' + localStorage.totalhour + 'h ' + localStorage.totalminute + 'm');

});




$enter.click(function () {
	
	hourcount = $('#hourcount').val();
	paycheckamount = $('#paycheckamount').val();
	hourlyrate = (paycheckamount / hourcount) * 10000;
	hourlyratedisp = '$' + (hourlyrate / 10000).toFixed(2) + '/hr';
	$payrate.fadeIn();
	//if(typeof(Storage) !== "undefined") {
	    localStorage.Payrate = hourlyratedisp;
	    localStorage.hourlyrate = hourlyrate;
		$payrate.html(localStorage.Payrate);
		localStorage.setupcomplete = true;
		console.log(localStorage.setupcomplete);
	//};

	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();	
	$payrate.html(localStorage.Payrate);
	$changerate.show();
	$setupalert.hide();
	//sessionStorage.islogged = true;
	//window.localStorage.setItem("SetupIsComplete", true);
	console.log(hourlyrate);

	localStorage.totalhour = '0';
	localStorage.totalminute = '0';
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
			var parsedtotalminute = parseInt(localStorage.totalminute) + 1;
			localStorage.totalminute = parsedtotalminute;
		};
		if (minute > 59) {
			hour += 1;
			minute = 0;
			
		};
		if (localStorage.totalminute > 59) {
			localStorage.totalminute = 0;
			var parsedtotalhour = parseInt(localStorage.totalhour) + 1;
			localStorage.totalhour = parsedtotalhour;

		};
		$timeprogression.html(hour + 'h ' + minute + 'm ' + second + 's');
		$moneyprogression.html('$' + makingamountdisp.toFixed(3));

		var totaltofixed = totalsparse + makingamountdisp;

		$totals.html('<h3>' + totaltofixed.toFixed(2) + ' ' + localStorage.totalhour + 'h ' + localStorage.totalminute + 'm</h3>');


	};
	
}, 1);

		



var parsedpaycount;
$clockout.click(function () {
	isclockedin = false;
	$clockout.hide();
	$clockedin.fadeIn();

	parsedpaycount = parseInt(localStorage.getItem('paycount')) + 1;
	localStorage.paycount = parsedpaycount;
    localStorage['cachedPay'+localStorage.paycount] = makingamountdisp.toFixed(2);
	localStorage['cachedHours'+localStorage.paycount] = hour + 'h ' + minute + 'm';
	totalsparse += parseFloat(localStorage.getItem('cachedPay'+localStorage.paycount));
	//$totals.html(totalsparse.toFixed(2) + ' ' + localStorage.totalhour + 'h ' + localStorage.totalminute + 'm');


	$('#loggedpay').prepend('<li class="list-group-item">' + localStorage.getItem('cachedPay' + localStorage.paycount) + ' ' + localStorage.totalhour + 'h ' + localStorage.totalminute + 'm' + '</li>');
	localStorage.totalminute = parseInt(localStorage.totalminute) - parseInt(localStorage.totalminute);
	localStorage.totalhour = parseInt(localStorage.totalhour) - parseInt(localStorage.totalhour);


	
	
		

	makingamount = 0;
	minute = 0;
	second = 0;
	hour = 0;
});








