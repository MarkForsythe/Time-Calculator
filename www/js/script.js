var hourlyrate = localStorage.hourlyrate;
var hourlyratedisp;
//localStorage.delnum = 0;
var hourcount;
var paycheckamount;
var isclockedin = false;

var totalsparse = 0;

//Holds time passed during current clock in
var secondslapse;
var minuteslapse;
var hourslapse;

//cc: initial start time. c: current time in setInterval
var cc;
var c;

var mkngamnt;
var secondrate;
var allhrs;
var allmnts;

var parsedpaycount;

var totaltofixed;
var totalshour;
var totalsminute;

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
var $clearalert = $('#clearalert');
var $confirmdelete = $('#confirmdelete');

var $manualpayrate = $('#manualpayrate');
var $manualalert = $('#manualalert');

console.log($('#manualpayrate').val());
//Determines how much time has passed and stores them in Xlapse
function timeDifference(d, dd) {
        var minute = 60 * 1000,
        hour = minute * 60,
        ms = Math.abs(d - dd);
    
	    var hours = parseInt(ms / hour, 10);
	    ms -= hours * hour;
	    var minutes = parseInt(ms / minute, 10);
	    ms -= minutes * minute;



	    secondslapse = ms;
	    minuteslapse = minutes;
	    hourslapse = hours;
};

$confirmdelete.hide();
$clearalert.hide();
//New user initial conditions
$clockedin.hide();
$clockout.hide();
$timeprogression.hide();
$moneyprogression.hide();
$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">Please get a pay-stub and enter...</p></div>');
$manualalert.html('<span class="label label-info" role="alert">Or simply enter your pay rate:</span>');

//Setting up initial conditions for returning user
if (localStorage.Payrate !== undefined) {
	$payrate.html(localStorage.Payrate);
	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();
	$setupalert.hide();
	$manualalert.hide();
	$manualpayrate.hide();
	$timeprogression.show();
	$moneyprogression.show();

	//Adding up all the cachedPayX's, then displaying it
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		totalsparse += parseFloat(localStorage.getItem('cachedPay'+incr));
	};
	$totals.html('<h2>$' + totalsparse.toFixed(2) + ' - ' + localStorage.storedhours + 'h ' + localStorage.storedminutes + 'm</h2>');
    
    //Displaying each cachedPay and cachedHours
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		if (localStorage.getItem('cachedHours' + incr) != undefined) {
			$('#loggedpay').prepend('<tr><td>' + localStorage.getItem('cachedDate' + incr) + '</td><td>$' + localStorage.getItem('cachedPay'+incr) + '</td><td>' + localStorage['cachedHours'+incr] + '<button id="' + incr+ '"class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
		};
		
	};
}
else {
	//Initial paycount value
	localStorage.paycount = 0;
};

