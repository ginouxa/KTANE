var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var debug = false;

var handle = {}
handle["/"] = requestHandlers.sendInterface;
handle["/interface"] = requestHandlers.sendInterface;

server.start(router.route,handle,debug);

// compteur (compte a rebour ) 
// nb de try 
// message de fin (combinaison GG) 
//envoi de la bonne combi a la vue a la fin 
//fin des event qui affiche la bonne combi somehow
// si ganger 
