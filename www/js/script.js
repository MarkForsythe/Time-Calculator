var hourlyrate = localStorage.hourlyrate;
var hourlyratedisp;
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
var $calcalert = $('#calcalert');
var $calcalert2 = $('#calcalert2');
var $minutecount = $('#minutecount');
var $optionalamountalert = $('#optionalamountalert');
var $addButtonMinus = $('#addButtonMinus');


//Variables for manually adding logged items
$addDate = $('#addDate');
$addHours = $('#addHours');
$addMinutes = $('#addMinutes');
$addConfirm = $('#addConfirm');
$addMoney = $('#addMoney');
$addButton = $('#addButton');
$addDate.hide();
$addHours.hide();
$addMinutes.hide();
$addConfirm.hide();
var addDate;
var addHours = 0;
var addMinutes = 0;



//$('#addAlert').html('<div class="alert alert-danger" role="alert"><p class="setup" id="setup">Please enter less than 60 minutes.</p></div>');



//Determines how much time has passed and stores them in ____lapse
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


//New user initial conditions
$confirmdelete.hide();
$clearalert.hide();
$clockedin.hide();
$clockout.hide();
$timeprogression.hide();
$moneyprogression.hide();
$optionalamountalert.hide();
$changerate.hide();
$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">Please get a pay-stub and enter...</p></div>');
//$manualalert.html('');
$('#addMoney').hide();
$('#addAlert').hide();
$addButtonMinus.hide();

//Initial conditions for returning user
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
	$calcalert2.hide();
	$calcalert.hide();
	$minutecount.hide();
	$manualpayrate.hide();
	$timeprogression.show();
	$moneyprogression.show();
	$changerate.show();

	//Adding up all the cachedPayX's, then displaying it
	for(var incr = 1; incr <= localStorage.paycount; incr++ ) { 
		totalsparse += parseFloat(localStorage.getItem('cachedPay'+incr));
	};
	$totals.html('<h2>$' + totalsparse.toFixed(2) + ' - ' + localStorage.storedhours + 'h ' + localStorage.storedminutes + 'm </h2>');//' + localStorage.storedminutes + 'm</h2>');
    
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
		$setupalert.html('<div class="alert alert-info" role="alert"><p class="setup" id="setup">To calculate your hourly pay rate, get a pay-stub and...</p></div>');
		$manualalert.show();
		$calcalert.show();
		$calcalert2.show();
		$minutecount.show();
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
	$calcalert.hide();
	$calcalert2.hide();
	$minutecount.hide();
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
		var minutecountholder = parseInt($('#minutecount').val()) / 60;
		console.log(minutecountholder);
		var countholder = parseInt($('#hourcount').val()) + minutecountholder;
		console.log('YT'+ $('#hourcount').val())
		console.log(countholder);
		hourlyrate = ($('#paycheckamount').val() / countholder) * 10000;
		completesetup();

	};

});

//Setting isclockedin (starting the setInterval), changing toggle button, and creating the initial date time to count from
$clockedin.click(function () {
	localStorage.isclockedin = true;
	$clockedin.hide();
	$clockout.fadeIn();
	cc = new Date();
	localStorage.cc = cc;
	console.log("DDD"+ localStorage.cc);
});

//Looping code while clocked in
var runonce = true;
var cnt = 0;
var t_hour;
var t_min;
		




setInterval(function () {
	if (localStorage.isclockedin === 'true') {
		if (runonce === true) {
			t_hour = parseInt(localStorage.getItem('storedhours'));
			t_min = parseInt(localStorage.getItem('storedminutes'));
			console.log("ZZZZZZZZZZZZZZZZ");
			runonce = false;
		}
	

		//Getting current time
		c = new Date();
		var starttime = Date.parse(localStorage.cc);

		//Running function to convert time difference of cc and c
		timeDifference(c, starttime);

		//Time elapsed in seconds
		var tmelps = (c - starttime) / 1000;

		//Calculating how much is made every second that's passed, and multiplying that by seconds elapsed
		secondrate = hourlyrate / 3600;
		mkngamnt = (secondrate * tmelps) / 10000;


		//Displaying time elapsed and money made
		$timeprogression.html(hourslapse + 'h ' + minuteslapse + 'm ' + (secondslapse / 1000).toFixed(0) + 's');
		$moneyprogression.html('$' + mkngamnt.toFixed(3));

		//Calculating current total amount made,
		totaltofixed = totalsparse + mkngamnt;

        // Ensuring that if more than an hour has lapsed, an hour will be added and 60 minutes will be subtracted from storedminutes

        //Keeping count of total minutes and minuteslapse count
		if (cnt != minuteslapse) {
			cnt += 1;
			t_min += 1;
		};

		if (t_min >= 60) {
			t_hour += 1;
			t_min -= 60;
		};
        //Making minutes display as t_min before fist hour is up
  //       if (t_min < 60) {
  //       	dispmins = t_min;
  //       };

		// if (t_min >= 60) {
		// 	actvSecondHour = true;
		// };

		// if (actvSecondHour === true) {
		// 	dispmins = cnt2;
		// 	if (firsthouradd === false) {
		// 		t_hour += 1;
		// 		firsthouradd = true;
		// 	};
			
			// if (cnt != minuteslapse && firsthouradd === true) {
			// 	cnt2 += 1;
			// 	cnt += 1;
			// 	console.log("addmin");

			// };
			
		// 	if (cnt2 >= 60) {
		// 		t_hour += 1;
		// 		cnt2 = 0;
		// 	};
		// };
		$totals.html('<h2>$' + totaltofixed.toFixed(2) + ' - ' + t_hour + 'h ' + t_min + 'm</h2>');
	};
}, 50);

