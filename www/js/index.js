var misDatos={};
var selectedBloc;
var module = ons.bootstrap('my-app', ['onsen']);


  module.controller('PrincipalController', function($scope,$blocsJSON,$http){
  	//myFunction();
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/mblocs2/todos.php').
	success(function(data, status, headers, config){
		misDatos=data;
		$scope.items=misDatos;
		$scope.detalles=function(item){
			selectedBloc=item;
			//$scope.ons.navigator.pushPage("micro.html",{title:'1'});
		};
	});
	$scope.informacion=function(){
		//$scope.ons.navigator.pushPage("info.html",{title:'1'});
	};
  });
  module.factory('$blocsJSON',function(){
  	var data = {};
      
      data.items = misDatos;
      
      return data;
  });