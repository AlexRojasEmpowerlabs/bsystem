var user = "JoseRojas";
var misDatos = {};
var Clientes = {};
var Contactos = {};
var Ventas = {};
var Padres = {};
var selectedBloc;
var selectedPap;
var selectedTicket = {};
var selectedCom = {};
var todos = {};
var People = "[]";
var d = new Date();
var myProfile = "[]";
selectedChat = {};
var module = ons.bootstrap('my-app', ['onsen']);

module.controller('BodyController', function($scope) {

		ons.ready(function() {
          // Init code here
        });
});

module.controller('PrincipalController', function($scope, $blocsJSON, $http) {
	//myFunction();
	$scope.target = '';
	switch($scope.tope.getActiveTabIndex()) {
	case 1:
		$scope.target = "?target=Curso";
		break;
	case 2:
		$scope.target = "?target=YouTube";
		break;
	case 3:
		$scope.target = "?target=Presentación";
		break;
	case 4:
		$scope.target = "?target=PDF";
		break;
	default:
		$scope.target = '';
	}

	$http.get('http://empowerlabs.com/proyectos/trackersAPI/mblocs2/todos.php' + $scope.target).success(function(data, status, headers, config) {
		misDatos = data;
		$scope.items = misDatos;
		$scope.detalles = function(item) {
			selectedBloc = item;

			if (selectedBloc.Format === 'PDF') {
				//$scope.ons.navigator.pushPage("pdf.html",{title:'1'});
				$scope.tope.loadPage("pdf.html");
			} else {
				if (selectedBloc.Format === 'YouTube') {
					//$scope.ons.navigator.pushPage("video.html",{title:'1'});
					$scope.tope.loadPage("video.html");
				} else {
					if (selectedBloc.Format === 'Presentacin') {
						$scope.tope.loadPage("presentacion.html");
					}
				}
			}
		};
	});
	$scope.informacion = function() {
		//$scope.ons.navigator.pushPage("info.html",{title:'1'});
	};
});
module.factory('$blocsJSON', function() {
	var data = {};

	data.items = misDatos;

	return data;
});

module.controller('VideoController', function($scope) {
	//$scope.ons.notification.alert({message: ""+misDatos.url,title: "intellibanks"});
	$scope.source = selectedBloc;
	$scope.urlVideo = selectedBloc.Url;
	videos = document.querySelectorAll("iframe");
	video = videos[0];

	video.src = 'http://www.youtube.com/embed/' + $scope.urlVideo;
	$scope.opciones=function(){
			$scope.tope.loadPage("inicio.html");
		
	};
});

module.controller('PDFController', function($scope) {
	$scope.source = selectedBloc.More_information;
	pdfs = document.querySelectorAll("iframe");
	pdf = pdfs[0];
	pdf.src = 'http://docs.google.com/gview?url=' + $scope.source + '&embedded=true';
});

module.controller('PresentationController', function($scope) {
	$scope.source = selectedBloc.Url;
	pres = document.querySelectorAll("iframe");
	pre = pres[0];
	pre.src = 'http://docs.google.com/gview?url=' + $scope.source + '&embedded=true';
});

module.controller('ClientesController', function($scope, $http) {
	$scope.Clientes = Clientes;
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/SalesTracker/clientes.php').success(function(data) {
		$scope.Clientes = data;
	});
});

module.controller('ContactosController', function($scope, $http) {
	$scope.Contactos = Contactos;
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/SalesTracker/contactos.php').success(function(data) {
		$scope.Contactos = data;
	});
});

module.controller('VentasController', function($scope, $http) {
	$scope.Ventas = Ventas;
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/SalesTracker/SPTM.php').success(function(data) {
		$scope.Ventas = data;
	});
});

module.controller('PapController', function($scope, $http) {
	$scope.Padres = Padres;
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/BSystem/PAP/padres.php').success(function(data) {
		$scope.Padres = data;
	});
	$scope.detalle = function(padre) {
		selectedPap = padre;
		$scope.ons.navigator.pushPage('PAPdetail.html');
	};
	$scope.detalleHijo = function(hijo) {
		selectedPap = hijo;
		$scope.ons.navigator.pushPage('PAPdetail.html');
	};
});
module.controller('SelectedPapController', function($scope) {
	$scope.item = selectedPap;
});

module.controller('MyController', function($scope, $myService) {
	$scope.hidePopover = function() {
		$scope.popover = $myService.getPopover();
		$scope.popover.hide();
	};
});

module.service("$myService", function() {
	var sharedPopover;

	var setPopover = function(pop) {
		sharedPopover = pop;
	};

	var getPopover = function() {
		return sharedPopover;
	};

	return {
		setPopover : setPopover,
		getPopover : getPopover,
	};
});

module.controller('TicketsController', function($scope, $dataTickets, $http, $myService) {
	$scope.items = todos;
	ons.createPopover('popover.html').then(function(popover) {
		$scope.popover = popover;
		$myService.setPopover($scope.popover);
	});
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/EmpowerLabsIntra/tickettracker/todos.php').success(function(data, status, headers, config) {

		data.reverse();
		$dataTickets.items = data;
		todos = data;
		$scope.items = $dataTickets.items;
	});
	$scope.showTicket = function(item) {
		$dataTickets.selectedItem = item;
		$scope.ons.navigator.pushPage('ticket.html');
	};
});

