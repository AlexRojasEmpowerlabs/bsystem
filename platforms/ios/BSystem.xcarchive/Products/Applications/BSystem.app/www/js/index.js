var misDatos={};
var Clientes={};
var Contactos={};
var Ventas={};
var Padres={};
var selectedBloc;
var selectedTicket={};
var selectedCom={};
var todos={};
var module = ons.bootstrap('my-app', ['onsen']);

 module.controller('BodyController',function($scope){
 	
  $scope.quitarpop=function(){
  	//$scope.popover.destroy();
  };
 });

  module.controller('PrincipalController', function($scope,$blocsJSON,$http){
  	//myFunction();
  	$scope.target='';
  	switch($scope.tope.getActiveTabIndex()){
  		case 2:
  		$scope.target="?target=YouTube";
  		break;
  		case 3:
  		$scope.target="?target=Presentación";
  		break;
  		case 4:
  		$scope.target="?target=PDF";
  		break;
  		default:
  		$scope.target='';
  	}
  	
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/mblocs2/todos.php'+$scope.target).
	success(function(data, status, headers, config){
		misDatos=data;
		$scope.items=misDatos;
		$scope.detalles=function(item){
			selectedBloc=item;
			
			if(selectedBloc.Format==='PDF'){
			//$scope.ons.navigator.pushPage("pdf.html",{title:'1'});
			$scope.tope.loadPage("pdf.html");
			}
			else{
				if(selectedBloc.Format==='YouTube')
				{
					//$scope.ons.navigator.pushPage("video.html",{title:'1'});
					$scope.tope.loadPage("video.html");
				}
				else{
					if(selectedBloc.Format==='Presentación'){
						$scope.tope.loadPage("presentacion.html");
					}
				}
			}
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
  
  module.controller('VideoController', function($scope) {
    //$scope.ons.notification.alert({message: ""+misDatos.url,title: "intellibanks"});
    $scope.urlVideo = selectedBloc.Url;
    videos = document.querySelectorAll("iframe");
video=videos[0];

            video.src = 'http://www.youtube.com/embed/'+$scope.urlVideo;
  });
  
  module.controller('PDFController', function($scope){
  	$scope.source=selectedBloc.More_information;
  	pdfs = document.querySelectorAll("iframe");
	pdf=pdfs[0];
	pdf.src='http://docs.google.com/gview?url='+$scope.source+'&embedded=true';
  });
  
  module.controller('PresentationController', function($scope){
  	$scope.source=selectedBloc.Url;
  	pres = document.querySelectorAll("iframe");
	pre=pres[0];
	pre.src='http://docs.google.com/gview?url='+$scope.source+'&embedded=true';
  });
  
  module.controller('ClientesController', function($scope,$http){
  	$scope.Clientes=Clientes;
  	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/SalesTracker/clientes.php').
  	success(function(data){
  		$scope.Clientes=data;
  	});
  });
  
  module.controller('ContactosController', function($scope,$http){
  	$scope.Contactos=Contactos;
  	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/SalesTracker/contactos.php').
  	success(function(data){
  		$scope.Contactos=data;
  	});
  });
  
  module.controller('VentasController', function($scope,$http){
  	$scope.Ventas=Ventas;
  	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/SalesTracker/SPTM.php').
  	success(function(data){
  		$scope.Ventas=data;
  	});
  });
  
  module.controller('PapController', function($scope,$http){
  	$scope.Padres=Padres;
  	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/PAP/padres.php').
  	success(function(data){
  		$scope.Padres=data;
  	});
  });
  
module.controller('TicketsController', function($scope,$dataTickets,$http) {
  	$scope.items=todos;
  	$scope.popover="";
  	$scope.ons.createPopover('popover.html').then(function(popover) {
    //popover.show($scope.lista);
    $scope.popover=popover;   
  });
  $scope.mostrarpop=function(){
  	$scope.popover.show($scope.lista);
  };
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/EmpowerLabsIntra/tickettracker/todos.php').
	success(function(data, status, headers, config){
		
  	data.reverse();
    $dataTickets.items=data;
    todos=data;
    $scope.items = $dataTickets.items; 
	});
	$scope.showTicket=function(item){
		$dataTickets.selectedItem=item;
		$scope.ons.navigator.pushPage('ticket.html');
	};
}); 

  module.factory('$dataTickets', function() {
      var dataTickets = {};
      		dataTickets.items=todos;
      
      return dataTickets;
  });
  
module.controller('TicketIndividualController', function($scope,$dataTickets) {
	$scope.item=$dataTickets.selectedItem;
}); 

module.controller('ECommunicator', function($scope, $http) {
    $http.get("http://empowerlabs.com/intellibanks/data/EmpowerLabsIntra/DBTXTjson.php")
    .success(function (response) {
    	$scope.names = response.arr;
    	});
   $scope.showCom=function(name){
    	selectedCom=name;
	$scope.ons.navigator.pushPage('detailComunicado.html');
    };
  $scope.nuevoComunicado=function(){};
  //{$scope.ons.navigator.pushPage('nuevoComunicado.html');};
});



   	
module.controller('DetailComunicadoController', function($scope) {
	$scope.com=selectedCom;
  
  $scope.cuentaOne=function(com){
    selectedCom=com;
    $scope.ons.navigator.pushPage('editCommunic.html');
   };

}); 