//Changing payrate button action
$changerate.click(function () {
	if (isclockedin === true) {
		$setupalert.html('<div class="alert alert-danger" role="alert"><p class="setup" id="setup">Please clock out first.</p></div>');
		$setupalert.show().delay(2000).fadeOut();
		
		
	
	}
	else {
		$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">Please get a pay-stub and enter...</p></div>');
		$manualalert.show();
		$manualpayrate.show();
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

//Button for reseting all cached data, except your payrate
$clearbtn.click(function () {
	$confirmdelete.fadeIn();

	$clearbtn.hide();
	setTimeout(function () {
		$confirmdelete.hide();
		$clearbtn.fadeIn();

	}, 4000);


	$confirmdelete.click(function () {
		$confirmdelete.hide();
		$clearbtn.fadeIn();

		$('#loggedpay').empty();
		for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
			localStorage.removeItem('cachedPay'+incr);
			localStorage.removeItem('cachedHours'+incr);
		};
		localStorage.storedminutes = 0;
		localStorage.storedhours = 0;
		localStorage.paycount = 0;
		totalsparse = 0;
		localStorage.ttlhr = 0;
		localStorage.ttlmnt = 0;
		$totals.html('<h2>$0.00 - 0h 0m</h2>');
		


	});
	


});


//Setup function for after pay rate is defined
var completesetup = function () {

	//Calculating user's hourly rate, then multiplying it for precision
	
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
	$manualalert.hide();
	$manualpayrate.hide();

	$payrate.fadeIn();
	$clockedin.fadeIn();
	$changerate.show();
	$timeprogression.fadeIn();
	$moneyprogression.fadeIn();
	//Setting stored minutes/hours to avoid initial NaN on signup
	localStorage.storedhours = '0';
	localStorage.storedminutes = '0';
};
$enter.click(function () {
	if ($('#manualpayrate').val().length != 0) {
		hourlyrate = $manualpayrate.val() * 10000;
		completesetup();


	}
	else {
		hourlyrate = ($('#paycheckamount').val() / $('#hourcount').val()) * 10000;
		completesetup();

	};

});

//Setting isclockedin (starting the setInterval), changing toggle button, and creating the initial date time to count from
$clockedin.click(function () {
	isclockedin = true;
	$clockedin.hide();
	$clockout.fadeIn();
	cc = new Date();
	localStorage.cc = cc;
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
		$timeprogression.html(hourslapse + 'h ' + minuteslapse + 'm ' + (secondslapse / 1000).toFixed(0) + 's');
		$moneyprogression.html('$' + mkngamnt.toFixed(3));

		//Calculating current total amount made,
		totaltofixed = totalsparse + mkngamnt;
		totalshour = parseInt(localStorage.getItem('storedhours')) + hourslapse;
		totalsminute = parseInt(localStorage.getItem('storedminutes')) + minuteslapse;
		

		$totals.html('<h2>$' + totaltofixed.toFixed(2) + ' - ' + totalshour + 'h ' + totalsminute + 'm</h2>');


	};
	
}, 10);


$clockout.click(function () {
	isclockedin = false;
	$clockout.hide();
	$clockedin.fadeIn();

	allhrs = parseInt(localStorage.getItem('storedhours'));
	allmnts = parseInt(localStorage.getItem('storedminutes'));
	allhrs += hourslapse;
	allmnts += minuteslapse;

	localStorage['rmvhours' + localStorage.paycount] = hourslapse;
	localStorage['rmvminutes' + localStorage.paycount] = minuteslapse;
	console.log("EHEM" + localStorage['rmvminutes' + localStorage.paycount]);

	localStorage.storedhours = allhrs;
	localStorage.storedminutes = allmnts;

	//Parsing pay count, adding one and saving
	parsedpaycount = parseInt(localStorage.getItem('paycount')) + 1;
	localStorage.paycount = parsedpaycount;

	//Setting cached amounts for display
    localStorage['cachedPay'+localStorage.paycount] = mkngamnt.toFixed(2);
	localStorage['cachedHours'+localStorage.paycount] = hourslapse + 'h ' + minuteslapse + 'm';
	var month = (new Date).getMonth() + 1; //months from 1-12
	var day = (new Date).getDate();
	localStorage['cachedDate'+localStorage.paycount] = month + "/" + day;

	//Adding current cachedPay to total
	totalsparse += parseFloat(localStorage.getItem('cachedPay'+localStorage.paycount));


	$('#loggedpay').prepend('<tr><td>' + localStorage.getItem('cachedDate' + localStorage.paycount) + '</td><td>$' + localStorage.getItem('cachedPay' + localStorage.paycount) + '</td><td>' + hourslapse + 'h ' + minuteslapse + 'm ' + '<button id="' + localStorage.paycount + '" class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
	//var parsedelnum = parseInt(localStorage.getItem('delnum')) + 1;
	//localStorage.delnum = parsedelnum;
	minute = 0;
	second = 0;
	hour = 0;
});

var warned = false;
var savedid;
var savedid2;

 $(document).on('click', 'button.delbtn', function () {

 	//var savedid2 = $(this).attr('id');

 	if (warned === true) {
 		savedid2 = $(this).attr('id');
 		console.log(savedid2);
 		if (savedid === savedid2) {
 			
 			$(this).closest('tr').fadeOut('fast');

 			localStorage.removeItem('cachedDate'+savedid);
			localStorage.removeItem('cachedHours'+savedid);
			localStorage.removeItem('cachedDate'+savedid);
 			localStorage['cachedPay'+savedid] = 0;

 			savedid -= 1;
 			var rmvhours = parseInt(localStorage.getItem('rmvhours'+savedid));
 			var rmvminutes = parseInt(localStorage.getItem('rmvminutes'+savedid));

 			var parsehoursforrmv = parseInt(localStorage.storedhours);
 			parsehoursforrmv -= rmvhours;
 			localStorage.storedhours = parsehoursforrmv;

 			var parseminutesforrmv = parseInt(localStorage.storedminutes);
 			parseminutesforrmv -= rmvminutes;
 			localStorage.storedminutes = parseminutesforrmv;
 			
 			totalsparse = 0;
 			for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
				totalsparse += parseFloat(localStorage.getItem('cachedPay'+incr));
			};
 			$totals.html('<h2>$' + totalsparse.toFixed(2) + ' - ' + localStorage.storedhours + 'h ' + localStorage.storedminutes + 'm</h2>');


	 		warned = false;
	 		savedid = undefined;
 			savedid2 = undefined;

 		}
 		else {
 			//$(this).replaceWith('<button id="' + savedid2 + '"class="btn delbtn"><span class="glyphicon glyphicon-search"></span></button>');
 			$('#'+savedid).replaceWith('<button id="' + savedid + '"class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button>');
 			warned = false;
 			savedid = undefined;
 			savedid2 = undefined;



 		};
 	}
 	else {
 		savedid = $(this).attr('id');
 		console.log(savedid);
 		$(this).replaceWith('<button id="' + savedid + '"class="btn delbtn"><span class="glyphicon glyphicon-search"></span></button>');
	 	warned = true;
	 	setTimeout(function () {
			$('#'+savedid).replaceWith('<button id="' + savedid + '"class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button>');
			savedid = undefined;
 			savedid2 = undefined;
	}, 3000);
 	};

 	
 	

   // $(this).closest('tr').remove();
    // return false;
 });







