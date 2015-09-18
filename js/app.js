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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        ons.setDefaultDeviceBackButtonListener(function() {
            if (navigator.notification.confirm("Are you sure to close the app?",
                    function(index) {
                        if (index == 1) { // OK button
                            navigator.app.exitApp(); // Close the app
                        }
                    }
            ))
                ;
        });

        // Open any external link with InAppBrowser Plugin
        $(document).on('click', 'a[href^=http], a[href^=https]', function(e) {

            e.preventDefault();
            var $this = $(this);
            var target = $this.data('inAppBrowser') || '_blank';

            window.open($this.attr('href'), target);

        });

        // Initialize Push Notifications
        // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
        //app.initPushwoosh();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Register device for Push Notifications
    initPushwoosh: function() {
        var pushNotification = window.plugins.pushNotification;

        if (device.platform == "Android") {
            registerPushwooshAndroid();
        }
        if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
        }
    }

};

(function() {
    //alert("ok");
    var app = angular.module('sensationApp', ['onsen.directives', 'ngTouch', 'ngSanitize', 'angular-carousel', 'google-maps'.ns(), 'appLocalStorage', 'LocalStorageModule', 'ui.map', 'ui.event', 'nvd3']);

    app.config(['$httpProvider', function($httpProvider) {

            $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.cache = false;

        }]);

    // Home Controller
    app.controller('MainController', function($scope, Data) {

        $scope.items = Data.items;
        $scope.show1 = function() {
            modal1.show();
        }
        $scope.hide1 = function() {
            modal1.hide();
        }
        $scope.show2 = function() {
            modal2.show();
        }
        $scope.hide2 = function() {
            modal2.hide();
        }
    });
    app.controller('HumController', function($scope, Data) {

    });
    app.controller('OptionsController', function($scope, $http, Dataoption) {



        $scope.showPage = function(index) {
            $http({method: 'POST', url: 'http://seva60plus.co.in/seva60PlusAndroidAPI/show_hum_stat', data: {'hum_phone_no': '9732604208'}}).success(function(data) {
                //console.log(data);

                //var jvar = jQuery.parseJSON(data);
                if (index == 'sleep') {
                    //console.log(jvar.sleep[0]);  
                    data.sleep[0].title='SLEEP';
                    $scope.items = data.sleep[0];
                } else if (index == 'mood') {
                    data.mood[0].title='MOOD';
                    $scope.items = data.mood[0];
                } else if (index == 'exercise') {
                    data.exercise[0].title='EXERCISE';
                    $scope.items = data.exercise[0];
                }
                var selectedItem = $scope.items;
                Dataoption.selectedItem = selectedItem;
                console.log(selectedItem);
                $scope.appNavigator.pushPage('response.html', selectedItem);
            });
            //$scope.items = Dataoption.items(index);


        }
    });
    app.controller('ResponseController', function($scope, Dataoption) {

        $scope.item = Dataoption.selectedItem;
        //console.log(Dataoption.selectedItem.sleep1.added_on);
    });


})();