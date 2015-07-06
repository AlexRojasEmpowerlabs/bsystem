var user = "nouser";
var target = '';
var misDatos = {};
var Clientes = {};
var Contactos = {};
var Ventas = {};
var Padres = {};
var selectedBloc;
var selectedPap;
var selectedTicket = {};
var selectedCom = {};
var selectedConver = '';
var selectedPara = '';
var todos = {};
var People = "[]";
var d = new Date();
var myProfile = "[]";
selectedChat = {};
var conn;
var module = ons.bootstrap('my-app', ['onsen'], ['ngWebsocket']);

module.controller('BodyController', function($scope) {

	ons.ready(function() {
		// Init code here

		conver = function(nombre, nombre2) {
			//alert(''+nombre);
			selectedConver = nombre;
			selectedPara = nombre2;
		};
		conn = new WebSocket('ws://alexrojas.cloudapp.net:9000');
		conn.onopen = function(e) {
			console.log("Connection established!" + e);
		};
		conn.onmessage = function(e) {
			//console.log(e.data);
			$scope.mensajesSocket = JSON.parse(e.data);
			json = jQuery.parseJSON(e.data);
			//var text = $('#mensajes').val();
			var text = "";

			if (json.type === "send") {
				text = "<ul>";
				$.each(json.chats, function(index, value) {
					clase = 'derecha';
					if (value.from !== user)
						clase = "izquierda";
					else
						$('#' + json.target).text("0");

					text += "<li class='collection-item " + clase + "'>" + value.message + "</li>";
				});
				text += "</ul>";
				$('#mensajes').html(text);
				$('#' + json.target).text("1");

				var element = document.getElementById("mensajes");
				element.scrollTop = element.scrollHeight;
			} else {
				if (json.type === "getChats") {
					$.each(json.chats, function(index, value) {

						value.who2 = value.who.replace("-", " ").replace(user, " ");

						text += '<li class="collection-item" onclick="ons.navigator.pushPage(\'chats.html\');conver(\'' + value.who + '\',\'' + value.who2 + '\')">' + value.who2 + "<div class='right'><span id='" + value.who + "' class='notification'>0</span></div></li>";

					});

					$('#chats-container').append(text);
				} else {
					if (json.type === "getConver") {
						text = "<ul>";
						$.each(json.chats, function(index, value) {
							clase = 'derecha';
							if (value.from !== user)
								clase = "izquierda";

							text += "<li class='collection-item " + clase + "'>" + value.message + "</li>";
						});
						text += "</ul>";
						$('#mensajes').html(text);

						var element = document.getElementById("mensajes");
						element.scrollTop = element.scrollHeight;

					}
				}
			}
		};
	});
});