//Clock out action
$clockout.click(function () {

	//actvSecondHour = false;
	runonce = true;
	cnt = 0;

	localStorage.isclockedin = false;
	$clockout.hide();
	$clockedin.fadeIn();
	console.log("T"+localStorage.storedminutes);



	//Parsing pay count, adding one and saving
	parsedpaycount = parseInt(localStorage.getItem('paycount')) + 1;
	localStorage.paycount = parsedpaycount;

	//Saving hours and minutes for subtraction from total upon deletion
	localStorage['rmvhours' + localStorage.paycount] = hourslapse;
	localStorage['rmvminutes' + localStorage.paycount] = minuteslapse;
	localStorage['cachedHours'+localStorage.paycount] = hourslapse + 'h ' + minuteslapse + 'm';



	//Setting cached amounts for display
    localStorage['cachedPay'+localStorage.paycount] = mkngamnt.toFixed(2);
	var month = (new Date).getMonth() + 1; //months from 1-12
	var day = (new Date).getDate();
	localStorage['cachedDate'+localStorage.paycount] = month + "/" + day;

	//Adding current cachedPay to total
	totalsparse += parseFloat(localStorage.getItem('cachedPay'+localStorage.paycount));

    //Adding the table item displaying new tr
	$('#loggedpay').prepend('<tr><td>' + localStorage.getItem('cachedDate' + localStorage.paycount) + '</td><td>$' + localStorage.getItem('cachedPay' + localStorage.paycount) + '</td><td>' + localStorage['cachedHours'+localStorage.paycount] + '<button id="' + localStorage.paycount + '" class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');

	// if (minuteslapse <= 60) {
 //    	hourslapse += 1;
 //    	minuteslapse -= 60;
 //    };

	//Adding time lapsed to storedhours and storedminutes
	allhrs = parseInt(localStorage.getItem('storedhours'));
	allmnts = parseInt(localStorage.getItem('storedminutes'));
	allhrs += hourslapse;
	allmnts += minuteslapse;
	localStorage.storedhours = allhrs;
	localStorage.storedminutes = allmnts;
	console.log(localStorage.storedhours);
	console.log("X"+localStorage.storedminutes);

	var adjustminutes = parseInt(localStorage.getItem('storedminutes'));
	for (var e = 1; adjustminutes >= 60; e++) {
		var addinghours = parseInt(localStorage.getItem('storedhours'));
		addinghours += 1;
		adjustminutes -= 60;
		localStorage.storedhours = addinghours;
		localStorage.storedminutes = adjustminutes;
	};


	minute = 0;
	second = 0;
	hour = 0;
});




