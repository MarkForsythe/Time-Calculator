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


var secondslapse;
var minuteslapse;
var hourslapse;

var cc;
var c;

var mkngamnt;
var secondrate;
var allhrs;
var allmnts;


function timeDifference(d, dd) {
        var minute = 60 * 1000,
        hour = minute * 60,
        ms = Math.abs(d - dd);
    
	    var hours = parseInt(ms / hour, 10);
	    ms -= hours * hour;
	    var minutes = parseInt(ms / minute, 10);
	    ms -= minutes * minute;


	    //console.log(hours);
	    //console.log(minutes);
	    //console.log(ms);
	    secondslapse = ms;
	    minuteslapse = minutes;
	    hourslapse = hours;
	    // if (secondslapse > 60) {
	    // 	secondslapse = 0;
	    // };
};

$clockedin.hide();
$clockout.hide();
$timeprogression.hide();
$moneyprogression.hide();
$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">Please get a pay-stub and enter...</p></div>');


if (localStorage.Payrate !== undefined) {
	//Setting up initial conditions for returning user
	$payrate.html(localStorage.Payrate);
	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();
	$setupalert.hide();
	$timeprogression.show();
	$moneyprogression.show();

	//Adding up all the cachedPayX's, then displaying it
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		totalsparse += parseFloat(localStorage.getItem('cachedPay'+incr));
	};
	$totals.html('<h2>$' + totalsparse.toFixed(2) + '     ' + localStorage.storedhours + 'h ' + localStorage.storedminutes + 'm</h2>');
    
    //Displaying each cachedPay and cachedHours
	
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		$('#loggedpay').prepend('<li class="list-group-item">$' + localStorage.getItem('cachedPay'+incr) + '     ' + localStorage['cachedHours'+incr] + '</li>');
	};
}
else {
	//Initial paycount value
	localStorage.paycount = 0;
};

//Changing payrate button action
$changerate.click(function () {
	if (isclockedin === true) {
		$setupalert.html('<div class="alert alert-danger" role="alert"><p class="setup" id="setup">Please clockout first</p></div>');
		$setupalert.show().delay(2000).fadeOut();
		
		
	
	}
	else {
		$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">Please get a pay-stub and enter...</p></div>');
		//$setupalert.hide();
		$('#enter').show();
		$setuphide1.fadeIn();
		$setuphide2.fadeIn();
		$setuphide3.fadeIn();
		$setuphide4.fadeIn();
		$setupalert.fadeIn();
		$changerate.hide();
		$payrate.hide();
		$timeprogression.hide();
		$moneyprogression.hide();
		$clockedin.hide();

	};
	
});

//Reseting all cached data except your payrate
$clearbtn.click(function () {
	$('#loggedpay').empty();
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		localStorage.removeItem('cachedPay'+incr);
		localStorage.removeItem('cachedHours'+incr);
	};
	localStorage.paycount = 0;
	totalsparse = 0;
	localStorage.ttlhr = 0;
	localStorage.ttlmnt = 0;
	$totals.html('$' + totalsparse + '      ' + localStorage.ttlhr + 'h ' + localStorage.ttlmnt + 'm');

});




$enter.click(function () {
	//Getting user's input
	hourcount = $('#hourcount').val();
	paycheckamount = $('#paycheckamount').val();

	//Calculating their hourly rate and multiplying it for precision
	hourlyrate = (paycheckamount / hourcount) * 10000;
	hourlyratedisp = '$' + (hourlyrate / 10000).toFixed(2) + '/hr';



	//Saving Payrate for display and hourlyrate for use in javascript
	localStorage.Payrate = hourlyratedisp;
	localStorage.hourlyrate = hourlyrate;
	$payrate.html(localStorage.Payrate);

	localStorage.setupcomplete = true;

	//Hiding and revealing html elements
	$('#enter').hide();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();	
	$setupalert.hide();

	$payrate.fadeIn();
	$clockedin.fadeIn();
	$changerate.show();
	$timeprogression.show();
	$moneyprogression.show();

	//Setting stored minutes/hours to avoid initial NaN on signup

	localStorage.storedhours = '0';
	localStorage.storedminutes = '0';
});

//Setting isclockedin (starting the setInterval), changing toggle button, and creating the initial date time to count from
$clockedin.click(function () {
	isclockedin = true;
	$clockedin.hide();
	$clockout.fadeIn();
	cc = new Date();
});


//Looping code while clocked in
setInterval(function () {
	if (isclockedin === true) {
		//Getting current time
		c = new Date();
		//Running function to convert time difference of cc and c
		timeDifference(c, cc);

		//Time elapsed in seconds
		var tmelps = (c - cc) / 1000;

		//Calculating how much is made every second that's passed, and multiplying that by seconds elapsed
		secondrate = hourlyrate / 3600;
		mkngamnt = (secondrate * tmelps) / 10000;

		//Displaying time elapsed and money made
		$timeprogression.html(hourslapse + 'h ' + minuteslapse + 'm ' + secondslapse + 's');
		$moneyprogression.html('$' + mkngamnt.toFixed(3));

		//Calculating current total amount made,
		var totaltofixed = totalsparse + mkngamnt;
		var totalshour = parseInt(localStorage.getItem('storedhours')) + hourslapse;
		var totalsminute = parseInt(localStorage.getItem('storedminutes')) + minuteslapse;
		

		$totals.html('<h2>$' + totaltofixed.toFixed(2) + '      ' + totalshour + 'h ' + totalsminute + 'm</h2>');


	};
	
}, 10);

		



var parsedpaycount;
$clockout.click(function () {
	isclockedin = false;
	$clockout.hide();
	$clockedin.fadeIn();

	console.log(localStorage.storedminutes);
	allhrs = parseInt(localStorage.getItem('storedhours'));
	allmnts = parseInt(localStorage.getItem('storedminutes'));
	allhrs += hourslapse;
	allmnts += minuteslapse;
		//console.log(allmnts);
		//localStorage.storedminutes = allmnts;
	localStorage.storedhours = allhrs;
	localStorage.storedminutes = allmnts;



	parsedpaycount = parseInt(localStorage.getItem('paycount')) + 1;
	localStorage.paycount = parsedpaycount;


    localStorage['cachedPay'+localStorage.paycount] = mkngamnt.toFixed(2);
	localStorage['cachedHours'+localStorage.paycount] = hourslapse + 'h ' + minuteslapse + 'm';


	

	totalsparse += parseFloat(localStorage.getItem('cachedPay'+localStorage.paycount));



	$('#loggedpay').prepend('<li class="list-group-item">$' + localStorage.getItem('cachedPay' + localStorage.paycount) + '      ' + hourslapse + 'h ' + minuteslapse + 'm' + '</li>');
	makingamount = 0;
	minute = 0;
	second = 0;
	hour = 0;

	var local = new Date();
	//datetime = local.getHours() + ":" + local.getMinutes() + ":" + local.getSeconds();
});








