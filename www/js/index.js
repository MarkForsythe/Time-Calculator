/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};

    var hourcount;
    var paycheckamount;
    var hourlyrate;
    var makingamount = 0;
    var paychecks = {};
    var ispaychecktrue;
    var daylog = [];

    var $moneyprogression = $('#moneyprogression');
    var $payrate = $('#payrate');
    var $setup = $('#setup');
    var $setuphide1 = $('#hourcount');
    var $setuphide2 = $('#paycheckamount');
    var $setuphide3 = $('#setup');
    var $setuphide4 = $('#setup2');
    var $clockedin = $('#clockedin');
    var $clockout = $('#clockout');
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
                daylog[0] = Date.now();
                $clockout.hide();
                
                console.log(daylog[0]);

            });
        };
        
    }, 500);
