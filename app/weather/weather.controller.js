(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$http'];

    /* @ngInject */
    function WeatherController($http) {
        var vm = this;

        vm.callWeatherApi = callWeatherApi;
        vm.cities = [];
        vm.hide = true;
   
     	///////////////

      function callWeatherApi(city) {
        $http
            .get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=d9dc935b910f3d0fbbb520a9ba156d73')
            .then(function(response) {
              vm.responseData = response.data;
              vm.kelvinToF = (vm.responseData.main.temp*(9/5)-459.67).toFixed(2);
              vm.kelvinToFMin = (vm.responseData.main.temp_min*(9/5)-459.67).toFixed(2);
              vm.kelvinToFMax = (vm.responseData.main.temp_max*(9/5)-459.67).toFixed(2);
              console.log(vm.responseData);
              vm.nowDate = new Date(new Date().getTime()).toLocaleDateString();
              vm.nowTime = new Date(new Date().getTime()).toLocaleTimeString();
              vm.cities.push({name:vm.responseData.name, date:vm.nowDate, time:vm.nowTime});
              console.log(vm.cities);
              vm.hide = false;
            
              
            })
            .catch(function(error) {
              alert('An error occured downloading from WeatherWebsite');
            });
      
      }
    }

})();