module.factory('$dataTickets', function() {
	var dataTickets = {};
	dataTickets.items = todos;

	return dataTickets;
});

module.controller('TicketIndividualController', function($scope, $dataTickets) {
	$scope.item = $dataTickets.selectedItem;
});

module.controller('ECommunicator', function($scope, $http) {
	$http.get("http://empowerlabs.com/intellibanks/data/EmpowerLabsIntra/DBTXTjson.php").success(function(response) {
		$scope.names = response.arr;
	});
	$scope.showCom = function(name) {
		selectedCom = name;
		$scope.ons.navigator.pushPage('detailComunicado.html');
	};
	$scope.nuevoComunicado = function() {
	};
	//{$scope.ons.navigator.pushPage('nuevoComunicado.html');};
});

module.controller('DetailComunicadoController', function($scope) {
	$scope.com = selectedCom;

	$scope.cuentaOne = function(com) {
		selectedCom = com;
		$scope.ons.navigator.pushPage('editCommunic.html');
	};

});

module.controller('MensajeController', function($scope, $timeout, $http) {

	if (user == "nouser") {
		menu.setMainPage('login2.html');
	}
	$scope.timeInMs = 0;
	$scope.res = {};
	$scope.mensajeBox = {};
	$scope.size = 0;
	$scope.previa = selectedChat;
	$scope.getMensajes = function() {
		$http.get('http://alexrojas.cloudapp.net/web/chat/getChat.php?chat=' + selectedChat.who).success(function(data) {
			if ($scope.size == data.detail.length) {

			} else {

				for ( i = 0; i < data.detail.length; i++) {
					if (data.detail[i].from == user)
						data.detail[i].clase = "derecha";
					else
						data.detail[i].clase = "izquierda";
				}
				$scope.res = data.detail.reverse();
				$scope.size = $scope.res.length;
			}

		});
	};
	$scope.getMensajes();
	var countUp = function() {
		$scope.timeInMs += 500;
		$scope.getMensajes();
		$timeout(countUp, 500);
	};
	$timeout(countUp, 500);
	$scope.enviarMensaje = function() {
		//$scope.ons.notification.alert({title:'EmpowerLabsIntra', message:'Enviando ...'});
		$http.get('http://alexrojas.cloudapp.net/web/chat/send.php?from=' + user + '&to=' + selectedChat.who2 + '&message=' + $scope.mensajeBox.message + '&who=' + selectedChat.who + '&date=' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '&time=' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()).success(function(data) {
			$scope.getMensajes();
			$scope.mensajeBox = {};

		});
	};
}).config(['$httpProvider',
function($httpProvider) {
	$httpProvider.defaults.timeout = 5000;
}]);

module.controller('ChatsController', function($scope, $timeout, $http) {

	if (user == "nouser") {
		menu.setMainPage('login2.html');
	}
	$scope.res = {};
	$scope.mensajeBox = {};
	$scope.size2 = 0;

	$scope.getChats = function() {
		$http.get('http://alexrojas.cloudapp.net/web/chat/myChats.php?me=' + user).success(function(data) {
			if ($scope.size == data.detail.length) {

			} else {
				for ( i = 0; i < data.detail.length; i++) {
					data.detail[i].who2 = data.detail[i].who.replace("-", " ").replace(user, " ");
				}
				$scope.res = data.detail.reverse();
				$scope.size = $scope.res.length;
			}

		});
	};
	$scope.getChats();
	var countUp2 = function() {
		$scope.getChats();
		$timeout(countUp2, 500);
	};
	$timeout(countUp2, 500);
	$scope.nuevoMensaje = function() {
		$scope.ons.navigator.pushPage('nuevoMensaje.html', {
			animation : 'lift'
		});
	};
	$scope.showChat = function(r) {
		selectedChat = r;
		$scope.ons.navigator.pushPage('mensajes.html');
	};
}).config(['$httpProvider',
function($httpProvider) {
	$httpProvider.defaults.timeout = 5000;
}]);

module.controller('newMessageController', function($scope, $dataPeople, $http) {
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/getUsers.php').success(function(data, status, headers, config) {
		//$scope.ons.notification.alert({message: ""+data.firstname,title: "intellibanks"});
		$dataPeople = data;
		People = data;
		$scope.data = $dataPeople;
		$scope.newMessage = function(i) {
			selectedUser = i;
			arr = [user, selectedUser];
			arr.sort();
			arr.reverse();
			$http.get('http://alexrojas.cloudapp.net/web/chat/newChat.php?from=' + user + '&to=' + selectedUser + '&who=' + arr[0] + '-' + arr[1] + '&message=' + user + ' ha iniciado chat' + '&date=' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '&time=' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()).success(function(data, status, headers, config) {

				$scope.ons.navigator.popPage('chats.html', {
					title : i
				});
			});
		};
	}).error(function(data, status, headers, config) {

	});
});
module.factory('$dataPeople', function() {
	var dataPeople;
	dataPeople = People;

	return dataPeople;
});