module.controller('PrincipalController', function($scope, $blocsJSON, $http) {
	//myFunction();
	if (user == "nouser") {
		$scope.fondo.loadPage('login2.html');
	}
	$scope.target = '';
	switch($scope.tope.getActiveTabIndex()) {
	case 1:
		$scope.target = "?target=YouTube";
		break;
	case 2:
		$scope.target = "?target=Presentación";
		break;
	case 3:
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
	$scope.opciones = function() {
		$scope.tope.loadPage("inicio.html");

	};
});

module.controller('PDFController', function($scope) {
	$scope.source = selectedBloc;
	pdfs = document.querySelectorAll("iframe");
	pdf = pdfs[0];
	pdf.src = 'http://docs.google.com/gview?url=' + $scope.source.More_information + '&embedded=true';
	$scope.opciones = function() {
		$scope.tope.loadPage("inicio.html");

	};
});

module.controller('PresentationController', function($scope) {
	$scope.source = selectedBloc;
	pres = document.querySelectorAll("iframe");
	pre = pres[0];
	pre.src = 'http://docs.google.com/gview?url=' + $scope.source.Url + '&embedded=true';
	$scope.opciones = function() {
		$scope.tope.loadPage("inicio.html");

	};
});

module.controller('ClientesController', function($scope, $http) {
	if (user == "nouser") {
		$scope.fondo.loadPage('login2.html');
	}
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
	if (user == "nouser") {
		$scope.fondo.loadPage('login2.html');
	}
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
	$scope.detalleSubHijo = function(subhijo) {
		selectedPap = subhijo;
		$scope.ons.navigator.pushPage('PAPdetail.html');
	};
});
module.controller('SelectedPapController', function($scope) {
	$scope.item = selectedPap;
});

module.controller('MyController', function($scope, $myService) {
	$scope.hidePopover = function(param) {
		$scope.popover = $myService.getPopover();
		//alert('hey, myVar has changed!   '+$myService.getTarget());
		fitro = "";
		switch(param) {
		case 1:
			fitro = user;
			break;
		case 2:
			fitro = '';
			break;
		case 3:
			fitro = '!100';
			break;
		case 4:
			fitro = '100';
			break;
		}
		//$('#enter').val(fitro);
		$myService.setTarget(fitro);
		$scope.modelo = $myService.getModel();
		$scope.modelo.entradaTicket = fitro;
		$scope.popover.hide();
	};
});

module.service("$myService", function() {
	var sharedPopover;
	var sharedTarget;
	var sharedModel;

	var setPopover = function(pop) {
		sharedPopover = pop;
	};

	var getPopover = function() {
		return sharedPopover;
	};

	var setTarget = function(newtarget) {
		sharedTarget = newtarget;
	};

	var getTarget = function() {
		return sharedTarget;
	};

	var setModel = function(mymodel) {
		sharedModel = mymodel;
	};

	var getModel = function() {
		return sharedModel;
	};

	return {
		setPopover : setPopover,
		getPopover : getPopover,
		setTarget : setTarget,
		getTarget : getTarget,
		setModel : setModel,
		getModel : getModel,
	};
});

module.controller('TicketsController', function($scope, $dataTickets, $http, $myService) {

	if (user == "nouser") {
		$scope.fondo.loadPage('login2.html');
	}
	$scope.items = todos;
	ons.createPopover('popover.html').then(function(popover) {
		$scope.popover = popover;
		$myService.setPopover($scope.popover);
	});

	$myService.setModel($scope);
	$http.get('http://empowerlabs.com/proyectos/trackersAPI/EmpowerLabsIntra/tickettracker/todos.php').success(function(data, status, headers, config) {

		data.reverse();
		$dataTickets.items = data;
		todos = data;
		$scope.items = $dataTickets.items;
	});
	$scope.showTicket = function(item) {
		$dataTickets.selectedItem = item;
		//$scope.entradaTicket=$myService.getTarget();
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

	if (user == "nouser") {
		$scope.fondo.loadPage('login2.html');
	}
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

module.controller('MyChatsController', function($scope) {
	if (user == "nouser") {
		$scope.fondo.loadPage('login2.html');
	}
	$scope.obtener = function() {
		conn.send(JSON.stringify({
			"type" : "getChats",
			"who" : user
		}));
	};
	$scope.nuevoMensaje=function(){
		$scope.ons.navigator.pushPage('nuevoMensaje.html',{animation:'lift'});
	};
	$scope.obtener();
});

module.controller('ChatController', function($scope) {
	$scope.conver = selectedConver;
	$('#' + $scope.conver).text("0");
	$scope.para = selectedPara;
	$scope.obtener = function() {
		conn.send(JSON.stringify({
			"type" : "getConver",
			"chatTarget" : $scope.conver
		}));
	};
	$scope.obtener();

	$scope.enviar = function() {

		conn.send(JSON.stringify({
			"message" : '' + $('#entrada').val(),
			"chatTarget" : selectedConver,
			"from" : user,
			"to" : selectedPara,
			"time" : "12-47-1",
			"date" : "2015-6-27",
			"type" : "send"
		}));
		$('#entrada').val("");
	};
});

module.controller('newMessageController', function($scope, $dataPeople, $http) {
	$http.get('http://empowerlabs.com/proyectos/helpDesk/getUsers.php').
  success(function(data, status, headers, config) {
  	//$scope.ons.notification.alert({message: ""+data.firstname,title: "intellibanks"});
    $dataPeople=data;
    People=data;
    $scope.data = $dataPeople;
    $scope.newMessage=function(i){
    	selectedUser=i;
    	arr=[user,selectedUser];
    	arr.sort();
    	arr.reverse();
    	$http.get('http://alexrojas.cloudapp.net/web/chat/newChat.php?from='+user+
    	'&to='+selectedUser+
    	'&who='+arr[0]+'-'+arr[1]+'&message='+user+' ha iniciado chat'+
		'&date='+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+
		'&time='+d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()).
	success(function(data, status, headers, config){
		
    	$scope.ons.navigator.popPage('myChats.html', {title : i});
	});
    	};
  }).
  error(function(data, status, headers, config) {
  	
  });
  });
   module.factory('$dataPeople', function() {
      var dataPeople;
      		dataPeople=People;
      
      return dataPeople;
  });


module.controller('LoginController', function($scope, $http) {
	$scope.formLogin = {};
	$scope.login = function() {
		$http.get('http://empowerlabs.com/landing-pages/Martin/Usuarios/ingreso.php?nombre=' + $scope.formLogin.nombre + '&pass=' + $scope.formLogin.pass).success(function(data, status, headers, config) {
			if (data.code == "OK") {
				user = data.user;
				//ons.notification.alert({message: ''+data.respuesta, title:"Intellibanks"});

				$scope.fondo.loadPage('mbloc.html');
			} else {
				ons.notification.alert({
					message : '' + data.respuesta,
					title : "Intellibanks"
				});
			}
		});
	};

});
