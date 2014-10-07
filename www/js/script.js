var hourcount;
var paycheckamount;
var hourlyrate = 0;
var hourlyratedisp;
var makingamount = 0;
var makingamountdisp;

var isclockedin = false;

var worktime = [];
var worktimecount;





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



//$hourstoday = localStorage.cachedHours;

$madetoday.html(localStorage.cachedPay);
$hourstoday.html(localStorage.cachedHours);

$clockedin.hide();
$clockout.hide();
$payrate.hide();


if(typeof(Storage) !== "undefined") {
   if (localStorage.setupcomplete == true) {
		$madetoday.html(localStorage.cachedPay);
		$hourstoday.html(localStorage.cachedHours);
		$payrate.html(localStorage.Payrate);
		$('#enter').hide();
		$clockedin.fadeIn();
		$setuphide1.hide();
		$setuphide2.hide();
		$setuphide3.hide();
		$setuphide4.hide();
	};
} else {
    //console.log(ERRORRR);
};


var hour = 0;
var minute = 0;
var second = 0;




$enter.click(function () {
	
	hourcount = $('#hourcount').val();
	paycheckamount = $('#paycheckamount').val();
	hourlyrate = (paycheckamount / hourcount) * 10000;
	hourlyratedisp = '$' + (hourlyrate / 10000).toFixed(2) + '/hr';
	$payrate.fadeIn();
	if(typeof(Storage) !== "undefined") {
	    localStorage.Payrate = hourlyratedisp;
		$payrate.html(localStorage.Payrate);
		localStorage.setupcomplete = true;
		console.log(localStorage.setupcomplete);
	} else {
	    // Sorry! No Web Storage support..
	};

	

	$('#enter').hide();
	$clockedin.fadeIn();
	$setuphide1.hide();
	$setuphide2.hide();
	$setuphide3.hide();
	$setuphide4.hide();	
	setupcomplete = true;
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

$clockout.click(function () {
		isclockedin = false;
		//gatheredPosts.push(makingamountdisp);
		$clockout.hide();
		$clockedin.fadeIn();
		if(typeof(Storage) !== "undefined") {
		    localStorage.cachedPay = makingamountdisp.toFixed(2);
			localStorage.cachedHours = hour + 'h ' + minute + 'm';
			$madetoday.html(localStorage.cachedPay);
			$hourstoday.html(localStorage.cachedHours);
		} else {
		    // Sorry! No Web Storage support..
		};
		
		makingamount = 0;
		minute = 0;
		second = 0;
		hour = 0;

});