$(document).ready(function () {

	$addButton.click(function () {
		$addButton.hide();
		$addButtonMinus.show();

		$addDate.show();
		$addHours.show();
		$addMinutes.show();
		$addConfirm.show();
		$addMoney.show();
		$optionalamountalert.show();
	

		$addButtonMinus.click(function () {
				$addDate.hide();
				$addHours.hide();
				$addMinutes.hide();
				$addConfirm.hide();
				$addMoney.hide();
				$optionalamountalert.hide();
				$addButtonMinus.hide();
				$addButton.show();
		});

        var addAmount = 0;
		$addConfirm = $('#addConfirm');

		$addConfirm.unbind().click(function () {

				addDate = $('#addDate').val();
				addHours = $('#addHours').val();
				addMinutes = $('#addMinutes').val();
				if (addMinutes != '' && addHours != '' && addMinutes < 60 && addHours >= 0) {
					addHours = parseInt(addHours);
					addMinutes = parseInt(addMinutes);


					//Parsing pay count, adding one and saving
					var parsed_paycount = parseInt(localStorage.getItem('paycount')) + 1;
					localStorage.paycount = parsed_paycount;

					

					//Calculating amount made with hourlyrate
					for (var i = 0; i < addHours; i++) {
					addAmount += hourlyrate * 10;
					};
				
					for (var i = 0; i < addMinutes; i++) {
					var realminute = (hourlyrate * 10) / 60;
					addAmount += realminute;
				
					};

					var addAmountfixed = addAmount / 100000;

					localStorage['cachedHours'+localStorage.paycount] = addHours + 'h ' + addMinutes + 'm';
					if ($('#addMoney').val().length != 0 && $('#addMoney').val() > 0) {
						localStorage['cachedPay'+localStorage.paycount] = $('#addMoney').val();
					}
					else {
						localStorage['cachedPay'+localStorage.paycount] = addAmountfixed.toFixed(2);
					};

					

					//Adding current cachedPay to total
					totalsparse += parseFloat(localStorage.getItem('cachedPay'+localStorage.paycount));

					localStorage['cachedDate'+localStorage.paycount] = addDate;
					localStorage['cachedDate'+localStorage.paycount] = addDate;
					localStorage['rmvhours' + localStorage.paycount] = addHours;
					localStorage['rmvminutes' + localStorage.paycount] = addMinutes;


					allhrs = parseInt(localStorage.getItem('storedhours'));
					allmnts = parseInt(localStorage.getItem('storedminutes'));
					allhrs += addHours;
					allmnts += addMinutes;
					localStorage.storedhours = allhrs;
					localStorage.storedminutes = allmnts;



					var adjustminutes = parseInt(localStorage.getItem('storedminutes'));
					for (var e = 1; adjustminutes >= 60; e++) {
						var addinghours = parseInt(localStorage.getItem('storedhours'));
						addinghours += 1;
						adjustminutes -= 60;
						localStorage.storedhours = addinghours;
						localStorage.storedminutes = adjustminutes;
					};

					$('#loggedpay').prepend('<tr><td>' + localStorage.getItem('cachedDate' + localStorage.paycount) + '</td><td>$' + localStorage.getItem('cachedPay' + localStorage.paycount) + '</td><td>' + addHours + 'h ' + addMinutes + 'm ' + '<button id="' + localStorage.paycount + '" class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');

					$addDate.hide();
					$addHours.hide();
					$addMinutes.hide();
					$addConfirm.hide();
					$addMoney.hide();
					$optionalamountalert.hide();
					$addButtonMinus.hide();
					$addButton.show();
					//$addButton.html('<span class="glyphicon glyphicon-plus">');
					$totals.html('<h2>$' + totalsparse.toFixed(2) + ' - ' + localStorage.storedhours + 'h ' + localStorage.storedminutes + 'm</h2>');

			} 
			else {
			$('#addAlert').html('<div class="alert alert-danger" role="alert"><p class="setup" id="setup">Enter minutes 0-59, and hours 0+.</p></div>');
            $('#addAlert').show().delay(3000).fadeOut();
				};
		});

	});



	//}
	//else {

		// $('#addDate').hide();
		// $('#addHours').hide();
		// $('#addMinutes').hide();
		// $('#addConfirm').hide();
		// $('#addMoney').hide();
		// $optionalamountalert.hide();
		// $addButton.html('<span class="glyphicon glyphicon-plus">');

	//};
	//$(this).data("clicks", !clicks);


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

 			 var rmvhours = parseInt(localStorage.getItem('rmvhours'+savedid));
 			var rmvminutes = parseInt(localStorage.getItem('rmvminutes'+savedid));

 			var parsehoursforrmv = parseInt(localStorage.storedhours);
 			parsehoursforrmv -= rmvhours;
 			localStorage.storedhours = parsehoursforrmv;

 			var parseminutesforrmv = parseInt(localStorage.storedminutes);
 			parseminutesforrmv -= rmvminutes;
 			localStorage.storedminutes = parseminutesforrmv;


 			var checkunderminutes = parseInt(localStorage.storedminutes);
 			if (checkunderminutes < 0) {
 				var addanhour = parseInt(localStorage.storedhours);
 				addanhour -= 1;
 				checkunderminutes += 60;
 				console.log("TEST" + checkunderminutes);
 				console.log("TEST" + addanhour);

 				localStorage.storedhours = addanhour;
 				localStorage.storedminutes = checkunderminutes;


 			};


 			localStorage.removeItem('cachedDate'+savedid);
			localStorage.removeItem('cachedHours'+savedid);
 			localStorage['cachedPay'+savedid] = 0;
 			localStorage['rmvhours'+savedid] = 0;
 			localStorage['rmvminutes'+savedid] = 0;
 			
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
 			
 			$('#'+savedid).replaceWith('<button id="' + savedid + '"class="btn delbtn"><span class="glyphicon glyphicon-trash"></span></button>');
 			warned = false;
 			savedid = undefined;
 			savedid2 = undefined;



 		};
 	}
 	else {
 		savedid = $(this).attr('id');
 		console.log(savedid);
 		$(this).replaceWith('<button id="' + savedid + '"class="btn delbtn"><span class="glyphicon glyphicon-remove-circle"></span></button>');
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







