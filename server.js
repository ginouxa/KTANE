var fs = require('fs')
,http = require('http'),
socketio = require('socket.io'),
url = require("url"), 
SerialPort = require("serialport")//,sleep = require('sleep')
//EventEmitter = require("events")

//var EE;
var socketServer;
var serialPort;
var portName = 'COM3'; //change this to your Arduino port
var sendData = "";
var code=[];
var trys = 10;
var retour="";
var codeEssai="";
var codeTemp ="156325";

function SocketIO_serialemit(sendData){
    socketServer.emit('updateData',{pollOneValue:sendData});
}
// handle contains locations to browse to (vote and poll); pathnames.
function startServer(route,handle,debug)
{
	// on request event
	function onRequest(request, response) {
	  // parse the requested url into pathname. pathname will be compared
	  // in route.js to handle (var content), if it matches the a page will 
	  // come up. Otherwise a 404 will be given. 
	  var pathname = url.parse(request.url).pathname; 
	  console.log("Request for " + pathname + " received");
	  var content = route(handle,pathname,response,request,debug);
	}
	
	var httpServer = http.createServer(onRequest).listen(1337, function(){
		console.log("Listening at: http://localhost:1337");
		console.log("Server is up");
	}); 
        generateCode(6);
	serialListener(debug);
	initSocketIO(httpServer,debug);
    
}

function initSocketIO(httpServer,debug)
{
	socketServer = socketio.listen(httpServer);
	if(debug == false){
		socketServer.set('log level', 1); // socket IO debug off
	}
	socketServer.on('connection', function (socket) {
	console.log("user connected");
	socket.emit('onconnection', {pollOneValue:sendData});
	socketServer.on('update', function(data) {
	socket.emit('updateData',{pollOneValue:data});
	});
	socket.on('buttonval', function(data) {
            console.log(data);
            /*setInterval(function(){
          console.log(data);
          serialPort.write('THE END');
        }, data * 1000);  */
	});
	socket.on('sliderval', function(data) {
		serialPort.write(data + 'P');
	});
	
    });
    



    
}

// Listen to serial port
function serialListener(debug)
{
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false
    });
 
    serialPort.on("open", function () {
//      console.log('open serial communication');
            // Listens to incoming data
        serialPort.on('data', function(data) {
             receivedData += data.toString();
          if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
           sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
           receivedData = '';
         }
         // send the incoming data to browser with websockets.
          
          
            if(sendData.length != 0){
              if(codeTemp != sendData){
                  codeTemp=sendData;
                    trys = trys - 1;// -1 vie
                  if (essai(sendData,code)==true){

                      trys=99;
                  }
                  if (trys <= 0 ){
                  socketServer.emit('updateData', '0:BOOOOM');

                  }else{
                  socketServer.emit('updateData', trys+':'+sendData);
                  }
              }
            }
            //SocketIO_serialemit(sendData);
       //EE.on('update');
       
      });  
    });  
}

function essai(codeEssai,code){
 
        var tab =[];
        tab=codeEssai.split('');
        var count = 0;
        var array=['C','A','D','F','G','H'];
        for(i=0;i<codeEssai.length;i++){
            console.log("TEST"+tab[i]+"CODE"+code[i]);
            if(parseInt(tab[i]) == code[i]){
                //setTimeout(function() {
                    serialPort.write(array[i]);
                   console.log("JE SUIS IIIIII : "+array[i]);
                //}, 50);
                count++;
            }

        }
        console.log(count);
        console.log(code.length);
            if(count == codeEssai.length){
                return true;
            }
    
    return false;
}

function generateCode(longueur){
    for(i=0;i<longueur;i++){
        code[i]= randomInt(0,9);
        console.log(code[i]);
    }
   return code;
   
}
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

exports.start = startServer;